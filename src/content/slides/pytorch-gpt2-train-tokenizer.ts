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
        { lineRange: [14, 33], content: '`parse_args()`: define `--language` e aceita overrides opcionais. Sem `--data-config` ele usa Hugging Face `celsowm/project-gutenberg-clean`; sem `--out` salva em `tokenizers/<language>_latest.json`; os limites reais são vocab 32000, min pair 2, 200k documentos e 200MB.' },
        { lineRange: [36, 71], content: 'Funções auxiliares: `_auto_local_config`, `_auto_hf_config` e `_can_yield_text` para resolver a fonte de dados automaticamente com fallback.' },
        { lineRange: [73, 87], content: '`resolve_data_config()`: decide entre config explícita, dados locais ou Hugging Face baseado nos argumentos.' },
        { lineRange: [89, 152], content: '`main()`: carrega a config de dados, constrói a fonte textual, treina o tokenizer BPE com `train_bpe_tokenizer` e salva com `tokenizer.save()`. Inclui barra de progresso com tqdm.' },
        { lineRange: [154, 163], content: 'Log: imprime caminho salvo, vocab_size, merges, documentos processados e throughput.' },
        { lineRange: [165, 170], content: 'Execução direta + exemplo bash: `python scripts/train_tokenizer.py --language pt`.' },
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
        { lineRange: [14, 33], content: '`parse_args()`: defines `--language` and optional overrides. Without `--data-config` it uses Hugging Face `celsowm/project-gutenberg-clean`; without `--out` it saves to `tokenizers/<language>_latest.json`; the real limits are vocab 32000, min pair 2, 200k documents, and 200MB.' },
        { lineRange: [36, 71], content: 'Helper functions: `_auto_local_config`, `_auto_hf_config`, and `_can_yield_text` for automatic data source resolution with fallback.' },
        { lineRange: [73, 87], content: '`resolve_data_config()`: decides between explicit config, local data, or Hugging Face based on arguments.' },
        { lineRange: [89, 152], content: '`main()`: loads data config, builds text source, trains the BPE tokenizer with `train_bpe_tokenizer`, and saves with `tokenizer.save()`. Includes a tqdm progress bar.' },
        { lineRange: [154, 163], content: 'Logging: prints saved path, vocab_size, merges, documents seen, and throughput.' },
        { lineRange: [165, 170], content: 'Direct execution + bash example: `python scripts/train_tokenizer.py --language pt`.' },
      ],
    },
  },
});

