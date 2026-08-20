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

O cabeçalho e os estilos globais foram ajustados para remover o overflow
horizontal em telas estreitas. O layout foi conferido em 320, 360, 375, 390,
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

O registro didático detalhado, com comparações de código antes e depois, está
em [`docs/lerning-code.md`](docs/lerning-code.md).

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

## Melhorias implementadas

- Histórico completo de simulações em vez de apenas o último formulário.
- Cache do insight dentro da própria simulação.
- Exclusão segura de registros do histórico.
- Conversa contínua e contextual por simulação.
- Persistência e recuperação das conversas.
- Separação entre diagnóstico estruturado e respostas conversacionais.
- Validação das respostas e dos dados recuperados do `localStorage`.
- Proteção da chave do Gemini por funções serverless.
- Tratamento de timeout, indisponibilidade e excesso de requisições.
- Formatação segura de destaques retornados pela IA.
- Correção do overflow horizontal no mobile.
- Testes adicionais para contexto da conversa e persistência.

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
