import { defineSlide } from './_factory';

export const reasoningLimitations = defineSlide({
  id: 'reasoning-limitations',
  type: 'two-column',
  options: { columnRatios: [0.55, 0.45] },
  content: {
    'pt-br': {
      title: 'Limitações e Riscos',
      body: `Reasoning não é bala de prata. Tem problemas específicos que você precisa conhecer antes de usar em produção.

### Overthinking

O modelo pode gerar **pensamento demais** para problemas simples, aumentando custo e latência desnecessariamente.

\`\`\`python
snippet:reasoning/overthinking-example
\`\`\`

### Reasoning Loops

O modelo pode entrar em **loop de raciocínio** — pensar, duvidar, repensar, e nunca chegar a uma resposta.

### Quando Reasoning Piora

- **Perguntas subjetivas**: "O que é beleza?" — reasoning não ajuda
- **Criatividade**: Thinking pode **inibir** respostas criativas
- **Fatos simples**: "Capital da França?" — raciocínio é overhead

### Mitigação

\`\`\`python
snippet:reasoning/fallback-strategy
\`\`\`

### Custo Imprevisível

Thinking tokens variam muito. Uma pergunta pode gerar 100 tokens ou 5000 — difícil de estimar budget.

> Reasoning é poderoso, mas como qualquer ferramenta: use no contexto certo.`,
    },
    'en-us': {
      title: 'Limitations and Risks',
      body: `Reasoning isn't a silver bullet. It has specific issues you need to know before using in production.

### Overthinking

The model can generate **too much thought** for simple problems, increasing cost and latency unnecessarily.

\`\`\`python
snippet:reasoning/overthinking-example
\`\`\`

### Reasoning Loops

The model can enter a **reasoning loop** — think, doubt, rethink, and never reach an answer.

### When Reasoning Makes Things Worse

- **Subjective questions**: "What is beauty?" — reasoning doesn't help
- **Creativity**: Thinking can **inhibit** creative responses
- **Simple facts**: "Capital of France?" — reasoning is overhead

### Mitigation

\`\`\`python
snippet:reasoning/fallback-strategy
\`\`\`

### Unpredictable Cost

Thinking tokens vary widely. A question might generate 100 tokens or 5000 — hard to estimate budget.

> Reasoning is powerful, but like any tool: use it in the right context.`,
    },
  },
  visual: {
    id: 'reasoning-limitations-visual',
    copy: {
      'pt-br': {
        title: 'Quando usar Reasoning',
        goodLabel: 'Bom para Reasoning',
        goodMath: 'Matemática complexa',
        goodCode: 'Debug de código',
        goodAnalysis: 'Análise profunda',
        badLabel: 'Ruim para Reasoning',
        badSimple: 'Perguntas simples',
        badCreative: 'Criatividade',
        badSubjective: 'Opiniões subjetivas',
      },
      'en-us': {
        title: 'When to use Reasoning',
        goodLabel: 'Good for Reasoning',
        goodMath: 'Complex math',
        goodCode: 'Code debugging',
        goodAnalysis: 'Deep analysis',
        badLabel: 'Bad for Reasoning',
        badSimple: 'Simple questions',
        badCreative: 'Creativity',
        badSubjective: 'Subjective opinions',
      },
    },
  },
});
