import { defineSlide } from './_factory';

export const agentPlanning = defineSlide({
  id: 'agent-planning',
  type: 'two-column',
  content: {
    'pt-br': {
      title: 'Planejamento: Pensar Antes de Agir',
      body: `A Anthropic recomenda explicitamente: **exija que o agente exiba suas etapas de planejamento antes da execução**.

- **Sem planejamento**: o agente reage a cada input de forma isolada, sem visão do todo
- **Com planejamento**: o agente cria um roteiro de etapas e segue com intenção

Planejamento não significa um plano complexo. Pode ser tão simples como:

> "Para responder esta pergunta, preciso: (1) buscar preço na Loja A, (2) buscar preço na Loja B, (3) comparar"

Isso parece óbvio para humanos, mas para um LLM, a diferença entre "agir por impulso" e "seguir um plano" é a diferença entre 3 ações e 15 ações desnecessárias.

snippet:intelligent-agents/agent-planning`,
    },
    'en-us': {
      title: 'Planning: Think Before Acting',
      body: `Anthropic explicitly recommends: **require the agent to display its planning steps before execution**.

- **Without planning**: the agent reacts each input in isolation, with no big-picture view
- **With planning**: the agent creates a roadmap of steps and follows with intent

Planning doesn't mean a complex blueprint. It can be as simple as:

> "To answer this question, I need to: (1) search price at Store A, (2) search price at Store B, (3) compare"

This seems obvious to humans, but for an LLM, the difference between "acting on impulse" and "following a plan" is the difference between 3 actions and 15 unnecessary ones.

snippet:intelligent-agents/agent-planning`,
    },
  },
  visual: {
    id: 'agent-planning',
    copy: {
      'pt-br': {
        title: 'Com vs Sem Planejamento',
        subtitle: 'Veja a diferença na qualidade e eficiência',
        withPlanningLabel: 'Com Planejamento',
        withoutPlanningLabel: 'Sem Planejamento',
        stepLabel: 'Passo',
        runButton: 'Executar',
        taskInput: 'Compare preços de iPhone 15 e Galaxy S24 em 5 lojas',
        qualityLabel: 'Qualidade:',
        stepsLabel: 'Passos:',
        timeLabel: 'Tempo:',
        insightTitle: 'Insight',
        insightText: 'Planejamento explícito = menos ações desnecessárias, mais transparência, debugging mais fácil.',
      },
      'en-us': {
        title: 'With vs Without Planning',
        subtitle: 'See the difference in quality and efficiency',
        withPlanningLabel: 'With Planning',
        withoutPlanningLabel: 'Without Planning',
        stepLabel: 'Step',
        runButton: 'Run',
        taskInput: 'Compare iPhone 15 and Galaxy S24 prices across 5 stores',
        qualityLabel: 'Quality:',
        stepsLabel: 'Steps:',
        timeLabel: 'Time:',
        insightTitle: 'Insight',
        insightText: 'Explicit planning = fewer unnecessary actions, more transparency, easier debugging.',
      },
    },
  },
});
