import {
  ProviderError,
  boolean,
  decodeJson,
  defineApp,
  defineProvider,
  json,
  mutation,
  number,
  object,
  plain,
  query,
  router,
  secrets,
  string,
  type MutationContext,
  type QueryContext,
} from "apps";
import { always } from "apps/operations/approval";

const API = "https://public-api.kiwify.com/v1";
const TOKEN_KEY = ["kiwify-token"];

type Fetch = typeof globalThis.fetch;

async function requestToken(
  fetch: Fetch,
  signal: AbortSignal,
  fields: { client_id: string; client_secret: string },
): Promise<string> {
  const body = new URLSearchParams({ client_id: fields.client_id, client_secret: fields.client_secret });
  const response = await fetch(API + "/oauth/token", {
    method: "POST",
    signal,
    headers: { "content-type": "application/x-www-form-urlencoded" },
    body: body.toString(),
  });
  if (response.status === 400 || response.status === 401)
    throw new ProviderError({ reason: "unauthorized", status: response.status });
  if (response.status === 429) throw new ProviderError({ reason: "rate_limited", status: 429 });
  if (!response.ok)
    throw new ProviderError({ reason: response.status >= 500 ? "unavailable" : "rejected", status: response.status });
  const data = (await response.json()) as { access_token?: unknown };
  if (typeof data.access_token !== "string") throw new Error("A Kiwify não devolveu o token de acesso.");
  return data.access_token;
}

const authHeaders = (token: string, accountId: string) => ({
  Authorization: "Bearer " + token,
  "x-kiwify-account-id": accountId,
  accept: "application/json",
});

const kiwify = defineProvider({
  name: "Kiwify",
  hosts: ["public-api.kiwify.com"],
  auth: {
    apiKey: secrets({
      label: "API Key",
      guide:
        "Na Kiwify, abra **Apps > API > Criar API Key**. Copie o client_id, o client_secret e o account_id dessa mesma tela.",
      fields: object({
        client_id: plain(
          string({ minLength: 1, title: "client_id", description: "Mostrado ao criar a API Key em Apps > API." }),
        ),
        client_secret: string({
          minLength: 1,
          title: "client_secret",
          description: "Mostrado ao criar a API Key em Apps > API. Copie antes de fechar a tela.",
        }),
        account_id: plain(
          string({ minLength: 1, title: "account_id", description: "Fica na mesma tela da API Key, em Apps > API." }),
        ),
      }),
    }),
  },
  async health({ account, fetch, signal }) {
    const token = await requestToken(fetch, signal, account.fields);
    const response = await fetch(API + "/account-details", {
      signal,
      headers: authHeaders(token, account.fields.account_id),
    });
    if (response.status === 401) throw new ProviderError({ reason: "unauthorized", status: 401 });
    if (response.status === 403)
      throw new Error("A API Key não tem permissão para ler os dados da conta. Crie uma chave com todos os escopos de leitura.");
    await decodeJson(response, json());
    return { accountInfo: { externalId: account.fields.account_id } };
  },
});

const requirements = { user: { accounts: { kiwify } } };
type QCtx = QueryContext<typeof requirements>;
type MCtx = MutationContext<typeof requirements>;
type Ctx = QCtx | MCtx;

async function callKiwify(
  ctx: Ctx,
  path: string,
  params: Record<string, string | number | boolean | undefined> = {},
  init: { method?: string; body?: string } = {},
): Promise<unknown> {
  const account = ctx.user.accounts.kiwify;
  const cache = ctx.cache.forAccount(account);
  const token = await cache.get({
    key: TOKEN_KEY,
    schema: string(),
    freshFor: "20 hours",
    load: ({ fetch, signal }) => requestToken(fetch, signal, account.fields),
  });
  const url = new URL(API + path);
  for (const [k, v] of Object.entries(params)) if (v !== undefined) url.searchParams.set(k, String(v));
  const response = await ctx.fetch(url.toString(), {
    method: init.method ?? "GET",
    signal: ctx.signal,
    headers: {
      ...authHeaders(token, account.fields.account_id),
      ...(init.body === undefined ? {} : { "content-type": "application/json" }),
    },
    body: init.body,
  });
  if (response.status === 401) {
    await cache.invalidate(TOKEN_KEY);
    throw new ProviderError({ reason: "unauthorized", status: 401 });
  }
  if (response.status === 204) return null;
  return decodeJson(response, json());
}

const Id = object({ id: string({ description: "ID na Kiwify" }) });
const Page = {
  page_size: number({ description: "Itens por página" }).optional(),
  page_number: number({ description: "Número da página, começando em 1" }).optional(),
};
const date = (description: string) => string({ description: description + " (AAAA-MM-DD)" });

