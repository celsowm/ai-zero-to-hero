import { defineSlide } from './_factory';

export const toolCallingWhy = defineSlide({
  id: 'tool-calling-why',
  type: 'two-column',
  options: { columnRatios: [0.5, 0.5] },
  content: {
    'pt-br': {
      title: 'Por que Tool Calling?',
      body: `Até agora, os modelos que vimos são **geradores de texto**: recebem um prompt e retornam texto. Isso é poderoso, mas **limitado**.

### O problema dos LLMs "puros"

1. **Não acessam dados externos** — não sabem a hora atual, clima, preços de ações
2. **Não executam cálculos** — 237 × 891 = ? (muitos erram)
3. **Não interagem com sistemas** — não criam tickets, enviam emails, queryam bancos
4. **Conhecimento congelado** — dados de treino têm data de corte

### O salto: Tool Calling

Tool Calling permite que o LLM **solicite a execução de ferramentas externas** e use os resultados para formular sua resposta final.

> O modelo não executa a ferramenta — ele **decide qual ferramenta usar** e **como**. O runtime executa e devolve o resultado.`,
    },
    'en-us': {
      title: 'Why Tool Calling?',
      body: `So far, the models we've seen are **text generators**: they receive a prompt and return text. This is powerful, but **limited**.

### The problem with "pure" LLMs

1. **Cannot access external data** — don't know the current time, weather, stock prices
2. **Cannot perform calculations** — 237 × 891 = ? (many get it wrong)
3. **Cannot interact with systems** — can't create tickets, send emails, query databases
4. **Frozen knowledge** — training data has a cutoff date

### The leap: Tool Calling

Tool Calling allows the LLM to **request execution of external tools** and use the results to formulate its final answer.

> The model doesn't execute the tool — it **decides which tool to use** and **how**. The runtime executes and returns the result.`,
    },
  },
  visual: {
    id: 'tool-calling-why-visual',
    copy: {
      'pt-br': {
        beforeLabel: 'LLM Puro',
        afterLabel: 'LLM + Tool Calling',
        limitLabel: 'Apenas texto',
        powerLabel: 'Texto + Ações',
        limitDesc: 'Gera respostas baseadas apenas no treino',
        powerDesc: 'Consulta APIs, executa código, interage com sistemas',
      },
      'en-us': {
        beforeLabel: 'Pure LLM',
        afterLabel: 'LLM + Tool Calling',
        limitLabel: 'Text only',
        powerLabel: 'Text + Actions',
        limitDesc: 'Generates answers based only on training',
        powerDesc: 'Queries APIs, runs code, interacts with systems',
      },
    },
  },
});
