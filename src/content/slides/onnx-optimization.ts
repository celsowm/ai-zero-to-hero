import { defineSlide } from './_factory';

export const onnxOptimization = defineSlide({
  id: 'onnx-optimization',
  type: 'two-column',
  options: { columnRatios: [0.5, 0.5] },
  content: {
    'pt-br': {
      title: 'ONNX Runtime: Otimização Cross-Platform',
      body: `**ONNX** (Open Neural Network Exchange) é um formato aberto que permite rodar modelos otimizados em **CPU, GPU, NPU e edge**.

### Export para ONNX

\`\`\`python
snippet:onnx/export
\`\`\`

### Níveis de otimização

| Nível | O que faz | Speedup |
|---|---|---|
| **O1** | Fusão de operadores básicos | 1.2x |
| **O2** | + eliminação de redundâncias | 1.8x |
| **O3** | + otimizações agressivas de grafo | 2.5x |
| **O4** | FP16 (GPU) | 3x |

### Quantização

\`\`\`python
snippet:onnx/quantization
\`\`\`

- **FP32** → 16 GB VRAM (baseline)
- **FP16** → 8 GB VRAM (2x speedup em GPU)
- **INT8** → 4 GB VRAM (3x speedup em CPU)
- **INT4 (AWQ/GPTQ)** → 2 GB VRAM (roda LLM 7B em edge)

> ONNX é a escolha certa quando você precisa rodar em **CPU** ou hardware limitado (edge, NPU, WebGPU).`,
    },
    'en-us': {
      title: 'ONNX Runtime: Cross-Platform Optimization',
      body: `**ONNX** (Open Neural Network Exchange) is an open format that runs optimized models on **CPU, GPU, NPU and edge**.

### Export to ONNX

\`\`\`python
snippet:onnx/export
\`\`\`

### Optimization levels

| Level | What it does | Speedup |
|---|---|---|
| **O1** | Basic operator fusion | 1.2x |
| **O2** | + redundancy elimination | 1.8x |
| **O3** | + aggressive graph optimizations | 2.5x |
| **O4** | FP16 (GPU) | 3x |

### Quantization

\`\`\`python
snippet:onnx/quantization
\`\`\`

- **FP32** → 16 GB VRAM (baseline)
- **FP16** → 8 GB VRAM (2x speedup on GPU)
- **INT8** → 4 GB VRAM (3x speedup on CPU)
- **INT4 (AWQ/GPTQ)** → 2 GB VRAM (runs 7B LLM on edge)

> ONNX is the right choice when you need to run on **CPU** or limited hardware (edge, NPU, WebGPU).`,
    },
  },
  visual: {
    id: 'onnx-optimization-visual',
    copy: {
      'pt-br': {
        title: 'ONNX Quantization',
        fp32Label: 'FP32',
        fp16Label: 'FP16',
        int8Label: 'INT8',
        int4Label: 'INT4 (AWQ)',
        fp32Desc: 'Precisão máxima —baseline',
        fp16Desc: 'Metade da VRAM — 2x speedup GPU',
        int8Desc: 'PTQ — 3x speedup CPU',
        int4Desc: 'AWQ/GPTQ — roda 7B em edge',
        speedupLabel: 'Speedup vs PyTorch',
        vramLabel: 'VRAM necessária',
        exportLabel: 'Export',
      },
      'en-us': {
        title: 'ONNX Quantization',
        fp32Label: 'FP32',
        fp16Label: 'FP16',
        int8Label: 'INT8',
        int4Label: 'INT4 (AWQ)',
        fp32Desc: 'Max precision — baseline',
        fp16Desc: 'Half VRAM — 2x speedup GPU',
        int8Desc: 'PTQ — 3x speedup CPU',
        int4Desc: 'AWQ/GPTQ — runs 7B on edge',
        speedupLabel: 'Speedup vs PyTorch',
        vramLabel: 'VRAM required',
        exportLabel: 'Export',
      },
    },
  },
});
