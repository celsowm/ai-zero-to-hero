import { defineSlide } from './_factory';

export const gpt2PytorchGetBatch = defineSlide({
  id: 'gpt2-pytorch-get-batch',
  type: 'two-column',
  options: { columnRatios: [0.48, 0.52] },
  content: {
    'pt-br': {
      title: 'get_batch(): criando x e y para próximo token',
      body: `Agora que temos um token stream, precisamos cortar janelas.

Para next-token prediction, cada janela gera duas visões:

- \`x\`: entrada
- \`y\`: alvo deslocado uma posição para a frente

Se \`data = [10, 42, 7, 9, 13]\` e \`block_size = 4\`:

\`\`\`txt
x = [10, 42, 7, 9]
y = [42, 7, 9, 13]
\`\`\`

Contrato:
- entrada: \`data (N,)\`
- operação: sortear offsets e empilhar janelas
- saída: \`x (B,T)\`, \`y (B,T)\`
- erro comum: esquecer o token extra para montar \`y\`
- teste: conferir shapes e dtype \`torch.long\`

É o mesmo shift de \`idx[:, :-1]\` e \`idx[:, 1:]\`, agora aplicado ao token stream real.`,
      rightBody: `\`\`\`python
snippet:gpt2_manual/get-batch
\`\`\``,
      codeExplanations: [
        { lineRange: [1, 17], content: '`get_batch` sorteia posições, corta janelas de entrada e alvos deslocados, e devolve dois batches alinhados.' },
        { lineRange: [20, 25], content: 'O teste mínimo confirma `(B,T)` para `x/y` e mantém `torch.long` para embeddings e loss.' },
      ],
    },
    'en-us': {
      title: 'get_batch(): creating x and y for next-token prediction',
      body: `Now that we have a token stream, we need to slice windows.

For next-token prediction, each window creates two views:

- \`x\`: input
- \`y\`: target shifted one position forward

If \`data = [10, 42, 7, 9, 13]\` and \`block_size = 4\`:

\`\`\`txt
x = [10, 42, 7, 9]
y = [42, 7, 9, 13]
\`\`\`

Contract:
- input: \`data (N,)\`
- operation: sample offsets and stack windows
- output: \`x (B,T)\`, \`y (B,T)\`
- common error: forgetting the extra token needed for \`y\`
- test: verify shapes and \`torch.long\` dtype

It is the same shift as \`idx[:, :-1]\` and \`idx[:, 1:]\`, now applied to the real token stream.`,
      rightBody: `\`\`\`python
snippet:gpt2_manual/get-batch
\`\`\``,
      codeExplanations: [
        { lineRange: [1, 17], content: '`get_batch` samples positions, slices input and shifted target windows, and returns two aligned batches.' },
        { lineRange: [20, 25], content: 'The minimal test confirms `(B,T)` for `x/y` and preserves `torch.long` for embeddings and loss.' },
      ],
    },
  },
});
