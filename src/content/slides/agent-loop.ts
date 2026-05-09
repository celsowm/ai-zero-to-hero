import { defineSlide } from './_factory';

export const agentLoop = defineSlide({
  id: 'agent-loop',
  type: 'two-column',
  content: {
    'pt-br': {
      title: 'O Loop do Agente',
      body: `A diferença fundamental entre uma chamada de LLM e um agente é o **loop**:

- **LLM normal**: entrada → processa → saída (linear, uma vez)
- **Agente**: entrada → planeja → age → observa → decide continuar ou parar (cíclico)

Pense em pedir uma pizza:

- **LLM normal**: "Qual o melhor sabor?" → "Calabresa." (fim)
- **Agente**: "Peça uma pizza." → Escolhe sabor → Liga pizzaria → Confirma endereço → Aguarda → Informa tempo de entrega (loop até completar)

> Um agente não para após a primeira resposta. Ele avalia: "minha tarefa está completa? Se não, o que falta?"

snippet:intelligent-agents/agent-loop`,
    },
    'en-us': {
      title: 'The Agent Loop',
      body: `The fundamental difference between an LLM call and an agent is the **loop**:

- **Normal LLM**: input → processes → output (linear, one time)
- **Agent**: input → plans → acts → observes → decides to continue or stop (cyclical)

Think of ordering a pizza:

- **Normal LLM**: "What's the best flavor?" → "Pepperoni." (done)
- **Agent**: "Order a pizza." → Picks flavor → Calls pizzeria → Confirms address → Waits → Reports delivery time (loops until complete)

> An agent doesn't stop after the first answer. It evaluates: "Is my task complete? If not, what's left?"

snippet:intelligent-agents/agent-loop`,
    },
  },
  visual: {
    id: 'agent-loop',
    copy: {
      'pt-br': {
        title: 'O Loop do Agente: Plan → Act → Observe → Decide',
        subtitle: 'O ciclo que transforma um LLM passivo em um agente ativo',
        planLabel: 'Plan',
        planDesc: 'LLM analisa contexto e planeja próximo passo',
        actLabel: 'Act',
        actDesc: 'Executa ação: usa ferramenta ou responde',
        observeLabel: 'Observe',
        observeDesc: 'Registra resultado da ação na memória',
        decideLabel: 'Decide',
        decideDesc: 'Avalia: tarefa completa? Se não, continua',
        taskLabel: 'Tarefa:',
        taskExample: 'Pesquisar o preço de um iPhone em 3 lojas',
        nextButton: 'Próximo Passo',
        resetButton: 'Reiniciar',
        completedLabel: '✓ Tarefa Completa',
        step1Detail: 'Planejando: preciso buscar preços em lojas online...',
        step2Detail: 'Ação: buscando em Loja A... R$ 7.499',
        step3Detail: 'Ação: buscando em Loja B... R$ 7.299',
        step4Detail: 'Ação: buscando em Loja C... R$ 7.650 → Completo! Menor: R$ 7.299',
        insightTitle: 'Insight',
        insightText: 'O loop é o que dá "agência" ao agente. Sem loop, é só um chat.',
      },
      'en-us': {
        title: 'The Agent Loop: Plan → Act → Observe → Decide',
        subtitle: 'The cycle that transforms a passive LLM into an active agent',
        planLabel: 'Plan',
        planDesc: 'LLM analyzes context and plans next step',
        actLabel: 'Act',
        actDesc: 'Executes action: uses tool or responds',
        observeLabel: 'Observe',
        observeDesc: 'Records action result in memory',
        decideLabel: 'Decide',
        decideDesc: 'Evaluates: task complete? If not, continues',
        taskLabel: 'Task:',
        taskExample: 'Research iPhone price across 3 stores',
        nextButton: 'Next Step',
        resetButton: 'Reset',
        completedLabel: '✓ Task Complete',
        step1Detail: 'Planning: I need to search prices in online stores...',
        step2Detail: 'Action: searching Store A... R$ 7,499',
        step3Detail: 'Action: searching Store B... R$ 7,299',
        step4Detail: 'Action: searching Store C... R$ 7,650 → Complete! Lowest: R$ 7,299',
        insightTitle: 'Insight',
        insightText: 'The loop is what gives "agency" to the agent. Without a loop, it\'s just a chat.',
      },
    },
  },
});
