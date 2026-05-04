import { defineSlide } from './_factory';

export const neuralNetworkPytorchSilicon = defineSlide({
  id: 'neural-network-pytorch-silicon',
  type: 'two-column',
  options: {
    "columnRatios": [
      0.5,
      0.5
    ]
  },
  content: {
    'pt-br': {
      title: `Do Python ao Silício: por que tensores são mais rápidos`,
      body: `Quando você cria um tensor no PyTorch e o envia para a GPU com \`.to('cuda')\`, o que **realmente** acontece?

1. **O gargalo do Python:** cada operação com \`for\` em Python tem overhead — chamada de função, garbage collector, interpretação bytecode. Para milhões de contas, isso mata a performance.

2. **A GPU como paralelismo massivo:** uma GPU tem **milhares de núcleos simples** (CUDA cores). Em vez de fazer 1 conta 1 milhão de vezes (CPU sequencial), faz 10.000 contas **ao mesmo tempo**.

3. **VRAM = memória de alta largura de banda:** a GPU tem sua própria memória (GDDR6X) com ~1.000 GB/s vs ~50 GB/s da RAM do sistema. Os dados ficam **na GPU**, não precisam viajar.

4. **Tensor Cores:** unidades especializadas para multiplicação de matrizes. Fazem \`4×4×4\` em **1 ciclo**. É o hardware que torna o deep learning viável.

> Tensores não são "listas inteligentes" — são **passaportes para hardware especializado**.`,
    },
    'en-us': {
      title: `From Python to Silicon: why tensors are faster`,
      body: `When you create a tensor in PyTorch and send it to the GPU with \`.to('cuda')\`, what **really** happens?

1. **Python's bottleneck:** every operation with \`for\` in Python has overhead — function calls, garbage collector, bytecode interpretation. For millions of calculations, this kills performance.

2. **GPU as massive parallelism:** a GPU has **thousands of simple cores** (CUDA cores). Instead of doing 1 calculation 1 million times (sequential CPU), it does 10,000 calculations **at the same time**.

3. **VRAM = high bandwidth memory:** the GPU has its own memory (GDDR6X) with ~1,000 GB/s vs ~50 GB/s of system RAM. Data stays **on the GPU**, no need to travel.

4. **Tensor Cores:** specialized units for matrix multiplication. They do \`4×4×4\` in **1 cycle**. This is the hardware that makes deep learning viable.

> Tensors aren't "smart lists" — they're **passports to specialized hardware**.`,
    },
  },
  visual: {
    id: 'silicon-compute',
    copy: {
      "pt-br": {
        "tensorSizeLabel": "Tamanho do tensor",
        "compare": "Comparar CPU vs GPU",
        "running": "Executando",
        "speedComparison": "Comparação de velocidade",
        "cpuDesc": "Poucos núcleos poderosos, otimizados para baixa latência e tarefas sequenciais.",
        "gpuDesc": "Milhares de núcleos simples, otimizados para processamento paralelo massivo.",
        "vramLabel": "VRAM GPU",
        "ramLabel": "RAM CPU",
        "pcieLabel": "PCIe",
        "insightTitle": "Insight"
      },
      "en-us": {
        "tensorSizeLabel": "Tensor size",
        "compare": "Compare CPU vs GPU",
        "running": "Running",
        "speedComparison": "Speed comparison",
        "cpuDesc": "Few powerful cores, optimized for low latency and sequential tasks.",
        "gpuDesc": "Thousands of simple cores, optimized for massive parallel processing.",
        "vramLabel": "GPU VRAM",
        "ramLabel": "CPU RAM",
        "pcieLabel": "PCIe",
        "insightTitle": "Insight"
      }
    },
  },
});
