import { defineSlide } from './_factory';

export const agentsE2E = defineSlide({
  id: 'agents-e2e',
  type: 'two-column',
  content: {
    'pt-br': {
      title: 'E2E: Research Agent Completo',
      body: `Vamos juntar tudo: loop, planejamento, memória, ferramentas e ReAct. O **Research Agent** é um agente que:

- Recebe um tópico de pesquisa
- Planeja sub-tópicos a investigar
- Busca informações para cada sub-tópico
- Organiza os findings em seções
- Escreve um resumo estruturado
- Revisa a qualidade do resumo

Este exemplo usa a sintaxe conceitual do ecossistema — na prática real, você usaria LangGraph, OpenAI Agents SDK ou PydanticAI para orquestrar.

> Este é o agente mais complexo do curso. Observe como cada conceito que aprendemos se encaixa numa peça da arquitetura.

snippet:intelligent-agents/agents-e2e`,
    },
    'en-us': {
      title: 'E2E: Complete Research Agent',
      body: `Let's put it all together: loop, planning, memory, tools, and ReAct. The **Research Agent** is an agent that:

- Receives a research topic
- Plans sub-topics to investigate
- Searches information for each sub-topic
- Organizes findings into sections
- Writes a structured summary
- Reviews the summary quality

This example uses conceptual syntax from the ecosystem — in practice, you'd use LangGraph, OpenAI Agents SDK, or PydanticAI to orchestrate.

> This is the most complex agent in the course. Observe how each concept we learned fits into a piece of the architecture.

snippet:intelligent-agents/agents-e2e`,
    },
  },
  visual: {
    id: 'e2e-research-agent',
    copy: {
      'pt-br': {
        title: 'Research Agent: Do Tópico ao Resumo',
        subtitle: 'Todos os conceitos aplicados num agente real',
        phasesTitle: 'Fases do Agente',
        phase1Label: 'Planejamento',
        phase2Label: 'Pesquisa (ReAct)',
        phase3Label: 'Síntese',
        phase4Label: 'Revisão',
        runButton: 'Executar Agente',
        topicInput: 'Inteligência Artificial Generativa em 2025',
        insightTitle: 'Insight',
        insightText: 'Um agente complexo é só vários conceitos simples bem orquestrados: loop + planejamento + ferramentas + memória + ReAct.',
      },
      'en-us': {
        title: 'Research Agent: From Topic to Summary',
        subtitle: 'All concepts applied in a real agent',
        phasesTitle: 'Agent Phases',
        phase1Label: 'Planning',
        phase2Label: 'Research (ReAct)',
        phase3Label: 'Synthesis',
        phase4Label: 'Review',
        runButton: 'Run Agent',
        topicInput: 'Generative AI in 2025',
        insightTitle: 'Insight',
        insightText: 'A complex agent is just several simple concepts well orchestrated: loop + planning + tools + memory + ReAct.',
      },
    },
  },
});
