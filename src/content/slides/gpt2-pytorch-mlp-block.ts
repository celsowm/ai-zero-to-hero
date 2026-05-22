import { defineSlide } from './_factory';

export const gpt2PytorchMlpBlock = defineSlide({
  id: 'gpt2-pytorch-mlp-block',
  type: 'two-column',
  options: { columnRatios: [0.46, 0.54] },
  content: {
    'pt-br': {
      title: 'MLP (perceptron multicamadas) do GPT-2 no repo',
      body: `Depois da atenção, o MLP (perceptron multicamadas) expande e contrai o residual stream:

- \`C -> 4C\`
- GELU (Gaussian Error Linear Unit, função de ativação)
- \`4C -> C\`
- dropout

Papel funcional do MLP no bloco:
- atenção mistura informação entre tokens
- MLP transforma cada token de forma não linear
- residual soma o resultado sem perder trilha anterior

Ponte com slide anterior:
- isso reaproveita exatamente o padrão de \`nn.Linear\` já visto, só que em pilha: \`C -> 4C -> C\`

Sinal de bug típico:
- se \`4C\` não volta para \`C\`, o residual não fecha`,
      rightBody: `\`\`\`python
snippet:repo-gpt2/mlp
\`\`\``,
      codeExplanations: [
        { lineRange: [1, 9], content: 'A construção do MLP explicita as duas projeções lineares, a ativação GELU e o dropout.' },
        { lineRange: [10, 15], content: 'O forward segue a ordem exata do repo: expandir, ativar, contrair e regularizar.' },
      ],
    },
    'en-us': {
      title: 'The GPT-2 MLP (multi-layer perceptron) in the repo',
      body: `After attention, the MLP (multi-layer perceptron) expands and contracts the residual stream:

- \`C -> 4C\`
- GELU (Gaussian Error Linear Unit activation)
- \`4C -> C\`
- dropout

Functional role of the MLP inside the block:
- attention mixes information across tokens
- MLP applies nonlinear transformation token-wise
- residual adds the result while preserving the previous stream

Bridge to the earlier slide:
- this reuses the exact \`nn.Linear\` pattern you already saw, now as a stack: \`C -> 4C -> C\`

Typical bug signal:
- if \`4C\` does not return to \`C\`, residual addition cannot close`,
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
