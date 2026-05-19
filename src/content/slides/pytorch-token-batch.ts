import { defineSlide } from './_factory';

export const pytorchTokenBatch = defineSlide({
  id: 'pytorch-token-batch',
  type: 'two-column',
  options: { columnRatios: [0.52, 0.48] },
  content: {
    'pt-br': {
      title: 'Texto tokenizado vira batch',
      body: `O modelo nunca recebe frases soltas. Ele recebe **lotes** de inteiros.

No treino de next-token prediction, quase sempre fazemos duas visões do mesmo batch:

1. **\`x\`**: tudo menos o último token
2. **\`y\`**: tudo menos o primeiro token`,
      rightBody: `\`\`\`python
snippet:pytorch-lm/token-batch
\`\`\``,
      codeExplanations: [
        { lineRange: [1, 6], content: 'Montamos manualmente duas sequências tokenizadas para visualizar o formato do batch.' },
        { lineRange: [8, 10], content: '`idx`, `x` e `y` são o mesmo batch visto em três versões diferentes.' },
        { lineRange: [12, 14], content: 'Os prints mostram que o treino continua paralelo, mesmo com targets deslocados.' },
      ],
    },
    'en-us': {
      title: 'Tokenized text becomes a batch',
      body: `The model never receives loose sentences. It receives **batches** of integers.

In next-token training, we almost always build two views from the same batch:

1. **\`x\`**: everything except the last token
2. **\`y\`**: everything except the first token`,
      rightBody: `\`\`\`python
snippet:pytorch-lm/token-batch
\`\`\``,
      codeExplanations: [
        { lineRange: [1, 6], content: 'We manually build two tokenized sequences so the batch layout stays visible.' },
        { lineRange: [8, 10], content: '`idx`, `x`, and `y` are the same batch seen through three different views.' },
        { lineRange: [12, 14], content: 'The prints show that training stays parallel even though targets are shifted.' },
      ],
    },
  },
});
