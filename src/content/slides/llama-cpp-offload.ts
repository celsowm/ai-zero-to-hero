import { defineSlide } from './_factory';

export const llamaCppOffload = defineSlide({
  id: 'llama-cpp-offload',
  type: 'two-column',
  options: {
    columnRatios: [0.5, 0.5],
  },
  content: {
    'pt-br': {
      title: 'GPU Offload: Como Rodar Modelos Grandes em GPUs Pequenas',
      body: `O problema: **Llama-3 70B em Q4_0 = 35 GB**. Sua GPU = **24 GB** (RTX 3090). E agora?

### n_gpu_layers: O Parâmetro Mágico
O llama.cpp permite colocar **algumas camadas na GPU** e o resto na CPU:

$$\\text{layers\\_on\\_gpu} = \\min\\left(\\text{total\\_layers}, \\left\\lfloor \\frac{\\text{gpu\\_vram}}{\\text{vram\\_per\\_layer}} \\right\\rfloor\\right)$$

Cada camada tem um custo: pesos + KV cache + ativações.

### Memory Budget
**GPU VRAM** = pesos_gpu + KV_cache_gpu + overhead_ativações
**CPU RAM** = pesos_cpu + KV_cache_cpu + swap (se disk offload)

### Latência do Offload
Cada camada na CPU é **~10x mais lenta** que na GPU:
- GPU: ~0.05ms por camada
- CPU: ~0.5ms por camada

$$\\text{latência} = (N_{gpu} \\times t_{gpu}) + (N_{cpu} \\times t_{cpu})$$

**Exemplo 70B, RTX 3090 (24 GB):**
- 30 camadas na GPU → 1.5ms
- 50 camadas na CPU → 25ms
- **Total: 26.5ms → ~38 tok/s**

### CPU Offload no Transformers
O accelerate usa \`device_map="auto"\`:
\`\`\`python
snippet:transformers/offload-accelerate
\`\`\`

### Disk Offload
Quando nem RAM cabe — o **accelerate** usa SSD como extensão. Lento (leitura sequencial ~500MB/s) mas **funciona**.

> **Interaja →** Simule diferentes configurações de GPU/CPU/disk e veja a distribuição em tempo real.`,
      codeExplanations: [
        {
          lineRange: [1, 1],
          content: 'Importamos a classe AutoModel para carregamento genérico.',
        },
        {
          lineRange: [4, 6],
          content: 'O parâmetro device_map="auto" ativa a biblioteca accelerate para distribuir as camadas.',
        },
        {
          lineRange: [7, 10],
          content: 'Definimos quanto de memória cada dispositivo pode consumir para os pesos.',
        },
      ],
    },
    'en-us': {
      title: 'GPU Offload: Running Large Models on Small GPUs',
      body: `The problem: **Llama-3 70B in Q4_0 = 35 GB**. Your GPU = **24 GB** (RTX 3090). Now what?

### n_gpu_layers: The Magic Parameter
llama.cpp lets you put **some layers on GPU** and the rest on CPU:

$$\\text{layers\\_on\\_gpu} = \\min\\left(\\text{total\\_layers}, \\left\\lfloor \\frac{\\text{gpu\\_vram}}{\\text{vram\\_per\\_layer}} \\right\\rfloor\\right)$$

Each layer has a cost: weights + KV cache + activations.

### Memory Budget
**GPU VRAM** = weights_gpu + KV_cache_gpu + activation_overhead
**CPU RAM** = weights_cpu + KV_cache_cpu + swap (if disk offload)

### Offload Latency
Each CPU layer is **~10x slower** than GPU:
- GPU: ~0.05ms per layer
- CPU: ~0.5ms per layer

$$\\text{latency} = (N_{gpu} \\times t_{gpu}) + (N_{cpu} \\times t_{cpu})$$

**Example 70B, RTX 3090 (24 GB):**
- 30 layers on GPU → 1.5ms
- 50 layers on CPU → 25ms
- **Total: 26.5ms → ~38 tok/s**

### CPU Offload in Transformers
The accelerate library uses \`device_map="auto"\`:
\`\`\`python
snippet:transformers/offload-accelerate
\`\`\`

### Disk Offload
When not even RAM fits — **accelerate** uses SSD as extension. Slow (sequential read ~500MB/s) but **it works**.

> **Interact →** Simulate different GPU/CPU/disk configurations and see the distribution in real-time.`,
      codeExplanations: [
        {
          lineRange: [1, 1],
          content: 'Importing AutoModel class for generic loading.',
        },
        {
          lineRange: [4, 6],
          content: 'The device_map="auto" parameter enables the accelerate library to distribute layers.',
        },
        {
          lineRange: [7, 10],
          content: 'We define how much memory each device can consume for the weights.',
        },
      ],
    },
  },
  visual: {
    id: 'offload-simulator',
    copy: {
      'pt-br': {
        title: 'Simulador de Offload',
        subtitle: 'Distribuição de camadas GPU ↔ CPU ↔ Disk',
        modelLabel: 'Modelo',
        gpuVramLabel: 'VRAM GPU',
        cpuRamLabel: 'RAM CPU',
        nGpuLayersLabel: 'n_gpu_layers',
        diskOffloadLabel: 'Disk Offload',
        gpuMemoryTitle: 'Memória GPU',
        cpuMemoryTitle: 'Memória CPU',
        weightsLabel: 'Pesos',
        kvCacheLabel: 'KV Cache',
        overheadLabel: 'Overhead',
        swapLabel: 'Swap',
        layerDistTitle: 'Distribuição de Camadas',
        gpuLayerLabel: 'GPU',
        cpuLayerLabel: 'CPU',
        diskLayerLabel: 'Disk',
        perfTitle: 'Estimador de Performance',
        tokUnit: 'tok/s',
        slowLabel: 'Lento (< 5 tok/s)',
        mediumLabel: 'Médio (5-15 tok/s)',
        fastLabel: 'Rápido (> 15 tok/s)',
        stepperTitle: 'Forward Pass com Offload',
        stepFocusLabel: 'Foco',
        step1Label: 'GPU Forward',
        step1Body: 'Camadas 0-N processadas na GPU (rápido).',
        step2Label: 'Transfer PCIe',
        step2Body: 'Hidden state copiado via PCIe para CPU (~5μs).',
        step3Label: 'CPU Forward',
        step3Body: 'Camadas N+1 processadas na CPU (lento mas funciona).',
        totalParamsLabel: 'Params',
        bppLabel: 'Bits/Param',
        warningTitle: 'Diagnóstico',
        warningGpuUnderutilized: 'GPU subutilizada — aumente n_gpu_layers para mais performance.',
        warningCpuBottleneck: 'CPU bottleneck — maioria das camadas na CPU, velocidade limitada.',
        warningBalanced: 'Configuração equilibrada — bom split GPU/CPU.',
        warningImpossible: 'Modelo não cabe nem em GPU+CPU. Considere mais RAM ou modelo menor.',
        gpuSpeedLabel: 'GPU pura',
        cpuSpeedLabel: 'CPU pura',
        estimatedSpeedLabel: 'Estimada',
        onLabel: 'ON',
        offLabel: 'OFF',
      },
      'en-us': {
        title: 'Offload Simulator',
        subtitle: 'Layer distribution GPU ↔ CPU ↔ Disk',
        modelLabel: 'Model',
        gpuVramLabel: 'GPU VRAM',
        cpuRamLabel: 'CPU RAM',
        nGpuLayersLabel: 'n_gpu_layers',
        diskOffloadLabel: 'Disk Offload',
        gpuMemoryTitle: 'GPU Memory',
        cpuMemoryTitle: 'CPU Memory',
        weightsLabel: 'Weights',
        kvCacheLabel: 'KV Cache',
        overheadLabel: 'Overhead',
        swapLabel: 'Swap',
        layerDistTitle: 'Layer Distribution',
        gpuLayerLabel: 'GPU',
        cpuLayerLabel: 'CPU',
        diskLayerLabel: 'Disk',
        perfTitle: 'Performance Estimator',
        tokUnit: 'tok/s',
        slowLabel: 'Slow (< 5 tok/s)',
        mediumLabel: 'Medium (5-15 tok/s)',
        fastLabel: 'Fast (> 15 tok/s)',
        stepperTitle: 'Forward Pass with Offload',
        stepFocusLabel: 'Focus',
        step1Label: 'GPU Forward',
        step1Body: 'Layers 0-N processed on GPU (fast).',
        step2Label: 'PCIe Transfer',
        step2Body: 'Hidden state copied via PCIe to CPU (~5μs).',
        step3Label: 'CPU Forward',
        step3Body: 'Layers N+1 processed on CPU (slow but works).',
        totalParamsLabel: 'Params',
        bppLabel: 'Bits/Param',
        warningTitle: 'Diagnosis',
        warningGpuUnderutilized: 'GPU underutilized — increase n_gpu_layers for more performance.',
        warningCpuBottleneck: 'CPU bottleneck — most layers on CPU, speed limited.',
        warningBalanced: 'Balanced configuration — good GPU/CPU split.',
        warningImpossible: 'Model does not fit in GPU+CPU. Consider more RAM or smaller model.',
        gpuSpeedLabel: 'GPU only',
        cpuSpeedLabel: 'CPU only',
        estimatedSpeedLabel: 'Estimated',
        onLabel: 'ON',
        offLabel: 'OFF',
      },
    },
  },
});
