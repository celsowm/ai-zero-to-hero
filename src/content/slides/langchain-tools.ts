import { defineSlide } from './_factory';

export const langchainTools = defineSlide({
  id: 'langchain-tools',
  type: 'two-column',
  options: { columnRatios: [0.5, 0.5] },
  content: {
    'pt-br': {
      title: 'Tools: Dando Poderes ao LLM',
      body: `**Tools** são funções que o LLM pode chamar. São a ponte entre o modelo e o mundo externo.

### Built-in Tools

\`\`\`python
snippet:langchain/built-in-tools
\`\`\`

### Custom Tools

Você pode criar qualquer ferramenta:

\`\`\`python
snippet:langchain/custom-tool
\`\`\`

### Tool Decorator

A forma mais simples de criar tools:

\`\`\`python
snippet:langchain/tool-decorator
\`\`\`

> Tools são o que transformam um LLM de "gerador de texto" em **agente que age no mundo**.`,
    },
    'en-us': {
      title: 'Tools: Giving Powers to the LLM',
      body: `**Tools** are functions the LLM can call. They are the bridge between the model and the outside world.

### Built-in Tools

\`\`\`python
snippet:langchain/built-in-tools
\`\`\`

### Custom Tools

You can create any tool you need:

\`\`\`python
snippet:langchain/custom-tool
\`\`\`

### Tool Decorator

The simplest way to create tools:

\`\`\`python
snippet:langchain/tool-decorator
\`\`\`

> Tools are what transforms an LLM from a "text generator" into an **agent that acts on the world**.`,
    },
  },
  visual: {
    id: 'langchain-tools-visual',
    copy: {
      'pt-br': {
        title: 'Tools do LangChain',
        searchLabel: 'Search',
        calcLabel: 'Calculator',
        customLabel: 'Custom',
        searchDesc: 'Busca na web em tempo real via API de search',
        calcDesc: 'Avalia expressões matemáticas com precisão',
        customDesc: 'Qual função Python pode virar uma tool',
        toolLabel: '🔧 Tool',
        inputLabel: 'Input',
        outputLabel: 'Output',
      },
      'en-us': {
        title: 'LangChain Tools',
        searchLabel: 'Search',
        calcLabel: 'Calculator',
        customLabel: 'Custom',
        searchDesc: 'Real-time web search via search API',
        calcDesc: 'Evaluates mathematical expressions precisely',
        customDesc: 'Any Python function can become a tool',
        toolLabel: '🔧 Tool',
        inputLabel: 'Input',
        outputLabel: 'Output',
      },
    },
  },
});
