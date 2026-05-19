import { defineSlide } from './_factory';

export const pytorchTokenBatch = defineSlide({
  id: 'pytorch-token-batch',
  type: 'two-column',
  options: { columnRatios: [0.52, 0.48] },
  content: {
    'pt-br': {
      title: 'Texto tokenizado vira batch',
      body: `O modelo não recebe frase solta; ele recebe **lotes temporais alinhados**.

No treino de próximo token, usamos duas visões do mesmo lote:
1. **entrada (\`x\`)**: sequência sem o último token;
2. **alvo (\`y\`)**: sequência sem o primeiro token.

Por que isso importa:
- cada posição de \`x\` aprende "quem vem depois" na mesma linha;
- o treino roda em paralelo nas posições (não token por token);
- uma única loss já resume erro de todo o lote.

Erros comuns aqui:
- deslocar \`x/y\` na direção errada;
- quebrar alinhamento ao cortar/padronizar sequência;
- flatten incorreto antes da cross-entropy.`,
    },
    'en-us': {
      title: 'Tokenized text becomes a batch',
      body: `The model does not receive isolated sentences; it receives **time-aligned sequence batches**.

For next-token training, we use two views of the same batch:
1. **input (\`x\`)**: sequence without the last token;
2. **target (\`y\`)**: sequence without the first token.

Why this matters:
- each position in \`x\` learns "what comes next" on the same row;
- training runs in parallel across positions (not token-by-token);
- one loss already summarizes error over the full batch.

Common mistakes:
- shifting \`x/y\` in the wrong direction;
- breaking alignment while slicing/padding sequences;
- wrong flatten before cross-entropy.`,
    },
  },
  visual: {
    id: 'token-batch-shift-interactive',
    copy: {
      'pt-br': {
        title: 'Deslocamento temporal interativo',
        subtitle: 'Escolha uma linha do batch e navegue posição por posição para ver qual par supervisionado entra na loss.',
        rowLabel: 'Lote',
        baseSequenceLabel: 'Sequência original (idx)',
        inputLabel: 'Entrada x = idx[:, :-1]',
        targetLabel: 'Alvo y = idx[:, 1:]',
        currentPairLabel: 'Par ativo de treino',
        parallelLabel: 'Supervisão paralela por linha',
        positionsPerRowLabel: 'posições supervisionadas',
        totalPairsLabel: 'pares supervisionados no batch',
        prevLabel: 'Anterior',
        nextLabel: 'Próximo',
        sequences: [
          ['Eu', 'gosto', 'de', 'PyTorch', '.'],
          ['Hoje', 'vamos', 'treinar', 'um', 'LM'],
        ],
      },
      'en-us': {
        title: 'Interactive temporal shift',
        subtitle: 'Pick a batch row and move step-by-step to inspect which supervised pair contributes to loss.',
        rowLabel: 'Batch',
        baseSequenceLabel: 'Original sequence (idx)',
        inputLabel: 'Input x = idx[:, :-1]',
        targetLabel: 'Target y = idx[:, 1:]',
        currentPairLabel: 'Active training pair',
        parallelLabel: 'Parallel supervision per row',
        positionsPerRowLabel: 'supervised positions',
        totalPairsLabel: 'supervised pairs in batch',
        prevLabel: 'Previous',
        nextLabel: 'Next',
        sequences: [
          ['I', 'like', 'using', 'PyTorch', '.'],
          ['Today', 'we', 'train', 'a', 'LM'],
        ],
      },
    },
  },
});
