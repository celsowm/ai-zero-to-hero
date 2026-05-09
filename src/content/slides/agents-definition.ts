import { defineSlide } from './_factory';

export const agentsDefinition = defineSlide({
  id: 'agents-definition',
  type: 'two-column',
  content: {
    'pt-br': {
      title: 'O Que É Um Agente?',
      body: `Não existe magia. Um agente de IA é simplesmente um sistema que conecta cinco capacidades:

1. **Percepção**: coletar informações do ambiente (texto, dados, sensores)
2. **Memória**: manter contexto entre interações (histórico, preferências)
3. **Raciocínio**: decidir o que fazer com base no que percebeu (LLM)
4. **Ferramentas**: agir no mundo (APIs, buscadores, executores de código)
5. **Ação**: executar a decisão e observar o resultado

> Percepção → Memória → Raciocínio → Ferramentas → Ação → (repete)

Cada um desses componentes é algo que o estudante já viu no curso. A novidade é como eles se conectam num ciclo autossustentado.

snippet:intelligent-agents/agents-definition`,
    },
    'en-us': {
      title: 'What Is An Agent?',
      body: `There is no magic. An AI agent is simply a system that connects five capabilities:

1. **Perception**: gather information from the environment (text, data, sensors)
2. **Memory**: maintain context between interactions (history, preferences)
3. **Reasoning**: decide what to do based on what it perceived (LLM)
4. **Tools**: act on the world (APIs, search engines, code executors)
5. **Action**: execute the decision and observe the result

> Perception → Memory → Reasoning → Tools → Action → (repeats)

Each of these components is something the student has already seen in the course. The novelty is how they connect in a self-sustaining cycle.

snippet:intelligent-agents/agents-definition`,
    },
  },
  visual: {
    id: 'agent-anatomy',
    copy: {
      'pt-br': {
        title: 'Anatomia de Um Agente',
        subtitle: 'Os 5 componentes que todo agente compartilha',
        perceptionLabel: 'Percepção',
        perceptionDesc: 'Coletar informações: texto, dados, sensores, APIs',
        memoryLabel: 'Memória',
        memoryDesc: 'Histórico de interações, preferências, contexto',
        reasoningLabel: 'Raciocínio',
        reasoningDesc: 'LLM decide o que fazer com base no contexto',
        toolsLabel: 'Ferramentas',
        toolsDesc: 'APIs, buscadores, executores de código — ações no mundo',
        actionLabel: 'Ação',
        actionDesc: 'Executar a decisão e observar o resultado',
        flowTitle: 'Ciclo do Agente',
        inputExample: 'Qual a temperatura em SP agora?',
        outputExample: '23.4°C — fontes: clima.com.br às 14:32',
        insightTitle: 'Insight',
        insightText: 'Não existe "agente" como modelo novo. É um LLM com memória, ferramentas e um loop que conecta tudo.',
      },
      'en-us': {
        title: 'Anatomy of an Agent',
        subtitle: 'The 5 components every agent shares',
        perceptionLabel: 'Perception',
        perceptionDesc: 'Gather information: text, data, sensors, APIs',
        memoryLabel: 'Memory',
        memoryDesc: 'Interaction history, preferences, context',
        reasoningLabel: 'Reasoning',
        reasoningDesc: 'LLM decides what to do based on context',
        toolsLabel: 'Tools',
        toolsDesc: 'APIs, search engines, code executors — actions on the world',
        actionLabel: 'Action',
        actionDesc: 'Execute the decision and observe the result',
        flowTitle: 'Agent Cycle',
        inputExample: 'What\'s the temperature in SP now?',
        outputExample: '23.4°C — sources: clima.com.br at 14:32',
        insightTitle: 'Insight',
        insightText: 'There is no "agent" as a new model. It\'s an LLM with memory, tools, and a loop that connects everything.',
      },
    },
  },
});
