import { defineSlide } from './_factory';

export const pytorchGpt2PrepareShards = defineSlide({
  id: 'pytorch-gpt2-prepare-shards',
  type: 'two-column',
  options: { columnRatios: [0.48, 0.52] },
  content: {
    'pt-br': {
      title: 'Preparação dos shards',
      body: `Depois que existe tokenizer, o dataset inteiro pode virar tokens.

O \`prepare.py\` lê textos, aplica \`tokenizer.encode\`, separa treino e validação, grava \`.bin\` e cria \`metadata.json\`.

Esse passo prepara o treino para ser rápido: o \`Trainer\` não vai tokenizar texto a cada batch.`,
      rightBody: `\`\`\`python
snippet:pytorch_gpt2/prepare-shards
\`\`\``,
      codeExplanations: [
        { lineRange: [1, 14], content: 'Imports: `json` para metadata, `pathlib`, `numpy` para arrays binários, e imports internos do projeto (DataConfig, text_source, tokenizer). Constante `TOKEN_DTYPE=np.uint16` limita tokens a 65535.' },
        { lineRange: [17, 34], content: '`write_token_shards()`: recebe config, diretório de saída, tokenizer e limites. Cria lista de tokens de treino e validação. Itera cada documento da fonte textual.' },
        { lineRange: [36, 50], content: 'Para cada documento: tokeniza com `add_eot=True` (marca fim do documento), verifica limite de tokens, separa treino/validação (1 a cada `1/val_fraction` documentos), e chama `_write_split` para cada split.' },
        { lineRange: [52, 63], content: 'Salva `metadata.json` com vocab_size, eot_id, dtype e contagem de tokens de treino/validação. O Trainer usa isso para configurar o modelo.' },
        { lineRange: [66, 77], content: '`_write_split()`: divide a lista de tokens em chunks de `shard_size_tokens`, converte para `np.uint16` e salva como `.bin` binário. Cada shard é um arquivo independente para acesso via memmap.' },
      ],
    },
    'en-us': {
      title: 'Shard preparation',
      body: `Once a tokenizer exists, the entire dataset can become tokens.

\`prepare.py\` reads texts, applies \`tokenizer.encode\`, separates training and validation, writes \`.bin\` files, and creates \`metadata.json\`.

This step prepares training to be fast: the \`Trainer\` will not tokenize text every batch.`,
      rightBody: `\`\`\`python
snippet:pytorch_gpt2/prepare-shards
\`\`\``,
      codeExplanations: [
        { lineRange: [1, 14], content: 'Imports: `json` for metadata, `pathlib`, `numpy` for binary arrays, and internal project imports (DataConfig, text_source, tokenizer). `TOKEN_DTYPE=np.uint16` limits tokens to 65535.' },
        { lineRange: [17, 34], content: '`write_token_shards()`: takes config, output directory, tokenizer, and limits. Creates train/val token lists. Iterates each document from the text source.' },
        { lineRange: [36, 50], content: 'Per document: tokenizes with `add_eot=True` (document end marker), checks token limit, splits train/val (1 every `1/val_fraction` documents), and calls `_write_split` per split.' },
        { lineRange: [52, 63], content: 'Saves `metadata.json` with vocab_size, eot_id, dtype, and train/val token counts. The Trainer uses this to configure the model.' },
        { lineRange: [66, 77], content: '`_write_split()`: divides the token list into fixed-size shards, converts to `np.uint16`, and saves as binary `.bin` files. Each shard is an independent memmap-able file.' },
      ],
    },
  },
});

