import { defineSlide } from './_factory';

export const pytorchShapesLanguageModeling = defineSlide({
  id: 'pytorch-shapes-language-modeling',
  type: 'two-column',
  options: { columnRatios: [0.58, 0.42] },
  content: {
    'pt-br': {
      title: 'Convencoes de shape para LM (language model)',
      body: `Agora sim formalizamos o dicionario curto usado no restante do bloco:

- **B** = batch
- **T** = sequência
- **C** = hidden size
- **V** = vocabulário

Contrato mínimo de treino:
- \`idx\` e \`targets\` sempre inteiros em \`(B, T)\`
- hidden states em \`(B, T, C)\`
- logits em \`(B, T, V)\`
- flatten para loss: \`logits -> (B*T, V)\` e \`targets -> (B*T)\`

Invariantes de sanidade:
1. \`idx/targets\` usam \`torch.long\`
2. tensores comparados na loss ficam no mesmo device
3. loss final é escalar`,
    },
    'en-us': {
      title: 'Shape conventions for LM (language model)',
      body: `Now we formalize the short dictionary used across the next slides:

- **B** = batch
- **T** = sequence
- **C** = hidden size
- **V** = vocabulary

Minimum training contract:
- \`idx\` and \`targets\` are always integer tensors in \`(B, T)\`
- hidden states are \`(B, T, C)\`
- logits are \`(B, T, V)\`
- loss flattening: \`logits -> (B*T, V)\` and \`targets -> (B*T)\`

Sanity invariants:
1. \`idx/targets\` use \`torch.long\`
2. tensors in the loss are on the same device
3. final loss is scalar`,
    },
  },
  visual: {
    id: 'pytorch-dual-panel',
    copy: {
      'pt-br': {
        tabs: [{ label: 'Codigo' }, { label: 'Shape Trace' }],
        codePanel: {
          title: 'Contrato de shape completo',
          description: 'Snippet curto para validar shape, dtype, flatten e loss em uma passada.',
          source: { snippetId: 'pytorch-lm/shape-contract', language: 'python' },
          codeExplanations: [
            { lineRange: [1, 4], content: 'Definimos o dicionário B/T/C/V e preparamos cross-entropy.' },
            { lineRange: [6, 9], content: 'Criamos entrada, alvo, estados e logits no contrato esperado.' },
            { lineRange: [11, 13], content: 'Flatten transforma saída e alvo para o formato exigido pela loss.' },
            { lineRange: [15, 21], content: 'Impressões finais checam shape, dtype, device e escalar da loss.' },
          ],
        },
        visualPanel: {
          title: 'Pipeline de shape em 6 checkpoints',
          subtitle: 'Use esta ordem para depurar qualquer forward de language modeling.',
          items: [
            { label: '1) Entrada', value: 'idx e targets em (B,T), dtype inteiro.' },
            { label: '2) Estado interno', value: 'hidden em (B,T,C): largura C por token.' },
            { label: '3) Saída bruta', value: 'logits em (B,T,V): score por token e por item do vocabulário.' },
            { label: '4) Flatten', value: 'logits -> (B*T,V) e targets -> (B*T) antes da loss.' },
            { label: '5) Device', value: 'logits e targets devem estar no mesmo device para evitar crash.' },
            { label: '6) Loss', value: 'cross-entropy retorna escalar; se não retornar, contrato quebrou.' },
          ],
          footer: 'Diagnóstico rápido: 80% dos bugs de treino aparecem em dtype, shape ou flatten.',
        },
      },
      'en-us': {
        tabs: [{ label: 'Code' }, { label: 'Shape Trace' }],
        codePanel: {
          title: 'Full shape contract',
          description: 'Compact snippet to validate shape, dtype, flattening, and loss in one pass.',
          source: { snippetId: 'pytorch-lm/shape-contract', language: 'python' },
          codeExplanations: [
            { lineRange: [1, 4], content: 'We define the B/T/C/V dictionary and prepare cross-entropy.' },
            { lineRange: [6, 9], content: 'We create input, target, hidden states, and logits in the expected contract.' },
            { lineRange: [11, 13], content: 'Flattening adapts outputs/targets to the loss-required format.' },
            { lineRange: [15, 21], content: 'Final prints verify shape, dtype, device, and scalar loss.' },
          ],
        },
        visualPanel: {
          title: 'Shape pipeline in 6 checkpoints',
          subtitle: 'Use this order to debug any language-model forward pass.',
          items: [
            { label: '1) Input', value: 'idx and targets in (B,T), integer dtype.' },
            { label: '2) Internal state', value: 'hidden in (B,T,C): C-width representation per token.' },
            { label: '3) Raw output', value: 'logits in (B,T,V): score per token and vocabulary entry.' },
            { label: '4) Flatten', value: 'logits -> (B*T,V) and targets -> (B*T) before loss.' },
            { label: '5) Device', value: 'logits and targets must share device to avoid runtime failure.' },
            { label: '6) Loss', value: 'cross-entropy must return a scalar; otherwise contract is broken.' },
          ],
          footer: 'Fast diagnosis: most training bugs start at dtype, shape, or flatten mismatch.',
        },
      },
    },
  },
});
