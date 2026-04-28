import { defineSlide } from './_factory';

export const langchainE2e = defineSlide({
  id: 'langchain-e2e',
  type: 'two-column',
  options: { columnRatios: [0.55, 0.45] },
  content: {
    'pt-br': {
      title: 'E2E: Build a Conversational RAG Agent',
      body: `Vamos construir um **agent conversacional com RAG** do zero em LangChain em 5 passos.

### Passo 1: Prompt Template

\`\`\`python
snippet:langchain/e2e-step1
\`\`\`

### Passo 2: Model

\`\`\`python
snippet:langchain/e2e-step2
\`\`\`

### Passo 3: Chain com LCEL

\`\`\`python
snippet:langchain/e2e-step3
\`\`\`

### Passo 4: Tool de Retrieval

\`\`\`python
snippet:langchain/e2e-step4
\`\`\`

### Passo 5: Agent

\`\`\`python
snippet:langchain/e2e-step5
\`\`\`

> Em **~20 linhas** você tem um agent que pode conversar, buscar em documentos e usar ferramentas — tudo orquestrado pelo LangChain.`,
    },
    'en-us': {
      title: 'E2E: Build a Conversational RAG Agent',
      body: `Let's build a **conversational RAG agent** from scratch with LangChain in 5 steps.

### Step 1: Prompt Template

\`\`\`python
snippet:langchain/e2e-step1
\`\`\`

### Step 2: Model

\`\`\`python
snippet:langchain/e2e-step2
\`\`\`

### Step 3: Chain with LCEL

\`\`\`python
snippet:langchain/e2e-step3
\`\`\`

### Step 4: Retrieval Tool

\`\`\`python
snippet:langchain/e2e-step4
\`\`\`

### Step 5: Agent

\`\`\`python
snippet:langchain/e2e-step5
\`\`\`

> In **~20 lines** you have an agent that can converse, search documents, and use tools — all orchestrated by LangChain.`,
    },
  },
  visual: {
    id: 'langchain-e2e-visual',
    copy: {
      'pt-br': {
        title: 'Agent RAG em 5 Passos',
        step1Label: 'Prompt',
        step1Desc: 'ChatPromptTemplate define System e Human messages com variáveis para chat_history e input.',
        step2Label: 'Model',
        step2Desc: 'ChatOpenAI configura o modelo (gpt-4o-mini) e temperatura para balancear criatividade e precisão.',
        step3Label: 'Chain',
        step3Desc: 'prompt | model cria um chain LCEL que pode ser invocado com variáveis de input.',
        step4Label: 'Tool',
        step4Desc: 'RetrieverTool expõe o vector store como uma ferramenta que o agent pode chamar.',
        step5Label: 'Agent',
        step5Desc: 'create_openai_functions_agent combina prompt + model + tools em um agent com memory e RAG.',
      },
      'en-us': {
        title: 'RAG Agent in 5 Steps',
        step1Label: 'Prompt',
        step1Desc: 'ChatPromptTemplate defines System and Human messages with variables for chat_history and input.',
        step2Label: 'Model',
        step2Desc: 'ChatOpenAI configures the model (gpt-4o-mini) and temperature to balance creativity and precision.',
        step3Label: 'Chain',
        step3Desc: 'prompt | model creates an LCEL chain that can be invoked with input variables.',
        step4Label: 'Tool',
        step4Desc: 'RetrieverTool exposes the vector store as a tool the agent can call.',
        step5Label: 'Agent',
        step5Desc: 'create_openai_functions_agent combines prompt + model + tools into an agent with memory and RAG.',
      },
    },
  },
});
