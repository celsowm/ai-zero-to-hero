import { defineSlide } from './_factory';

export const neuralNetworkPytorchHardware = defineSlide({
  id: 'neural-network-pytorch-hardware',
  type: 'two-column',
  options: {
    "columnRatios": [
      0.54,
      0.46
    ]
  },
  content: {
    'pt-br': {
      title: `Acelerando com GPU: PyTorch Multi-Ambiente`,
      body: `Se você tem uma placa de vídeo ou um Mac moderno, não use a CPU. O PyTorch pode ser centenas de vezes mais rápido se configurado corretamente.

### 🔍 1. Regra de Ouro: Hardware
Verifique se o seu driver está instalado e funcional ANTES do PyTorch:
- **NVIDIA:** Digite \`nvidia-smi\` no terminal.
- **AMD:** Digite \`amd-smi\` ou \`rocm-smi\`.
- **Apple Silicon:** Não precisa de comando; o suporte é nativo via driver do macOS.

### ⚡ 2. Instalação Otimizada
Acesse [pytorch.org](https://pytorch.org/get-started/locally/) para pegar o comando exato, ou use estes atalhos:
- **NVIDIA (CUDA):** \`pip install torch --index-url https://download.pytorch.org/whl/cu118\` (substitua cu118 pela sua versão do CUDA).
- **Apple / CPU:** \`pip install torch\`.

### 📦 3. O Ambiente Virtual
Sempre use um \`.venv\` para não poluir o Python do sistema e garantir que o \`pip\` instale as versões corretas para o seu hardware.

---

### 🧪 4. Validação (O Teste de Fogo)
Use este script para garantir que o PyTorch está enxergando seu hardware de aceleração:

\`\`\`python
snippet:neural-networks/pytorch-hardware-test
\`\`\``,
      codeExplanations: [
    {
    "lineRange": [
      1,
      2
    ],
    "content": "Importamos o torch, o módulo base do PyTorch que permite criar tensores e rodar operações na GPU."
  },
    {
    "lineRange": [
      4,
      6
    ],
    "content": "CUDA é o motor da NVIDIA. MPS (Metal Performance Shaders) é o motor da Apple para chips M1/M2/M3."
  },
    {
    "lineRange": [
      8,
      13
    ],
    "content": "Este padrão de código é obrigatório na indústria: ele detecta o melhor hardware e só usa a CPU como última alternativa."
  },
    {
    "lineRange": [
      14,
      15
    ],
    "content": "Se nenhum acelerador estiver disponível, o fallback seguro é a CPU — o código continua funcionando."
  },
    {
    "lineRange": [
      17,
      17
    ],
    "content": "Crucial: ao passar 'device=device', você diz ao PyTorch para criar o dado já dentro da memória da GPU, evitando lentidão na transferência."
  },
    {
    "lineRange": [
      19,
      19
    ],
    "content": "Imprimimos qual hardware foi selecionado para confirmar que a detecção funcionou corretamente."
  },
    {
    "lineRange": [
      21,
      22
    ],
    "content": "Executamos uma operação simples no tensor para provar que o hardware está respondendo — se rodar sem erro, a GPU/MPS está ativa."
  }
  ],
    },
    'en-us': {
      title: `GPU Acceleration: Multi-Environment PyTorch`,
      body: `If you have a graphics card or a modern Mac, don't use the CPU. PyTorch can be hundreds of times faster if configured correctly.

### 🔍 1. Golden Rule: Hardware
Check if your driver is installed and functional BEFORE PyTorch:
- **NVIDIA:** Type \`nvidia-smi\` in the terminal.
- **AMD:** Type \`amd-smi\` or \`rocm-smi\`.
- **Apple Silicon:** No command needed; support is native via macOS drivers.

### ⚡ 2. Optimized Installation
Visit [pytorch.org](https://pytorch.org/get-started/locally/) for the exact command, or use these shortcuts:
- **NVIDIA (CUDA):** \`pip install torch --index-url https://download.pytorch.org/whl/cu118\` (replace cu118 with your CUDA version).
- **Apple / CPU:** \`pip install torch\`.

### 📦 3. Virtual Environment
Always use a \`.venv\` to avoid polluting system Python and ensure \`pip\` installs the correct versions for your hardware.

---

### 🧪 4. Validation (The Acid Test)
Use this script to ensure PyTorch sees your acceleration hardware:

\`\`\`python
snippet:neural-networks/pytorch-hardware-test
\`\`\``,
      codeExplanations: [
    {
    "lineRange": [
      1,
      2
    ],
    "content": "We import torch, PyTorch's base module that enables tensor creation and GPU operations."
  },
    {
    "lineRange": [
      4,
      6
    ],
    "content": "CUDA is NVIDIA's engine. MPS (Metal Performance Shaders) is Apple's engine for M1/M2/M3 chips."
  },
    {
    "lineRange": [
      8,
      13
    ],
    "content": "This code pattern is an industry standard: it detects the best hardware and only uses CPU as a last resort."
  },
    {
    "lineRange": [
      14,
      15
    ],
    "content": "If no accelerator is available, the safe fallback is CPU — the code continues to work normally."
  },
    {
    "lineRange": [
      17,
      17
    ],
    "content": "Crucial: by passing 'device=device', you tell PyTorch to create data directly inside GPU memory, avoiding transfer overhead."
  },
    {
    "lineRange": [
      19,
      19
    ],
    "content": "We print which hardware was selected to confirm the detection worked correctly."
  },
    {
    "lineRange": [
      21,
      22
    ],
    "content": "We run a simple operation on the tensor to prove the hardware is responding — if this runs without error, the GPU/MPS is active."
  }
  ],
    },
  },
});
