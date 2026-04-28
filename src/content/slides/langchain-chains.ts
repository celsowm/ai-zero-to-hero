import { defineSlide } from './_factory';

export const langchainChains = defineSlide({
  id: 'langchain-chains',
  type: 'two-column',
  options: { columnRatios: [0.55, 0.45] },
  content: {
    'pt-br': {
      title: 'Chains & LCEL',
      body: `**LCEL** (LangChain Expression Language) é a forma de compor componentes usando o operador pipe (**\`|\`**).

### Chain simples

\`\`\`python
snippet:langchain/simple-chain
\`\`\`

### Chain composta

Você pode encadear chains dentro de outras chains:

\`\`\`python
snippet:langchain/composed-chain
\`\`\`

### RunnablePassthrough e RunnableLambda

Para manipular dados no meio do pipe:

\`\`\`python
snippet:langchain/runnable-passthrough
\`\`\`

> A grande vantagem do LCEL é que **tudo é Runnable** — qualquer componente pode ser encadeado com qualquer outro.`,
    },
    'en-us': {
      title: 'Chains & LCEL',
      body: `**LCEL** (LangChain Expression Language) is how you compose components using the pipe operator (**\`|\`**).

### Simple chain

\`\`\`python
snippet:langchain/simple-chain
\`\`\`

### Composed chain

You can chain chains inside other chains:

\`\`\`python
snippet:langchain/composed-chain
\`\`\`

### RunnablePassthrough and RunnableLambda

For manipulating data in the middle of the pipe:

\`\`\`python
snippet:langchain/runnable-passthrough
\`\`\`

> The big advantage of LCEL is that **everything is Runnable** — any component can be chained with any other.`,
    },
  },
  visual: {
    id: 'langchain-chains-visual',
    copy: {
      'pt-br': {
        title: 'LCEL: LangChain Expression Language',
        lcelLabel: 'Chain Simples',
        composeLabel: 'Chain Composta',
        simpleDesc: 'prompt | model | parser — entrada vira saída em um único pipe',
        composeDesc: 'chain_a | chain_b | combine — chains dentro de chains',
        pipeSymbol: '|',
        runLabel: '.invoke()',
        inputLabel: 'Input',
        outputLabel: 'Output',
      },
      'en-us': {
        title: 'LCEL: LangChain Expression Language',
        lcelLabel: 'Simple Chain',
        composeLabel: 'Composed Chain',
        simpleDesc: 'prompt | model | parser — input becomes output in a single pipe',
        composeDesc: 'chain_a | chain_b | combine — chains inside chains',
        pipeSymbol: '|',
        runLabel: '.invoke()',
        inputLabel: 'Input',
        outputLabel: 'Output',
      },
    },
  },
});
