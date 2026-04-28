import { defineSlide } from './_factory';

export const inferenceComparison = defineSlide({
  id: 'inference-comparison',
  type: 'two-column',
  options: { columnRatios: [0.5, 0.5] },
  content: {
    'pt-br': {
      title: 'Quando Usar Qual Motor?',
      body: `Cada motor tem trade-offs. A escolha depende do seu cenário:

### Guia rápido

| Cenário | Motor recomendado | Por quê? |
|---|---|---|
| **Dev / teste rápido** | Transformers pipeline | Zero setup, roda no notebook |
| **Produção em CPU** | ONNX Runtime | 2-5x speedup, roda em edge |
| **GPU high-throughput** | vLLM | 24x vs HF, continuous batching |
| **GPU + structured output** | sglang | Constrained decoding nativo |
| **Multi-turn chat** | sglang | Radix prefix cache = 5x mais rápido |
| **Modelos MoE** | vLLM | Expert parallelism nativo |
| **Multi-modal** | vLLM | LLaVA, Qwen-VL, Pixtral |
| **Múltiplos hardwares** | sglang | NVIDIA + AMD + TPU + NPU |

### Decisão

1. Precisa de GPU? → ONNX para CPU, vLLM/sglang para GPU
2. Precisa de output estruturado? → sglang
3. Precisa de máximo throughput? → vLLM ou sglang
4. Precisa de simplicidade? → Transformers pipeline

> Não existe "melhor" — existe "melhor para o seu caso".`,
    },
    'en-us': {
      title: 'When to Use Which Engine?',
      body: `Each engine has trade-offs. The choice depends on your scenario:

### Quick guide

| Scenario | Recommended engine | Why? |
|---|---|---|
| **Dev / quick test** | Transformers pipeline | Zero setup, runs in notebook |
| **Production on CPU** | ONNX Runtime | 2-5x speedup, runs on edge |
| **GPU high-throughput** | vLLM | 24x vs HF, continuous batching |
| **GPU + structured output** | sglang | Native constrained decoding |
| **Multi-turn chat** | sglang | Radix prefix cache = 5x faster |
| **MoE models** | vLLM | Native expert parallelism |
| **Multi-modal** | vLLM | LLaVA, Qwen-VL, Pixtral |
| **Multiple hardware** | sglang | NVIDIA + AMD + TPU + NPU |

### Decision tree

1. Need GPU? → ONNX for CPU, vLLM/sglang for GPU
2. Need structured output? → sglang
3. Need max throughput? → vLLM or sglang
4. Need simplicity? → Transformers pipeline

> There's no "best" — there's "best for your case".`,
    },
  },
  visual: {
    id: 'inference-comparison-visual',
    copy: {
      'pt-br': {
        title: 'Matrix de Comparação',
        engineLabel: 'Motor',
        throughputLabel: 'Throughput',
        latencyLabel: 'Latência',
        setupLabel: 'Setup',
        hardwareLabel: 'Hardware',
        useCaseLabel: 'Caso de uso',
      },
      'en-us': {
        title: 'Comparison Matrix',
        engineLabel: 'Engine',
        throughputLabel: 'Throughput',
        latencyLabel: 'Latency',
        setupLabel: 'Setup',
        hardwareLabel: 'Hardware',
        useCaseLabel: 'Use case',
      },
    },
  },
});
