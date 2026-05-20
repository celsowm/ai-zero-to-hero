import { defineSlide } from './_factory';

export const pytorchRuntimeOptions = defineSlide({
  id: 'pytorch-runtime-options',
  type: 'two-column',
  options: { columnRatios: [0.42, 0.58] },
  content: {
    'pt-br': {
      title: 'Onde eu rodo isso se minha GPU é de pobre?',
      body: `GPU de pobre não bloqueia ninguém aqui. Ela só muda a estratégia.

### A ideia correta
1. **CPU local** para entender, debugar e validar o script.
2. **Google Colab** quando quiser GPU no navegador sem instalar CUDA.
3. **Kaggle** quando quiser notebook + dataset + acelerador no mesmo lugar.

### Não confunda
- **Ter GPU** não significa que o PyTorch vai usá-la automaticamente.
- **Usar Colab/Kaggle** não significa GPU garantida para sempre.
- **CPU local** não é "lixo": PyTorch usa kernels nativos, threads e bibliotecas otimizadas.

> O código bom começa em CPU e sobe para CUDA/MPS quando existe acelerador.`,
    },
    'en-us': {
      title: "Where do I run this if I'm GPU poor?",
      body: `Being GPU poor does not block you from learning PyTorch. It just changes the strategy.

### Correct mental model
1. **Local CPU** to understand, debug, and validate the script.
2. **Google Colab** when you want a browser GPU without installing CUDA.
3. **Kaggle** when you want notebook + dataset + accelerator in one place.

### Do not confuse
- **Having a GPU** does not mean PyTorch will automatically use it.
- **Using Colab/Kaggle** does not mean GPU is guaranteed forever.
- **Local CPU** is not "trash": PyTorch uses native kernels, threads, and optimized libraries.

> Good code starts on CPU and moves to CUDA/MPS when an accelerator exists.`,
    },
  },
  visual: {
    id: 'pytorch-runtime-playbook',
    copy: {
      'pt-br': {
        tabs: [
          {
            label: 'CPU local',
            badge: 'comece aqui',
            when: 'Debug, exemplos pequenos, validação de shape, smoke test e primeira leitura do modelo.',
            steps: [
              'Crie uma `.venv`.',
              'Instale `torch` com `python -m pip install torch`.',
              'Rode um diagnóstico: versão, backend, threads e flags da CPU.',
              'Só otimize thread/NUMA depois que o script estiver correto.',
            ],
            links: [
              { label: 'PyTorch install', url: 'https://pytorch.org/get-started/locally/' },
              { label: 'Threading env vars', url: 'https://docs.pytorch.org/docs/stable/threading_environment_variables.html' },
            ],
            code: `python -m venv .venv
source .venv/bin/activate
python -m pip install torch

# Linux: veja instruções da CPU
lscpu | egrep 'Model name|CPU\\(s\\)|Thread|NUMA|avx2|avx512|fma'

# Diagnóstico PyTorch
python - <<'PY'
import platform
import torch

print("python:", platform.python_version())
print("torch:", torch.__version__)
print("cuda:", torch.cuda.is_available())
print("mps:", hasattr(torch.backends, "mps") and torch.backends.mps.is_available())
print("threads:", torch.get_num_threads())
print("interop:", torch.get_num_interop_threads())
print(torch.__config__.show())
PY

# Quando CPU estiver brigando por threads:
OMP_NUM_THREADS=4 MKL_NUM_THREADS=4 python train.py`,
            caveat: 'AVX2/AVX-512 ajudam kernels de CPU, mas não são requisito para aprender. NUMA normalmente só importa em workstation/servidor com múltiplos soquetes.',
          },
          {
            label: 'Google Colab',
            badge: 'GPU sem CUDA local',
            when: 'Aula, demo, treino pequeno/médio e qualquer caso em que instalação local viraria distração.',
            steps: [
              'Abra o notebook no Colab.',
              'Vá em Runtime → Change runtime type.',
              'Escolha GPU como Hardware accelerator.',
              'Rode `!nvidia-smi` e depois o check do PyTorch.',
            ],
            links: [
              { label: 'Abrir Colab', url: 'https://colab.research.google.com/' },
              { label: 'Colab FAQ', url: 'https://research.google.com/colaboratory/faq.html' },
            ],
            code: `# 1) No menu:
# Runtime -> Change runtime type -> GPU

# 2) Ver GPU entregue pela sessão
!nvidia-smi

# 3) Check PyTorch
import torch

device = "cuda" if torch.cuda.is_available() else "cpu"
print("device:", device)
print("gpu:", torch.cuda.get_device_name(0) if device == "cuda" else "sem cuda")

x = torch.randn(4096, 4096, device=device)
print((x @ x).shape)`,
            caveat: 'Colab dá acesso a GPU/TPU, mas recursos não são garantidos, não são ilimitados e variam com disponibilidade.',
          },
          {
            label: 'Kaggle',
            badge: 'notebook + dataset',
            when: 'Quando o exercício usa dataset maior, competição, arquivo público ou você quer ambiente pronto no navegador.',
            steps: [
              'Crie um novo Notebook em kaggle.com/code.',
              'No painel de sessão/configuração, escolha Accelerator: GPU ou TPU quando disponível.',
              'Ative Internet se precisar baixar modelos/pacotes.',
              'Rode `!nvidia-smi` e confirme `torch.cuda.is_available()`.',
            ],
            links: [
              { label: 'Kaggle Code', url: 'https://www.kaggle.com/code' },
              { label: 'Kaggle notebooks docs', url: 'https://www.kaggle.com/docs/notebooks' },
            ],
            code: `# 1) Notebook settings:
# Accelerator -> GPU

# 2) Ver GPU da sessão
!nvidia-smi

# 3) Check PyTorch
import torch

device = "cuda" if torch.cuda.is_available() else "cpu"
print("device:", device)
print("cuda version:", torch.version.cuda)
print("gpu:", torch.cuda.get_device_name(0) if device == "cuda" else "sem cuda")

# Dica: coloque datasets pelo painel do Kaggle,
# não baixando tudo de novo em cada execução.`,
            caveat: 'Não prometa tipo de GPU nem cota fixa no slide. Escreva "sujeito à disponibilidade".',
          },
        ],
        footer: 'Regra de decisão: CPU para aprender e debugar; Colab para GPU rápida sem setup; Kaggle quando dados/notebook/acelerador precisam estar juntos.',
      },
      'en-us': {
        tabs: [
          {
            label: 'Local CPU',
            badge: 'start here',
            when: 'Debugging, small examples, shape validation, smoke tests, and first model read-through.',
            steps: [
              'Create a `.venv`.',
              'Install `torch` with `python -m pip install torch`.',
              'Run diagnostics: version, backend, threads, and CPU flags.',
              'Tune thread/NUMA only after the script is correct.',
            ],
            links: [
              { label: 'PyTorch install', url: 'https://pytorch.org/get-started/locally/' },
              { label: 'Threading env vars', url: 'https://docs.pytorch.org/docs/stable/threading_environment_variables.html' },
            ],
            code: `python -m venv .venv
source .venv/bin/activate
python -m pip install torch

lscpu | egrep 'Model name|CPU\\(s\\)|Thread|NUMA|avx2|avx512|fma'

python - <<'PY'
import platform
import torch

print("python:", platform.python_version())
print("torch:", torch.__version__)
print("cuda:", torch.cuda.is_available())
print("mps:", hasattr(torch.backends, "mps") and torch.backends.mps.is_available())
print("threads:", torch.get_num_threads())
print("interop:", torch.get_num_interop_threads())
print(torch.__config__.show())
PY

OMP_NUM_THREADS=4 MKL_NUM_THREADS=4 python train.py`,
            caveat: 'AVX2/AVX-512 help CPU kernels, but are not required to learn. NUMA usually matters only on workstation/server hardware.',
          },
          {
            label: 'Google Colab',
            badge: 'GPU without local CUDA',
            when: 'Classes, demos, small/medium training, and cases where local setup would become a distraction.',
            steps: [
              'Open the notebook in Colab.',
              'Go to Runtime → Change runtime type.',
              'Select GPU as Hardware accelerator.',
              'Run `!nvidia-smi`, then the PyTorch check.',
            ],
            links: [
              { label: 'Open Colab', url: 'https://colab.research.google.com/' },
              { label: 'Colab FAQ', url: 'https://research.google.com/colaboratory/faq.html' },
            ],
            code: `# Runtime -> Change runtime type -> GPU

!nvidia-smi

import torch

device = "cuda" if torch.cuda.is_available() else "cpu"
print("device:", device)
print("gpu:", torch.cuda.get_device_name(0) if device == "cuda" else "no cuda")

x = torch.randn(4096, 4096, device=device)
print((x @ x).shape)`,
            caveat: 'Colab provides GPU/TPU access, but resources are not guaranteed, not unlimited, and vary with availability.',
          },
          {
            label: 'Kaggle',
            badge: 'notebook + dataset',
            when: 'When the exercise uses larger datasets, competitions, public files, or a ready browser environment.',
            steps: [
              'Create a new Notebook at kaggle.com/code.',
              'In session/settings, choose Accelerator: GPU or TPU when available.',
              'Enable Internet if you need to download models/packages.',
              'Run `!nvidia-smi` and confirm `torch.cuda.is_available()`.',
            ],
            links: [
              { label: 'Kaggle Code', url: 'https://www.kaggle.com/code' },
              { label: 'Kaggle notebooks docs', url: 'https://www.kaggle.com/docs/notebooks' },
            ],
            code: `# Notebook settings:
# Accelerator -> GPU

!nvidia-smi

import torch

device = "cuda" if torch.cuda.is_available() else "cpu"
print("device:", device)
print("cuda version:", torch.version.cuda)
print("gpu:", torch.cuda.get_device_name(0) if device == "cuda" else "no cuda")`,
            caveat: 'Do not promise a specific GPU type or fixed quota. Say "subject to availability".',
          },
        ],
        footer: 'Decision rule: CPU to learn and debug; Colab for quick GPU without setup; Kaggle when data/notebook/accelerator should live together.',
      },
    },
  },
});
