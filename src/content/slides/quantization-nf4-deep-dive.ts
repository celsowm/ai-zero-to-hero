import { defineSlide } from './_factory';

export const quantizationNf4DeepDive = defineSlide({
  id: 'quantization-nf4-deep-dive',
  type: 'two-column',
  options: {
    columnRatios: [0.55, 0.45],
  },
  content: {
    'pt-br': {
      title: `NF4: o algoritmo por trás da mágica`,
      body: `Como caber um modelo de 7B em 4GB? A resposta está no **NormalFloat 4-bit**.

1. **O problema do uniform quantization:** dividir [-1, 1] em 16 níveis iguais é ineficiente. Os pesos de um LLM seguem distribuição normal — a maioria集中在 zero, poucos nos extremos.

2. **NF4 (NormalFloat):** em vez de níveis uniformes, usa 16 níveis baseados nos **quantiles** de uma distribuição normal. Mais resolução onde os pesos realmente estão.

3. **Double quantization:** os parâmetros de quantização (scale, zero-point) também são quantizados. Cada peso de 4-bit ganha ~0.4 bits de overhead — double quant reduz isso.

4. **llm.int8() com outliers:** detecta automaticamente features com valores extremos (outliers) e as mantém em FP16. O resto fica em INT8.

> NF4 não é "menos precisão" — é "precisão inteligente": mais bits onde importa, menos onde não precisa.

---

\`\`\`python
# NF4 config no bitsandbytes
bnb_config = BitsAndBytesConfig(
    load_in_4bit=True,
    bnb_4bit_use_double_quant=True,   # ← quantiza os quantization params
    bnb_4bit_quant_type="nf4",        # ← NormalFloat, não uniform
    bnb_4bit_compute_dtype=torch.float16,  # compute em FP16
)
\`\`\``,
    },
    'en-us': {
      title: `NF4: the algorithm behind the magic`,
      body: `How to fit a 7B model in 4GB? The answer is **NormalFloat 4-bit**.

1. **The problem with uniform quantization:** dividing [-1, 1] into 16 equal levels is inefficient. LLM weights follow a normal distribution — most cluster near zero, few at the extremes.

2. **NF4 (NormalFloat):** instead of uniform levels, uses 16 levels based on **quantiles** of a normal distribution. More resolution where weights actually are.

3. **Double quantization:** the quantization parameters (scale, zero-point) are also quantized. Each 4-bit weight gains ~0.4 bits of overhead — double quant reduces this.

4. **llm.int8() with outliers:** automatically detects features with extreme values (outliers) and keeps them in FP16. The rest stays in INT8.

> NF4 isn't "less precision" — it's "smart precision": more bits where it matters, less where it doesn't.

---

\`\`\`python
# NF4 config in bitsandbytes
bnb_config = BitsAndBytesConfig(
    load_in_4bit=True,
    bnb_4bit_use_double_quant=True,   # ← quantize the quantization params
    bnb_4bit_quant_type="nf4",        # ← NormalFloat, not uniform
    bnb_4bit_compute_dtype=torch.float16,  # compute in FP16
)
\`\`\``,
    },
  },
});
