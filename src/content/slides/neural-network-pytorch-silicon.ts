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
      body: `Quando você cria um tensor no PyTorch e o envia para a GPU com \`.to('cuda')\`, a ideia central nao e decorar barramentos: e entender **throughput**.

1. **Python sai do caminho:** loops lentos viram kernels nativos.
2. **GPU multiplica em paralelo:** muitas contas iguais rodam ao mesmo tempo.
3. **Dados perto da computacao:** quando tensor e modelo ficam no mesmo device, o fluxo anda sem idas e vindas desnecessarias.

Resumo util:
- CPU = menor latencia para debug
- GPU = maior throughput para treino
- erro comum = esquecer tensor/modelo no mesmo device

> Tensores nao sao "listas inteligentes" - sao o formato que libera hardware especializado.`,
    },
    'en-us': {
      title: `From Python to Silicon: why tensors are faster`,
      body: `When you create a tensor in PyTorch and send it to the GPU with \`.to('cuda')\`, the key idea is not memorizing buses. It is understanding **throughput**.

1. **Python moves out of the way:** slow loops become native kernels.
2. **GPU multiplies in parallel:** many similar operations run at the same time.
3. **Data stays near compute:** when tensor and model share one device, the pipeline avoids unnecessary trips.

Useful summary:
- CPU = lower-latency debugging
- GPU = higher-throughput training
- common error = forgetting tensor/model on the same device

> Tensors are not "smart lists" - they are the format that unlocks specialized hardware.`,
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
