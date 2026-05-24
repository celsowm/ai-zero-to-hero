import { defineSlide } from './_factory';

export const gpt2PytorchTokenStream = defineSlide({
  id: 'gpt2-pytorch-token-stream',
  type: 'two-column',
  options: { columnRatios: [0.5, 0.5] },
  content: {
    'pt-br': {
      title: 'Token stream: texto vira uma sequência longa de IDs',
      body: `O GPT não recebe texto cru.

Primeiro, o texto vira tokens. Depois, os tokens viram IDs inteiros. Depois, os IDs viram um tensor longo.

Esse tensor é o **token stream**.

Exemplo mental:

\`\`\`txt
texto:  "we the people..."
tokens: ["we", "the", "people", ...]
ids:    [91, 262, 661, ...]
tensor: torch.tensor([...], dtype=torch.long)
\`\`\`

Contrato:
- entrada: texto
- operação: tokenizer + tensorização
- saída: tensor 1D de IDs
- shape esperado: \`(N,)\`
- erro comum: usar float como índice de embedding
- teste: conferir \`dtype == torch.long\` e \`max < vocab_size\``,
      rightBody: `\`\`\`python
snippet:gpt2_manual/token-stream
\`\`\``,
      codeExplanations: [
        { lineRange: [1, 6], content: 'Texto vira IDs de token e depois um tensor `torch.long`, o dtype esperado por `nn.Embedding`.' },
        { lineRange: [8, 13], content: 'Os prints e asserts fecham o contrato: shape, dtype e range compatível com `vocab_size`.' },
      ],
    },
    'en-us': {
      title: 'Token stream: text becomes one long sequence of IDs',
      body: `GPT does not receive raw text.

First, text becomes tokens. Then tokens become integer IDs. Then IDs become one long tensor.

That tensor is the **token stream**.

Mental example:

\`\`\`txt
text:   "we the people..."
tokens: ["we", "the", "people", ...]
ids:    [91, 262, 661, ...]
tensor: torch.tensor([...], dtype=torch.long)
\`\`\`

Contract:
- input: text
- operation: tokenizer + tensor conversion
- output: 1D tensor of IDs
- expected shape: \`(N,)\`
- common error: using floats as embedding indices
- test: check \`dtype == torch.long\` and \`max < vocab_size\``,
      rightBody: `\`\`\`python
snippet:gpt2_manual/token-stream
\`\`\``,
      codeExplanations: [
        { lineRange: [1, 6], content: 'Text becomes token IDs and then a `torch.long` tensor, the dtype expected by `nn.Embedding`.' },
        { lineRange: [8, 13], content: 'Prints and asserts close the contract: shape, dtype, and range compatible with `vocab_size`.' },
      ],
    },
  },
});
