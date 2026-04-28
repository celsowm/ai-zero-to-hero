import { defineSlide } from './_factory';

export const llamaindexAgents = defineSlide({
  id: 'llamaindex-agents',
  type: 'two-column',
  options: { columnRatios: [0.55, 0.45] },
  content: {
    'pt-br': {
      title: 'Agents: ReAct e Function Calling',
      body: `Um **Agent** no LlamaIndex vai além do RAG — ele pode **agir**: chamar ferramentas, navegar na web, executar código.

### ReAct Agent (Reason + Act)

O Agente pensa em ciclo: **Thought → Action → Observation → Repeat**

\`\`\`python
snippet:llamaindex/react-agent
\`\`\`

1. **Thought**: "Preciso buscar informações sobre o clima"
2. **Action**: chama a ferramenta \`get_weather\`
3. **Observation**: recebe \`{"temp": 28, "condition": "sunny"}\`
4. **Thought**: "Agora tenho a resposta completa"
5. **Final Answer**: "Está 28°C e ensolarado"

### Function Calling

Em vez de loop ReAct, usa o **function calling nativo** do LLM (OpenAI, Groq). O próprio modelo decide quando chamar ferramentas.

### Query Pipeline como Agent

Você pode montar um pipeline de query que age como agent — com nodes de decisão, ferramentas, e roteamento.

> ReAct é **explícito** (vê cada passo). Function Calling é **implícito** (o LLM decide internamente).`,
    },
    'en-us': {
      title: 'Agents: ReAct and Function Calling',
      body: `An **Agent** in LlamaIndex goes beyond RAG — it can **act**: call tools, browse the web, run code.

### ReAct Agent (Reason + Act)

The Agent thinks in cycles: **Thought → Action → Observation → Repeat**

\`\`\`python
snippet:llamaindex/react-agent
\`\`\`

1. **Thought**: "I need to search weather information"
2. **Action**: calls the \`get_weather\` tool
3. **Observation**: receives \`{"temp": 28, "condition": "sunny"}\`
4. **Thought**: "Now I have the complete answer"
5. **Final Answer**: "It's 28°C and sunny"

### Function Calling

Instead of ReAct loop, uses the LLM's **native function calling** (OpenAI, Groq). The model itself decides when to call tools.

### Query Pipeline as Agent

You can build a query pipeline that acts as an agent — with decision nodes, tools, and routing.

> ReAct is **explicit** (see each step). Function Calling is **implicit** (the LLM decides internally).`,
    },
  },
  visual: {
    id: 'llamaindex-agents-visual',
    copy: {
      'pt-br': {
        title: 'ReAct Agent Loop',
        reActLabel: 'ReAct',
        functionCallingLabel: 'Function Calling',
        toolLabel: '🔧 Tool',
        thoughtLabel: '💭 Thought',
        actionLabel: '⚡ Action',
        observationLabel: '👁️ Observation',
        answerLabel: '✅ Final Answer',
        reActDesc: 'Loop explícito: Thought → Action → Observation',
        fcDesc: 'LLM decide internamente quando chamar ferramentas',
      },
      'en-us': {
        title: 'ReAct Agent Loop',
        reActLabel: 'ReAct',
        functionCallingLabel: 'Function Calling',
        toolLabel: '🔧 Tool',
        thoughtLabel: '💭 Thought',
        actionLabel: '⚡ Action',
        observationLabel: '👁️ Observation',
        answerLabel: '✅ Final Answer',
        reActDesc: 'Explicit loop: Thought → Action → Observation',
        fcDesc: 'LLM internally decides when to call tools',
      },
    },
  },
});
