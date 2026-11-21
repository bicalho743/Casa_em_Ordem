# 🏠 Casa em Ordem — Kit de Organização Doméstica

O **Casa em Ordem** é um produto digital voltado para a organização do lar e estruturação da rotina familiar de forma leve, realista e sem culpa. Desenvolvido por **Tâmara Cavalcante** (Personal Organizer), o projeto é focado em pessoas sobrecarregadas com o trabalho doméstico que buscam um sistema adaptável aos seus limites reais, em contraste com métodos rígidos e irreais.

Este repositório contém todo o ecossistema de vendas, captura e entrega do produto, estruturado de forma 100% estática (HTML/CSS/JS puros).

---

## 🔗 Informações de Publicação e URLs

O projeto está configurado para publicação via **GitHub Actions (FTP Deploy Locaweb)** no repositório `bicalho743/casa-em-ordem`.

- **Funil / Quiz de Diagnóstico Principal:** [vidaemmetodo.com.br/casa-em-ordem-quiz/](https://vidaemmetodo.com.br/casa-em-ordem-quiz/)
- **Landing Page Principal:** [vidaemmetodo.com.br/casa-em-ordem/](https://vidaemmetodo.com.br/casa-em-ordem/)
- **Área Exclusiva de Entrega (Hub de Downloads):** [vidaemmetodo.com.br/casa-em-ordem/jornada-exclusiva-ceo2026/](https://vidaemmetodo.com.br/casa-em-ordem/jornada-exclusiva-ceo2026/)

---

## 📈 Estrutura de Landing Pages & Funil de Vendas

O ecossistema é composto por três páginas principais integradas:

### 1. Landing Page Principal ([index.html](file:///c:/PROJETOS%20DIGITAIS/TAMARA/casa%20em%20ordem/index.html))
Uma página de vendas direta de alta conversão estruturada com design moderno (Nunito/Lora, tons de verde e coral).
* **Seções:**
  * **Hero (Destaque):** Título chamativo, mockup do produto e citação inspiradora.
  * **Problematização:** Conexão direta com a dor ("Você não é desorganizada. Você está sobrecarregada").
  * **Apresentação do Kit:** Divisão clara das categorias do kit em grade.
  * **Diferenciação (Plano A vs. Plano B):** Apresentação do ritmo ideal de organização dependendo da rotina de cada perfil.
  * **Bônus:** Lista de recursos extras inclusos.
  * **Preço e Checkout:** Cartão de preço destacado com redirecionamento ao checkout da Kiwify.
  * **FAQ:** Acordeões iterativos em Javascript vanilla para sanar dúvidas frequentes.
* **Pixel do Facebook:** Rastreia os eventos padrão `PageView` e `ViewContent` (Pixel ID: `3613700275452878`, "Casa em ordem").

### 2. Quiz de Diagnóstico ([casa-em-ordem-quiz/index.html](file:///c:/PROJETOS%20DIGITAIS/TAMARA/casa%20em%20ordem/casa-em-ordem-quiz/index.html))
Um funil de vendas baseado em perguntas interativas e diagnóstico personalizado que eleva a intenção de compra.
* **Perguntas:**
  1. *Hoje, sua casa te dá mais paz ou mais peso?*
  2. *Quem mais te ajuda na rotina da casa?*
  3. *O que mais pesa no seu dia a dia?*
  4. *Qual frase combina mais com a sua rotina hoje?* (Define o perfil: Trabalha fora/Plano A vs. Fica em casa/Plano B).
  5. *Se existisse um caminho simples e acessível, você começaria hoje?*
* **Lógica do Diagnóstico:** Roda uma simulação de processamento ("Analisando suas respostas...") e exibe um diagnóstico baseado nas respostas (recomenda o **Plano A** ou o **Plano B** com base no perfil indicado na Pergunta 4).
* **Gatilhos Mentais:** Apresenta depoimentos, temporizador de contagem regressiva para a escassez e link customizado de checkout.
* **UTM Persistence:** Script que captura os parâmetros de rastreamento (`utm_source`, `utm_medium`, `utm_campaign`, etc.) da URL e os armazena no `sessionStorage` para inseri-los dinamicamente no link final do checkout.
* **Pixel do Facebook:** Rastreia `PageView`, `Lead` (quando o diagnóstico é gerado) e `InitiateCheckout` (quando o usuário clica para ir ao checkout).

### 3. Área Exclusiva / Painel de Downloads ([jornada-exclusiva-ceo2026/index.html](file:///c:/PROJETOS%20DIGITAIS/TAMARA/casa%20em%20ordem/jornada-exclusiva-ceo2026/index.html))
A área pós-compra do cliente, onde ele faz o download dos materiais.
* **Painel Interativo:** Sidebar de navegação dividida por categorias.
* **Gamificação / Controle:** Possui uma barra de progresso dinâmica em JS que monitora os arquivos baixados e exibe a mensagem (ex: `"X de 17 materiais baixados"`), salvando o status de progresso localmente no navegador do usuário.
* **Acesso Simples:** Os botões baixam diretamente os PDFs integrados no diretório do projeto.

---

## 📦 O Produto (Os 17 Materiais Digitais)

O produto entregue é composto por **17 arquivos práticos em PDF** (com correspondentes em HTML para visualização imediata) divididos por áreas:

### 📋 Guias Principais (Rotinas)
* **Plano A — Casa em Ordem (Rotina Corrida):** Guia estratégico de rotina doméstica voltado para quem trabalha fora e tem pouco tempo durante o dia.
  * [Visualizar PDF](file:///c:/PROJETOS%20DIGITAIS/TAMARA/casa%20em%20ordem/pdfs/plano-a-casa-em-ordem.pdf) | [Versão HTML](file:///c:/PROJETOS%20DIGITAIS/TAMARA/casa%20em%20ordem/pdfs/plano-a-casa-em-ordem.html)
* **Plano B — Casa Organizada (Rotina Flexível):** Guia estratégico voltado para quem trabalha ou passa o dia em casa, distribuindo micro-tarefas.
  * [Visualizar PDF](file:///c:/PROJETOS%20DIGITAIS/TAMARA/casa%20em%20ordem/pdfs/plano-b-casa-organizada.pdf) | [Versão HTML](file:///c:/PROJETOS%20DIGITAIS/TAMARA/casa%20em%20ordem/pdfs/plano-b-casa-organizada.html)

### 🧹 Limpeza e Organização
* **Cards de Limpeza:** Fichas recortáveis com tarefas práticas.
  * [Visualizar PDF](file:///c:/PROJETOS%20DIGITAIS/TAMARA/casa%20em%20ordem/pdfs/cards-de-limpeza.pdf) | [Versão HTML](file:///c:/PROJETOS%20DIGITAIS/TAMARA/casa%20em%20ordem/pdfs/cards-de-limpeza.html)
* **Planejamento de Limpeza Completo:** Roteiro geral da faxina doméstica.
  * [Visualizar PDF](file:///c:/PROJETOS%20DIGITAIS/TAMARA/casa%20em%20ordem/pdfs/limpeza-completo.pdf) | [Versão HTML](file:///c:/PROJETOS%20DIGITAIS/TAMARA/casa%20em%20ordem/pdfs/limpeza-completo.html)
* **Organização por Cômodos:** Divisão sistemática de arrumação ambiente por ambiente.
  * [Visualizar PDF](file:///c:/PROJETOS%20DIGITAIS/TAMARA/casa%20em%20ordem/pdfs/organizacao-por-comodos.pdf) | [Versão HTML](file:///c:/PROJETOS%20DIGITAIS/TAMARA/casa%20em%20ordem/pdfs/organizacao-por-comodos.html)
* **Roteiro 15 Minutos Salva-Vidas:** Lista de tarefas urgentes de manutenção para dias corridos.
  * [Visualizar PDF](file:///c:/PROJETOS%20DIGITAIS/TAMARA/casa%20em%20ordem/pdfs/roteiro-15min.pdf) | [Versão HTML](file:///c:/PROJETOS%20DIGITAIS/TAMARA/casa%20em%20ordem/pdfs/roteiro-15min.html)

### 🥦 Alimentação e Compras
* **Cardápio de Refeições:** Planejamento alimentar semanal.
  * [Visualizar PDF](file:///c:/PROJETOS%20DIGITAIS/TAMARA/casa%20em%20ordem/pdfs/cardapio-refeicoes.pdf) | [Versão HTML](file:///c:/PROJETOS%20DIGITAIS/TAMARA/casa%20em%20ordem/pdfs/cardapio-refeicoes.html)
* **Lista de Compras:** Template estruturado por categorias de supermercado.
  * [Visualizar PDF](file:///c:/PROJETOS%20DIGITAIS/TAMARA/casa%20em%20ordem/pdfs/lista-de-compras.pdf) | [Versão HTML](file:///c:/PROJETOS%20DIGITAIS/TAMARA/casa%20em%20ordem/pdfs/lista-de-compras.html)
* **Controle de Despensa:** Tabela de inventário de alimentos não perecíveis.
  * [Visualizar PDF](file:///c:/PROJETOS%20DIGITAIS/TAMARA/casa%20em%20ordem/pdfs/controle-despensa.pdf) | [Versão HTML](file:///c:/PROJETOS%20DIGITAIS/TAMARA/casa%20em%20ordem/pdfs/controle-despensa.html)
* **Controle do Freezer:** Controle visual de itens congelados com data de validade.
  * [Visualizar PDF](file:///c:/PROJETOS%20DIGITAIS/TAMARA/casa%20em%20ordem/pdfs/controle-freezer.pdf) | [Versão HTML](file:///c:/PROJETOS%20DIGITAIS/TAMARA/casa%20em%20ordem/pdfs/controle-freezer.html)

### 📅 Agendas e Planners
* **Agenda Diária:** Estruturação das horas e prioridades do dia.
  * [Visualizar PDF](file:///c:/PROJETOS%20DIGITAIS/TAMARA/casa%20em%20ordem/pdfs/agenda-diaria.pdf) | [Versão HTML](file:///c:/PROJETOS%20DIGITAIS/TAMARA/casa%20em%20ordem/pdfs/agenda-diaria.html)
* **Agenda Semanal:** Visão holística das obrigações da semana.
  * [Visualizar PDF](file:///c:/PROJETOS%20DIGITAIS/TAMARA/casa%20em%20ordem/pdfs/agenda-semanal.pdf) | [Versão HTML](file:///c:/PROJETOS%20DIGITAIS/TAMARA/casa%20em%20ordem/pdfs/agenda-semanal.html)
* **Agenda Mensal:** Planejamento em perspectiva macro.
  * [Visualizar PDF](file:///c:/PROJETOS%20DIGITAIS/TAMARA/casa%20em%20ordem/pdfs/agenda-mensal.pdf) | [Versão HTML](file:///c:/PROJETOS%20DIGITAIS/TAMARA/casa%20em%20ordem/pdfs/agenda-mensal.html)

### 🎯 Extras e Engajamento
* **Desafio dos 30 Dias:** Rotina de pequenas tarefas diárias para construção de novos hábitos.
  * [Visualizar PDF](file:///c:/PROJETOS%20DIGITAIS/TAMARA/casa%20em%20ordem/pdfs/desafio-30-dias.pdf) | [Versão HTML](file:///c:/PROJETOS%20DIGITAIS/TAMARA/casa%20em%20ordem/pdfs/desafio-30-dias.html)
* **Rotina do Pet:** Controle veterinário, alimentar e de cuidados de animais domésticos.
  * [Visualizar PDF](file:///c:/PROJETOS%20DIGITAIS/TAMARA/casa%20em%20ordem/pdfs/rotina-pet.pdf) | [Versão HTML](file:///c:/PROJETOS%20DIGITAIS/TAMARA/casa%20em%20ordem/pdfs/rotina-pet.html)
* **Manual Planner Organizer (Envolva a Família):** Guia sobre como engajar outros membros da residência na divisão de tarefas.
  * [Visualizar PDF](file:///c:/PROJETOS%20DIGITAIS/TAMARA/casa%20em%20ordem/pdfs/envolva-a-familia.pdf) | [Versão HTML](file:///c:/PROJETOS%20DIGITAIS/TAMARA/casa%20em%20ordem/pdfs/envolva-a-familia.html)
* **Kit de Etiquetas:** Modelos de identificação e classificação de potes e organizadores.
  * [Visualizar PDF](file:///c:/PROJETOS%20DIGITAIS/TAMARA/casa%20em%20ordem/pdfs/kit-de-etiquetas.pdf) | [Versão HTML](file:///c:/PROJETOS%20DIGITAIS/TAMARA/casa%20em%20ordem/pdfs/kit-de-etiquetas.html)

*(Nota: Os PDFs brutos originais e atualizados também estão salvos de forma redundante nos diretórios `/Casa em ordem` e `/PDFs atualizados`).*

---

## 💰 Modelo de Negócios e Venda

- **Preço de Tabela:** R$ 97,00
- **Preço Promocional Atual:** **R$ 49,90** à vista (ou em até 12x de R$ 5,16 no cartão de crédito).
- **Processamento de Checkout:** Gerido via **Kiwify** pelo link exclusivo: `https://pay.kiwify.com.br/JuDImie`.
- **Entrega do Produto:** 100% digital e imediata após aprovação do pagamento, direcionando o comprador para a Área Exclusiva (`/jornada-exclusiva-ceo2026/index.html`) e disparando e-mail de acesso.
- **Garantia:** Incondicional de 7 dias com reembolso total direto pela plataforma de vendas.

---

## 🗺️ Status Atual do Projeto (Ponto em que está)

O projeto está em **estágio operacional maduro** (Pronto para Tráfego Pago).

1. **Código e Interface:**
   - Páginas de vendas (`index.html`) e quiz de diagnóstico (`casa-em-ordem-quiz/index.html`) totalmente programadas em HTML/CSS sem frameworks externos, garantindo velocidade máxima de carregamento (essencial para campanhas de anúncios).
   - Área exclusiva (`jornada-exclusiva-ceo2026/index.html`) totalmente operável e interativa.
2. **Rastreamento:**
   - Pixel do Facebook implementado e disparando eventos corretos em todas as etapas da jornada (PageView -> ViewContent / Lead -> InitiateCheckout).
3. **Checkout:**
   - Integração com Kiwify funcionando e persistindo UTMs para rastrear e otimizar campanhas de tráfego.
4. **Materiais:**
   - Todos os 17 materiais compilados, salvos em formato PDF de alta resolução e convertidos em HTML para flexibilidade de download e renderização na área de membros.
5. **Criativos de Anúncios:**
   - Três imagens de criativos prontas para uso em anúncios pagos estão disponíveis no diretório `/criativos-ads` (`criativo-A-diagnostico.png`, `criativo-B-identificacao.png`, `criativo-C-promessa.png`).

---

## 🚀 Como Visualizar/Desenvolver Localmente

Por se tratar de um site estático, você não precisa instalar nenhuma dependência pesada ou executar banco de dados. 

1. **Usando a extensão Live Server (VS Code):**
   * Abra a pasta do projeto no VS Code.
   * Clique com o botão direito no arquivo `index.html` e selecione **Open with Live Server**.
2. **Usando Python localmente:**
   ```bash
   # Na pasta raiz do projeto, rode:
   python -m http.server 8000
   # Acesse no seu navegador: http://localhost:8000
   ```
3. **Usando Node/NPX:**
   ```bash
   # Na pasta raiz do projeto, rode:
   npx http-server . -p 8000
   # Acesse no seu navegador: http://localhost:8000
   ```
