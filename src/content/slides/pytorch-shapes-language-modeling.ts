import { defineSlide } from './_factory';

export const pytorchShapesLanguageModeling = defineSlide({
  id: 'pytorch-shapes-language-modeling',
  type: 'two-column',
  options: { columnRatios: [0.58, 0.42] },
  content: {
    'pt-br': {
      title: 'Convencoes de shape para LM (language model)',
      body: `Agora formalizamos o dicionário e introduzimos o termo novo deste bloco: **logits**.

O que são logits:
- são **scores brutos** que o modelo gera para cada token do vocabulário;
- ainda **não são probabilidades**;
- viram probabilidades depois de uma normalização (softmax), feita internamente pela cross-entropy no treino.

- **B** = batch
- **T** = sequência
- **C** = hidden size
- **V** = vocabulário

Contrato mínimo de treino:
- \`idx\` e \`targets\` sempre inteiros em \`(B, T)\`
- hidden states em \`(B, T, C)\`
- logits em \`(B, T, V)\` = para cada posição temporal, um vetor de \`V\` scores
- flatten para loss: \`logits -> (B*T, V)\` e \`targets -> (B*T)\`

Invariantes de sanidade:
1. \`idx/targets\` usam \`torch.long\`
2. tensores comparados na loss ficam no mesmo device
3. loss final é escalar`,
    },
    'en-us': {
      title: 'Shape conventions for LM (language model)',
      body: `Now we formalize the dictionary and introduce the new term in this block: **logits**.

What logits are:
- they are **raw scores** the model outputs for each vocabulary token;
- they are **not probabilities yet**;
- they become probabilities after normalization (softmax), applied internally by cross-entropy during training.

- **B** = batch
- **T** = sequence
- **C** = hidden size
- **V** = vocabulary

Minimum training contract:
- \`idx\` and \`targets\` are always integer tensors in \`(B, T)\`
- hidden states are \`(B, T, C)\`
- logits are \`(B, T, V)\` = for each time position, one vector of \`V\` scores
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
          title: 'Pipeline de shape + significado dos logits',
          subtitle: 'Ordem para depurar forward e entender o que cada tensor representa.',
          items: [
            { label: '1) Entrada', value: 'idx e targets em (B,T), dtype inteiro.' },
            { label: '2) Estado interno', value: 'hidden em (B,T,C): largura C por token.' },
            { label: '3) Logits (novo conceito)', value: 'logits em (B,T,V): scores brutos por token do vocabulário, antes de probabilidade.' },
            { label: '4) Flatten', value: 'logits -> (B*T,V) e targets -> (B*T) antes da loss.' },
            { label: '5) Loss', value: 'cross-entropy compara logits com target e internamente resolve softmax + penalização.' },
            { label: '6) Device/Dtype', value: 'targets inteiros e mesmo device dos logits para evitar erro silencioso ou crash.' },
          ],
          footer: 'Regra mental: logits = “placar” do vocabulário; probabilidade é etapa posterior.',
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
          title: 'Shape pipeline + logits semantics',
          subtitle: 'Order to debug forward while understanding tensor meaning.',
          items: [
            { label: '1) Input', value: 'idx and targets in (B,T), integer dtype.' },
            { label: '2) Internal state', value: 'hidden in (B,T,C): C-width representation per token.' },
            { label: '3) Logits (new concept)', value: 'logits in (B,T,V): raw vocabulary scores before probabilities.' },
            { label: '4) Flatten', value: 'logits -> (B*T,V) and targets -> (B*T) before loss.' },
            { label: '5) Loss', value: 'cross-entropy compares logits and targets, internally handling softmax + penalty.' },
            { label: '6) Device/Dtype', value: 'targets must be integer and on same device as logits.' },
          ],
          footer: 'Mental rule: logits are the vocabulary scoreboard; probabilities come later.',
        },
      },
    },
  },
});
