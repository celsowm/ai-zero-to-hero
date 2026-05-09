import { defineSlide } from './_factory';

export const agentFrameworks = defineSlide({
  id: 'agent-frameworks',
  type: 'two-column',
  content: {
    'pt-br': {
      title: 'Frameworks de Agentes',
      body: `O estudante já viu que um agente é essencialmente um \`while\` loop com uma LLM e ferramentas. Mas na prática, usar frameworks traz estrutura, debuggability e padrões prontos.

- **Código puro (while loop)**: máximo controle, máximo trabalho manual
- **LangGraph**: state machine para agentes — nodos, arestas, grafo de execução
- **OpenAI Agents SDK**: SDK de alto nível da OpenAI — agentes com handoffs, ferramentas, guardrails
- **PydanticAI**: framework Python type-safe — agentes com validação rigorosa de tipos

> A Anthropic adverte: entenda o código por trás do framework antes de usá-lo. Abstrações excessivas dificultam o debug.

Vamos ver o que cada um oferece e quando escolher qual.

snippet:intelligent-agents/agent-frameworks`,
    },
    'en-us': {
      title: 'Agent Frameworks',
      body: `The student already knows that an agent is essentially a \`while\` loop with an LLM and tools. But in practice, frameworks bring structure, debuggability, and ready-made patterns.

- **Pure code (while loop)**: maximum control, maximum manual work
- **LangGraph**: state machine for agents — nodes, edges, execution graph
- **OpenAI Agents SDK**: high-level SDK from OpenAI — agents with handoffs, tools, guardrails
- **PydanticAI**: type-safe Python framework — agents with rigorous type validation

> Anthropic warns: understand the code behind the framework before using it. Excessive abstractions make debugging harder.

Let's see what each one offers and when to choose which.

snippet:intelligent-agents/agent-frameworks`,
    },
  },
  visual: {
    id: 'agent-frameworks',
    copy: {
      'pt-br': {
        title: 'Ecossistema de Frameworks para Agentes',
        subtitle: 'De código puro a SDKs especializados',
        fromScratchLabel: 'Código Puro',
        fromScratchDesc: 'While loop + LLM + ferramentas. Máximo controle.',
        langgraphLabel: 'LangGraph',
        langgraphDesc: 'State machine visual: nodos, arestas, grafo de execução.',
        openaiAgentsLabel: 'OpenAI Agents SDK',
        openaiAgentsDesc: 'SDK de alto nível: handoffs, guardrails, tracing nativo.',
        pydanticaiLabel: 'PydanticAI',
        pydanticaiDesc: 'Type-safe: validação rigorosa, deps, retry automáticos.',
        complexityLabel: 'Complexidade:',
        flexibilityLabel: 'Flexibilidade:',
        bestForLabel: 'Ideal para:',
        selectFramework: 'Selecionar framework',
        seeDetails: 'Ver detalhes',
        insightTitle: 'Insight',
        insightText: 'Comece com código puro para entender o loop. Migre para um framework quando o grafo de execução ficar complexo.',
      },
      'en-us': {
        title: 'Agent Framework Ecosystem',
        subtitle: 'From pure code to specialized SDKs',
        fromScratchLabel: 'Pure Code',
        fromScratchDesc: 'While loop + LLM + tools. Maximum control.',
        langgraphLabel: 'LangGraph',
        langgraphDesc: 'Visual state machine: nodes, edges, execution graph.',
        openaiAgentsLabel: 'OpenAI Agents SDK',
        openaiAgentsDesc: 'High-level SDK: handoffs, guardrails, native tracing.',
        pydanticaiLabel: 'PydanticAI',
        pydanticaiDesc: 'Type-safe: rigorous validation, deps, automatic retries.',
        complexityLabel: 'Complexity:',
        flexibilityLabel: 'Flexibility:',
        bestForLabel: 'Best for:',
        selectFramework: 'Select framework',
        seeDetails: 'See details',
        insightTitle: 'Insight',
        insightText: 'Start with pure code to understand the loop. Move to a framework when the execution graph gets complex.',
      },
    },
  },
});
