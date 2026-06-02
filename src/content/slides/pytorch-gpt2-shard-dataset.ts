import { defineSlide } from './_factory';

export const pytorchGpt2ShardDataset = defineSlide({
  id: 'pytorch-gpt2-shard-dataset',
  type: 'two-column',
  options: { columnRatios: [0.48, 0.52] },
  content: {
    'pt-br': {
      title: 'Dataset de shards',
      body: `Agora os tokens estão salvos. O dataset transforma os \`.bin\` em exemplos \`(x, y)\`.

Ele pega \`block_size + 1\` tokens. O \`x\` é o trecho sem o último token. O \`y\` é o mesmo trecho sem o primeiro token.

Assim cada posição de \`x\` tenta prever o próximo token em \`y\`.`,
      rightBody: `\`\`\`python
snippet:pytorch_gpt2/shard-dataset
\`\`\``,
      codeExplanations: [
        { lineRange: [1, 52], content: '`TokenShardDataset`: carrega shards `.bin` via memmap, constrói índice cumulativo com bisect, `__getitem__` lê `block_size+1` tokens e retorna `(x, y)`.' },
      ],
    },
    'en-us': {
      title: 'Shard dataset',
      body: `Now the tokens are saved. The dataset turns \`.bin\` files into \`(x, y)\` examples.

It takes \`block_size + 1\` tokens. \`x\` is the slice without the last token. \`y\` is the same slice without the first token.

This way each position in \`x\` tries to predict the next token in \`y\`.`,
      rightBody: `\`\`\`python
snippet:pytorch_gpt2/shard-dataset
\`\`\``,
      codeExplanations: [
        { lineRange: [1, 52], content: '`TokenShardDataset`: loads `.bin` shards via memmap, builds cumulative index with bisect, `__getitem__` reads `block_size+1` tokens and returns `(x, y)`.' },
      ],
    },
  },
});

