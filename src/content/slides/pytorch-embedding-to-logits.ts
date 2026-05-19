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

Esse slide fecha a ponte matematica: inteiro discreto -> vetor continuo -> distribuicao sobre vocabulario.

Leitura por etapa:
- \`Embedding\` preserva batch e tempo, mas troca inteiro por vetor
- \`Linear\` preserva batch e tempo, mas troca largura \`C\` por vocabulario \`V\``,
    },
    'en-us': {
      title: 'From embeddings to logits',
      body: `This is the first complete next-token prediction pipeline:

1. token IDs go into an \`Embedding\`
2. each token becomes a width-\`C\` vector in \`(B, T, C)\`
3. \`Linear(C, V)\` projects to \`(B, T, V)\`
4. each position now has one score per vocabulary token

This slide closes the math bridge: discrete integer -> continuous vector -> distribution over vocabulary.

Stage-by-stage reading:
- \`Embedding\` preserves batch and time, but swaps integer IDs for vectors
- \`Linear\` preserves batch and time, but swaps width \`C\` for vocabulary \`V\``,
    },
  },
  visual: {
    id: 'pytorch-architecture-blueprint',
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
        blueprintPanel: {
          title: 'Contrato de transformacao',
          subtitle: 'Apenas a ultima dimensao muda em cada etapa.',
          stages: [
            { label: 'IDs', title: 'O pipeline começa no espaço discreto', shape: '(B,T)', body: 'Cada posição carrega um inteiro que referencia o vocabulário. Ainda não existe geometria; só índice.', reading: 'Essa é a última vez que o modelo “vê” o token como ID puro.' },
            { label: 'Embedding', title: 'Lookup transforma índice em vetor', shape: '(B,T,C)', body: 'O lookup preserva batch e tempo, mas troca o símbolo por uma representação contínua de largura C.', reading: 'A semântica muda de “qual token é?” para “como esse token é representado?”.' },
            { label: 'Linear', title: 'Projeção final abre disputa no vocabulário', shape: '(B,T,V)', body: 'A última dimensão deixa de ser largura de representação e passa a ser placar de candidatos no vocabulário.', reading: 'Aqui fecha a ponte inteiro -> vetor -> logits.' },
          ],
          invariantsTitle: 'Invariantes',
          invariants: [
            'Batch e tempo são preservados nas duas transições.',
            'Só a última dimensão muda de papel em cada etapa.',
            'O significado final do tensor é “um score por token possível”.',
          ],
          diagnosticsTitle: 'Leitura operacional',
          diagnostics: [
            'Se `(B,T)` some, o problema não está na ideia do pipeline; está na implementação.',
            'Se `C` e `V` se confundem, você perdeu a distinção entre representação e decisão.',
            'O objetivo do slide é fixar a primeira cadeia completa de previsão de próximo token.',
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
        blueprintPanel: {
          title: 'Transformation contract',
          subtitle: 'Only the last dimension changes at each stage.',
          stages: [
            { label: 'IDs', title: 'The pipeline starts in discrete space', shape: '(B,T)', body: 'Each position carries an integer referencing the vocabulary. There is no geometry yet; only indices.', reading: 'This is the last time the model sees the token as a raw ID.' },
            { label: 'Embedding', title: 'Lookup turns index into vector', shape: '(B,T,C)', body: 'Lookup preserves batch and time while replacing the symbol with a width-C continuous representation.', reading: 'Semantics change from “which token is this?” to “how is this token represented?”.' },
            { label: 'Linear', title: 'Final projection opens vocabulary competition', shape: '(B,T,V)', body: 'The last dimension stops meaning representation width and starts meaning a scoreboard over the vocabulary.', reading: 'This closes the bridge integer -> vector -> logits.' },
          ],
          invariantsTitle: 'Invariants',
          invariants: [
            'Batch and time are preserved across both transitions.',
            'Only the last dimension changes role at each stage.',
            'The final tensor means “one score per possible token”.',
          ],
          diagnosticsTitle: 'Operational reading',
          diagnostics: [
            'If `(B,T)` disappears, the problem is not the pipeline idea but the implementation.',
            'If `C` and `V` get confused, you lost the distinction between representation and decision.',
            'The purpose of this slide is to lock in the first complete next-token pipeline.',
          ],
          footer: 'Interpretation: each T position gets a V-sized score vector.',
        },
      },
    },
  },
});
