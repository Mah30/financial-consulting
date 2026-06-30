# Business Rules - Poket Mentor (English and Portuguese)

## English

### 1. Product Overview

Poket Mentor is a personal financial planning web application that helps users understand whether a financial goal is realistic based on their current monthly income, essential expenses, debts, and desired timeline.

The application acts as an AI-powered financial mentor. It collects financial information through a form and uses Google Gemini to generate a personalized financial diagnosis, practical recommendations, extra income ideas, and an action plan to help the user move toward their goal.

The application should behave as a digital financial educator, offering educational guidance and planning support without replacing professional financial advice.

### 2. Main Objective

The main objective of the application is to help users answer the following question:

"Based on my current financial situation, what do I need to do to achieve my financial goal within the desired time?"

Examples of financial goals include:

- Taking a dream trip.
- Buying a material good.
- Building an emergency fund.
- Paying for a course, event, or personal project.
- Saving money for a specific life plan.

### 3. User Input Flow

The user must fill out a financial simulation form with the following information:

1. Monthly gross income: the total amount of money the user receives every month.
2. Essential monthly expenses: expenses required for basic living, such as rent, bills, food, transport, health, and other fixed needs.
3. Monthly debts or installments: the amount currently committed to loans, credit card installments, financing, or other pending payments.
4. Financial goal: the objective the user wants to achieve.
5. Goal cost: the estimated amount of money required to achieve the goal.
6. Desired timeline: the number of months in which the user plans to achieve the goal.

The form should be presented in steps to make the experience simpler, more guided, and less tiring for the user.

After filling out the form, the user clicks the "Generate Simulation" button.

### 4. Financial Calculation Rules

The application should calculate the user's basic financial scenario before requesting the AI analysis.

The core calculations are:

- Available monthly balance = monthly gross income - essential monthly expenses - monthly debts/installments.
- Required monthly saving = goal cost / desired timeline in months.
- Goal viability = comparison between available monthly balance and required monthly saving.

The application should classify the goal as:

- Viable: when the available monthly balance is equal to or greater than the required monthly saving.
- Partially viable: when the available monthly balance is positive but lower than the required monthly saving.
- Not viable under current conditions: when the available monthly balance is zero or negative.

These calculations should be included in the data sent to the AI so the generated diagnosis is based on both the user's raw answers and the app's financial summary.

### 5. AI Analysis Rules

The application must use the Google Gemini API to generate the financial analysis.

The AI should receive the following information:

- All user-filled form data.
- Calculated available monthly balance.
- Calculated required monthly saving.
- Goal viability classification.

The AI response should generate:

- A personalized financial diagnosis.
- An explanation of whether the goal is viable within the desired timeline.
- Practical suggestions to reduce expenses or improve money organization.
- Practical ideas to increase income.
- A step-by-step action plan.
- A final motivational message.

The AI should use simple, clear, supportive, and non-judgmental language.

### 6. Simulation Result Rules

After the simulation is generated, the user should see a complete result screen containing:

- The data filled in the form.
- A summary of the user's current financial situation.
- The calculated monthly amount needed to reach the goal.
- The goal viability diagnosis.
- AI-generated insights.
- Practical suggestions.
- Extra income ideas.
- A clear action plan.
- A final message.

The result must feel personal and useful, not generic.

### 7. Technical Scope

The application must run entirely in the browser.

There should be no custom backend or private server API in the initial version.

Data should be saved in `localStorage` to simplify persistence and integration during development.

The Google Gemini API will be used directly from the frontend for AI-generated analysis.

Important note: because API keys exposed in the browser are not fully private, this approach is acceptable for development, prototypes, and study purposes. For production, the application should later use a secure backend or serverless function to protect sensitive credentials.

### 8. Data Persistence Rules

The application should use `localStorage` to store:

- The latest form data.
- The latest generated simulation result.
- The selected theme preference.
- Simulation history in a future version.

The user should be able to refresh the page without immediately losing the most recent simulation data.

### 9. Theme and Responsiveness Rules

The application must support:

- Light theme.
- Dark theme.
- Responsive layout for mobile, tablet, and desktop.

