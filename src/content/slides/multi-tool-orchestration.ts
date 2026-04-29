import { defineSlide } from './_factory';

export const multiToolOrchestration = defineSlide({
  id: 'multi-tool-orchestration',
  type: 'two-column',
  options: { columnRatios: [0.55, 0.45] },
  content: {
    'pt-br': {
      title: 'Orquestração Multi-Ferramenta',
      body: `Quando temos **múltiplas ferramentas** disponíveis, o LLM age como um **orquestrador inteligente**, decidindo qual usar para cada sub-problema.

### Exemplo: Assistente de viagens

\`\`\`python
snippet:tool-calling/multi-tool-orchestration
\`\`\`

### Padrões de orquestração

1. **Router** — escolhe UMA ferramenta por relevância
2. **Chain** — usa ferramentas em sequência (output de A → input de B)
3. **Fallback** — tenta A, se falhar tenta B
4. **Parallel** — usa múltiplas ferramentas simultaneamente

> Com 5+ ferramentas, o LLM pode combinar padrões: router → chain → parallel → fallback.`,
    },
    'en-us': {
      title: 'Multi-Tool Orchestration',
      body: `When we have **multiple tools** available, the LLM acts as an **intelligent orchestrator**, deciding which to use for each sub-problem.

### Example: Travel assistant

\`\`\`python
snippet:tool-calling/multi-tool-orchestration
\`\`\`

### Orchestration patterns

1. **Router** — picks ONE tool by relevance
2. **Chain** — uses tools in sequence (output of A → input of B)
3. **Fallback** — tries A, if fails tries B
4. **Parallel** — uses multiple tools simultaneously

> With 5+ tools, the LLM can combine patterns: router → chain → parallel → fallback.`,
    },
  },
  visual: {
    id: 'multi-tool-orchestration-visual',
    copy: {
      'pt-br': {
        titleLabel: 'Orquestração Multi-Ferramenta',
        routerLabel: 'Router',
        chainLabel: 'Chain',
        fallbackLabel: 'Fallback',
        searchToolLabel: 'search_web',
        calcToolLabel: 'calculate_budget',
        codeToolLabel: 'run_python',
        questionLabel: '"Planeje viagem para SP: voos < R$500"',
        decisionLabel: 'LLM decide: search_web → calculate_budget',
      },
      'en-us': {
        titleLabel: 'Multi-Tool Orchestration',
        routerLabel: 'Router',
        chainLabel: 'Chain',
        fallbackLabel: 'Fallback',
        searchToolLabel: 'search_web',
        calcToolLabel: 'calculate_budget',
        codeToolLabel: 'run_python',
        questionLabel: '"Plan trip to SP: flights < R$500"',
        decisionLabel: 'LLM decides: search_web → calculate_budget',
      },
    },
  },
});
