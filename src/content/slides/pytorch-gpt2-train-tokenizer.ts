import { defineSlide } from './_factory';

export const pytorchGpt2TrainTokenizer = defineSlide({
  id: 'pytorch-gpt2-train-tokenizer',
  type: 'two-column',
  options: { columnRatios: [0.48, 0.52] },
  content: {
    'pt-br': {
      title: 'Treinar tokenizer',
      body: `Este script é o primeiro comando real da esteira.

Ele carrega o YAML de dados, cria uma fonte de texto, treina o BPE e salva \`tokenizer.json\`.

Ainda não existe GPT aqui. Não tem loss neural. Não tem AdamW. Só treino do tokenizer.`,
      rightBody: `\`\`\`python
snippet:pytorch_gpt2/train-tokenizer
\`\`\``,
      codeExplanations: [
        { lineRange: [1, 11], content: 'Imports: `argparse` para CLI, `pathlib`, e módulos do projeto — `load_data_config`, `build_text_source`, `train_bpe_tokenizer`.' },
        { lineRange: [13, 24], content: '`parse_args()`: define argumentos da linha de comando — `--language`, `--data-config`, `--out`, `--vocab-size` (default 32000), `--min-pair-frequency`, `--max-documents`, `--max-bytes`.' },
        { lineRange: [27, 45], content: '`main()`: carrega a config de dados, constrói a fonte textual, treina o tokenizer BPE com `train_bpe_tokenizer` e salva com `tokenizer.save()`. O `mkdir(parents=True)` garante que o diretório de saída existe.' },
        { lineRange: [47, 52], content: 'Log: imprime o caminho salvo e o vocab_size final. O `if __name__ == "__main__"` permite execução direta ou import do módulo.' },
        { lineRange: [55, 60], content: 'Exemplo de uso em bash: `python scripts/train_tokenizer.py --language pt-BR --data-config configs/data/... --out tokenizers/pt-BR_latest.json --vocab-size 32000`. O usuário executa isso no terminal.' },
      ],
    },
    'en-us': {
      title: 'Train tokenizer',
      body: `This script is the first real command in the pipeline.

It loads the data YAML, creates a text source, trains the BPE, and saves \`tokenizer.json\`.

There is no GPT here yet. No neural loss. No AdamW. Just tokenizer training.`,
      rightBody: `\`\`\`python
snippet:pytorch_gpt2/train-tokenizer
\`\`\``,
      codeExplanations: [
        { lineRange: [1, 11], content: 'Imports: `argparse` for CLI, `pathlib`, and project modules — `load_data_config`, `build_text_source`, `train_bpe_tokenizer`.' },
        { lineRange: [13, 24], content: '`parse_args()`: defines CLI arguments — `--language`, `--data-config`, `--out`, `--vocab-size` (default 32000), `--min-pair-frequency`, `--max-documents`, `--max-bytes`.' },
        { lineRange: [27, 45], content: '`main()`: loads data config, builds text source, trains the BPE tokenizer with `train_bpe_tokenizer`, and saves with `tokenizer.save()`. `mkdir(parents=True)` ensures the output directory exists.' },
        { lineRange: [47, 52], content: 'Logging: prints the saved path and final vocab_size. The `if __name__ == "__main__"` guard allows direct execution or module import.' },
        { lineRange: [55, 60], content: 'Bash usage example: `python scripts/train_tokenizer.py --language pt-BR --data-config configs/data/... --out tokenizers/pt-BR_latest.json --vocab-size 32000`. The user runs this in the terminal.' },
      ],
    },
  },
});
