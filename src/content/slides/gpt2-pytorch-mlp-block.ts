import { defineSlide } from './_factory';

export const gpt2PytorchMlpBlock = defineSlide({
  id: 'gpt2-pytorch-mlp-block',
  type: 'two-column',
  options: { columnRatios: [0.46, 0.54] },
  content: {
    'pt-br': {
      title: 'MLP: C -> 4C -> C',
      body: `Depois da atenção, o MLP expande e contrai o residual stream.

Mensagem central:

- atenção mistura informação entre tokens
- MLP transforma cada token individualmente

Contrato:
- entrada: \`(B,T,C)\`
- expansão: \`(B,T,4C)\`
- saída: \`(B,T,C)\`

Operações:
1. \`Linear(C, 4C)\`
2. \`GELU(approximate="tanh")\`
3. \`Linear(4C, C)\`
4. dropout

Erro comum: se a projeção final não volta para \`C\`, a soma residual no bloco quebra.`,
      rightBody: `\`\`\`python
snippet:gpt2_manual/mlp
\`\`\``,
      codeExplanations: [
        { lineRange: [1, 25], content: 'A classe declara a expansão `C -> 4C`, GELU, projeção `4C -> C` e dropout.' },
        { lineRange: [26, 27], content: 'O forward aplica as operações em sequência e devolve o mesmo shape final de entrada.' },
      ],
    },
    'en-us': {
      title: 'MLP: C -> 4C -> C',
      body: `After attention, the MLP expands and contracts the residual stream.

Central message:

- attention mixes information across tokens
- MLP transforms each token independently

Contract:
- input: \`(B,T,C)\`
- expansion: \`(B,T,4C)\`
- output: \`(B,T,C)\`

Operations:
1. \`Linear(C, 4C)\`
2. \`GELU(approximate="tanh")\`
3. \`Linear(4C, C)\`
4. dropout

Common error: if the final projection does not return to \`C\`, residual addition in the block breaks.`,
      rightBody: `\`\`\`python
snippet:gpt2_manual/mlp
\`\`\``,
      codeExplanations: [
        { lineRange: [1, 25], content: 'The class declares `C -> 4C` expansion, GELU, `4C -> C` projection, and dropout.' },
        { lineRange: [26, 27], content: 'The forward pass applies operations in sequence and returns the same final shape as the input.' },
      ],
    },
  },
});
