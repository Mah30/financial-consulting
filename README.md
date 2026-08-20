# Poket Mentor

Aplicação web de planejamento financeiro pessoal construída com React,
TypeScript e inteligência artificial generativa. O Poket Mentor ajuda a pessoa
a avaliar se uma meta financeira é viável, entender seu orçamento e receber
orientações educativas adaptadas ao cenário informado.

> O conteúdo gerado possui caráter educativo e não substitui orientação
> financeira, jurídica, tributária ou de investimentos profissional.

## Objetivo do projeto

Responder de forma simples à pergunta:

> Com base na minha situação financeira atual, o que preciso fazer para atingir
> minha meta dentro do prazo desejado?

A aplicação transforma renda, despesas, dívidas, valor da meta e prazo em um
diagnóstico financeiro compreensível, com sugestões práticas, ideias de renda
extra, opções de investimento, plano de ação e acompanhamento por conversa com
IA.

## Funcionalidades

- Formulário guiado em seis etapas.
- Validação dos campos e máscara de valores monetários.
- Cálculo do saldo mensal disponível.
- Cálculo da economia mensal necessária para atingir a meta.
- Classificação local da viabilidade da meta.
- Diagnóstico personalizado gerado pelo Google Gemini.
- Estados de carregamento, erro e nova tentativa.
- Temas claro e escuro.
- Histórico de simulações salvo no navegador.
- Exclusão individual ou completa do histórico.
- Reabertura de resultados com os insights já gerados.
- Conversa contextual com um educador financeiro de IA.
- Persistência das perguntas e respostas por simulação.
- Layout responsivo para mobile, tablet e desktop.

## Fluxo principal da aplicação

1. A pessoa informa renda, custos fixos, dívidas, meta, custo e prazo.
2. A aplicação salva a simulação no `localStorage` com um identificador único.
3. O resultado calcula saldo disponível, economia necessária e viabilidade.
4. A função `/api/insight` envia o cenário ao Gemini e recebe o diagnóstico.
5. O diagnóstico é validado e salvo junto à simulação.
6. A pessoa pode consultar as simulações na página de histórico.
7. No resultado, ela pode fazer perguntas adicionais ao educador financeiro.
8. Cada nova pergunta envia à IA a simulação, o diagnóstico e a conversa
   anterior completa.
9. A nova interação é exibida, salva e recuperada quando a página é reaberta.

## Desafios implementados

### Desafio 1 — Histórico de simulações

- Página responsiva com resumo das simulações salvas.
- Exibição da meta, custo, prazo, economia necessária, data e viabilidade.
- Navegação para o resultado completo pelo identificador da simulação.
- Reutilização do insight já salvo, evitando uma nova chamada desnecessária à
  IA.
- Exclusão de uma simulação ou limpeza de todo o histórico.

### Desafio 2 — Conversando com o Educador Financeiro

- Campo de pergunta dentro do card de insight.
- Perguntas relacionadas à simulação atual.
- Respostas apresentadas como “Você” e “Resposta da IA”.
- Contexto formado pelos dados financeiros, diagnóstico e histórico completo.
- Quantidade de perguntas sem limite de turnos definido pela interface.
- Feedback de carregamento e mensagens de erro.
- Bloqueio de envios duplicados enquanto uma resposta está sendo gerada.
- Rolagem automática até a resposta mais recente.
- Histórico completo visível e persistido no `localStorage`.
- Restauração da conversa ao reabrir uma simulação.
- Endpoint serverless separado para proteger a chave do Gemini.

### Melhoria adicional — Responsividade

- O cabeçalho e os estilos globais foram ajustados para remover o overflow
  horizontal em telas estreitas.
- O layout foi conferido em 320, 360, 375, 390,
  768 e 1280 pixels, sem elementos ultrapassando a largura útil da página.

## Tecnologias utilizadas

| Tecnologia             | Finalidade                                         |
| ---------------------- | -------------------------------------------------- |
| React 19               | Construção da interface e dos componentes          |
| TypeScript             | Tipagem e segurança durante o desenvolvimento      |
| Vite                   | Servidor de desenvolvimento e build                |
| Tailwind CSS 4         | Estilização e responsividade                       |
| React Router           | Navegação entre formulário, resultado e histórico  |
| Google Gemini          | Diagnóstico e conversa financeira contextual       |
| Netlify Functions      | Integração segura entre navegador e Gemini         |
| localStorage           | Persistência local de tema, simulações e conversas |
| Lucide React           | Ícones da interface                                |
| React Loading Skeleton | Feedback visual durante o diagnóstico              |
| Vitest                 | Testes automatizados                               |
| ESLint e Prettier      | Qualidade e padronização do código                 |

