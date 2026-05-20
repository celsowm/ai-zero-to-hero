import { defineSlide } from './_factory';

export const pytorchTokenBatch = defineSlide({
  id: 'pytorch-token-batch',
  type: 'two-column',
  options: { columnRatios: [0.52, 0.48] },
  content: {
    'pt-br': {
      title: 'Texto tokenizado vira batch',
      body: `Depois de definir o contrato de shape, falta uma pergunta operacional: **como o próximo-token training nasce do mesmo tensor de IDs?**

O modelo não recebe frase solta; ele recebe **lotes temporais alinhados**.

No treino de próximo token, usamos duas visões do mesmo lote:
1. **entrada (\`x\`)**: sequência sem o último token;
2. **alvo (\`y\`)**: sequência sem o primeiro token.

Por que isso importa:
- cada posição de \`x\` aprende "quem vem depois" na mesma linha;
- o treino roda em paralelo nas posições (não token por token);
- uma única loss já resume erro de todo o lote.
- para isso, o flatten final trata cada posicao como um exemplo supervisionado independente para a cross-entropy.

Erros comuns aqui:
- deslocar \`x/y\` na direção errada;
- quebrar alinhamento ao cortar/padronizar sequência;
- flatten incorreto antes da cross-entropy.`,
    },
    'en-us': {
      title: 'Tokenized text becomes a batch',
      body: `After defining the shape contract, one operational question remains: **how does next-token training emerge from the same ID tensor?**

The model does not receive isolated sentences; it receives **time-aligned sequence batches**.

For next-token training, we use two views of the same batch:
1. **input (\`x\`)**: sequence without the last token;
2. **target (\`y\`)**: sequence without the first token.

Why this matters:
- each position in \`x\` learns "what comes next" on the same row;
- training runs in parallel across positions (not token-by-token);
- one loss already summarizes error over the full batch.
- the final flatten does that by treating each position as an independent supervised example for cross-entropy.

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
        tabs: [{ label: 'Codigo' }, { label: 'Deslocamento' }],
        codePanel: {
          title: 'Shift + flatten para proximo token',
          description: 'O mesmo batch gera `x`, `y`, logits simulados e o flatten esperado pela cross-entropy.',
          source: { snippetId: 'pytorch-lm/token-batch-shift', language: 'python' },
          codeExplanations: [
            { lineRange: [1, 3], content: 'Definimos um batch de IDs inteiros no formato base `(B,T)`.' },
            { lineRange: [5, 6], content: 'Criamos `x` e `y` com deslocamento temporal: entrada sem ultimo token e alvo sem primeiro.' },
            { lineRange: [8, 13], content: 'Simulamos logits `(B,T-1,V)` e fazemos flatten para `(B*(T-1),V)` e `(B*(T-1))`.' },
            { lineRange: [15, 20], content: 'Os prints validam todo o contrato de shape usado na loss.' },
          ],
        },
        interactivePanel: {
          title: 'Deslocamento temporal interativo',
          subtitle: 'Escolha uma linha do batch e navegue posição por posição para ver qual par supervisionado entra na loss e depois no flatten.',
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
      },
      'en-us': {
        tabs: [{ label: 'Code' }, { label: 'Shift' }],
        codePanel: {
          title: 'Shift + flatten for next token',
          description: 'The same batch builds `x`, `y`, simulated logits, and the flatten format expected by cross-entropy.',
          source: { snippetId: 'pytorch-lm/token-batch-shift', language: 'python' },
          codeExplanations: [
            { lineRange: [1, 3], content: 'We define an integer ID batch in base `(B,T)` format.' },
            { lineRange: [5, 6], content: 'We build time-shifted `x` and `y`: input without last token and target without first token.' },
            { lineRange: [8, 13], content: 'We simulate logits `(B,T-1,V)` and flatten into `(B*(T-1),V)` and `(B*(T-1))`.' },
            { lineRange: [15, 20], content: 'Prints validate the full shape contract used by the loss.' },
          ],
        },
        interactivePanel: {
          title: 'Interactive temporal shift',
          subtitle: 'Pick a batch row and move step-by-step to inspect which supervised pair contributes to loss and then into flattening.',
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
  },
});
