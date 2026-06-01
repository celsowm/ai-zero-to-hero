import { defineSlide } from './_factory';

export const pytorchGpt2PrepareData = defineSlide({
  id: 'pytorch-gpt2-prepare-data',
  type: 'two-column',
  options: { columnRatios: [0.48, 0.52] },
  content: {
    'pt-br': {
      title: 'Preparar dados',
      body: `Depois que o tokenizer existe, este script transforma textos em shards binários.

Ele carrega o YAML de dados, carrega o tokenizer e chama \`write_token_shards\`.

A saída é o diretório que o treino vai consumir.`,
      rightBody: `\`\`\`python
snippet:pytorch_gpt2/prepare-data
\`\`\``,
      codeExplanations: [
        { lineRange: [1, 11], content: 'Imports: `argparse`, `pathlib`, e módulos do projeto — `load_data_config`, `write_token_shards`, `build_tokenizer`.' },
        { lineRange: [13, 39], content: '`parse_args()`: define `--language` e overrides opcionais. Sem caminhos explícitos, usa Hugging Face, resolve `tokenizers/<language>_latest.json`, escreve em `data/tokenized/<language>_bpe_latest` e mantém 300M tokens, shards de 10M e 1% validação. Suporta `--num-workers` para paralelismo.' },
        { lineRange: [42, 54], content: '`_resolve_bpe_tokenizer_path()`: procura o JSON do tokenizer em `tokenizers/<language>.json` ou `<language>_latest.json`. Se não achar, busca por glob ordenado por modificação.' },
        { lineRange: [57, 91], content: '`main()`: carrega config de dados, constrói tokenizer com `build_tokenizer` (lê o JSON do passo anterior), chama `write_token_shards()` que tokeniza textos e grava shards `.bin`.' },
        { lineRange: [94, 99], content: 'Execução direta: `if __name__ == "__main__"` + exemplo bash: `python scripts/prepare_data.py --language pt`.' },
      ],
    },
    'en-us': {
      title: 'Prepare data',
      body: `Once the tokenizer exists, this script turns texts into binary shards.

It loads the data YAML, loads the tokenizer, and calls \`write_token_shards\`.

The output is the directory that training will consume.`,
      rightBody: `\`\`\`python
snippet:pytorch_gpt2/prepare-data
\`\`\``,
      codeExplanations: [
        { lineRange: [1, 11], content: 'Imports: `argparse`, `pathlib`, and project modules — `load_data_config`, `write_token_shards`, `build_tokenizer`.' },
        { lineRange: [13, 39], content: '`parse_args()`: defines `--language` and optional overrides. Without explicit paths, it uses Hugging Face, resolves `tokenizers/<language>_latest.json`, writes to `data/tokenized/<language>_bpe_latest`, and keeps 300M tokens, 10M-token shards, and 1% validation. Supports `--num-workers` for parallelism.' },
        { lineRange: [42, 54], content: '`_resolve_bpe_tokenizer_path()`: looks for the tokenizer JSON at `tokenizers/<language>.json` or `<language>_latest.json`. Falls back to a glob sorted by modification time.' },
        { lineRange: [57, 91], content: '`main()`: loads data config, builds tokenizer via `build_tokenizer` (reads JSON from previous step), calls `write_token_shards()` which tokenizes texts and writes `.bin` shards.' },
        { lineRange: [94, 99], content: 'Direct execution: `if __name__ == "__main__"` + bash example: `python scripts/prepare_data.py --language pt`.' },
      ],
    },
  },
});

