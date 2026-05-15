import { defineSlide } from './_factory';

export const langchainCoreConcepts = defineSlide({
  id: 'langchain-core-concepts',
  type: 'two-column',
  options: { columnRatios: [0.55, 0.45] },
  content: {
    'pt-br': {
      title: 'Core Concepts do LangChain',
      body: `O LangChain é construído em torno de **4 conceitos fundamentais** que formam qualquer chain.

### Os 4 pilares

1. **Models** — LLMs (ChatOpenAI, GroqChat, etc.) que geram texto
2. **Prompts** — templates que formatam a entrada do modelo
3. **Output Parsers** — extraem estrutura do output do modelo (JSON, Pydantic, etc.)
4. **Chains** — composição de Model + Prompt + Parser via LCEL

### LCEL (LangChain Expression Language)

A sintaxe de pipe (**\`|\`**) que conecta componentes:

---

\`\`\`python
snippet:langchain/core-concepts
\`\`\``,
      codeExplanations: [
        {
          lineRange: [1, 1],
          content: 'A sintaxe de pipe (|) do LCEL compõe os componentes em um fluxo sequencial.',
        },
        {
          lineRange: [2, 2],
          content: 'O método .invoke() inicia a execução da chain com os dados de entrada.',
        },
      ],
    },
    'en-us': {
      title: 'LangChain Core Concepts',
      body: `LangChain is built around **4 fundamental concepts** that form any chain.

### The 4 pillars

1. **Models** — LLMs (ChatOpenAI, GroqChat, etc.) that generate text
2. **Prompts** — templates that format model input
3. **Output Parsers** — extract structure from model output (JSON, Pydantic, etc.)
4. **Chains** — composition of Model + Prompt + Parser via LCEL

### LCEL (LangChain Expression Language)

The pipe syntax (**\`|\`**) that connects components:

\`\`\`python
snippet:langchain/core-concepts
\`\`\``,
      codeExplanations: [
        {
          lineRange: [1, 1],
          content: 'LCEL pipe syntax (|) composes components into a sequential flow.',
        },
        {
          lineRange: [2, 2],
          content: 'The .invoke() method starts the chain execution with the input data.',
        },
      ],
    },

  },
  visual: {
    id: 'langchain-core-concepts-visual',
    copy: {
      'pt-br': {
        title: 'Pipeline do LangChain',
        modelLabel: 'ChatOpenAI, Groq, etc.',
        promptLabel: 'ChatPromptTemplate',
        parserLabel: 'PydanticOutputParser',
        outputLabel: 'JSON estruturado',
        flowArrow: '→',
        conceptModel: '🧠 Model',
        conceptPrompt: '📝 Prompt',
        conceptParser: '🔧 Parser',
        conceptOutput: '✅ Output',
      },
      'en-us': {
        title: 'LangChain Pipeline',
        modelLabel: 'ChatOpenAI, Groq, etc.',
        promptLabel: 'ChatPromptTemplate',
        parserLabel: 'PydanticOutputParser',
        outputLabel: 'Structured JSON',
        flowArrow: '→',
        conceptModel: '🧠 Model',
        conceptPrompt: '📝 Prompt',
        conceptParser: '🔧 Parser',
        conceptOutput: '✅ Output',
      },
    },
  },
});
