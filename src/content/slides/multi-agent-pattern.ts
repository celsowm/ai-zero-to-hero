import { defineSlide } from './_factory';

export const multiAgentPattern = defineSlide({
  id: 'multi-agent-pattern',
  type: 'two-column',
  content: {
    'pt-br': {
      title: 'Multi-Agent: Quando Um Não Basta',
      body: `Um único agente generalista pode fazer muitas coisas, mas não faz todas **bem**. A solução é o mesmo padrão de times humanos:

- **Pesquisador**: especializado em buscar e filtrar informação
- **Escritor**: especializado em sintetizar e formatar texto
- **Revisor**: especializado em verificar fatos e qualidade

A Anthropic observa que a **colaboração multiagente** produz soluções mais robustas que um agente isolado. Mas alerta: comece simples. Multi-agent adiciona latência, custo e complexidade de orquestração.

> Regra prática: se um agente com bom planejamento e ferramentas resolve, use um. Adicione mais apenas quando a qualidade exigir.

snippet:intelligent-agents/multi-agent-pattern`,
    },
    'en-us': {
      title: 'Multi-Agent: When One Is Not Enough',
      body: `A single generalist agent can do many things, but not all of them **well**. The solution follows the same pattern as human teams:

- **Researcher**: specialized in searching and filtering information
- **Writer**: specialized in synthesizing and formatting text
- **Reviewer**: specialized in fact-checking and quality

Anthropic observes that **multi-agent collaboration** produces more robust solutions than a single agent. But warns: start simple. Multi-agent adds latency, cost, and orchestration complexity.

> Rule of thumb: if one agent with good planning and tools solves it, use one. Add more only when quality demands it.

snippet:intelligent-agents/multi-agent-pattern`,
    },
  },
  visual: {
    id: 'multi-agent',
    copy: {
      'pt-br': {
        title: 'Um Generalista vs Três Especialistas',
        subtitle: 'Quando dividir tarefas produz resultados melhores',
        singleAgentLabel: '1 Agente Generalista',
        multiAgentLabel: '3 Agentes Especialistas',
        researcherLabel: 'Pesquisador',
        writerLabel: 'Escritor',
        reviewerLabel: 'Revisor',
        runButton: 'Executar',
        taskInput: 'Escreva um resumo sobre o estado atual da IA no Brasil',
        qualitySingle: 'Qualidade:',
        qualityMulti: 'Qualidade:',
        timeSingle: 'Tempo:',
        timeMulti: 'Tempo:',
        communicationLabel: 'Comunicação entre agentes:',
        insightTitle: 'Insight',
        insightText: 'Multi-agent melhora qualidade mas custa mais. Use quando a complexidade da tarefa justificar.',
      },
      'en-us': {
        title: 'One Generalist vs Three Specialists',
        subtitle: 'When dividing tasks produces better results',
        singleAgentLabel: '1 Generalist Agent',
        multiAgentLabel: '3 Specialist Agents',
        researcherLabel: 'Researcher',
        writerLabel: 'Writer',
        reviewerLabel: 'Reviewer',
        runButton: 'Run',
        taskInput: 'Write a summary about the current state of AI in Brazil',
        qualitySingle: 'Quality:',
        qualityMulti: 'Quality:',
        timeSingle: 'Time:',
        timeMulti: 'Time:',
        communicationLabel: 'Inter-agent communication:',
        insightTitle: 'Insight',
        insightText: 'Multi-agent improves quality but costs more. Use when task complexity justifies it.',
      },
    },
  },
});
