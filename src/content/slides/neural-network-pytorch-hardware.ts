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
Sempre use um \`.venv\` para não poluir o Python do sistema e garantir que o \`pip\` instale as versões corretas para o seu hardware.`,
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
Always use a \`.venv\` to avoid polluting system Python and ensure \`pip\` installs the correct versions for your hardware.`,
    },
  },
  visual: {
    id: 'pytorch-dual-panel',
    copy: {
      'pt-br': {
        tabs: [{ label: 'Codigo' }, { label: 'Diagnostico' }],
        codePanel: {
          title: 'Teste de aceleracao',
          description: 'Script padrao para detectar backend (CUDA/MPS/CPU) e validar execucao em dispositivo.',
          source: { snippetId: 'neural-networks/pytorch-hardware-test', language: 'python' },
          codeExplanations: [
            { lineRange: [1, 2], content: 'Importa torch, base para tensores e dispatch de hardware.' },
            { lineRange: [4, 6], content: 'Consulta disponibilidade de CUDA e MPS.' },
            { lineRange: [8, 15], content: 'Escolhe melhor backend com fallback seguro para CPU.' },
            { lineRange: [17, 22], content: 'Cria tensor no device selecionado e executa operacao de validacao.' },
          ],
        },
        visualPanel: {
          title: 'Checklist de troubleshooting',
          items: [
            { label: 'GPU nao aparece', value: 'Validar driver (`nvidia-smi`/`rocm-smi`) antes de culpar PyTorch.' },
            { label: 'Instalacao errada', value: 'Conferir wheel CUDA correta no site oficial para sua versao.' },
            { label: 'Performance baixa', value: 'Garantir tensor e modelo no mesmo `device`.' },
            { label: 'Fallback esperado', value: 'Sem acelerador, CPU deve funcionar sem quebrar o fluxo.' },
          ],
        },
      },
      'en-us': {
        tabs: [{ label: 'Code' }, { label: 'Diagnostics' }],
        codePanel: {
          title: 'Acceleration test',
          description: 'Standard script to detect backend (CUDA/MPS/CPU) and validate execution on selected device.',
          source: { snippetId: 'neural-networks/pytorch-hardware-test', language: 'python' },
          codeExplanations: [
            { lineRange: [1, 2], content: 'Import torch, the base for tensors and hardware dispatch.' },
            { lineRange: [4, 6], content: 'Query CUDA and MPS availability.' },
            { lineRange: [8, 15], content: 'Select best backend with safe CPU fallback.' },
            { lineRange: [17, 22], content: 'Create tensor on selected device and run validation operation.' },
          ],
        },
        visualPanel: {
          title: 'Troubleshooting checklist',
          items: [
            { label: 'GPU not detected', value: 'Validate drivers (`nvidia-smi`/`rocm-smi`) before blaming PyTorch.' },
            { label: 'Wrong install', value: 'Use official wheel that matches your CUDA version.' },
            { label: 'Low performance', value: 'Ensure model and tensors are on the same `device`.' },
            { label: 'Expected fallback', value: 'Without accelerator, CPU path should still run safely.' },
          ],
        },
      },
    },
  },
});
