import { defineSlide } from './_factory';

export const reasoningCost = defineSlide({
  id: 'reasoning-cost',
  type: 'two-column',
  options: { columnRatios: [0.55, 0.45] },
  content: {
    'pt-br': {
      title: 'Custo e Latência',
      body: `Reasoning tem um preço: **mais tokens = mais custo + mais latência**. É crucial entender o tradeoff.

### Custo de Tokens

\`\`\`python
snippet:reasoning/cost-calculation
\`\`\`

### Comparação de Custo

| Modelo | Input/1M | Output/1M | Thinking/1M | Multiplicador |
|--------|----------|-----------|-------------|---------------|
| GPT-4o | $2.50 | $10.00 | N/A | 1x |
| o1 | $15.00 | $60.00 | $60.00 | ~6x |
| o3-mini | $1.10 | $4.40 | $4.40 | ~2x |
| DeepSeek-R1 | $0.14 | $2.19 | $2.19 | ~15x mais barato |

### Quando vale a pena?

- **Vale**: Problemas complexos, matemática, código crítico, análise profunda
- **Não vale**: Respostas simples, classificação, extração de dados, chat casual

### Otimização de Custo

\`\`\`python
snippet:reasoning/cost-optimization
\`\`\`

> Reasoning é como consultar um especialista: caro, mas vale para problemas difíceis.`,
    },
    'en-us': {
      title: 'Cost and Latency',
      body: `Reasoning has a price: **more tokens = more cost + more latency**. It's crucial to understand the tradeoff.

### Token Cost

\`\`\`python
snippet:reasoning/cost-calculation
\`\`\`

### Cost Comparison

| Model | Input/1M | Output/1M | Thinking/1M | Multiplier |
|-------|----------|-----------|-------------|------------|
| GPT-4o | $2.50 | $10.00 | N/A | 1x |
| o1 | $15.00 | $60.00 | $60.00 | ~6x |
| o3-mini | $1.10 | $4.40 | $4.40 | ~2x |
| DeepSeek-R1 | $0.14 | $2.19 | $2.19 | ~15x cheaper |

### When is it worth it?

- **Worth it**: Complex problems, math, critical code, deep analysis
- **Not worth it**: Simple answers, classification, data extraction, casual chat

### Cost Optimization

\`\`\`python
snippet:reasoning/cost-optimization
\`\`\`

> Reasoning is like consulting a specialist: expensive, but worth it for hard problems.`,
    },
  },
  visual: {
    id: 'reasoning-cost-visual',
    copy: {
      'pt-br': {
        title: 'Custo: Normal vs Reasoning',
        normalLabel: 'GPT-4o (normal)',
        reasoningLabel: 'o1 (reasoning)',
        normalCost: '$10/M tokens output',
        reasoningCost: '$60/M tokens (thinking incluso)',
        normalTime: '~2s resposta',
        reasoningTime: '~10-30s resposta',
        savingsLabel: 'DeepSeek-R1: 15x mais barato',
      },
      'en-us': {
        title: 'Cost: Normal vs Reasoning',
        normalLabel: 'GPT-4o (normal)',
        reasoningLabel: 'o1 (reasoning)',
        normalCost: '$10/M output tokens',
        reasoningCost: '$60/M tokens (thinking included)',
        normalTime: '~2s response',
        reasoningTime: '~10-30s response',
        savingsLabel: 'DeepSeek-R1: 15x cheaper',
      },
    },
  },
});
