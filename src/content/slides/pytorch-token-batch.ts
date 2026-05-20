import { defineSlide } from './_factory';

export const pytorchTokenBatch = defineSlide({
  id: 'pytorch-token-batch',
  type: 'two-column',
  options: { columnRatios: [0.52, 0.48] },
  content: {
    'pt-br': {
      title: 'Texto tokenizado vira batch',
      body: `No slide anterior, definimos o contrato de logits e loss. Falta fechar a engrenagem que gera esse treino: **como o mesmo tensor de IDs vira entrada e alvo ao mesmo tempo?**

O modelo não recebe frase solta; ele recebe **lotes temporais alinhados**.

No treino de próximo token, usamos duas visões do mesmo lote:
1. **entrada (\`x\`)**: sequência sem o último token;
2. **alvo (\`y\`)**: sequência sem o primeiro token.

Por que isso importa:
- cada posição de \`x\` aprende "quem vem depois" na mesma linha;
- o treino roda em paralelo nas posições (não token por token);
- uma única loss já resume erro de todo o lote.
- para isso, o flatten final trata cada posicao como um exemplo supervisionado independente para a **CE (cross-entropy)**.
- leitura operacional da CE: \`-log(p_token_correto)\`, média no lote (mesma família do log-loss/NLL).
- ponte com regressao: o papel estrutural da CE aqui e o mesmo do MSE antes (virar um escalar para backward).

Erros comuns aqui:
- deslocar \`x/y\` na direção errada;
- quebrar alinhamento ao cortar/padronizar sequência;
- flatten incorreto antes da cross-entropy.`,
    },
    'en-us': {
      title: 'Tokenized text becomes a batch',
      body: `In the previous slide, we defined the logits and loss contract. One mechanism is still missing: **how does the same ID tensor become both input and target?**

The model does not receive isolated sentences; it receives **time-aligned sequence batches**.

For next-token training, we use two views of the same batch:
1. **input (\`x\`)**: sequence without the last token;
2. **target (\`y\`)**: sequence without the first token.

Why this matters:
- each position in \`x\` learns "what comes next" on the same row;
- training runs in parallel across positions (not token-by-token);
- one loss already summarizes error over the full batch.
- the final flatten does that by treating each position as an independent supervised example for **CE (cross-entropy)**.
- operational CE view: \`-log(p_correct_token)\`, averaged over the batch (same log-loss/NLL family).
- bridge to regression: CE plays the same structural role MSE had before (produce one scalar for backward).

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
            { lineRange: [1, 3], content: 'Montamos um lote de IDs inteiros no formato `(B, T)`, representando várias sequências processadas em paralelo.' },
            { lineRange: [5, 6], content: 'Geramos `x` e `y` com deslocamento de uma posição: `x` vira a entrada e `y` vira o alvo de próximo token para cada posição.' },
            { lineRange: [8, 13], content: 'Simulamos logits no formato temporal e depois achatamos para o formato de classificação usado na cross-entropy.' },
            { lineRange: [15, 20], content: 'Os prints confirmam se os shapes finais realmente batem com o contrato esperado antes de calcular loss.' },
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
            { lineRange: [1, 3], content: 'We build a batch of integer token IDs in `(B, T)`, representing multiple sequences processed in parallel.' },
            { lineRange: [5, 6], content: 'We create a one-step shift: `x` becomes model input and `y` becomes next-token target for each position.' },
            { lineRange: [8, 13], content: 'We simulate temporal logits and then flatten them into the classification format required by cross-entropy.' },
            { lineRange: [15, 20], content: 'The prints verify whether final shapes match the expected loss contract before training step calculations.' },
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