export default defineApp(requirements, {
  tools: router(
    {
      conta: query(
        { description: "Dados da conta Kiwify e das empresas (legal entities).", input: object({}) },
        async (ctx: QCtx) => callKiwify(ctx, "/account-details"),
      ),
      produtos: router({
        listar: query(
          { description: "Lista os produtos da conta.", input: object({ ...Page }) },
          async (ctx: QCtx, input) => callKiwify(ctx, "/products", input),
        ),
        ver: query(
          { description: "Um produto com ofertas, order bumps, links e frete.", input: Id },
          async (ctx: QCtx, { id }) => callKiwify(ctx, "/products/" + encodeURIComponent(id)),
        ),
      }),
      vendas: router({
        listar: query(
          {
            description: "Lista vendas num período de no máximo 90 dias.",
            input: object({
              start_date: date("Início do período"),
              end_date: date("Fim do período"),
              status: string({ description: "Ex.: paid, refunded, waiting_payment, refused, chargedback" }).optional(),
              payment_method: string({ description: "Ex.: credit_card, pix, boleto" }).optional(),
              product_id: string().optional(),
              affiliate_id: string().optional(),
              view_full_sale_details: boolean({ description: "true traz todos os detalhes de cada venda" }).optional(),
              updated_at_start_date: date("Atualizadas a partir de").optional(),
              updated_at_end_date: date("Atualizadas até").optional(),
              ...Page,
            }),
          },
          async (ctx: QCtx, input) => callKiwify(ctx, "/sales", input),
        ),
        ver: query(
          { description: "Uma venda com cliente, pagamento, rastreio e comissões.", input: Id },
          async (ctx: QCtx, { id }) => callKiwify(ctx, "/sales/" + encodeURIComponent(id)),
        ),
        estatisticas: query(
          {
            description: "Estatísticas de vendas, por produto e período.",
            input: object({
              product_id: string().optional(),
              start_date: date("Início").optional(),
              end_date: date("Fim").optional(),
            }),
          },
          async (ctx: QCtx, input) => callKiwify(ctx, "/stats", input),
        ),
        reembolsar: mutation(
          {
            description:
              "Reembolsa uma venda. Dinheiro real e sem volta: o dono aprova cada chamada no Executor.",
            input: object({
              id: string({ description: "ID da venda" }),
              pixKey: string({ description: "Chave Pix do cliente, quando a venda foi por Pix" }).optional(),
            }),
            approval: always(),
          },
          async (ctx: MCtx, { id, pixKey }) =>
            callKiwify(ctx, "/sales/" + encodeURIComponent(id) + "/refund", {}, {
              method: "POST",
              body: JSON.stringify(pixKey === undefined ? {} : { pixKey }),
            }),
        ),
      }),
      financeiro: router({
        saldo: query(
          {
            description: "Saldo disponível e pendente. Sem legal_entity_id traz todas as empresas.",
            input: object({ legal_entity_id: string().optional() }),
          },
          async (ctx: QCtx, { legal_entity_id }) =>
            callKiwify(ctx, legal_entity_id ? "/balance/" + encodeURIComponent(legal_entity_id) : "/balance"),
        ),
        saques: query(
          { description: "Lista os saques.", input: object({ legal_entity_id: string().optional(), ...Page }) },
          async (ctx: QCtx, input) => callKiwify(ctx, "/payouts", input),
        ),
        saque: query(
          { description: "Um saque.", input: Id },
          async (ctx: QCtx, { id }) => callKiwify(ctx, "/payouts/" + encodeURIComponent(id)),
        ),
      }),
      afiliados: router({
        listar: query(
          {
            description: "Lista afiliados.",
            input: object({
              status: string().optional(),
              product_id: string().optional(),
              search: string().optional(),
              ...Page,
            }),
          },
          async (ctx: QCtx, input) => callKiwify(ctx, "/affiliates", input),
        ),
        ver: query(
          { description: "Um afiliado.", input: Id },
          async (ctx: QCtx, { id }) => callKiwify(ctx, "/affiliates/" + encodeURIComponent(id)),
        ),
      }),
      webhooks: router({
        listar: query(
          { description: "Lista os webhooks configurados.", input: object({}) },
          async (ctx: QCtx) => callKiwify(ctx, "/webhooks"),
        ),
        ver: query(
          { description: "Um webhook.", input: Id },
          async (ctx: QCtx, { id }) => callKiwify(ctx, "/webhooks/" + encodeURIComponent(id)),
        ),
      }),
      eventos: router({
        participantes: query(
          {
            description: "Participantes de um produto do tipo evento.",
            input: object({ product_id: string(), ...Page }),
          },
          async (ctx: QCtx, { product_id, ...rest }) =>
            callKiwify(ctx, "/events/" + encodeURIComponent(product_id) + "/participants", rest),
        ),
      }),
      parcelado: router({
        listar: query(
          {
            description: "Planos do Parcelado criados num período de no máximo 90 dias.",
            input: object({ created_start: date("Criados a partir de"), created_end: date("Criados até"), ...Page }),
          },
          async (ctx: QCtx, input) => callKiwify(ctx, "/scheduled-installments", input),
        ),
        ver: query(
          { description: "Um plano do Parcelado e suas parcelas.", input: Id },
          async (ctx: QCtx, { id }) => callKiwify(ctx, "/scheduled-installments/" + encodeURIComponent(id)),
        ),
      }),
    },
    {
      title: "Kiwify",
      description: "Vendas, produtos, estatísticas, saldo e afiliados da Kiwify (Candeia Tec).",
      instructions:
        "Tudo aqui só lê, exceto vendas.reembolsar, que exige a aprovação do dono a cada chamada. Datas em AAAA-MM-DD; vendas e Parcelado aceitam no máximo 90 dias por consulta. A API tem limite de 100 chamadas por minuto e trabalha com dados reais.",
    },
  ),
});
