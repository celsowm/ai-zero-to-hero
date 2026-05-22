import { defineSlide } from './_factory';

export const gpt2PytorchMlpBlock = defineSlide({
  id: 'gpt2-pytorch-mlp-block',
  type: 'two-column',
  options: { columnRatios: [0.46, 0.54] },
  content: {
    'pt-br': {
      title: 'MLP do bloco GPT-2',
      body: `Depois da atenção, o MLP (perceptron multicamadas) expande e contrai o residual stream:

- \`C -> 4C\`
- GELU (Gaussian Error Linear Unit, função de ativação)
- \`4C -> C\`
- dropout

Papel funcional do MLP no bloco:
- atenção mistura informação entre tokens
- MLP transforma cada token de forma não linear
- residual soma o resultado sem perder trilha anterior

Ponte com slides anteriores:
- reaproveitamos o padrão \`nn.Linear\` em pilha: \`C -> 4C -> C\`

Sinal de bug típico:
- se \`4C\` não volta para \`C\`, o residual não fecha`,
      rightBody: `\`\`\`python
snippet:gpt2_manual/mlp
\`\`\``,
      codeExplanations: [
        { lineRange: [1, 9], content: 'A construção explicita duas projeções lineares, ativação GELU e dropout.' },
        { lineRange: [10, 15], content: 'O forward segue a ordem: expandir, ativar, contrair e regularizar.' },
      ],
    },
    'en-us': {
      title: 'MLP inside the GPT-2 block',
      body: `After attention, the MLP (multi-layer perceptron) expands and contracts the residual stream:

- \`C -> 4C\`
- GELU (Gaussian Error Linear Unit activation)
- \`4C -> C\`
- dropout

Functional role of the MLP inside the block:
- attention mixes information across tokens
- MLP applies nonlinear transformation token-wise
- residual adds the result while preserving previous signal

Bridge to earlier slides:
- we reuse the \`nn.Linear\` stack pattern: \`C -> 4C -> C\`

Typical bug signal:
- if \`4C\` does not return to \`C\`, residual addition cannot close`,
      rightBody: `\`\`\`python
snippet:gpt2_manual/mlp
\`\`\``,
      codeExplanations: [
        { lineRange: [1, 9], content: 'The construction shows two linear projections, GELU, and dropout.' },
        { lineRange: [10, 15], content: 'Forward order is: expand, activate, contract, and regularize.' },
      ],
    },
  },
});

