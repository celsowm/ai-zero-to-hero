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
        { lineRange: [13, 27], content: '`parse_args()`: define argumentos — `--language`, `--data-config`, `--out-dir`, `--tokenizer` (byte ou bpe), `--tokenizer-path`, `--max-tokens` (default 300M), `--shard-size-tokens` (10M), `--val-fraction` (1%).' },
        { lineRange: [30, 47], content: '`main()`: carrega config de dados, constrói tokenizer com `build_tokenizer` (lê o JSON do passo anterior), chama `write_token_shards()` que tokeniza textos e grava shards `.bin`.' },
        { lineRange: [49, 53], content: 'Log: imprime diretório de saída. O `if __name__ == "__main__"` permite execução direta.' },
        { lineRange: [56, 62], content: 'Exemplo bash: `python scripts/prepare_data.py --language pt-BR --data-config configs/data/... --tokenizer bpe --tokenizer-path tokenizers/pt-BR_latest.json --out-dir data/tokenized/pt-BR_bpe_latest`.' },
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
        { lineRange: [13, 27], content: '`parse_args()`: defines arguments — `--language`, `--data-config`, `--out-dir`, `--tokenizer` (byte or bpe), `--tokenizer-path`, `--max-tokens` (default 300M), `--shard-size-tokens` (10M), `--val-fraction` (1%).' },
        { lineRange: [30, 47], content: '`main()`: loads data config, builds tokenizer via `build_tokenizer` (reads JSON from previous step), calls `write_token_shards()` which tokenizes texts and writes `.bin` shards.' },
        { lineRange: [49, 53], content: 'Log: prints output directory. `if __name__ == "__main__"` allows direct execution.' },
        { lineRange: [56, 62], content: 'Bash example: `python scripts/prepare_data.py --language pt-BR --data-config configs/data/... --tokenizer bpe --tokenizer-path tokenizers/pt-BR_latest.json --out-dir data/tokenized/pt-BR_bpe_latest`.' },
      ],
    },
  },
});
