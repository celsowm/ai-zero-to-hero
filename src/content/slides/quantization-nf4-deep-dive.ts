import { defineSlide } from './_factory';

export const quantizationNf4DeepDive = defineSlide({
  id: 'quantization-nf4-deep-dive',
  type: 'two-column',
  options: {
    columnRatios: [0.55, 0.45],
  },
  content: {
    'pt-br': {
      title: `NF4: NormalFloat — o state of the art`,
      body: `NF4 é o formato **mais eficiente** disponível hoje. 4 bits, distribuição inteligente.

1. **O problema do uniforme:** dividir [-1, 1] em 16 níveis iguais é ineficiente. Pesos de LLM seguem normal — a maioria集中在 zero, poucos nos extremos.

2. **NormalFloat:** os 16 níveis são baseados nos **quantiles** de uma N(0,1). Níveis mais densos perto de zero (onde estão 68% dos pesos), mais espaçados nas caudas.

3. **Double quantization:** os parâmetros de quantização (scale e zero-point) também são quantizados. Cada peso ganha ~0.4 bits de overhead — double quant reduz isso a ~0.1 bits.

4. **O resultado:** 7B em ~4GB VRAM. Cabe em uma RTX 3060 (12GB) com espaço para KV cache e ativações. Qualidade ~95% do FP16.

> NF4 = "precisão inteligente": 16 níveis onde importam, não 16 níveis iguais.

---

\`\`\`python
snippet:transformers/quantization-bnb
\`\`\``,
      codeExplanations: [
        {
          lineRange: [1, 4],
          content: 'Importamos transformers, torch e BitsAndBytesConfig.',
        },
        {
          lineRange: [7, 12],
          content: 'Config NF4: double quant + NormalFloat + compute em FP16.',
        },
        {
          lineRange: [14, 21],
          content: 'Carregamos o modelo e tokenizador — ~4GB para 7B (Llama-2).',
        },
        {
          lineRange: [25, 26],
          content: 'Verificamos o dispositivo (GPU) e o footprint de memória reduzido.',
        },
        {
          lineRange: [29, 31],
          content: 'Exemplo de inferência rodando em um modelo quantizado de 4 bits.',
        },
      ],
    },
    'en-us': {
      title: `NF4: NormalFloat — the state of the art`,
      body: `NF4 is the **most efficient** format available today. 4 bits, intelligent distribution.

1. **The uniform problem:** dividing [-1, 1] into 16 equal levels is inefficient. LLM weights follow normal — most cluster near zero, few at extremes.

2. **NormalFloat:** the 16 levels are based on **quantiles** of N(0,1). Denser levels near zero (where 68% of weights live), more spaced at the tails.

3. **Double quantization:** the quantization parameters (scale and zero-point) are also quantized. Each weight gains ~0.4 bits overhead — double quant reduces this to ~0.1 bits.

4. **The result:** 7B in ~4GB VRAM. Fits on an RTX 3060 (12GB) with room for KV cache and activations. ~95% quality of FP16.

> NF4 = "smart precision": 16 levels where they matter, not 16 equal levels.

---

\`\`\`python
snippet:transformers/quantization-bnb
\`\`\``,
      codeExplanations: [
        {
          lineRange: [1, 4],
          content: 'We import transformers, torch and BitsAndBytesConfig.',
        },
        {
          lineRange: [7, 12],
          content: 'NF4 config: double quant + NormalFloat + FP16 compute.',
        },
        {
          lineRange: [14, 21],
          content: 'We load the model and tokenizer — ~4GB for 7B (Llama-2).',
        },
        {
          lineRange: [25, 26],
          content: 'Verify the device (GPU) and the reduced memory footprint.',
        },
        {
          lineRange: [29, 31],
          content: 'Inference example running on a 4-bit quantized model.',
        },
      ],
    },
  },
  visual: {
    id: 'nf4-quantile-visualizer',
    copy: {
      'pt-br': {
        title: 'NF4: Quantiles vs Uniforme',
        uniformLabel: 'Uniforme',
        normalFloatLabel: 'NormalFloat',
        bellCurveLabel: 'Curva de Gauss',
        quantileLabel: 'Níveis NF4 (quantiles)',
        level16Label: '16 níveis',
        denseNearZero: 'Denso perto de zero (68% dos pesos)',
        spacedAtTails: 'Espaçado nas caudas',
        weightsLabel: 'Pesos',
        precisionLabel: 'Precisão',
      },
      'en-us': {
        title: 'NF4: Quantiles vs Uniform',
        uniformLabel: 'Uniform',
        normalFloatLabel: 'NormalFloat',
        bellCurveLabel: 'Bell curve',
        quantileLabel: 'NF4 levels (quantiles)',
        level16Label: '16 levels',
        denseNearZero: 'Dense near zero (68% of weights)',
        spacedAtTails: 'Spaced at the tails',
        weightsLabel: 'Weights',
        precisionLabel: 'Precision',
      },
    },
  },
});