The interface should be simple, accessible, and easy to use for people who may not have advanced financial knowledge.

### 10. Simulation History

The application should include a simulation history feature in a future version.

The history may store previous simulations so users can compare:

- Different financial goals.
- Different timelines.
- Different income and expense scenarios.
- Progression of their planning over time.

This feature is planned but does not need to be fully defined or implemented in the first version.

### 11. Business Constraints

The application should not present itself as a certified financial advisor.

The AI-generated content should be treated as educational guidance and planning support, not as professional financial, legal, tax, or investment advice.

The app should avoid promising guaranteed results.

The app should encourage responsible financial planning and realistic goal setting.

### 12. Initial MVP Scope

The first version of the application should include:

- Financial simulation form.
- Basic financial calculations.
- Google Gemini integration.
- AI-generated financial diagnosis.
- Simulation result screen.
- `localStorage` persistence.
- Light and dark theme.
- Responsive design.

The simulation history can be implemented after the main flow is working well.

---

# Regras de Negocio - Poket Mentor

## Portugues

### 1. Visao Geral do Produto

Poket Mentor e uma aplicacao web de planejamento financeiro pessoal que ajuda o usuario a entender se uma meta financeira e realista com base em sua renda mensal, gastos essenciais, dividas e prazo desejado.

A aplicacao funciona como um mentor financeiro com inteligencia artificial. Ela coleta informacoes financeiras por meio de um formulario e usa o Google Gemini para gerar um diagnostico personalizado, recomendacoes praticas, ideias de renda extra e um plano de acao para ajudar o usuario a se aproximar do seu objetivo.

A aplicacao deve se comportar como um educador financeiro digital, oferecendo orientacao educativa e apoio ao planejamento sem substituir uma consultoria financeira profissional.

### 2. Objetivo Principal

O principal objetivo da aplicacao é ajudar o usuario a responder a seguinte pergunta:

"Com base na minha situacao financeira atual, o que eu preciso fazer para alcancar minha meta financeira dentro do prazo desejado?"

Exemplos de metas financeiras:

- Fazer uma viagem dos sonhos.
- Comprar um bem material.
- Criar uma reserva de emergencia.
- Pagar um curso, evento ou projeto pessoal.
- Guardar dinheiro para um plano de vida especifico.

### 3. Fluxo de Entrada do Usuario

O usuario deve preencher um formulario de simulacao financeira com as seguintes informacoes:

1. Renda mensal bruta: o valor total que o usuario recebe todos os meses.
2. Gastos essenciais mensais: despesas necessarias para a vida basica, como aluguel, contas, alimentacao, transporte, saude e outros custos fixos.
3. Dividas ou parcelas mensais: valor atualmente comprometido com emprestimos, parcelas de cartao, financiamentos ou outros pagamentos pendentes.
4. Objetivo financeiro: o objetivo que o usuario deseja alcancar.
5. Custo da meta: o valor estimado necessario para realizar esse objetivo.
6. Prazo desejado: em quantos meses o usuario planeja atingir a meta.

O formulario deve ser apresentado em etapas para tornar a experiencia mais simples, guiada e menos cansativa para o usuario.

Depois de preencher o formulario, o usuario clica no botao "Gerar Simulacao".

### 4. Regras de Calculo Financeiro

A aplicacao deve calcular o cenario financeiro basico do usuario antes de solicitar a analise da IA.

Os calculos principais sao:

- Saldo mensal disponivel = renda mensal bruta - gastos essenciais mensais - dividas/parcelas mensais.
- Valor mensal necessario para a meta = custo da meta / prazo desejado em meses.
- Viabilidade da meta = comparacao entre o saldo mensal disponivel e o valor mensal necessario.

A aplicacao deve classificar a meta como:

- Viavel: quando o saldo mensal disponivel e igual ou maior que o valor mensal necessario.
- Parcialmente viavel: quando o saldo mensal disponivel e positivo, mas menor que o valor mensal necessario.
- Nao viavel nas condicoes atuais: quando o saldo mensal disponivel e zero ou negativo.

