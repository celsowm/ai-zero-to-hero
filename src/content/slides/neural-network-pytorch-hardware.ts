import { defineSlide } from './_factory';

export const neuralNetworkPytorchHardware = defineSlide({
  id: 'neural-network-pytorch-hardware',
  type: 'two-column',
  options: {
    columnRatios: [0.54, 0.46],
  },
  content: {
    'pt-br': {
      title: 'Acelerando com GPU: PyTorch Multi-Ambiente',
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
      title: 'GPU Acceleration: Multi-Environment PyTorch',
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
    id: 'pytorch-decision-matrix',
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
        matrixPanel: {
          title: 'Objetivo x backend recomendado',
          subtitle: 'A decisao nao e “GPU sempre”. Ela depende do custo de setup, do tamanho do experimento e do que voce esta tentando otimizar.',
          columns: ['Quando faz sentido', 'Primeira checagem', 'Risco tipico'],
          callouts: [
            { label: 'Regra de ouro', value: 'Cheque o hardware antes do PyTorch: `nvidia-smi`, `rocm-smi` ou o suporte nativo do macOS para Apple Silicon.' },
            { label: 'Setup', value: 'A wheel correta importa mais do que “ter GPU”. Wheel errada transforma acelerador em bug de ambiente.' },
          ],
          rows: [
            { label: 'CPU', cells: ['Smoke tests, debug curto, primeira leitura do modelo.', 'Ver se o script roda do começo ao fim sem depender de driver.', 'Experimento lento demais para treino real quando o batch cresce.'] },
            { label: 'MPS (Mac)', cells: ['Mac moderno com Apple Silicon e treino local moderado.', 'Confirmar `torch.backends.mps.is_available()`.', 'Esperar paridade total com CUDA e descobrir gaps de suporte tarde demais.'] },
            { label: 'CUDA (NVIDIA)', cells: ['Treino recorrente, batches maiores, epocas que justificam setup.', 'Validar driver, `nvidia-smi` e wheel compativel com sua stack CUDA.', 'Modelo em um device e tensor em outro: bug classico de dispatch.'] },
            { label: 'Troubleshooting', cells: ['Quando o ganho esperado nao aparece ou o script quebra cedo.', 'Rodar um tensor simples no device escolhido antes do modelo inteiro.', 'Culpar PyTorch sem verificar driver, install e dispatch primeiro.'] },
          ],
          footer: 'Regra de decisao: CPU e o baseline confiavel; acelerador vale quando o tempo de treino domina o custo de setup e de transferencia.',
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
        matrixPanel: {
          title: 'Goal vs recommended backend',
          subtitle: 'The decision is not “GPU always”. It depends on setup cost, experiment size, and what you are trying to optimize.',
          columns: ['When it fits', 'First check', 'Typical risk'],
          callouts: [
            { label: 'Golden rule', value: 'Check hardware before PyTorch: `nvidia-smi`, `rocm-smi`, or native macOS support for Apple Silicon.' },
            { label: 'Setup', value: 'The correct wheel matters more than merely “having a GPU”. The wrong wheel turns acceleration into environment pain.' },
          ],
          rows: [
            { label: 'CPU', cells: ['Smoke tests, short debugging, first model read-through.', 'Verify the script runs end to end without driver dependencies.', 'Training becomes too slow for serious runs once batch size grows.'] },
            { label: 'MPS (Mac)', cells: ['Modern Apple Silicon Mac with moderate local training.', 'Confirm `torch.backends.mps.is_available()`.', 'Assuming full CUDA parity and discovering support gaps too late.'] },
            { label: 'CUDA (NVIDIA)', cells: ['Recurring training, larger batches, epochs that justify setup.', 'Validate driver, `nvidia-smi`, and a wheel compatible with your CUDA stack.', 'Model on one device and tensors on another: classic dispatch failure.'] },
            { label: 'Troubleshooting', cells: ['When expected speedup never appears or the script fails early.', 'Run a simple tensor op on the chosen device before the full model.', 'Blaming PyTorch before checking driver, install, and dispatch.'] },
          ],
          footer: 'Decision rule: CPU is the trustworthy baseline; an accelerator is worth it when training time dominates setup and transfer overhead.',
        },
      },
    },
  },
});
