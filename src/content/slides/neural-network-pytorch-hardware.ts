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
      body: `Se você tem uma placa de vídeo ou um Mac moderno, vale avaliar acelerador. Mas CPU ainda é a melhor escolha para debug curto, instalação simples e primeiros testes.

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

Regra de decisão:
- **CPU:** melhor para smoke tests, debug e batches pequenos.
- **MPS/CUDA:** melhor quando o treino domina o tempo total e a transferência compensa.`,
    },
    'en-us': {
      title: `GPU Acceleration: Multi-Environment PyTorch`,
      body: `If you have a graphics card or a modern Mac, accelerators are worth evaluating. But CPU is still the best choice for short debugging sessions, simple setup, and first tests.

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

Decision rule:
- **CPU:** best for smoke tests, debugging, and tiny batches.
- **MPS/CUDA:** best when training dominates total runtime and transfer cost is worth it.`,
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
          title: 'Objetivo x backend recomendado',
          items: [
            { label: 'Debug rapido', value: 'CPU. Menos variaveis de ambiente e mensagens de erro mais diretas.' },
            { label: 'Mac moderno', value: 'MPS. Bom ganho local sem configurar CUDA.' },
            { label: 'Treino recorrente', value: 'CUDA. Vale quando batches e epocas deixam a GPU ocupada.' },
            { label: 'Troubleshooting base', value: 'Se algo falhar, cheque driver, wheel correta e se modelo/tensor estao no mesmo `device`.' },
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
          title: 'Goal vs recommended backend',
          items: [
            { label: 'Fast debugging', value: 'CPU. Fewer environment variables and clearer error messages.' },
            { label: 'Modern Mac', value: 'MPS. Solid local speedup without CUDA setup.' },
            { label: 'Recurring training', value: 'CUDA. Worth it when batches and epochs keep GPU busy.' },
            { label: 'Troubleshooting base', value: 'If it fails, check driver, correct wheel, and whether model/tensors share the same `device`.' },
          ],
        },
      },
    },
  },
});
