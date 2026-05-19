import { defineSlide } from './_factory';

export const pytorchEmbeddingToLogits = defineSlide({
  id: 'pytorch-embedding-to-logits',
  type: 'two-column',
  options: { columnRatios: [0.52, 0.48] },
  content: {
    'pt-br': {
      title: 'De embedding a logits',
      body: `Este é o esqueleto mínimo de um language model:

1. token ID entra em \`Embedding\`
2. cada token vira vetor \`C\`
3. uma projeção final produz scores para o vocabulário inteiro`,
      rightBody: `\`\`\`python
snippet:pytorch-lm/linear-to-logits
\`\`\``,
      codeExplanations: [
        { lineRange: [1, 4], content: 'Começamos definindo dimensões explícitas para ligar leitura de código à leitura do shape.' },
        { lineRange: [6, 7], content: 'Embedding e Linear já bastam para montar um mini pipeline de linguagem.' },
        { lineRange: [9, 11], content: 'O forward preserva `(B, T)` e troca cada ID por vetores e depois por logits.' },
        { lineRange: [13, 14], content: 'A última dimensão agora é o vocabulário: um score por token possível.' },
      ],
    },
    'en-us': {
      title: 'From embeddings to logits',
      body: `This is the minimum skeleton of a language model:

1. token IDs go into an \`Embedding\`
2. each token becomes a width-\`C\` vector
3. a final projection produces scores for the whole vocabulary`,
      rightBody: `\`\`\`python
snippet:pytorch-lm/linear-to-logits
\`\`\``,
      codeExplanations: [
        { lineRange: [1, 4], content: 'We start by naming dimensions explicitly so code reading stays tied to shape reading.' },
        { lineRange: [6, 7], content: 'Embedding plus Linear is already enough to form a tiny language pipeline.' },
        { lineRange: [9, 11], content: 'The forward pass preserves `(B, T)` and swaps IDs for vectors and then for logits.' },
        { lineRange: [13, 14], content: 'The last dimension is now the vocabulary: one score per possible token.' },
      ],
    },
  },
});
