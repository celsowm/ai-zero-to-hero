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
        { lineRange: [1, 12], content: 'Imports: `pathlib`, `numpy` para memmap, `torch`, `Dataset` do PyTorch, e a constante `TOKEN_DTYPE`. `TokenShardDataset` herda de `Dataset[tuple[Tensor,Tensor]]`.' },
        { lineRange: [14, 34], content: '`__init__`: recebe diretório de dados, split (`train`/`val`) e `block_size`. Descobre todos os shards `.bin` com glob, cria um `np.memmap` para cada um — memmap lê do disco sob demanda sem carregar tudo na RAM.' },
        { lineRange: [36, 45], content: 'Constrói índice: pra cada shard e offset válido, adiciona `(shard_idx, offset)`. `__len__` na linha 44 retorna o tamanho desse índice.' },
        { lineRange: [47, 56], content: '`__getitem__`: acessa o offset no memmap, lê `block_size+1` tokens, converte para `torch.long`. Retorna `x` (primeiros `block_size` tokens) e `y` (últimos `block_size` tokens) — cada posição de `x` tenta prever o token seguinte em `y`.' },
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
        { lineRange: [1, 12], content: 'Imports: `pathlib`, `numpy` for memmap, `torch`, PyTorch `Dataset`, and the `TOKEN_DTYPE` constant. `TokenShardDataset` extends `Dataset[tuple[Tensor,Tensor]]`.' },
        { lineRange: [14, 34], content: '`__init__`: receives data directory, split (`train`/`val`), and `block_size`. Globs all `.bin` shard files, creates a `np.memmap` for each — memmap reads from disk on demand without loading everything into RAM.' },
        { lineRange: [36, 45], content: 'Builds index: for each shard and valid offset, appends `(shard_idx, offset)`. `__len__` at line 44 returns this index size.' },
        { lineRange: [47, 56], content: '`__getitem__`: accesses the offset in the memmap, reads `block_size+1` tokens, converts to `torch.long`. Returns `x` (first `block_size` tokens) and `y` (last `block_size` tokens) — each position in `x` tries to predict the next token in `y`.' },
      ],
    },
  },
});

