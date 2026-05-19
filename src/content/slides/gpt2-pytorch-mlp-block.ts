import { defineSlide } from './_factory';

export const gpt2PytorchMlpBlock = defineSlide({
  id: 'gpt2-pytorch-mlp-block',
  type: 'two-column',
  options: { columnRatios: [0.46, 0.54] },
  content: {
    'pt-br': {
      title: 'MLP do GPT-2 no repo',
      body: `Depois da atenção, o MLP expande e contrai o residual stream:

- \`C -> 4C\`
- GELU
- \`4C -> C\`
- dropout`,
      rightBody: `\`\`\`python
snippet:repo-gpt2/mlp
\`\`\``,
      codeExplanations: [
        { lineRange: [1, 9], content: 'A construção do MLP explicita as duas projeções lineares, a ativação GELU e o dropout.' },
        { lineRange: [10, 15], content: 'O forward segue a ordem exata do repo: expandir, ativar, contrair e regularizar.' },
      ],
    },
    'en-us': {
      title: 'The GPT-2 MLP in the repo',
      body: `After attention, the MLP expands and contracts the residual stream:

- \`C -> 4C\`
- GELU
- \`4C -> C\`
- dropout`,
      rightBody: `\`\`\`python
snippet:repo-gpt2/mlp
\`\`\``,
      codeExplanations: [
        { lineRange: [1, 9], content: 'The MLP construction makes the two linear projections, GELU, and dropout explicit.' },
        { lineRange: [10, 15], content: 'The forward path matches the repo: expand, activate, contract, and regularize.' },
      ],
    },
  },
});
