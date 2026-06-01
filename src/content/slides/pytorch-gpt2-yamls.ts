import { defineSlide } from './_factory';

export const pytorchGpt2Yamls = defineSlide({
  id: 'pytorch-gpt2-yamls',
  type: 'two-column',
  options: { columnRatios: [0.48, 0.52] },
  content: {
    'pt-br': {
      title: 'YAMLs do experimento',
      body: `Agora os YAMLs entram como código de configuração.

Eles não são explicação abstrata. Eles são arquivos que o aluno cria e que os scripts realmente carregam.

Um YAML define os dados, outro a arquitetura, outro o treino.`,
      rightBody: `\`\`\`python
snippet:pytorch_gpt2/yamls
\`\`\``,
      codeExplanations: [
        { lineRange: [1, 3], content: 'Comentário indicando o caminho do YAML: `configs/data/hf_text.yaml`. No projeto real, esses arquivos ficam em `configs/`.' },
        { lineRange: [4, 12], content: 'Configuração de dados: HuggingFace como fonte, dataset `celsowm/project-gutenberg-clean`, split `train`, coluna de texto `text`, idioma `pt`, streaming ativado (não baixa o dataset inteiro).' },
        { lineRange: [15, 17], content: 'Separador visual e caminho do YAML de modelo: `configs/model/gpt2-small-bpe.yaml`.' },
        { lineRange: [18, 25], content: 'Arquitetura GPT-2 small: vocab_size 32000 (BPE treinado), block_size 512 (contexto), 8 layers, 8 heads, 512 de embedding, dropout 0.1, bias ativado e weight tying.' },
        { lineRange: [28, 30], content: 'Separador visual e caminho do YAML de treino: `configs/train/gpt2-small-bf16.yaml`.' },
        { lineRange: [31, 44], content: 'Hiperparâmetros de treino: batch_size 16 com grad accum 8 (batch efetivo 128), 20000 steps, LR 6e-4, warmup 500, cosine schedule, gradient clipping 1.0, checkpoint a cada 1000 steps, precisão mista bf16.' },
      ],
    },
    'en-us': {
      title: 'Experiment YAMLs',
      body: `Now the YAMLs enter as configuration code.

They are not abstract explanations. They are files that the student creates and that scripts actually load.

One YAML defines data, another the architecture, another the training.`,
      rightBody: `\`\`\`python
snippet:pytorch_gpt2/yamls
\`\`\``,
      codeExplanations: [
        { lineRange: [1, 3], content: 'Comment with YAML file path: `configs/data/hf_text.yaml`. In the real project, these files live under `configs/`.' },
        { lineRange: [4, 12], content: 'Data config: HuggingFace source, `celsowm/project-gutenberg-clean` dataset, `train` split, `text` column, `pt` language, streaming enabled (does not download the whole dataset).' },
        { lineRange: [15, 17], content: 'Visual separator and model YAML path: `configs/model/gpt2-small-bpe.yaml`.' },
        { lineRange: [18, 25], content: 'GPT-2 small architecture: vocab_size 32000 (trained BPE), block_size 512 (context), 8 layers, 8 heads, 512 embedding, dropout 0.1, bias enabled, weight tying.' },
        { lineRange: [28, 30], content: 'Visual separator and training YAML path: `configs/train/gpt2-small-bf16.yaml`.' },
        { lineRange: [31, 44], content: 'Training hyperparameters: batch_size 16 with grad accum 8 (effective batch 128), 20000 steps, LR 6e-4, 500 warmup, cosine schedule, grad clip 1.0, checkpoint every 1000 steps, bf16 mixed precision.' },
      ],
    },
  },
});

