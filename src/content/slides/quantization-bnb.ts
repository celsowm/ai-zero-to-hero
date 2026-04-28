import { defineSlide } from './_factory';

export const quantizationBnb = defineSlide({
  id: 'quantization-bnb',
  type: 'two-column',
  options: {
    columnRatios: [0.5, 0.5],
  },
  content: {
    'pt-br': {
      title: `Quantização: o que é e por que funciona`,
      body: `Modelos de 7B+ parâmetros exigem GPUs enormes. **Quantização** reduz a precisão dos pesos para caber em hardware consumer.

1. **FP32 (32-bit):** cada peso usa 4 bytes. Um modelo de 7B ocupa **28GB** de VRAM. Precisão absurda — mais do que o cérebro precisa.

2. **FP16 (16-bit):** metade dos bytes, metade da VRAM (**14GB**). Perde muito pouco — GPUs modernas nativamente suportam.

3. **INT8 (8-bit):** pesos em inteiros. 7B em **~7GB**. Usa \`llm.int8()\` do bitsandbytes — detecta outliers e os mantém em FP16.

4. **A intuição:** a maioria dos pesos de um LLM vive perto de zero. Não precisamos de 3.14159265 — 3.14 já funciona.

> Quantização = arredondar pesos. -85% de memória por ~5% de qualidade.

---

\`\`\`python
snippet:transformers/quantization-bnb
\`\`\``,
      codeExplanations: [
        {
          lineRange: [1, 2],
          content: 'Importamos `BitsAndBytesConfig` — a peça central da quantização.',
        },
        {
          lineRange: [6, 11],
          content: 'Config NF4: 4-bit com double quantization e compute em float16.',
        },
        {
          lineRange: [14, 19],
          content: 'O modelo é carregado já quantizado — sem FP32 intermediário.',
        },
        {
          lineRange: [27, 29],
          content: 'Geração normal — o modelo quantizado funciona como o original.',
        },
      ],
    },
    'en-us': {
      title: `Quantization: what is it and why it works`,
      body: `Models with 7B+ parameters require massive GPUs. **Quantization** reduces weight precision to fit consumer hardware.

1. **FP32 (32-bit):** each weight uses 4 bytes. A 7B model takes **28GB** of VRAM. Absurd precision — more than the brain needs.

2. **FP16 (16-bit):** half the bytes, half the VRAM (**14GB**). Little loss — modern GPUs support it natively.

3. **INT8 (8-bit):** weights as integers. 7B in **~7GB**. Uses bitsandbytes' \`llm.int8()\` — detects outliers and keeps them in FP16.

4. **The intuition:** most weights in an LLM live near zero. We don't need 3.14159265 — 3.14 already works.

> Quantization = rounding weights. -85% memory for ~5% quality.

---

\`\`\`python
snippet:transformers/quantization-bnb
\`\`\``,
      codeExplanations: [
        {
          lineRange: [1, 2],
          content: 'We import `BitsAndBytesConfig` — the centerpiece of quantization.',
        },
        {
          lineRange: [6, 11],
          content: 'NF4 config: 4-bit with double quantization and float16 compute.',
        },
        {
          lineRange: [14, 19],
          content: 'The model is loaded already quantized — no intermediate FP32.',
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