## Estrutura de pastas

```text
poket-mentor/
├── docs/
│   └── business-rules.md              # Regras de negócio do produto
├── netlify/
│   └── functions/
│       ├── conversation.mts           # Endpoint da conversa com a IA
│       └── insight.mts                # Endpoint do diagnóstico inicial
├── public/
│   ├── favicon.svg                    # Ícone da aplicação
│   └── icons.svg                      # Sprite de ícones SVG
├── src/
│   ├── assets/
│   │   └── images/                    # Imagens utilizadas pela interface
│   ├── components/
│   │   ├── features/
│   │   │   ├── Insights/              # Estados e conteúdo do diagnóstico
│   │   │   ├── Simulation/            # Formulário guiado em etapas
│   │   │   └── SimulationResults/     # Cards e conversa do resultado
│   │   ├── layout/                    # Estrutura compartilhada das páginas
│   │   └── shared/                    # Botões, inputs e elementos reutilizáveis
│   ├── context/
│   │   └── theme/                     # Contexto e provider de tema
│   ├── data/
│   │   ├── aiPrompt.ts                # Prompt do diagnóstico estruturado
│   │   ├── conversation.ts            # Tipos e validação dos turnos
│   │   ├── conversationPrompt.ts      # Prompt da conversa contextual
│   │   ├── insight.ts                 # Tipo, schema e validação do insight
│   │   ├── simulation.ts              # Campos e textos do formulário
│   │   └── simulationTypes.ts         # Tipos dos dados financeiros
│   ├── hooks/
│   │   ├── useConversation.tsx        # Estado e persistência da conversa
│   │   ├── useInsight.tsx             # Geração e cache do diagnóstico
│   │   ├── useSimulationStorage.tsx   # Operações com o localStorage
│   │   └── useTheme.tsx               # Acesso ao contexto de tema
│   ├── pages/
│   │   ├── NotFoundPage.tsx           # Página para rotas inexistentes
│   │   ├── SimulationFormPage.tsx     # Página inicial do formulário
│   │   ├── SimulationHistoryPage.tsx  # Histórico das simulações
│   │   └── SimulationResultsPage.tsx  # Resultado financeiro completo
│   ├── services/
│   │   └── aiService.ts               # Cliente dos endpoints serverless
│   ├── styles/
│   │   └── theme.css                  # Tokens dos temas claro e escuro
│   ├── utils/
│   │   ├── currency.ts                # Conversão e formatação monetária
│   │   ├── simulation.ts              # Cálculos e viabilidade financeira
│   │   └── validation.ts              # Validação dos campos
│   ├── App.tsx                        # Componente raiz
│   ├── index.css                      # Estilos globais
│   ├── main.tsx                       # Ponto de entrada do React
│   └── router.tsx                     # Definição das rotas
├── vite/
│   └── insightFunctionDev.ts          # Functions executadas no Vite local
├── eslint.config.js                   # Configuração do ESLint
├── netlify.toml                       # Build, Functions e redirects da Netlify
├── package.json                       # Scripts, versões e dependências
├── tsconfig.app.json                  # TypeScript da aplicação React
├── tsconfig.functions.json            # TypeScript das Netlify Functions
├── tsconfig.node.json                 # TypeScript das ferramentas Node/Vite
└── vite.config.ts                     # Configuração do Vite e Tailwind
```

Os arquivos `*.test.ts` ficam próximos do código testado nas pastas `hooks`,
`services` e `utils`, facilitando localizar a implementação e sua respectiva
cobertura.

## Dependências do projeto

### Dependências de produção

São pacotes utilizados diretamente pela aplicação entregue ao usuário.

