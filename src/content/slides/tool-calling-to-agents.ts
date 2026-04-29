import { defineSlide } from './_factory';

export const toolCallingToAgents = defineSlide({
  id: 'tool-calling-to-agents',
  type: 'two-column',
  options: { columnRatios: [0.5, 0.5] },
  content: {
    'pt-br': {
      title: 'De Tool Calling a Agentes Inteligentes',
      body: `Tool Calling é a **base** dos Agentes. Mas Agentes vão além:

### Tool Calling → Agente: a evolução

| Capability | Tool Calling | Agente |
|---|---|---|
| **Decisão** | Qual tool usar | Qual tool + quando + quantas vezes |
| **Memória** | Stateless | Histórico + contexto entre turns |
| **Planejamento** | Nenhum | Divide tarefa em sub-passos |
| **Autonomia** | 1 step | Loop até completar a tarefa |
| **Auto-correção** | Limitada | Revisa output e retry |

### O que veremos na próxima seção

- **ReAct Pattern** — Reasoning + Acting em loop
- **Plan-and-Execute** — planeja antes de executar
- **Memory** — curto e longo prazo
- **Multi-Agent** — agentes especializados colaborando

> Tool Calling é **uma ferramenta**. Agentes são **sistemas** que orquestram ferramentas de forma autônoma.`,
    },
    'en-us': {
      title: 'From Tool Calling to Intelligent Agents',
      body: `Tool Calling is the **foundation** of Agents. But Agents go further:

### Tool Calling → Agent: the evolution

| Capability | Tool Calling | Agent |
|---|---|---|
| **Decision** | Which tool to use | Which tool + when + how many times |
| **Memory** | Stateless | History + context between turns |
| **Planning** | None | Breaks task into sub-steps |
| **Autonomy** | 1 step | Loop until task is complete |
| **Self-correction** | Limited | Reviews output and retries |

### What we'll see in the next section

- **ReAct Pattern** — Reasoning + Acting in a loop
- **Plan-and-Execute** — plan before executing
- **Memory** — short and long term
- **Multi-Agent** — specialized agents collaborating

> Tool Calling is **a tool**. Agents are **systems** that orchestrate tools autonomously.`,
    },
  },
  visual: {
    id: 'tool-calling-why-visual',
    copy: {
      'pt-br': {
        beforeLabel: 'Tool Calling',
        afterLabel: 'Agente Inteligente',
        limitLabel: '1 step: decide tool',
        powerLabel: 'Loop: planeja → age → revisa',
        limitDesc: 'Stateless, sem memória entre turns',
        powerDesc: 'Memória, planejamento, auto-correção',
      },
      'en-us': {
        beforeLabel: 'Tool Calling',
        afterLabel: 'Intelligent Agent',
        limitLabel: '1 step: decide tool',
        powerLabel: 'Loop: plan → act → revise',
        limitDesc: 'Stateless, no memory between turns',
        powerDesc: 'Memory, planning, self-correction',
      },
    },
  },
});
