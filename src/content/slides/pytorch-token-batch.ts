import { defineSlide } from './_factory';

export const pytorchTokenBatch = defineSlide({
  id: 'pytorch-token-batch',
  type: 'two-column',
  options: { columnRatios: [0.52, 0.48] },
  content: {
    'pt-br': {
      title: 'Texto tokenizado vira batch',
      body: `O modelo não recebe frases isoladas; ele recebe **lotes de sequências alinhadas**.

No treino de próximo token, usamos duas visões do mesmo lote:
1. **entrada (\`x\`)**: sequência sem o último token;
2. **alvo (\`y\`)**: sequência sem o primeiro token.

Por que isso importa:
- o cálculo é paralelo em todas as posições de tempo;
- cada posição aprende a prever seu próximo token;
- a perda já agrega todo o lote em uma atualização.

Erros comuns aqui:
- deslocar \`x/y\` na direção errada;
- misturar comprimentos de sequência no mesmo lote sem padding correto;
- esquecer que entrada e alvo precisam manter o mesmo shape final.`,
    },
    'en-us': {
      title: 'Tokenized text becomes a batch',
      body: `The model does not receive isolated sentences; it receives **aligned sequence batches**.

For next-token training, we use two views of the same batch:
1. **input (\`x\`)**: sequence without the last token;
2. **target (\`y\`)**: sequence without the first token.

Why this matters:
- compute runs in parallel across all time positions;
- each position learns to predict its next token;
- loss already aggregates across the full batch update.

Common mistakes:
- shifting \`x/y\` in the wrong direction;
- mixing sequence lengths in one batch without proper padding;
- forgetting input and target must keep matching final shapes.`,
    },
  },
  visual: {
    id: 'pytorch-dual-panel',
    copy: {
      'pt-br': {
        tabs: [{ label: 'Codigo' }, { label: 'Shape Trace' }],
        codePanel: {
          title: 'Batch com shift de target',
          description: 'Mostra lote bruto, deslocamento temporal e confirmação de shapes para treino paralelo.',
          source: { snippetId: 'pytorch-lm/token-batch', language: 'python' },
          codeExplanations: [
            { lineRange: [1, 6], content: 'Montamos sequências tokenizadas já no formato de lote.' },
            { lineRange: [8, 10], content: '`idx`, `x` e `y` são a mesma informação observada em três estágios.' },
            { lineRange: [12, 14], content: 'Os prints validam o deslocamento e o paralelismo por posição.' },
          ],
        },
        visualPanel: {
          title: 'Rastreamento do lote em treino',
          subtitle: 'Checklist operacional para garantir que o batch está pronto para loss.',
          items: [
            { label: 'Lote bruto (idx)', value: 'Matriz (B,T) com IDs inteiros antes do deslocamento.' },
            { label: 'Entrada (x)', value: 'Remove a última coluna: fica (B,T-1) para o forward.' },
            { label: 'Alvo (y)', value: 'Remove a primeira coluna: também (B,T-1), alinhado com x.' },
            { label: 'Paralelismo', value: 'Cada coluna de x produz logits para prever a coluna equivalente de y.' },
            { label: 'Perda', value: 'No flatten, todas as posições do lote entram juntas na cross-entropy.' },
            { label: 'Diagnóstico', value: 'Se loss não cai, primeiro confirme se y é realmente x deslocado +1.' },
          ],
          footer: 'Regra de ouro: direção do deslocamento define se o modelo aprende próximo token ou lixo.',
        },
      },
      'en-us': {
        tabs: [{ label: 'Code' }, { label: 'Shape Trace' }],
        codePanel: {
          title: 'Batch with target shift',
          description: 'Shows raw batch, temporal shift, and shape validation for parallel next-token training.',
          source: { snippetId: 'pytorch-lm/token-batch', language: 'python' },
          codeExplanations: [
            { lineRange: [1, 6], content: 'We build tokenized sequences already arranged as a batch.' },
            { lineRange: [8, 10], content: '`idx`, `x`, and `y` are the same information viewed in three stages.' },
            { lineRange: [12, 14], content: 'Prints validate temporal shift and per-position parallelism.' },
          ],
        },
        visualPanel: {
          title: 'Batch trace during training',
          subtitle: 'Operational checklist to ensure batch is valid before loss.',
          items: [
            { label: 'Raw batch (idx)', value: '(B,T) matrix of integer IDs before shifting.' },
            { label: 'Input (x)', value: 'Drops last column: (B,T-1) sent into forward.' },
            { label: 'Target (y)', value: 'Drops first column: also (B,T-1), aligned with x.' },
            { label: 'Parallelism', value: 'Each x column outputs logits to predict the matching y column.' },
            { label: 'Loss', value: 'After flattening, all batch positions are consumed together by cross-entropy.' },
            { label: 'Diagnostics', value: 'If loss stalls, first verify y is exactly x shifted by +1 token.' },
          ],
          footer: 'Golden rule: shift direction decides whether model learns next-token behavior or noise.',
        },
      },
    },
  },
});
