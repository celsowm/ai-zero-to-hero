import { defineSlide } from './_factory';

export const agentsWhy = defineSlide({
  id: 'agents-why',
  type: 'two-column',
  content: {
    'pt-br': {
      title: 'Intelligent Agents',
      body: `Até aqui, o estudante dominou:

- **Tool Calling**: LLMs podem chamar funções externas
- **Reasoning/Thinking**: LLMs podem "pensar" antes de responder
- **Frameworks**: LangChain, LlamaIndex orquestram pipelines

Mas falta o salto conceitual mais importante:

> Um LLM isolado é um cérebro flutuando no vácuo — ele pensa, mas não toca o mundo. Um Agente é um cérebro com mãos, olhos e memória.

Nesta seção, vamos construir o conceito de Intelligent Agents do zero: o que são, como funcionam, por que são diferentes de uma simples chamada de API, e como construir agentes autônomos que resolvem problemas complexos.

snippet:intelligent-agents/agents-why`,
    },
    'en-us': {
      title: 'Intelligent Agents',
      body: `So far, the student has mastered:

- **Tool Calling**: LLMs can call external functions
- **Reasoning/Thinking**: LLMs can "think" before responding
- **Frameworks**: LangChain, LlamaIndex orchestrate pipelines

But the most important conceptual leap remains:

> An isolated LLM is a brain floating in a vacuum — it thinks but cannot touch the world. An Agent is a brain with hands, eyes, and memory.

In this section, we will build the concept of Intelligent Agents from scratch: what they are, how they work, why they differ from a simple API call, and how to build autonomous agents that solve complex problems.

snippet:intelligent-agents/agents-why`,
    },
  },
  visual: {
    id: 'agente-in-action',
    copy: {
      'pt-br': {
        title: 'LLM vs Agente: A Diferença na Prática',
        llmOnlyLabel: 'Somente LLM',
        agentLabel: 'Agente com Ferramentas',
        questionLabel: 'Pergunta:',
        askButton: 'Perguntar',
        llmResponse: '"A temperatura em São Paulo deve ser uns 25°C..."',
        agentResponse: '"A temperatura em São Paulo agora é 23.4°C."',
        toolUseLabel: 'Ferramenta usada:',
        hallucinationWarning: '⚠️ Alucinação: resposta baseada em padrões do treinamento',
        groundedResult: '✓ Fundamentado: resposta de fonte real',
        insightTitle: 'Insight',
        insightText: 'A diferença não é o modelo — é a capacidade de agir. Um agente é um LLM com mãos.',
      },
      'en-us': {
        title: 'LLM vs Agent: The Difference in Practice',
        llmOnlyLabel: 'LLM Only',
        agentLabel: 'Agent with Tools',
        questionLabel: 'Question:',
        askButton: 'Ask',
        llmResponse: '"The temperature in São Paulo should be around 25°C..."',
        agentResponse: '"The temperature in São Paulo is now 23.4°C."',
        toolUseLabel: 'Tool used:',
        hallucinationWarning: '⚠️ Hallucination: response from training patterns',
        groundedResult: '✓ Grounded: response from real source',
        insightTitle: 'Insight',
        insightText: 'The difference isn\'t the model — it\'s the ability to act. An agent is an LLM with hands.',
      },
    },
  },
});
