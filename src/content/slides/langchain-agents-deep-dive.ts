import { defineSlide } from './_factory';

export const langchainAgentsDeepDive = defineSlide({
  id: 'langchain-agents-deep-dive',
  type: 'two-column',
  options: { columnRatios: [0.55, 0.45] },
  content: {
    'pt-br': {
      title: 'Agents: ReAct Loop no LangChain',
      body: `Um **Agent** no LangChain é um loop que combina raciocínio e ação usando tools.

### O loop ReAct

1. **Thought**: O LLM pensa sobre o que fazer
2. **Action**: Escolhe uma tool e executa
3. **Observation**: Recebe o resultado da tool
4. **Repeat**: Volta ao Thought até ter resposta suficiente

\`\`\`python
snippet:langchain/react-agent
\`\`\`

### Tool selection

O LLM **decide automaticamente** qual tool usar baseado na query. Se nenhuma tool é relevante, dá resposta final.

### Agent Types

- **OpenAI Functions Agent**: usa function calling nativo (mais rápido)
- **ReAct Agent**: loop explícito de thought → action → observation (mais transparente)
- **Self-Ask with Search**: divide em sub-perguntas com search tool

> Agent = Chain + Tools + Memory + Prompt. É o nível mais alto de autonomia.`,
    },
    'en-us': {
      title: 'Agents: ReAct Loop in LangChain',
      body: `An **Agent** in LangChain is a loop that combines reasoning and action using tools.

### The ReAct loop

1. **Thought**: The LLM thinks about what to do
2. **Action**: Chooses a tool and executes it
3. **Observation**: Receives the tool result
4. **Repeat**: Goes back to Thought until answer is sufficient

\`\`\`python
snippet:langchain/react-agent
\`\`\`

### Tool selection

The LLM **automatically decides** which tool to use based on the query. If no tool is relevant, it gives a final answer.

### Agent Types

- **OpenAI Functions Agent**: uses native function calling (faster)
- **ReAct Agent**: explicit thought → action → observation loop (more transparent)
- **Self-Ask with Search**: splits into sub-questions with search tool

> Agent = Chain + Tools + Memory + Prompt. It's the highest level of autonomy.`,
    },
  },
  visual: {
    id: 'langchain-agents-deep-dive-visual',
    copy: {
      'pt-br': {
        title: 'Agent ReAct Loop',
        reactLabel: 'ReAct',
        toolSelectionLabel: 'Tool Selection',
        parseLabel: 'Output Parsing',
        thoughtLabel: '💭 Thought',
        actionLabel: '⚡ Action',
        observationLabel: '👁️ Observation',
        finalAnswerLabel: '✅ Final Answer',
      },
      'en-us': {
        title: 'Agent ReAct Loop',
        reactLabel: 'ReAct',
        toolSelectionLabel: 'Tool Selection',
        parseLabel: 'Output Parsing',
        thoughtLabel: '💭 Thought',
        actionLabel: '⚡ Action',
        observationLabel: '👁️ Observation',
        finalAnswerLabel: '✅ Final Answer',
      },
    },
  },
});
