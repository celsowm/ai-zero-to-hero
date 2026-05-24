import { defineSlide } from './_factory';

export const gpt2PytorchE2eDebugger = defineSlide({
  id: 'gpt2-pytorch-e2e-debugger',
  type: 'two-column',
  options: { columnRatios: [0.44, 0.56] },
  content: {
    'pt-br': {
      title: 'Debug de GPT: shape, dtype, device, range e NaN',
      body: `Debug de GPT quase sempre começa em cinco coisas:

1. shape
2. dtype
3. device
4. range de token
5. NaN

Sequência recomendada:

- valide \`idx.dtype == torch.long\`
- confirme \`idx.max() < vocab_size\`
- confira \`T <= block_size\`
- garanta que modelo, \`x\` e \`y\` estão no mesmo device
- cheque se a loss virou NaN
- imprima shapes internos até localizar o primeiro contrato quebrado

Regra prática: depure por contrato antes de mexer em hiperparâmetro.`,
      rightBody: `\`\`\`python
snippet:gpt2_manual/debug-checklist
\`\`\``,
      codeExplanations: [
        { lineRange: [1, 10], content: 'O primeiro bloco confirma shape, dtype, device, range de tokens e contexto máximo.' },
        { lineRange: [12, 17], content: 'O segundo bloco verifica se modelo e dados estão no mesmo device.' },
        { lineRange: [19, 20], content: 'A checagem de NaN separa bug de shape de instabilidade numérica.' },
        { lineRange: [22, 31], content: 'Os prints internos localizam em qual etapa o contrato de shape deixou de fechar.' },
      ],
    },
    'en-us': {
      title: 'GPT debugging: shape, dtype, device, range, and NaN',
      body: `GPT debugging almost always starts with five things:

1. shape
2. dtype
3. device
4. token range
5. NaN

Recommended sequence:

- validate \`idx.dtype == torch.long\`
- confirm \`idx.max() < vocab_size\`
- check \`T <= block_size\`
- make sure model, \`x\`, and \`y\` are on the same device
- check whether loss became NaN
- print internal shapes until you find the first broken contract

Practical rule: debug contracts before changing hyperparameters.`,
      rightBody: `\`\`\`python
snippet:gpt2_manual/debug-checklist
\`\`\``,
      codeExplanations: [
        { lineRange: [1, 10], content: 'The first block confirms shape, dtype, device, token range, and maximum context.' },
        { lineRange: [12, 17], content: 'The second block verifies whether model and data are on the same device.' },
        { lineRange: [19, 20], content: 'The NaN check separates shape bugs from numerical instability.' },
        { lineRange: [22, 31], content: 'Internal prints locate which step first broke the shape contract.' },
      ],
    },
  },
});
