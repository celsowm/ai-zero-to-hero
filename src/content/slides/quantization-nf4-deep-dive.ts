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
from transformers import AutoModelForCausalLM, BitsAndBytesConfig
import torch

# NF4 — o mais eficiente
bnb_config = BitsAndBytesConfig(
    load_in_4bit=True,
    bnb_4bit_use_double_quant=True,   # ← quantiza os params de quantização
    bnb_4bit_quant_type="nf4",        # ← NormalFloat (não uniforme)
    bnb_4bit_compute_dtype=torch.float16,  # ← computação em FP16
)

model = AutoModelForCausalLM.from_pretrained(
    "meta-llama/Llama-2-7b-hf",
    quantization_config=bnb_config,
    device_map="auto",
)
\`\`\``,
      codeExplanations: [
        {
          lineRange: [1, 3],
          content: 'Importamos transformers, torch e BitsAndBytesConfig.',
        },
        {
          lineRange: [6, 11],
          content: 'Config NF4: double quant + NormalFloat + compute em FP16.',
        },
        {
          lineRange: [13, 17],
          content: 'Carregamos o modelo já quantizado — ~4GB para 7B.',
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
from transformers import AutoModelForCausalLM, BitsAndBytesConfig
import torch

# NF4 — the most efficient
bnb_config = BitsAndBytesConfig(
    load_in_4bit=True,
    bnb_4bit_use_double_quant=True,   # ← quantize the quantization params
    bnb_4bit_quant_type="nf4",        # ← NormalFloat (not uniform)
    bnb_4bit_compute_dtype=torch.float16,  # ← computation in FP16
)

model = AutoModelForCausalLM.from_pretrained(
    "meta-llama/Llama-2-7b-hf",
    quantization_config=bnb_config,
    device_map="auto",
)
\`\`\``,
      codeExplanations: [
        {
          lineRange: [1, 3],
          content: 'We import transformers, torch and BitsAndBytesConfig.',
        },
        {
          lineRange: [6, 11],
          content: 'NF4 config: double quant + NormalFloat + FP16 compute.',
        },
        {
          lineRange: [13, 17],
          content: 'We load the model already quantized — ~4GB for 7B.',
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
