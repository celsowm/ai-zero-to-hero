import { defineSlide } from './_factory';

export const gpt2PytorchConfigLoading = defineSlide({
  id: 'gpt2-pytorch-config-loading',
  type: 'two-column',
  options: { columnRatios: [0.48, 0.52] },
  content: {
    'pt-br': {
      title: 'Config define os contratos de shape',
      body: `Config não é decoração. Config define os shapes do modelo inteiro.

\`\`\`txt
vocab_size  -> tabela de tokens e logits
block_size  -> tamanho máximo de contexto
n_layer     -> número de TransformerBlocks
n_head      -> número de heads por bloco
n_embd      -> largura C do residual stream
dropout     -> regularização
bias        -> bias em Linear/LayerNorm
tie_weights -> embedding e lm_head compartilham peso
\`\`\`

Checks obrigatórios:
- \`n_embd % n_head == 0\`
- \`vocab_size > 0\`
- \`block_size > 0\`

Erro comum: se \`idx.max() >= vocab_size\`, \`nn.Embedding\` quebra com \`index out of range\`.

Contrato deste slide:
- entrada: hiperparâmetros
- operação: dataclass + asserts
- saída: config coerente para as próximas peças`,
      rightBody: `\`\`\`python
snippet:gpt2_manual/config-contract
\`\`\``,
      codeExplanations: [
        { lineRange: [1, 13], content: 'A dataclass concentra todos os números que definem shapes, dropout, bias e compartilhamento de pesos.' },
        { lineRange: [16, 23], content: 'Os asserts e prints validam as relações mínimas antes de criar embeddings, heads e blocos.' },
      ],
    },
    'en-us': {
      title: 'Config defines shape contracts',
      body: `Config is not decoration. Config defines the shapes of the whole model.

\`\`\`txt
vocab_size  -> token table and logits
block_size  -> maximum context length
n_layer     -> number of TransformerBlocks
n_head      -> number of heads per block
n_embd      -> residual stream width C
dropout     -> regularization
bias        -> bias in Linear/LayerNorm
tie_weights -> embedding and lm_head share weights
\`\`\`

Required checks:
- \`n_embd % n_head == 0\`
- \`vocab_size > 0\`
- \`block_size > 0\`

Common error: if \`idx.max() >= vocab_size\`, \`nn.Embedding\` fails with \`index out of range\`.

Contract for this slide:
- input: hyperparameters
- operation: dataclass + asserts
- output: coherent config for the next pieces`,
      rightBody: `\`\`\`python
snippet:gpt2_manual/config-contract
\`\`\``,
      codeExplanations: [
        { lineRange: [1, 13], content: 'The dataclass gathers every number that defines shapes, dropout, bias, and weight sharing.' },
        { lineRange: [16, 23], content: 'Asserts and prints validate minimal relations before creating embeddings, heads, and blocks.' },
      ],
    },
  },
});