Esses calculos devem ser enviados para a IA junto com os dados preenchidos pelo usuario, para que o diagnostico seja baseado tanto nas respostas quanto no resumo financeiro calculado pela aplicacao.

### 5. Regras da Analise com IA

A aplicacao deve usar a API do Google Gemini para gerar a analise financeira.

A IA deve receber as seguintes informacoes:

- Todos os dados preenchidos no formulario.
- Saldo mensal disponivel calculado.
- Valor mensal necessario para atingir a meta.
- Classificacao de viabilidade da meta.

A resposta da IA deve gerar:

- Um diagnostico financeiro personalizado.
- Uma explicacao sobre a viabilidade da meta dentro do prazo desejado.
- Sugestoes praticas para reduzir gastos ou melhorar a organizacao financeira.
- Ideias praticas para aumentar a renda.
- Um plano de acao passo a passo.
- Uma mensagem final motivacional.

A IA deve usar uma linguagem simples, clara, acolhedora e sem julgamento.

### 6. Regras do Resultado da Simulacao

Depois que a simulacao for gerada, o usuario deve ver uma tela completa de resultado contendo:

- Os dados preenchidos no formulario.
- Um resumo da situacao financeira atual.
- O valor mensal calculado necessario para atingir a meta.
- O diagnostico de viabilidade da meta.
- Insights gerados pela IA.
- Sugestoes praticas.
- Ideias de renda extra.
- Um plano de ação claro.
- Uma mensagem final.

O resultado deve parecer pessoal e util, nao generico.

### 7. Escopo Tecnico

A aplicacao deve funcionar totalmente pelo navegador.

Nao deve haver backend proprio ou API privada no escopo inicial.

Os dados devem ser salvos no `localStorage` para facilitar a persistencia e a integracao durante o desenvolvimento.

A API do Google Gemini sera usada diretamente no frontend para gerar as analises com IA.

Observacao importante: como chaves de API expostas no navegador nao sao totalmente privadas, essa abordagem e aceitavel para desenvolvimento, prototipos e estudos. Para producao, a aplicacao deve futuramente usar um backend seguro ou uma funcao serverless para proteger credenciais sensiveis.

### 8. Regras de Persistencia de Dados

A aplicacao deve usar `localStorage` para armazenar:

- Os dados mais recentes do formulario.
- O ultimo resultado de simulacao gerado.
- A preferencia de tema escolhida.
- O historico de simulacoes em uma versao futura.

O usuario deve poder atualizar a pagina sem perder imediatamente os dados da simulacao mais recente.

### 9. Regras de Tema e Responsividade

A aplicacao deve oferecer:

- Tema claro.
- Tema escuro.
- Layout responsivo para celular, tablet e desktop.

A interface deve ser simples, acessivel e facil de usar, inclusive para pessoas que nao possuem conhecimento financeiro avancado.

### 10. Historico de Simulacoes

A aplicacao deve incluir um recurso de historico de simulacoes em uma versao futura.

O historico podera armazenar simulacoes anteriores para que o usuario compare:

- Diferentes objetivos financeiros.
- Diferentes prazos.
- Diferentes cenarios de renda e gastos.
- A evolucao do seu planejamento ao longo do tempo.

Esse recurso esta planejado, mas nao precisa ser totalmente definido ou implementado na primeira versao.

### 11. Restricoes de Negocio

A aplicacao nao deve se apresentar como consultoria financeira certificada.

O conteudo gerado pela IA deve ser tratado como orientacao educacional e apoio ao planejamento, nao como aconselhamento profissional financeiro, juridico, tributario ou de investimento.

O app deve evitar prometer resultados garantidos.

O app deve incentivar planejamento financeiro responsavel e definicao realista de metas.

### 12. Escopo Inicial do MVP

A primeira versao da aplicacao deve incluir:

- Formulario de simulacao financeira.
- Calculos financeiros basicos.
- Integracao com Google Gemini.
- Diagnostico financeiro gerado por IA.
- Tela de resultado da simulacao.
- Persistencia com `localStorage`.
- Tema claro e escuro.
- Design responsivo.

O historico de simulacoes pode ser implementado depois que o fluxo principal estiver funcionando bem.
