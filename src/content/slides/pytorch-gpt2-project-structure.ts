import { defineSlide } from './_factory';

export const pytorchGpt2ProjectStructure = defineSlide({
  id: 'pytorch-gpt2-project-structure',
  type: 'two-column',
  options: { columnRatios: [0.48, 0.52] },
  content: {
    'pt-br': {
      title: 'Estrutura do projeto Python',
      body: `Antes de escrever o GPT, a primeira coisa é transformar a pasta em um projeto Python importável.

O aluno pode chamar a pasta do projeto como quiser. O nome da pasta não precisa virar nome de import.

\`scripts/\` são comandos de terminal, enquanto \`src/\` é a biblioteca interna do projeto. Essa separação é o ponto importante: comandos ficam na borda, lógica reutilizável fica dentro de \`src/\`.

Os arquivos \`__init__.py\` não têm lógica importante, mas são parte da estrutura de pacote. Eles permitem que Python trate aquelas pastas como módulos importáveis.

O projeto começa com organização: o treino depois vai usar imports limpos, em vez de gambiarra com arquivos soltos.

Eis a estrutura completa do projeto — cada arquivo tem um link para o slide em que é explicado:

\`<nome-do-projeto>/\`  
\`  +-- pyproject.toml\` ([Slide 1](#/pytorch-gpt2-project-structure))  
\`  +-- scripts/\`  
\`  |   +-- train_tokenizer.py\` ([Slide 16](#/pytorch-gpt2-train-tokenizer))  
\`  |   +-- prepare_data.py\` ([Slide 17](#/pytorch-gpt2-prepare-data))  
\`  |   +-- train.py\` ([Slide 18](#/pytorch-gpt2-train-model))  
\`  |   +-- generate.py\` ([Slide 23](#/pytorch-gpt2-script-generate))  
\`  +-- configs/\`  
\`  |   +-- data/\`  
\`  |   |   +-- hf_text.yaml\` ([Slide 15](#/pytorch-gpt2-yamls))  
\`  |   +-- model/\`  
\`  |   |   +-- gpt2-small-bpe.yaml\` ([Slide 15](#/pytorch-gpt2-yamls))  
\`  |   +-- train/\`  
\`  |       +-- gpt2-small-bf16.yaml\` ([Slide 15](#/pytorch-gpt2-yamls))  
\`  +-- src/\`  
\`      +-- (módulos Python em src/)\`  
\`          +-- __init__.py\` ([Slide 1](#/pytorch-gpt2-project-structure))  
\`          +-- config.py\` ([Slide 3](#/pytorch-gpt2-config))  
\`          +-- utils/\`  
\`          |   +-- __init__.py\` ([Slide 1](#/pytorch-gpt2-project-structure))  
\`          |   +-- seed.py\` ([Slide 2](#/pytorch-gpt2-config))  
\`          |   +-- device.py\` ([Slide 2](#/pytorch-gpt2-config))  
\`          +-- train/\`  
\`          |   +-- __init__.py\` ([Slide 1](#/pytorch-gpt2-project-structure))  
\`          |   +-- optimizer.py\` ([Slide 4](#/pytorch-gpt2-optimizer))  
\`          |   +-- scheduler.py\` ([Slide 4](#/pytorch-gpt2-optimizer))  
\`          |   +-- checkpoint.py\` ([Slide 5](#/pytorch-gpt2-checkpoint))  
\`          |   +-- trainer.py\` ([Slide 14](#/pytorch-gpt2-trainer))  
\`          +-- data/\`  
\`          |   +-- __init__.py\` ([Slide 1](#/pytorch-gpt2-project-structure))  
\`          |   +-- text_source.py\` ([Slide 6](#/pytorch-gpt2-text-source))  
\`          |   +-- tokenizer.py\` ([Slide 7](#/pytorch-gpt2-tokenizer))  
\`          |   +-- prepare.py\` ([Slide 8](#/pytorch-gpt2-prepare-shards))  
\`          |   +-- shard_dataset.py\` ([Slide 9](#/pytorch-gpt2-shard-dataset))  
\`          +-- model/\`  
\`          |   +-- __init__.py\` ([Slide 1](#/pytorch-gpt2-project-structure))  
\`          |   +-- mlp.py\` ([Slide 10](#/pytorch-gpt2-mlp))  
\`          |   +-- attention.py\` ([Slide 11](#/pytorch-gpt2-attention))  
\`          |   +-- block.py\` ([Slide 12](#/pytorch-gpt2-block))  
\`          |   +-- gpt.py\` ([Slide 13](#/pytorch-gpt2-gpt))  
\`          +-- infer/\`  
\`              +-- __init__.py\` ([Slide 21](#/pytorch-gpt2-infer-pretrained))  
\`              +-- sampler.py\` ([Slide 19](#/pytorch-gpt2-infer-sampler))  
\`              +-- generate.py\` ([Slide 20](#/pytorch-gpt2-infer-generate))  
\`              +-- pretrained.py\` ([Slide 21](#/pytorch-gpt2-infer-pretrained))  
\`              +-- interactive.py\` ([Slide 22](#/pytorch-gpt2-infer-interactive))`,
      rightBody: `\`\`\`python
snippet:pytorch_gpt2/project-structure
\`\`\``,
      codeExplanations: [
        { lineRange: [1, 3], content: 'O arquivo `pyproject.toml` é o manifesto do projeto Python. A linha com `#` é só um marcador visual — o TOML ignora comentários.' },
        { lineRange: [4, 6], content: 'Declaração de identidade: nome do pacote, versão semântica e a versão mínima do Python (`>=3.11`). O pip usa isso para saber se o interpretador é compatível.' },
        { lineRange: [8, 13], content: 'Lista de dependências de runtime: torch para os tensores e autograd, numpy para dados numéricos, pyyaml para ler configs de treino, tqdm para barra de progresso.' },
        { lineRange: [15, 19], content: 'Dependências opcionais agrupadas sob `hf`. Só instalam (`pip install .[hf]`) se o aluno for usar Hugging Face Datasets como fonte de texto. Inclui tanto `datasets` quanto `huggingface-hub`.' },
        { lineRange: [21, 22], content: 'Configuração do pytest: `pythonpath = ["src"]` faz com que os imports a partir de `src/` funcionem nos testes sem precisar de variável de ambiente PYTHONPATH.' },
        { lineRange: [24, 25], content: 'Diretiva essencial para o `pip install -e .` funcionar: diz ao setuptools que os módulos Python estão dentro de `src/`, e não na raiz do projeto.' },
      ],
    },
    'en-us': {
      title: 'Python project structure',
      body: `Before writing the GPT, the first step is turning the folder into an importable Python project.

The student can name the project folder however they want. The folder name does not need to become the import name.

\`scripts/\` are terminal commands, while \`src/\` is the internal library. That separation is the important point: commands stay at the edge, reusable logic lives under \`src/\`.

The \`__init__.py\` files have no important logic, but they are part of the package structure. They let Python treat those folders as importable modules.

The project starts with organization: training later will use clean imports instead of loose files.

Here is the full project tree — each file links to the slide that explains it:

\`<project-name>/\`  
\`  +-- pyproject.toml\` ([Slide 1](#/pytorch-gpt2-project-structure))  
\`  +-- scripts/\`  
\`  |   +-- train_tokenizer.py\` ([Slide 16](#/pytorch-gpt2-train-tokenizer))  
\`  |   +-- prepare_data.py\` ([Slide 17](#/pytorch-gpt2-prepare-data))  
\`  |   +-- train.py\` ([Slide 18](#/pytorch-gpt2-train-model))  
\`  |   +-- generate.py\` ([Slide 23](#/pytorch-gpt2-script-generate))  
\`  +-- configs/\`  
\`  |   +-- data/\`  
\`  |   |   +-- hf_text.yaml\` ([Slide 15](#/pytorch-gpt2-yamls))  
\`  |   +-- model/\`  
\`  |   |   +-- gpt2-small-bpe.yaml\` ([Slide 15](#/pytorch-gpt2-yamls))  
\`  |   +-- train/\`  
\`  |       +-- gpt2-small-bf16.yaml\` ([Slide 15](#/pytorch-gpt2-yamls))  
\`  +-- src/\`  
\`      +-- (módulos Python em src/)\`  
\`          +-- __init__.py\` ([Slide 1](#/pytorch-gpt2-project-structure))  
\`          +-- config.py\` ([Slide 3](#/pytorch-gpt2-config))  
\`          +-- utils/\`  
\`          |   +-- __init__.py\` ([Slide 1](#/pytorch-gpt2-project-structure))  
\`          |   +-- seed.py\` ([Slide 2](#/pytorch-gpt2-config))  
\`          |   +-- device.py\` ([Slide 2](#/pytorch-gpt2-config))  
\`          +-- train/\`  
\`          |   +-- __init__.py\` ([Slide 1](#/pytorch-gpt2-project-structure))  
\`          |   +-- optimizer.py\` ([Slide 4](#/pytorch-gpt2-optimizer))  
\`          |   +-- scheduler.py\` ([Slide 4](#/pytorch-gpt2-optimizer))  
\`          |   +-- checkpoint.py\` ([Slide 5](#/pytorch-gpt2-checkpoint))  
\`          |   +-- trainer.py\` ([Slide 14](#/pytorch-gpt2-trainer))  
\`          +-- data/\`  
\`          |   +-- __init__.py\` ([Slide 1](#/pytorch-gpt2-project-structure))  
\`          |   +-- text_source.py\` ([Slide 6](#/pytorch-gpt2-text-source))  
\`          |   +-- tokenizer.py\` ([Slide 7](#/pytorch-gpt2-tokenizer))  
\`          |   +-- prepare.py\` ([Slide 8](#/pytorch-gpt2-prepare-shards))  
\`          |   +-- shard_dataset.py\` ([Slide 9](#/pytorch-gpt2-shard-dataset))  
\`          +-- model/\`  
\`          |   +-- __init__.py\` ([Slide 1](#/pytorch-gpt2-project-structure))  
\`          |   +-- mlp.py\` ([Slide 10](#/pytorch-gpt2-mlp))  
\`          |   +-- attention.py\` ([Slide 11](#/pytorch-gpt2-attention))  
\`          |   +-- block.py\` ([Slide 12](#/pytorch-gpt2-block))  
\`          |   +-- gpt.py\` ([Slide 13](#/pytorch-gpt2-gpt))  
\`          +-- infer/\`  
\`              +-- __init__.py\` ([Slide 21](#/pytorch-gpt2-infer-pretrained))  
\`              +-- sampler.py\` ([Slide 19](#/pytorch-gpt2-infer-sampler))  
\`              +-- generate.py\` ([Slide 20](#/pytorch-gpt2-infer-generate))  
\`              +-- pretrained.py\` ([Slide 21](#/pytorch-gpt2-infer-pretrained))  
\`              +-- interactive.py\` ([Slide 22](#/pytorch-gpt2-infer-interactive))`,
      rightBody: `\`\`\`python
snippet:pytorch_gpt2/project-structure
\`\`\``,
      codeExplanations: [
        { lineRange: [1, 3], content: 'The `pyproject.toml` file is the Python project manifest. The `#` line is a visual marker — TOML ignores comments.' },
        { lineRange: [4, 6], content: 'Identity declaration: package name, semantic version, and minimum Python version (`>=3.11`). Pip uses this to check interpreter compatibility.' },
        { lineRange: [8, 13], content: 'Runtime dependencies: torch for tensors and autograd, numpy for numeric data, pyyaml for reading training configs, tqdm for progress bars.' },
        { lineRange: [15, 19], content: 'Optional dependencies grouped under `hf`. They only install (`pip install .[hf]`) when using Hugging Face Datasets as the text source. Includes both `datasets` and `huggingface-hub`.' },
        { lineRange: [21, 22], content: 'Pytest configuration: `pythonpath = ["src"]` makes imports from `src/` work in tests without setting the PYTHONPATH environment variable.' },
        { lineRange: [24, 25], content: 'Essential directive for `pip install -e .` to work: tells setuptools that Python modules are inside `src/`, not at the project root.' },
      ],
    },
  },
});



