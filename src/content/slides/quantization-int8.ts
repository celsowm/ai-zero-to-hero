import { defineSlide } from './_factory';

export const quantizationInt8 = defineSlide({
  id: 'quantization-int8',
  type: 'two-column',
  options: {
    columnRatios: [0.5, 0.5],
  },
  content: {
    'pt-br': {
      title: `INT8: llm.int8() e o problema dos outliers`,
      body: `INT8 reduz de 256 para 16 vezes menos memória que FP32. Mas tem um **problema oculto**.

1. **Como funciona:** cada peso é escalado para caber em [-127, 127]. Um fator de escala (S) guarda a magnitude original: W_original = W_int8 × S.

2. **O problema dos outliers:** em LLMs, algumas features têm valores **extremamente grandes** (até 1000× a média). Se quantizarmos tudo uniformemente, esses outliers são destruídos e a qualidade despenca.

3. **llm.int8() do bitsandbytes:** detecta automaticamente colunas com outliers e as **mantém em FP16**. Só o resto vai para INT8. Mix inteligente.

4. **Quando usar:** inference em GPUs com < 12GB VRAM. Um 7B em INT8 ocupa ~7GB. Boa qualidade, mas NF4 é melhor hoje.

> llm.int8() foi o divisor de águas: provou que quantização mista funciona — alguns pesos em FP16, o resto em INT8.

---

\`\`\`python
from transformers import AutoModelForCausalLM, BitsAndBytesConfig

# INT8 com detecção automática de outliers
bnb_config = BitsAndBytesConfig(
    load_in_8bit=True,
    llm_int8_threshold=6.0,  # colunas com |valor| > 6σ ficam em FP16
)

model = AutoModelForCausalLM.from_pretrained(
    "meta-llama/Llama-2-7b-hf",
    quantization_config=bnb_config,
    device_map="auto",
)
print(f"VRAM: ~7 GB para 7B model")
\`\`\``,
      codeExplanations: [
        {
          lineRange: [1, 2],
          content: 'Importamos BitsAndBytesConfig para quantização INT8.',
        },
        {
          lineRange: [5, 7],
          content: '`load_in_8bit=True` ativa INT8. O threshold define o corte para outliers.',
        },
        {
          lineRange: [9, 13],
          content: 'O modelo é carregado com quantização mista — outliers em FP16, resto em INT8.',
        },
        {
          lineRange: [14, 14],
          content: '~7GB para um modelo 7B — metade do FP16.',
        },
      ],
    },
    'en-us': {
      title: `INT8: llm.int8() and the outlier problem`,
      body: `INT8 reduces from 256 to 16 times less memory than FP32. But there's a **hidden problem**.

1. **How it works:** each weight is scaled to fit in [-127, 127]. A scale factor (S) stores the original magnitude: W_original = W_int8 × S.

2. **The outlier problem:** in LLMs, some features have **extremely large** values (up to 1000× the mean). If we quantize everything uniformly, those outliers are destroyed and quality plummets.

3. **bitsandbytes' llm.int8():** automatically detects columns with outliers and **keeps them in FP16**. Only the rest goes to INT8. Smart mix.

4. **When to use:** inference on GPUs with < 12GB VRAM. A 7B in INT8 takes ~7GB. Good quality, but NF4 is better today.

> llm.int8() was the watershed moment: it proved mixed quantization works — some weights in FP16, the rest in INT8.

---

\`\`\`python
from transformers import AutoModelForCausalLM, BitsAndBytesConfig

# INT8 with automatic outlier detection
bnb_config = BitsAndBytesConfig(
    load_in_8bit=True,
    llm_int8_threshold=6.0,  # columns with |value| > 6σ stay in FP16
)

model = AutoModelForCausalLM.from_pretrained(
    "meta-llama/Llama-2-7b-hf",
    quantization_config=bnb_config,
    device_map="auto",
)
print(f"VRAM: ~7 GB for 7B model")
\`\`\``,
      codeExplanations: [
        {
          lineRange: [1, 2],
          content: 'We import BitsAndBytesConfig for INT8 quantization.',
        },
        {
          lineRange: [5, 7],
          content: '`load_in_8bit=True` enables INT8. The threshold defines the outlier cutoff.',
        },
        {
          lineRange: [9, 13],
          content: 'The model is loaded with mixed quantization — outliers in FP16, rest in INT8.',
        },
        {
          lineRange: [14, 14],
          content: '~7GB for a 7B model — half of FP16.',
        },
      ],
    },
  },
  visual: {
    id: 'int8-outlier-detector',
    copy: {
      'pt-br': {
        title: 'INT8: Detector de Outliers',
        weightDistLabel: 'Distribuição de pesos',
        outlierLabel: 'Outliers',
        normalLabel: 'Pesos normais',
        thresholdLabel: 'Threshold (σ)',
        int8Label: 'Quantizados para INT8',
        fp16Label: 'Mantidos em FP16',
        keepInFp16: 'Manter em FP16',
        quantizeToInt8: 'Quantizar para INT8',
      },
      'en-us': {
        title: 'INT8: Outlier Detector',
        weightDistLabel: 'Weight distribution',
        outlierLabel: 'Outliers',
        normalLabel: 'Normal weights',
        thresholdLabel: 'Threshold (σ)',
        int8Label: 'Quantized to INT8',
        fp16Label: 'Kept in FP16',
        keepInFp16: 'Keep in FP16',
        quantizeToInt8: 'Quantize to INT8',
      },
    },
  },
});
