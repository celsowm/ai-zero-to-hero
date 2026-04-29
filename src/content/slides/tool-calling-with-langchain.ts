import { defineSlide } from './_factory';

export const toolCallingWithLangchain = defineSlide({
  id: 'tool-calling-with-langchain',
  type: 'two-column',
  options: { columnRatios: [0.55, 0.45] },
  content: {
    'pt-br': {
      title: 'Tool Calling com LangChain',
      body: `LangChain oferece uma API de alto nível para Tool Calling que abstrai o ciclo de request → tool_call → execute → response.

### Bind tools no LangChain

\`\`\`python
snippet:tool-calling/langchain-tool-calling
\`\`\`

### O que acontece por baixo

1. \`llm.bind_tools(tools)\` — anexa o schema das ferramentas ao LLM
2. \`llm.invoke(messages)\` — envia com tools no payload
3. Se o modelo retorna \`tool_calls\`, o **AgentExecutor** executa
4. Resultado é injetado como \`role: "tool"\` e o modelo gera a resposta final

> LangChain **automatiza o loop** — você só define as ferramentas e o modelo faz o resto.`,
    },
    'en-us': {
      title: 'Tool Calling with LangChain',
      body: `LangChain offers a high-level API for Tool Calling that abstracts the request → tool_call → execute → response cycle.

### Bind tools in LangChain

\`\`\`python
snippet:tool-calling/langchain-tool-calling
\`\`\`

### What happens under the hood

1. \`llm.bind_tools(tools)\` — attaches tool schemas to the LLM
2. \`llm.invoke(messages)\` — sends with tools in the payload
3. If the model returns \`tool_calls\`, the **AgentExecutor** runs
4. Result is injected as \`role: "tool"\` and the model generates the final answer

> LangChain **automates the loop** — you just define the tools and the model handles the rest.`,
    },
  },
  visual: {
    id: 'tool-calling-concepts-visual',
    copy: {
      'pt-br': {
        title: 'LangChain Tool Calling Loop',
        modelLabel: 'ChatOpenAI',
        toolLabel: '@tool decorator',
        runtimeLabel: 'AgentExecutor',
        requestLabel: '1. bind_tools(tools)',
        decisionLabel: '2. invoke() → tool_calls',
        executionLabel: '3. AgentExecutor executa',
        responseLabel: '4. Resposta final',
        step1Label: 'Bind',
        step1Desc: 'llm.bind_tools([search_web, calculate]) registra schemas',
        step2Label: 'Invoke',
        step2Desc: 'Usuário pergunta, LLM decide qual tool usar',
        step3Label: 'Execute',
        step3Desc: 'AgentExecutor roda a tool e captura resultado',
        step4Label: 'Respond',
        step4Desc: 'LLM gera resposta natural com o resultado',
      },
      'en-us': {
        title: 'LangChain Tool Calling Loop',
        modelLabel: 'ChatOpenAI',
        toolLabel: '@tool decorator',
        runtimeLabel: 'AgentExecutor',
        requestLabel: '1. bind_tools(tools)',
        decisionLabel: '2. invoke() → tool_calls',
        executionLabel: '3. AgentExecutor runs',
        responseLabel: '4. Final answer',
        step1Label: 'Bind',
        step1Desc: 'llm.bind_tools([search_web, calculate]) registers schemas',
        step2Label: 'Invoke',
        step2Desc: 'User asks, LLM decides which tool to use',
        step3Label: 'Execute',
        step3Desc: 'AgentExecutor runs the tool and captures result',
        step4Label: 'Respond',
        step4Desc: 'LLM generates natural answer with the result',
      },
    },
  },
});
