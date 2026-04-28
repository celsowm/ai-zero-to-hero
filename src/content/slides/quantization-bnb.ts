import { defineSlide } from './_factory';

export const quantizationBnb = defineSlide({
  id: 'quantization-bnb',
  type: 'two-column',
  options: {
    columnRatios: [0.5, 0.5],
  },
  content: {
    'pt-br': {
      title: `Quantização: rodando modelos grandes`,
      body: `Modelos de 7B+ parâmetros exigem GPUs enormes. **Quantização** reduz a precisão dos pesos para caber em hardware consumer.

1. **FP32 → FP16:** 32-bit para 16-bit. Perde pouco, ganha 2x em velocidade e memória. Padrão em GPUs NVIDIA modernas.

2. **INT8 (8-bit):** pesos em inteiros de 8-bit. Usa \`llm.int8()\` do bitsandbytes. LLMs de 7B cabem em ~7GB VRAM.

3. **NF4 (4-bit NormalFloat):** o estado da arte. 4-bit com quantile-based normalization. 7B em ~4GB — cabe até em uma RTX 3060.

4. **\`BitsAndBytesConfig\`:** configura a quantização antes do load. O modelo já é carregado em precision reduzida — não precisa de um modelo FP32 primeiro.

5. **Double quantization:** quantiza os quantization constants também. Economiza mais ~0.4 bits por parâmetro.

> Quantização é o trade-off mais eficiente: -85% de memória por ~5-10% de qualidade.

---

\`\`\`python
snippet:transformers/quantization-bnb
\`\`\``,
      codeExplanations: [
        {
          lineRange: [1, 2],
          content: 'Importamos `BitsAndBytesConfig` para configurar a quantização.',
        },
        {
          lineRange: [6, 11],
          content: 'Config NF4: 4-bit, double quantization, compute em float16.',
        },
        {
          lineRange: [14, 19],
          content: 'O modelo é carregado já quantizado — não precisa de FP32 intermediário.',
        },
        {
          lineRange: [22, 24],
          content: 'Comparação de VRAM: FP32=28GB, FP16=14GB, INT8=7GB, NF4=~4GB.',
        },
        {
          lineRange: [27, 29],
          content: 'Geração normal — o modelo quantizado funciona como o original.',
        },
      ],
    },
    'en-us': {
      title: `Quantization: running large models`,
      body: `Models with 7B+ parameters require massive GPUs. **Quantization** reduces weight precision to fit consumer hardware.

1. **FP32 → FP16:** 32-bit to 16-bit. Little loss, 2x speed and memory gain. Standard on modern NVIDIA GPUs.

2. **INT8 (8-bit):** weights in 8-bit integers. Uses bitsandbytes' \`llm.int8()\`. 7B LLMs fit in ~7GB VRAM.

3. **NF4 (4-bit NormalFloat):** state of the art. 4-bit with quantile-based normalization. 7B in ~4GB — fits even on an RTX 3060.

4. **\`BitsAndBytesConfig\`:** configures quantization before loading. The model is loaded in reduced precision — no need for an FP32 model first.

5. **Double quantization:** quantizes the quantization constants too. Saves ~0.4 more bits per parameter.

> Quantization is the most efficient trade-off: -85% memory for ~5-10% quality.

---

\`\`\`python
snippet:transformers/quantization-bnb
\`\`\``,
      codeExplanations: [
        {
          lineRange: [1, 2],
          content: 'We import `BitsAndBytesConfig` to configure quantization.',
        },
        {
          lineRange: [6, 11],
          content: 'NF4 config: 4-bit, double quantization, compute in float16.',
        },
        {
          lineRange: [14, 19],
          content: 'The model is loaded already quantized — no intermediate FP32 needed.',
        },
        {
          lineRange: [22, 24],
          content: 'VRAM comparison: FP32=28GB, FP16=14GB, INT8=7GB, NF4=~4GB.',
        },
        {
          lineRange: [27, 29],
          content: 'Normal generation — the quantized model works like the original.',
        },
      ],
    },
  },
  visual: {
    id: 'quantization-comparator',
    copy: {
      'pt-br': {
        title: 'Quantização: FP32 vs INT8 vs NF4',
        fp32Label: 'FP32',
        int8Label: 'INT8',
        nf4Label: 'NF4',
        precisionLabel: 'Precisão',
        memoryLabel: 'Memória',
        qualityLabel: 'Qualidade',
        bitsLabel: 'Bits',
        gpuVramLabel: 'VRAM GPU',
      },
      'en-us': {
        title: 'Quantization: FP32 vs INT8 vs NF4',
        fp32Label: 'FP32',
        int8Label: 'INT8',
        nf4Label: 'NF4',
        precisionLabel: 'Precision',
        memoryLabel: 'Memory',
        qualityLabel: 'Quality',
        bitsLabel: 'Bits',
        gpuVramLabel: 'GPU VRAM',
      },
    },
  },
});
