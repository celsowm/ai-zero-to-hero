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
        { lineRange: [1, 17], content: 'Docstring e imports: `json`, `islice`, `multiprocessing`, `pathlib`, `numpy`, `tqdm`, `DataConfig`, `build_text_source`, `ByteTokenizer`/`Tokenizer`. Constantes: `TOKEN_DTYPE = np.uint16`.' },
        { lineRange: [18, 32], content: 'Constantes: `TOKEN_DTYPE = np.uint16`. `_worker_init` e `_worker_encode_batch`: inicializa tokenizer no worker e codifica batch.' },
        { lineRange: [35, 52], content: '`_bounded_texts` e `_batched_texts`: limitam documentos e agrupam em batches para processamento paralelo.' },
        { lineRange: [54, 73], content: '`write_token_shards` assinatura: recebe config, out_dir, tokenizer, parâmetros. Validações de val_fraction, num_workers e tokenizer_factory.' },
        { lineRange: [75, 88], content: 'Inicialização: cria tokenizer padrão, valida dtype, limpa diretório de saída, cria fonte de texto.' },
        { lineRange: [90, 106], content: 'Buffers e função `flush`: acumula tokens, escreve shard `.bin` quando atinge `shard_size_tokens`.' },
        { lineRange: [108, 133], content: 'Progress bar, bounded texts, setup de pool multiprocessing (spawn) ou serial.' },
        { lineRange: [135, 168], content: 'Loop principal: itera batches, divide treino/val por val_fraction, stop_requested, flush incremental.' },
        { lineRange: [169, 193], content: 'Cleanup: fecha pool, fecha pbar, flush final. Gera metadata.json com source, vocab_size, total_tokens, shards.' },
        { lineRange: [196, 197], content: '`read_bin_tokens`: utilitário para ler shards como memmap.' },
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
        { lineRange: [1, 17], content: 'Docstring and imports: `json`, `islice`, `multiprocessing`, `pathlib`, `numpy`, `tqdm`, `DataConfig`, `build_text_source`, `ByteTokenizer`/`Tokenizer`. Constants: `TOKEN_DTYPE = np.uint16`.' },
        { lineRange: [18, 32], content: 'Constants: `TOKEN_DTYPE = np.uint16`. `_worker_init` and `_worker_encode_batch`: initializes tokenizer in worker and encodes batch.' },
        { lineRange: [35, 52], content: '`_bounded_texts` and `_batched_texts`: limit documents and group into batches for parallel processing.' },
        { lineRange: [54, 73], content: '`write_token_shards` signature: receives config, out_dir, tokenizer, params. Validations for val_fraction, num_workers, tokenizer_factory.' },
        { lineRange: [75, 88], content: 'Initialization: creates default tokenizer, validates dtype, cleans output directory, builds text source.' },
        { lineRange: [90, 106], content: 'Buffers and `flush` function: accumulates tokens, writes `.bin` shard when reaching `shard_size_tokens`.' },
        { lineRange: [108, 133], content: 'Progress bar, bounded texts, multiprocessing pool (spawn) or serial setup.' },
        { lineRange: [135, 168], content: 'Main loop: iterates batches, splits train/val by val_fraction, stop_requested, incremental flush.' },
        { lineRange: [169, 193], content: 'Cleanup: closes pool, closes pbar, final flush. Generates metadata.json with source, vocab_size, total_tokens, shards.' },
        { lineRange: [196, 197], content: '`read_bin_tokens`: utility to read shards as memmap.' },
      ],
    },
  },
});

