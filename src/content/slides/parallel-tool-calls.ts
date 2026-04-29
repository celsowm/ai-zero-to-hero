import { defineSlide } from './_factory';

export const parallelToolCalls = defineSlide({
  id: 'parallel-tool-calls',
  type: 'two-column',
  options: { columnRatios: [0.55, 0.45] },
  content: {
    'pt-br': {
      title: 'Chamadas Paralelas de Ferramentas',
      body: `Quando o usuário faz uma pergunta que requer **múltiplas ferramentas independentes**, o modelo pode solicitar **todas de uma vez**.

### Exemplo: Comparação de clima

\`\`\`python
snippet:tool-calling/parallel-example
\`\`\`

### Paralelo vs Sequencial

| | Sequencial | Paralelo |
|---|---|---|
| Chamadas | 1 → 2 → 3 | 1, 2, 3 simultâneo |
| Latência | ~3× tempo individual | ~1× tempo individual |
| Dependência | cada uma espera a anterior | independentes |

> O modelo retorna **múltiplos tool_calls** no mesmo message. O runtime executa todos e devolve os resultados juntos.`,
    },
    'en-us': {
      title: 'Parallel Tool Calls',
      body: `When the user asks something that requires **multiple independent tools**, the model can request **all at once**.

### Example: Weather comparison

\`\`\`python
snippet:tool-calling/parallel-example
\`\`\`

### Parallel vs Sequential

| | Sequential | Parallel |
|---|---|---|
| Calls | 1 → 2 → 3 | 1, 2, 3 simultaneous |
| Latency | ~3× individual time | ~1× individual time |
| Dependency | each waits for previous | independent |

> The model returns **multiple tool_calls** in the same message. The runtime executes all and returns results together.`,
    },
  },
  visual: {
    id: 'parallel-tool-calls-visual',
    copy: {
      'pt-br': {
        titleLabel: 'Paralelo vs Sequencial',
        singleLabel: 'Sequencial',
        parallelLabel: 'Paralelo',
        singleDesc: '3 chamadas × 2s = 6s total',
        parallelDesc: '3 chamadas simultâneas = 2s total',
        call1Label: 'get_weather(SP)',
        call2Label: 'get_weather(RJ)',
        call3Label: 'get_weather(BH)',
        sequentialTimeLabel: '6s',
        parallelTimeLabel: '2s',
        speedupLabel: '3× mais rápido',
      },
      'en-us': {
        titleLabel: 'Parallel vs Sequential',
        singleLabel: 'Sequential',
        parallelLabel: 'Parallel',
        singleDesc: '3 calls × 2s = 6s total',
        parallelDesc: '3 simultaneous calls = 2s total',
        call1Label: 'get_weather(SP)',
        call2Label: 'get_weather(RJ)',
        call3Label: 'get_weather(BH)',
        sequentialTimeLabel: '6s',
        parallelTimeLabel: '2s',
        speedupLabel: '3× faster',
      },
    },
  },
});
