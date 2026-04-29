import { defineSlide } from './_factory';

export const reasoningComparison = defineSlide({
  id: 'reasoning-comparison',
  type: 'two-column',
  options: { columnRatios: [0.55, 0.45] },
  content: {
    'pt-br': {
      title: 'Benchmarks de Reasoning',
      body: `Como os reasoning models se comparam em benchmarks de raciocínio?

### AIME 2024 (Matemática Olímpica)

| Modelo | Accuracy | Thinking? | Preço/1M |
|--------|----------|-----------|----------|
| GPT-4o | 13.4% | Não | $12.50 |
| o1 | 83.3% | Sim (long) | $75 |
| o3-mini | 79.6% | Sim (medium) | $5.50 |
| DeepSeek-R1 | 79.8% | Sim (long) | $2.33 |
| Claude 3.5 | 38.2% | Não | $15 |

### GPQA (PhD-Level Science)

| Modelo | Accuracy | Thinking? |
|--------|----------|-----------|
| GPT-4o | 39% | Não |
| o1 | 78% | Sim |
| Claude 3.5 Sonnet | 59% | Não |
| DeepSeek-R1 | 71.5% | Sim |

### O que esses benchmarks mostram

- Reasoning models **dominam** em tarefas de raciocínio puro
- Modelos sem reasoning têm **teto** em problemas complexos
- DeepSeek-R1 entrega **performance similar a o1** por fração do custo

### Interactive Comparison

\`\`\`python
snippet:reasoning/benchmark-comparison
\`\`\`

> Para matemática e ciência, reasoning não é opcional — é **necessário** para alta accuracy.`,
    },
    'en-us': {
      title: 'Reasoning Benchmarks',
      body: `How do reasoning models compare on reasoning benchmarks?

### AIME 2024 (Olympiad Math)

| Model | Accuracy | Thinking? | Price/1M |
|-------|----------|-----------|----------|
| GPT-4o | 13.4% | No | $12.50 |
| o1 | 83.3% | Yes (long) | $75 |
| o3-mini | 79.6% | Yes (medium) | $5.50 |
| DeepSeek-R1 | 79.8% | Yes (long) | $2.33 |
| Claude 3.5 | 38.2% | No | $15 |

### GPQA (PhD-Level Science)

| Model | Accuracy | Thinking? |
|-------|----------|-----------|
| GPT-4o | 39% | No |
| o1 | 78% | Yes |
| Claude 3.5 Sonnet | 59% | No |
| DeepSeek-R1 | 71.5% | Yes |

### What these benchmarks show

- Reasoning models **dominate** in pure reasoning tasks
- Non-reasoning models have a **ceiling** on complex problems
- DeepSeek-R1 delivers **o1-like performance** at a fraction of the cost

### Interactive Comparison

\`\`\`python
snippet:reasoning/benchmark-comparison
\`\`\`

> For math and science, reasoning isn't optional — it's **necessary** for high accuracy.`,
    },
  },
  visual: {
    id: 'reasoning-comparison-visual',
    copy: {
      'pt-br': {
        title: 'Benchmarks: AIME 2024',
        modelLabel: 'Modelo',
        accuracyLabel: 'Accuracy',
        costLabel: 'Custo/1M',
        gpt4Label: 'GPT-4o: 13.4%',
        o1Label: 'o1: 83.3%',
        o3Label: 'o3-mini: 79.6%',
        r1Label: 'DeepSeek-R1: 79.8%',
        claudeLabel: 'Claude 3.5: 38.2%',
      },
      'en-us': {
        title: 'Benchmarks: AIME 2024',
        modelLabel: 'Model',
        accuracyLabel: 'Accuracy',
        costLabel: 'Cost/1M',
        gpt4Label: 'GPT-4o: 13.4%',
        o1Label: 'o1: 83.3%',
        o3Label: 'o3-mini: 79.6%',
        r1Label: 'DeepSeek-R1: 79.8%',
        claudeLabel: 'Claude 3.5: 38.2%',
      },
    },
  },
});
