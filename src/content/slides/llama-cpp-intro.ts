import { defineSlide } from './_factory';

export const llamaCppIntro = defineSlide({
  id: 'llama-cpp-intro',
  type: 'two-column',
  options: {
    columnRatios: [0.5, 0.5],
  },
  content: {
    'pt-br': {
      title: 'llama.cpp: GGUF, Quantização e Inferência em CPU',
      body: `Enquanto vLLM e sglang dominam GPUs enterprise, **llama.cpp** é o motor que roda LLMs em **qualquer hardware** — CPU, Apple Silicon ou GPU parcial.

### GGUF: O Formato Quantization-Aware
Diferente do ONNX (que quantiza no export), o **GGUF** armazena pesos já quantizados no arquivo:

| Formato | Bits/Peso | Qualidade | Tamanho (7B) |
| :--- | :--- | :--- | :--- |
| **Q4_0** | 4.0 | ~88% | ~3.5 GB |
| **Q5_K_M** | 5.5 | ~93% | ~4.7 GB |
| **Q8_0** | 8.5 | ~98% | ~7.2 GB |
| **FP16** | 16.0 | 100% | ~13.5 GB |

### Fórmula de VRAM
$$\\text{VRAM} = \\frac{\\text{bpp} \\times \\text{params}}{8} + 2 \\cdot L \\cdot d \\cdot S \\cdot 2$$

Onde: bpp = bits por peso, $L$ = camadas, $d$ = hidden dim, $S$ = seq len

**Exemplo prático** — Llama-3 8B em Q4_0 com seq_len=4096:
- Pesos: $(4 \\times 8 \\times 10^9) / 8 = 4.0$ GB
- KV cache: $2 \\times 32 \\times 4096 \\times 4096 \\times 2 \\approx 1.0$ GB
- **Total: ~5 GB** (vs 16 GB em FP16!)

### Inferência CPU com SIMD
A CPU multiplica matrizes quantizadas em blocos de 32 usando:
- **AVX2** (x86): 256-bit vetores → 8 float32 por instrução
- **AVX-512** (x86 moderno): 512-bit → 16 float32
- **NEON** (ARM/Apple): 128-bit → otimizado para NEON/Apple Silicon

### Apple Silicon: Metal
llama.cpp é o **único** engine com backend Metal nativo — roda em M1/M2/M3 com performance próxima de GPU dedicada.`,
    },
    'en-us': {
      title: 'llama.cpp: GGUF, Quantization and CPU Inference',
      body: `While vLLM and sglang dominate enterprise GPUs, **llama.cpp** is the engine that runs LLMs on **any hardware** — CPU, Apple Silicon, or partial GPU.

### GGUF: The Quantization-Aware Format
Unlike ONNX (which quantizes on export), **GGUF** stores already-quantized weights in the file:

| Format | Bits/Weight | Quality | Size (7B) |
| :--- | :--- | :--- | :--- |
| **Q4_0** | 4.0 | ~88% | ~3.5 GB |
| **Q5_K_M** | 5.5 | ~93% | ~4.7 GB |
| **Q8_0** | 8.5 | ~98% | ~7.2 GB |
| **FP16** | 16.0 | 100% | ~13.5 GB |

### VRAM Formula
$$\\text{VRAM} = \\frac{\\text{bpp} \\times \\text{params}}{8} + 2 \\cdot L \\cdot d \\cdot S \\cdot 2$$

Where: bpp = bits per weight, $L$ = layers, $d$ = hidden dim, $S$ = seq len

**Practical example** — Llama-3 8B in Q4_0 with seq_len=4096:
- Weights: $(4 \\times 8 \\times 10^9) / 8 = 4.0$ GB
- KV cache: $2 \\times 32 \\times 4096 \\times 4096 \\times 2 \\approx 1.0$ GB
- **Total: ~5 GB** (vs 16 GB in FP16!)

### CPU Inference with SIMD
The CPU multiplies quantized matrices in blocks of 32 using:
- **AVX2** (x86): 256-bit vectors → 8 float32 per instruction
- **AVX-512** (modern x86): 512-bit → 16 float32
- **NEON** (ARM/Apple): 128-bit → optimized for NEON/Apple Silicon

### Apple Silicon: Metal
llama.cpp is the **only** engine with native Metal backend — runs on M1/M2/M3 with near-dedicated-GPU performance.`,
    },
  },
  visual: {
    id: 'llama-cpp-quant-explorer',
    copy: {
      'pt-br': {
        title: 'Explorador de Quantização GGUF',
        subtitle: 'Cálculo real de VRAM por modelo e formato',
        modelLabel: 'Modelo',
        formatLabel: 'Formato GGUF',
        vramTitle: 'VRAM Breakdown',
        vramFormula: '(bpp × params) / 8 + KV_cache',
        qualityTitle: 'Qualidade vs Tamanho',
        qualitySubtitle: 'Cada ponto é um formato GGUF',
        speedTitle: 'Velocidade por Backend',
        speedSubtitle: 'tok/s estimado por tamanho do modelo',
        stepperTitle: 'Pipeline de Inferência llama.cpp',
        stepFocusLabel: 'Foco',
        step1Label: 'mmap GGUF',
        step1Body: 'Arquivo mapeado em memória sem carregar tudo.',
        step2Label: 'Dequantização',
        step2Body: 'Blocos de 32 pesos dequantizados sob demanda.',
        step3Label: 'MatMul SIMD',
        step3Body: 'AVX2/NEON multiplicam matrizes em paralelo.',
        step4Label: 'Sample + KV',
        step4Body: 'Token amostrado e KV cache atualizado.',
        paramsLabel: 'Pesos',
        fileSizeLabel: 'Arquivo',
        kvCacheLabel: 'KV Cache',
        totalVramLabel: 'VRAM Total',
        bppLabel: 'Bits/Peso',
        speedLabel: 'Velocidade',
        tokUnit: 'tok/s',
        qualityLabel: 'Qualidade',
        fp16Reference: 'Linha de referência FP16',
        cpuSimdLabel: 'AVX2',
        metalLabel: 'Metal',
        cudaLabel: 'CUDA',
      },
      'en-us': {
        title: 'GGUF Quantization Explorer',
        subtitle: 'Real VRAM calculation per model and format',
        modelLabel: 'Model',
        formatLabel: 'GGUF Format',
        vramTitle: 'VRAM Breakdown',
        vramFormula: '(bpp × params) / 8 + KV_cache',
        qualityTitle: 'Quality vs Size',
        qualitySubtitle: 'Each point is a GGUF format',
        speedTitle: 'Speed per Backend',
        speedSubtitle: 'Estimated tok/s per model size',
        stepperTitle: 'llama.cpp Inference Pipeline',
        stepFocusLabel: 'Focus',
        step1Label: 'mmap GGUF',
        step1Body: 'File mapped in memory without loading everything.',
        step2Label: 'Dequantization',
        step2Body: 'Blocks of 32 weights dequantized on demand.',
        step3Label: 'MatMul SIMD',
        step3Body: 'AVX2/NEON multiply matrices in parallel.',
        step4Label: 'Sample + KV',
        step4Body: 'Token sampled and KV cache updated.',
        paramsLabel: 'Weights',
        fileSizeLabel: 'File Size',
        kvCacheLabel: 'KV Cache',
        totalVramLabel: 'Total VRAM',
        bppLabel: 'Bits/Weight',
        speedLabel: 'Speed',
        tokUnit: 'tok/s',
        qualityLabel: 'Quality',
        fp16Reference: 'FP16 reference line',
        cpuSimdLabel: 'AVX2',
        metalLabel: 'Metal',
        cudaLabel: 'CUDA',
      },
    },
  },
});
