import { defineSlide } from './_factory';

export const reactPattern = defineSlide({
  id: 'react-pattern',
  type: 'two-column',
  content: {
    'pt-br': {
      title: 'ReAct: Raciocínio + Ação',
      body: `O padrão **ReAct** (Reasoning + Acting) foi popularizado por um paper de 2022 da Google/Yao et al. e se tornou a base de praticamente todos os agentes modernos.

A ideia é simples: em vez do LLM gerar uma resposta direta, ele gera um ciclo de 3 etapas:

1. **Thought** (Pensamento): "O que eu sei? O que eu preciso descobrir?"
2. **Action** (Ação): "Vou usar a ferramenta X com o parâmetro Y"
3. **Observation** (Observação): "A ferramenta retornou Z"

Esse ciclo se repete até o agente ter informação suficiente para dar uma resposta final.

> Thought → Action → Observation → Thought → Action → Observation → ... → Answer

A chave é que cada **Thought** é informado pelo resultado da **Observation** anterior — o agente constrói conhecimento incrementalmente.

snippet:intelligent-agents/react-pattern`,
    },
    'en-us': {
      title: 'ReAct: Reasoning + Acting',
      body: `The **ReAct** pattern (Reasoning + Acting) was popularized by a 2022 paper from Google/Yao et al. and became the foundation of virtually all modern agents.

The idea is simple: instead of the LLM generating a direct response, it produces a 3-step cycle:

1. **Thought**: "What do I know? What do I need to find out?"
2. **Action**: "I'll use tool X with parameter Y"
3. **Observation**: "The tool returned Z"

This cycle repeats until the agent has enough information to give a final answer.

> Thought → Action → Observation → Thought → Action → Observation → ... → Answer

The key is that each **Thought** is informed by the previous **Observation** result — the agent builds knowledge incrementally.

snippet:intelligent-agents/react-pattern`,
    },
  },
  visual: {
    id: 'react-flow',
    copy: {
      'pt-br': {
        title: 'O Padrão ReAct: Thought → Action → Observation',
        subtitle: 'O ciclo que é a base de todos os agentes modernos',
        thoughtLabel: 'Thought',
        thoughtDesc: 'O que eu sei? O que preciso descobrir?',
        actionLabel: 'Action',
        actionDesc: 'Usar ferramenta X com parâmetro Y',
        observationLabel: 'Observation',
        observationDesc: 'A ferramenta retornou Z',
        questionInput: 'Quanto custa um iPhone 15 na Amazon vs Magazine Luiza?',
        startButton: 'Iniciar ReAct',
        resetButton: 'Reiniciar',
        turnQuestion: 'Qual pergunta este Thought responde?',
        insightTitle: 'Insight',
        insightText: 'ReAct força o agente a pensar em voz alta — cada ação é justificada, cada resultado alimenta o próximo pensamento.',
      },
      'en-us': {
        title: 'The ReAct Pattern: Thought → Action → Observation',
        subtitle: 'The cycle that is the foundation of all modern agents',
        thoughtLabel: 'Thought',
        thoughtDesc: 'What do I know? What do I need to find out?',
        actionLabel: 'Action',
        actionDesc: 'Use tool X with parameter Y',
        observationLabel: 'Observation',
        observationDesc: 'The tool returned Z',
        questionInput: 'How much is an iPhone 15 on Amazon vs Magazine Luiza?',
        startButton: 'Start ReAct',
        resetButton: 'Reset',
        turnQuestion: 'What question does this Thought answer?',
        insightTitle: 'Insight',
        insightText: 'ReAct forces the agent to think out loud — every action is justified, every result feeds the next thought.',
      },
    },
  },
});
