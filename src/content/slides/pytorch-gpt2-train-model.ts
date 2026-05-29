import { defineSlide } from './_factory';

export const pytorchGpt2TrainModel = defineSlide({
  id: 'pytorch-gpt2-train-model',
  type: 'two-column',
  options: { columnRatios: [0.48, 0.52] },
  content: {
    'pt-br': {
      title: 'Treinar modelo',
      body: `Agora sim o GPT é treinado.

O script carrega a arquitetura, a configuração de treino e o diretório de shards. Depois instancia o \`Trainer\` e chama \`fit()\`.

Esse arquivo é pequeno de propósito: toda a complexidade já foi separada nos módulos anteriores.`,
      rightBody: `\`\`\`python
snippet:pytorch_gpt2/train-model
\`\`\``,
      codeExplanations: [
        { lineRange: [1, 11], content: 'Imports: `argparse`, `json`, `dataclasses.replace` para modificar configs congeladas, `pathlib`, e módulos do projeto — `load_model_config`, `load_train_config`, `Trainer`.' },
        { lineRange: [14, 28], content: '`parse_args()`: define `--language`, `--model-config` (default gpt2-small-bpe.yaml), `--train-config` (default gpt2-small-bf16.yaml), `--data-dir` (obrigatório).' },
        { lineRange: [31, 47], content: '`model_config_with_data_vocab()`: lê `metadata.json` do diretório de dados, extrai o `vocab_size` real (definido pelo treino do tokenizer) e sobrescreve no `ModelConfig` com `dataclasses.replace`.' },
        { lineRange: [50, 77], content: '`main()`: carrega configs, ajusta vocab_size pelo metadata, ajusta `out_dir` com sufixo do idioma, instancia `Trainer` com as configs e chama `trainer.fit()`.' },
        { lineRange: [80, 89], content: 'Execução direta + exemplo bash: `python scripts/train.py --language pt-BR --model-config configs/model/gpt2-small-bpe.yaml --train-config configs/train/gpt2-small-bf16.yaml --data-dir data/tokenized/pt-BR_bpe_latest`.' },
      ],
    },
    'en-us': {
      title: 'Train model',
      body: `Now the GPT is actually trained.

The script loads the architecture, training config, and shard directory. Then it instantiates the \`Trainer\` and calls \`fit()\`.

This file is intentionally small: all complexity has been separated into earlier modules.`,
      rightBody: `\`\`\`python
snippet:pytorch_gpt2/train-model
\`\`\``,
      codeExplanations: [
        { lineRange: [1, 11], content: 'Imports: `argparse`, `json`, `dataclasses.replace` to modify frozen configs, `pathlib`, and project modules — `load_model_config`, `load_train_config`, `Trainer`.' },
        { lineRange: [14, 28], content: '`parse_args()`: defines `--language`, `--model-config` (default gpt2-small-bpe.yaml), `--train-config` (default gpt2-small-bf16.yaml), `--data-dir` (required).' },
        { lineRange: [31, 47], content: '`model_config_with_data_vocab()`: reads `metadata.json` from the data directory, extracts the actual `vocab_size` (set during tokenizer training), and overrides it in `ModelConfig` via `dataclasses.replace`.' },
        { lineRange: [50, 77], content: '`main()`: loads configs, adjusts vocab_size, appends language suffix to `out_dir`, instantiates `Trainer`, calls `trainer.fit()`.' },
        { lineRange: [80, 89], content: 'Direct execution + bash example: `python scripts/train.py --language pt-BR --model-config configs/model/gpt2-small-bpe.yaml --train-config configs/train/gpt2-small-bf16.yaml --data-dir data/tokenized/pt-BR_bpe_latest`.' },
      ],
    },
  },
});