| Pacote                   | Versão    | Finalidade                                      |
| ------------------------ | --------- | ----------------------------------------------- |
| `@fontsource/inter`      | `^5.2.8`  | Fonte Inter hospedada junto com a aplicação     |
| `lucide-react`           | `^1.23.0` | Ícones SVG utilizados nos componentes           |
| `react`                  | `^19.2.7` | Construção da interface                         |
| `react-dom`              | `^19.2.7` | Renderização dos componentes no navegador       |
| `react-loading-skeleton` | `^3.5.0`  | Skeleton exibido durante o carregamento da IA   |
| `react-router-dom`       | `^7.11.0` | Rotas do formulário, resultado, histórico e 404 |

### Dependências de desenvolvimento

São utilizadas para desenvolvimento, tipagem, testes, qualidade do código,
build e integração serverless.

| Pacote                        | Versão     | Finalidade                                   |
| ----------------------------- | ---------- | -------------------------------------------- |
| `@eslint/js`                  | `^10.0.1`  | Regras básicas do ESLint para JavaScript     |
| `@netlify/functions`          | `^5.3.0`   | Tipos e configuração das Functions           |
| `@tailwindcss/vite`           | `^4.3.1`   | Integração do Tailwind CSS com o Vite        |
| `@types/node`                 | `^22.20.0` | Tipos das APIs do Node.js                    |
| `@types/react`                | `^19.2.17` | Tipos do React                               |
| `@types/react-dom`            | `^19.2.3`  | Tipos do React DOM                           |
| `@vitejs/plugin-react`        | `^6.0.3`   | JSX e Fast Refresh no Vite                   |
| `eslint`                      | `^10.5.0`  | Análise estática do código                   |
| `eslint-config-prettier`      | `^10.1.8`  | Evita conflitos entre ESLint e Prettier      |
| `eslint-plugin-react-hooks`   | `^7.1.1`   | Regras para uso correto dos hooks            |
| `eslint-plugin-react-refresh` | `^0.5.3`   | Regras relacionadas ao Fast Refresh          |
| `globals`                     | `^17.7.0`  | Definições de variáveis globais por ambiente |
| `prettier`                    | `^3.8.4`   | Formatação automática                        |
| `prettier-plugin-tailwindcss` | `^0.8.0`   | Ordenação das classes do Tailwind            |
| `tailwindcss`                 | `^4.3.1`   | Geração dos estilos utilitários              |
| `typescript`                  | `^6.0.3`   | Tipagem estática e verificação da compilação |
| `typescript-eslint`           | `^8.62.0`  | Integração entre TypeScript e ESLint         |
| `vite`                        | `^8.1.0`   | Servidor local e build de produção           |
| `vitest`                      | `^4.1.11`  | Execução dos testes automatizados            |

## Arquivos principais para revisão

| Arquivo                                                        | Responsabilidade                            |
| -------------------------------------------------------------- | ------------------------------------------- |
| `src/components/features/Simulation/Form.tsx`                  | Fluxo do formulário em etapas               |
| `src/pages/SimulationResultsPage.tsx`                          | Resumo e resultado da simulação             |
| `src/pages/SimulationHistoryPage.tsx`                          | Histórico, detalhes e exclusões             |
| `src/components/features/SimulationResults/AIConversation.tsx` | Interface da conversa com a IA              |
| `src/hooks/useInsight.tsx`                                     | Estado e persistência do diagnóstico        |
| `src/hooks/useConversation.tsx`                                | Estado, envio e persistência da conversa    |
| `src/hooks/useSimulationStorage.tsx`                           | Leitura e escrita das simulações            |
| `src/data/aiPrompt.ts`                                         | Prompt do diagnóstico inicial               |
| `src/data/conversationPrompt.ts`                               | Prompt com o histórico completo da conversa |
| `src/services/aiService.ts`                                    | Chamadas do navegador para as funções       |
| `netlify/functions/insight.mts`                                | Função serverless do diagnóstico            |
| `netlify/functions/conversation.mts`                           | Função serverless das perguntas posteriores |
| `src/utils/simulation.ts`                                      | Cálculos financeiros e viabilidade          |

## Arquitetura e decisões técnicas

### Separação de responsabilidades

O projeto separa a integração com IA em camadas para que a interface não
conheça a chave da API nem os detalhes do Gemini:

1. Os componentes exibem formulário, diagnóstico e conversa.
2. Os hooks controlam carregamento, erros, cache e persistência.
3. `aiService.ts` faz as requisições para `/api/insight` e
   `/api/conversation`.
