import { defineSlide } from './_factory';

export const pytorchGpt2Config = defineSlide({
  id: 'pytorch-gpt2-config',
  type: 'two-column',
  options: { columnRatios: [0.48, 0.52] },
  content: {
    'pt-br': {
      title: 'Configuração tipada',
      body: `Agora o projeto precisa receber parâmetros sem espalhar número mágico pelo código.

O \`config.py\` define três contratos: dados, modelo e treino. Isso evita misturar dataset com arquitetura, ou learning rate com tokenizer.

Esse arquivo também faz a ponte entre YAML e Python. O YAML é lido, validado e convertido em dataclasses.`,
      rightBody: `\`\`\`python
snippet:pytorch_gpt2/config
\`\`\``,
      codeExplanations: [
        { lineRange: [1, 10], content: 'Imports do `dataclasses`, `pathlib`, `typing` e `yaml`. O `@dataclass(frozen=True)` gera automaticamente `__init__`, `__repr__`, `__eq__` e torna a instância imutável.' },
        { lineRange: [12, 22], content: '`DataConfig` define como carregar os dados: fonte (`hf` ou `local`), nome do dataset, split, coluna de texto, idioma, streaming e limites de documentos/tokens. Valores padrão apontam para o dataset Gutenberg em PT-BR.' },
        { lineRange: [25, 38], content: '`ModelConfig` define a arquitetura do GPT-2: tamanho do vocabulário, contexto máximo (`block_size`), número de camadas, heads de atenção e dimensão do embedding. O `__post_init__` valida que `n_embd` é divisível por `n_head` — requisito geométrico da atenção multi-head.' },
        { lineRange: [41, 56], content: '`TrainConfig` agrupa hiperparâmetros do treino: batch size, gradiente accumulation, learning rate, weight decay, warmup steps, gradient clipping, intervalo de eval/checkpoint, precisão mista e seed. São os valores que o aluno vai ajustar em experimentos.' },
        { lineRange: [59, 73], content: 'Funções `load_*_config` (`load_data_config`, `load_model_config`, `load_train_config`): abrem um YAML, extraem a chave correspondente e instanciam a dataclass. O `_load_yaml` é o helper que lê o arquivo com `yaml.safe_load`.' },
      ],
    },
    'en-us': {
      title: 'Typed configuration',
      body: `Now the project needs to receive parameters without scattering magic numbers throughout the code.

\`config.py\` defines three contracts: data, model, and training. This avoids mixing dataset with architecture, or learning rate with tokenizer.

This file also bridges YAML and Python. YAML is read, validated, and converted into dataclasses.`,
      rightBody: `\`\`\`python
snippet:pytorch_gpt2/config
\`\`\``,
      codeExplanations: [
        { lineRange: [1, 10], content: 'Imports from `dataclasses`, `pathlib`, `typing`, and `yaml`. The `@dataclass(frozen=True)` decorator auto-generates `__init__`, `__repr__`, `__eq__` and makes instances immutable.' },
        { lineRange: [12, 22], content: '`DataConfig` defines how to load data: source (`hf` or `local`), dataset name, split, text column, language, streaming, and document/token limits. Defaults point to the Gutenberg dataset in PT-BR.' },
        { lineRange: [25, 38], content: '`ModelConfig` defines GPT-2 architecture: vocabulary size, max context (`block_size`), layer count, attention heads, and embedding dimension. `__post_init__` validates `n_embd % n_head == 0` — a geometric requirement for multi-head attention.' },
        { lineRange: [41, 56], content: '`TrainConfig` groups training hyperparameters: batch size, gradient accumulation, learning rate, weight decay, warmup steps, gradient clipping, eval/checkpoint intervals, mixed precision, and seed.' },
        { lineRange: [59, 73], content: '`load_*_config` functions (`load_data_config`, `load_model_config`, `load_train_config`): open a YAML, extract the matching key, and instantiate the dataclass. `_load_yaml` is the shared helper using `yaml.safe_load`.' },
      ],
    },
  },
});
