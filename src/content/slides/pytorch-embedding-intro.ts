import { defineSlide } from './_factory';

export const pytorchEmbeddingIntro = defineSlide({
  id: 'pytorch-embedding-intro',
  type: 'two-column',
  options: { columnRatios: [0.54, 0.46] },
  content: {
    'pt-br': {
      title: 'Embedding: de ID inteiro para vetor',
      body: `Antes de projetar para logits, precisamos fixar o papel do \`Embedding\`.

Um token ID (ex: \`42\`) e um inteiro sem geometria. O embedding resolve isso com uma tabela treinavel:

1. cada linha da tabela representa um token do vocabulario
2. a largura da linha e \`C\` (hidden size)
3. fazer \`embedding(idx)\` troca \`(B, T)\` por \`(B, T, C)\`

Por que existe assim:
- conceitualmente, isso equivale a fazer \`one-hot @ W\`
- na pratica, \`Embedding\` e um lookup muito mais eficiente: pega so a linha necessaria
- a tabela continua treinavel, entao o modelo aprende a geometria util desses vetores

Intuicao pratica:
- IDs sao indice
- embedding e memoria parametrica
- saida ja esta pronta para as proximas camadas do modelo`,
      rightBody: `\`\`\`python
snippet:pytorch-lm/embedding-intro
\`\`\``,
      codeExplanations: [
        { lineRange: [1, 5], content: 'Definimos vocabulario e largura do vetor, e inicializamos a tabela de embeddings.' },
        { lineRange: [6, 8], content: 'O batch de entrada ainda e inteiro: cada numero aponta para uma linha da tabela.' },
        { lineRange: [10, 13], content: 'A consulta produz vetores densos e permite inspecionar o mapeamento ID -> vetor.' },
      ],
    },
    'en-us': {
      title: 'Embedding: from integer ID to vector',
      body: `Before projecting to logits, we need to lock in what \`Embedding\` does.

A token ID (for example \`42\`) is just an integer with no geometry. Embedding fixes this with a trainable table:

1. each row stands for one vocabulary token
2. row width is \`C\` (hidden size)
3. calling \`embedding(idx)\` turns \`(B, T)\` into \`(B, T, C)\`

Why it exists in this form:
- conceptually, this is equivalent to \`one-hot @ W\`
- in practice, \`Embedding\` is a much more efficient lookup: it fetches only the needed row
- the table is still trainable, so the model learns useful vector geometry

Practical intuition:
- IDs are indexes
- embedding is parametric memory
- output is now ready for the next model layers`,
      rightBody: `\`\`\`python
snippet:pytorch-lm/embedding-intro
\`\`\``,
      codeExplanations: [
        { lineRange: [1, 5], content: 'We define vocabulary size and vector width, then initialize the embedding table.' },
        { lineRange: [6, 8], content: 'Input batches are still integers: each number indexes one table row.' },
        { lineRange: [10, 13], content: 'The lookup returns dense vectors and makes the ID -> vector mapping concrete.' },
      ],
    },
  },
});