4. As Netlify Functions validam os dados, montam os prompts e chamam o Gemini.
5. Os validadores conferem as respostas antes que elas sejam usadas pela
   interface ou armazenadas.

Essa divisão mantém apresentação, estado, comunicação HTTP, regras de negócio
e acesso à API em responsabilidades distintas.

### Diagnóstico e conversa usam prompts diferentes

O diagnóstico inicial e as perguntas posteriores possuem necessidades
diferentes:

- `buildAIPrompt` recebe os dados financeiros e exige um JSON estruturado com
  viabilidade, diagnóstico, sugestões, renda extra, investimentos, plano de
  ação e motivação.
- `buildConversationPrompt` recebe a simulação, o diagnóstico inicial, toda a
  conversa anterior e a nova pergunta, retornando texto natural.

Manter os prompts separados evita misturar o contrato rígido do diagnóstico
com a resposta conversacional. A classificação de viabilidade é calculada pelo
aplicativo e recalculada no servidor; a IA explica o cenário, mas não substitui
essa regra determinística.

### Modelo e persistência da conversa

Cada interação é representada por um `ConversationTurn`, contendo identificador,
pergunta, resposta e data de criação. A conversa pertence à respectiva
simulação:

```ts
interface ConversationTurn {
  id: string
  question: string
  answer: string
  createdAt: string
}
```

Ao enviar uma pergunta, o sistema reúne os seis campos da simulação, o insight
inicial, todo o histórico válido e a nova pergunta. A resposta forma um novo
turno, é exibida e salva junto à simulação no `localStorage`.

O conteúdo recuperado do navegador não é considerado confiável automaticamente.
Simulações, insights e turnos são validados em tempo de execução; registros
antigos ou parcialmente inválidos não devem derrubar a aplicação.

### Desenvolvimento local e produção

Durante `npm run dev`, um middleware do Vite encaminha `/api/insight` e
`/api/conversation` para os mesmos handlers existentes em
`netlify/functions`. Na Netlify, esses handlers são publicados como funções
serverless. Assim, desenvolvimento e produção compartilham prompts, validações
e tratamento de erros.

### Proteções da integração com IA

- A chave fica somente no ambiente do servidor.
- Perguntas, simulações, insights e histórico são validados antes da chamada.
- As requisições possuem limite de tamanho e timeout.
- As funções aceitam apenas `POST`.
- Há limite de requisições por IP e domínio.
- Respostas vazias, incompletas ou em formato inesperado são rejeitadas.
- O prompt conversacional orienta a IA a ignorar tentativas de alterar seu papel
  ou apagar o contexto.

### Decisões de interface e responsividade

- O envio é bloqueado enquanto existe uma pergunta pendente, evitando chamadas
  duplicadas.
- Estados de carregamento usam `role="status"` e erros usam `role="alert"`.
- A conversa rola automaticamente quando um novo turno é concluído.
- Em telas estreitas, o cabeçalho reduz espaçamentos e pode ocultar o texto da
  marca, preservando todas as ações.
- O layout usa `min-height: 100dvh`, com fallback para `100vh`, evitando o
  overflow horizontal que pode surgir ao forçar `width: 100%` no `body`.

### Regressões protegidas por testes

Além dos cálculos e validações, os testes verificam que o contexto completo é
enviado à conversa, que respostas externas são validadas, que a função
serverless preserva a classificação calculada e que conversas continuam
associadas à simulação correta no armazenamento local.

## Como executar

### Requisitos

- Node.js 22.23.1 ou superior e inferior à versão 24.
- npm 10.9.8 ou superior.
- Uma chave de API do Google Gemini.

### Instalação

1. Clone o repositório e entre na pasta do projeto.
2. Instale as dependências:

   ```bash
   npm install
   ```

3. Crie um arquivo `.env` na raiz:

   ```env
   GEMINI_API_KEY=sua_chave_do_google_gemini
   ```

4. Inicie a aplicação:

   ```bash
   npm run dev
   ```

5. Abra o endereço exibido pelo Vite no navegador.

Nunca use o prefixo `VITE_` para a chave em produção. Variáveis com esse
prefixo podem ser incluídas no bundle enviado ao navegador.

## Como testar o fluxo principal

1. Crie uma simulação preenchendo as seis etapas.
2. Confirme os valores apresentados na página de resultado.
3. Aguarde o diagnóstico personalizado da IA.
4. Faça uma pergunta no campo “Converse com o Educador Financeiro”.
5. Faça uma segunda pergunta que dependa da primeira resposta para conferir a
   continuidade do contexto.
