import { defineSlide } from './_factory';

export const pytorchEmbeddingToLogits = defineSlide({
  id: 'pytorch-embedding-to-logits',
  type: 'two-column',
  options: { columnRatios: [0.52, 0.48] },
  content: {
    'pt-br': {
      title: 'De embedding a logits',
      body: `Este e o primeiro pipeline completo de previsao de proximo token:

1. token ID entra em \`Embedding\`
2. cada token vira vetor \`C\` em \`(B, T, C)\`
3. \`Linear(C, V)\` projeta para \`(B, T, V)\`
4. cada posicao passa a ter um score para cada token do vocabulario

Esse slide fecha a ponte matematica: inteiro discreto -> vetor continuo -> distribuicao sobre vocabulario.`,
    },
    'en-us': {
      title: 'From embeddings to logits',
      body: `This is the first complete next-token prediction pipeline:

1. token IDs go into an \`Embedding\`
2. each token becomes a width-\`C\` vector in \`(B, T, C)\`
3. \`Linear(C, V)\` projects to \`(B, T, V)\`
4. each position now has one score per vocabulary token

This slide closes the math bridge: discrete integer -> continuous vector -> distribution over vocabulary.`,
    },
  },
  visual: {
    id: 'pytorch-dual-panel',
    copy: {
      'pt-br': {
        tabs: [{ label: 'Codigo' }, { label: 'Shapes' }],
        codePanel: {
          title: 'Embedding para logits',
          description: 'Pipeline minimo: lookup de embedding seguido de projecao Linear para o vocabulario.',
          source: { snippetId: 'pytorch-lm/linear-to-logits', language: 'python' },
          codeExplanations: [
            { lineRange: [1, 4], content: 'Definimos dimensoes para conectar leitura de codigo com leitura de shape.' },
            { lineRange: [6, 7], content: 'Embedding e Linear bastam para montar o pipeline de linguagem.' },
            { lineRange: [9, 11], content: 'O forward preserva `(B, T)` e troca IDs por vetores e depois por logits.' },
            { lineRange: [13, 14], content: 'A ultima dimensao vira vocabulario: um score por token possivel.' },
          ],
        },
        visualPanel: {
          title: 'Contrato de transformacao',
          subtitle: 'Apenas a ultima dimensao muda em cada etapa.',
          items: [
            { label: 'Entrada', value: 'idx -> (B, T) inteiros.' },
            { label: 'Lookup', value: 'embedding(idx) -> (B, T, C).' },
            { label: 'Projecao', value: 'linear(x) -> (B, T, V).' },
          ],
          footer: 'Interpretacao: cada posicao de T ganha um vetor de V scores candidatos.',
        },
      },
      'en-us': {
        tabs: [{ label: 'Code' }, { label: 'Shapes' }],
        codePanel: {
          title: 'Embedding to logits',
          description: 'Minimum pipeline: embedding lookup followed by Linear projection into vocabulary space.',
          source: { snippetId: 'pytorch-lm/linear-to-logits', language: 'python' },
          codeExplanations: [
            { lineRange: [1, 4], content: 'We define dimensions to keep code reading tied to shape reading.' },
            { lineRange: [6, 7], content: 'Embedding plus Linear is enough to form the language pipeline.' },
            { lineRange: [9, 11], content: 'Forward preserves `(B, T)` and swaps IDs for vectors, then logits.' },
            { lineRange: [13, 14], content: 'Last dimension becomes vocabulary: one score per candidate token.' },
          ],
        },
        visualPanel: {
          title: 'Transformation contract',
          subtitle: 'Only the last dimension changes at each stage.',
          items: [
            { label: 'Input', value: 'idx -> (B, T) integers.' },
            { label: 'Lookup', value: 'embedding(idx) -> (B, T, C).' },
            { label: 'Projection', value: 'linear(x) -> (B, T, V).' },
          ],
          footer: 'Interpretation: each T position gets a V-sized score vector.',
        },
      },
    },
  },
});