6. Recarregue a página e confirme que diagnóstico e conversa permanecem.
7. Abra “Histórico” e acesse novamente a simulação.
8. Exclua uma simulação de teste e confirme sua remoção.
9. Confira os temas claro e escuro e as versões mobile e desktop.

## Verificações automatizadas

```bash
npm run format:check
npm run lint
npm test
npm run build
```

Os testes cobrem cálculos e validações, armazenamento das simulações,
persistência da conversa, validação das respostas do Gemini e funções
serverless.

## Segurança e persistência

- A chave do Gemini permanece nas funções serverless e não é enviada ao
  navegador.
- As funções validam os campos antes de chamar a API externa.
- Há timeout, limite de tamanho da requisição e rate limit por IP/domínio.
- O servidor recalcula a classificação de viabilidade em vez de confiar na
  resposta da IA.
- Simulações, insights e conversas ficam no `localStorage` do navegador.
- A aplicação não envia dados para um banco próprio.

## Publicação na Netlify

1. Envie o repositório para o GitHub e importe-o na Netlify.
2. A configuração de build será lida do `netlify.toml`.
3. Em **Project configuration → Environment variables**, crie
   `GEMINI_API_KEY` com escopo que inclua **Functions**.
4. Opcionalmente, configure `GEMINI_MODEL` para trocar o modelo padrão.
5. Inicie um novo deploy.

O build gera o diretório `dist`, e as funções ficam em `netlify/functions`.

## Evolução e melhorias implementadas

O projeto começou como uma SPA com formulário, cálculo financeiro básico e uma
chamada direta para a IA. A partir dessa base, foram feitas melhorias de
arquitetura, segurança, confiabilidade, experiência de uso e preparação para
produção.

### Integração com Gemini e segurança da chave

- A chamada ao Gemini deixou de depender do navegador e passou a acontecer em
  Netlify Functions.
- A chave foi retirada do bundle público e passou a ser lida como
  `GEMINI_API_KEY` exclusivamente no servidor.
- O frontend passou a consumir endpoints internos (`/api/insight` e
  `/api/conversation`) sem conhecer provedor, chave ou URL externa.
- As funções aceitam somente `POST`, limitam o tamanho do corpo, aplicam timeout
  e rate limit e retornam mensagens adequadas para limite de uso,
  indisponibilidade e falhas externas.
- O desenvolvimento local passou a executar os mesmos handlers serverless por
  meio do middleware do Vite, reduzindo diferenças entre ambiente local e
  produção.

### Respostas da IA mais previsíveis

- O prompt foi reestruturado com papel, tom, regras, cálculos e formato de saída
  explícitos.
- Foi criado um schema para exigir que o diagnóstico contenha todas as seções
  esperadas.
- A resposta recebida é convertida e validada em tempo de execução antes de
  chegar à interface.
- Respostas vazias, JSON inválido ou conteúdo incompleto são tratados como erro
  em vez de quebrar a página.
- A viabilidade financeira permanece uma regra do aplicativo: ela é calculada
  localmente e recalculada pela função, sem confiar na classificação sugerida
  pela IA.
- A renderização dos textos foi ajustada para exibir destaques com segurança,
  sem inserir HTML arbitrário retornado pelo modelo.

### Regras financeiras e validação do formulário

- Os tipos da simulação foram separados dos dados visuais do formulário,
  permitindo reutilização segura no frontend e nas Functions.
- Os cálculos de saldo disponível, economia mensal necessária e viabilidade
  foram centralizados em funções puras.
- Cada etapa passou a validar seu campo antes de avançar.
- Valores monetários, prazo e textos obrigatórios recebem validações específicas.
- Entradas inválidas também são rejeitadas novamente no servidor antes de
  qualquer chamada ao Gemini.

### Histórico e persistência mais robustos

- O armazenamento deixou de representar somente a última resposta e passou a
  manter uma coleção de simulações identificadas por `crypto.randomUUID()`.
- Cada registro guarda data de criação, dados financeiros, diagnóstico e
  conversa correspondente.
- O insight gerado é armazenado junto à simulação e reutilizado ao reabrir o
  resultado, evitando uma nova chamada desnecessária à API.
- Foi criada uma página de histórico com resumo financeiro, navegação para os
  detalhes, exclusão individual e limpeza completa.
- Leituras do `localStorage` agora tratam JSON corrompido, estruturas antigas e
  registros incompletos sem interromper a aplicação.
- A atualização preserva os demais dados do registro, evitando apagar insight
  ou conversa ao salvar uma nova informação.

### Conversa contextual com o educador financeiro

- Foi acrescentada uma segunda experiência de IA para perguntas posteriores ao
  diagnóstico.
- Cada requisição reúne simulação, diagnóstico inicial, histórico completo e
  nova pergunta, permitindo continuidade entre os turnos.
- O prompt conversacional foi separado do prompt estruturado e inclui limites
  de atuação, linguagem educativa e proteção contra instruções que tentem mudar
  o papel da IA.
- Perguntas e respostas são persistidas por simulação e restauradas após
  recarregar ou reabrir a página.
- A interface bloqueia envio duplicado, informa carregamento e erro e rola
  automaticamente até a resposta mais recente.

### Navegação, interface e acessibilidade

- As rotas foram organizadas para formulário, resultado e histórico.
- Foi adicionada uma página 404 para endereços inexistentes e simulações não
  encontradas passaram a ter tratamento explícito.
- Foram aprimorados rótulos, mensagens de validação, estados desabilitados e
  feedback de nova tentativa.
- Elementos de status e erro receberam semântica acessível para tecnologias
  assistivas.
- O tema claro/escuro continua persistido e sua leitura foi protegida contra
  valores inválidos.
- Componentes compartilhados foram ajustados para aceitar estilos e estados de
  forma mais consistente.

### Responsividade

- Foi removida a causa do overflow horizontal global, em vez de apenas ocultar
  seu efeito.
- A altura mínima passou a considerar `100dvh`, melhorando a ocupação da tela em
  navegadores mobile.
- O cabeçalho recebeu espaçamentos e comportamento específicos para telas
  estreitas, mantendo as ações acessíveis.
- O fluxo foi conferido em larguras de 320, 360, 375, 390, 768 e 1280 pixels.

### Qualidade, testes e manutenção

- Foram adicionados testes para cálculos financeiros e classificação de
  viabilidade.
- As regras de validação do formulário ganharam cobertura automatizada.
- O armazenamento é testado para criação, atualização, exclusão, cache do
  insight e persistência da conversa.
- Os serviços são testados para respostas válidas, incompletas e erros HTTP.
- As Functions são testadas com a chamada ao Gemini simulada, incluindo schema,
  contexto conversacional e classificação calculada pelo servidor.
- TypeScript, ESLint, Prettier e configurações separadas de frontend, Vite e
  Functions passaram a compor a verificação do projeto.
- Foi adicionada uma página de documentação das regras de negócio e o README
  passou a registrar execução, arquitetura, segurança, testes e publicação.

### Preparação para produção

- O `netlify.toml` define comando de build, pasta publicada, diretório das
  Functions e fallback de rotas da SPA.
- O build de produção gera o frontend em `dist` e empacota as funções com
  `esbuild` na Netlify.
- `.env`, artefatos de build e arquivos temporários do TypeScript ficam fora do
  repositório.
- A versão esperada do Node e os comandos de instalação, desenvolvimento,
  validação e deploy foram documentados.

## Aprendizados durante o desafio

- Separar componentes, hooks, serviços, prompts e funções serverless facilita a
  manutenção.
- O histórico completo é essencial para uma IA manter o contexto entre
  perguntas.
- Dados do `localStorage` também precisam de validação em tempo de execução.
- Chaves privadas não devem usar variáveis expostas pelo Vite.
- Estados de carregamento e erro fazem parte do fluxo principal.
- Responsividade deve ser verificada em diferentes larguras reais.
- Testes automatizados e testes visuais encontram tipos diferentes de problema.

## Design

O layout original está disponível no
[Figma do Educador Financeiro — DIO](https://www.figma.com/design/MVZhmZxoVAsgotZo50gj6M/Educador-Financeiro---DIO?node-id=29-403&t=Cv4vW38VUtwwLO3Z-1).

## Licença e finalidade

Projeto desenvolvido para fins educacionais como parte de um desafio prático
de React e inteligência artificial generativa.
