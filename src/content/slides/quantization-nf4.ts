import { defineSlide } from './_factory';

export const quantizationNf4 = defineSlide({
  id: 'quantization-nf4',
  type: 'two-column',
  options: { columnRatios: [0.5, 0.5] },
  content: {
    'pt-br': {
      title: 'NF4: NormalFloat — o estado da arte em 4 bits',
      body: `NF4 é o formato **mais eficiente** disponível hoje em dia. Apenas 4 bits por peso, com qualidade próxima ao FP16.

1. **O problema do uniforme:** dividir [-1, 1] em 16 níveis iguais é ineficiente. Pesos de LLM seguem uma distribuição normal — a maioria concentrada perto de zero, poucos nos extremos. 16 níveis iguais desperdiçam precisão nas caudas.

2. **NormalFloat:** os 16 níveis são baseados nos **quantis** de uma N(0,1). Níveis mais densos perto de zero (onde estão 68% dos pesos), mais espaçados nas caudas. É quantização INTUITIVA.

3. **Double quantization:** os parâmetros de quantização (scale e zero-point) também são quantizados. Cada peso ganharia ~0.4 bits de overhead — double quant reduz isso para ~0.1 bits.

4. **O resultado:** 7B em ~4 GB de VRAM. Cabe em uma RTX 3060 (12 GB) com espaço para KV cache e ativações. Qualidade ~95% do FP16.

> NF4 = "precisão inteligente": 16 níveis onde eles importam, não 16 níveis iguais.

---

\`\`\`python
snippet:transformers/quantization-nf4
\`\`\``,
      codeExplanations: [
        {
          lineRange: [1, 2],
          content: 'Importamos `BitsAndBytesConfig`, `AutoTokenizer`, `AutoModelForCausalLM` e `torch` para o dtype de cómputo.',
        },
        {
          lineRange: [4, 4],
          content: 'Apontamos para o Qwen 3.5 0.8B no Hub.',
        },
        {
          lineRange: [7, 11],
          content: '`load_in_4bit=True` ativa a quantização 4 bits. `bnb_4bit_quant_type="nf4"` usa NormalFloat. `bnb_4bit_use_double_quant=True` quantiza as constantes de escala. `bnb_4bit_compute_dtype=torch.float16` mantém a multiplicação de matrizes em FP16.',
        },
        {
          lineRange: [13, 18],
          content: 'Carregamos tokenizador e modelo quantizado. `device_map="auto"` distribui entre GPU/CPU automaticamente.',
        },
        {
          lineRange: [19, 20],
          content: '`get_memory_footprint()` confirma ~0.4 GB para o Qwen 0.8B em NF4 — quatro vezes menos que FP16.',
        },
        {
          lineRange: [22, 25],
          content: 'A inferência usa a API padrão do transformers — a quantização 4 bits é transparente para o código de geração.',
        },
      ],
    },
    'en-us': {
      title: 'NF4: NormalFloat — the state of the art in 4 bits',
      body: `NF4 is the **most efficient** format available today. Just 4 bits per weight, with quality close to FP16.

1. **The uniform problem:** dividing [-1, 1] into 16 equal levels is inefficient. LLM weights follow a normal distribution — most cluster near zero, few at the extremes. 16 equal levels waste precision in the tails.

2. **NormalFloat:** the 16 levels are based on the **quantiles** of N(0,1). Denser levels near zero (where 68% of the weights live), more spaced out at the tails. This is INTUITIVE quantization.

3. **Double quantization:** the quantization parameters (scale and zero-point) are also quantized. Each weight would gain ~0.4 bits of overhead — double quant reduces this to ~0.1 bits.

4. **The result:** 7B in ~4 GB of VRAM. Fits on an RTX 3060 (12 GB) with room for KV cache and activations. ~95% quality of FP16.

> NF4 = "smart precision": 16 levels where they matter, not 16 equal levels.

---

\`\`\`python
snippet:transformers/quantization-nf4
\`\`\``,
      codeExplanations: [
        {
          lineRange: [1, 2],
          content: 'We import `BitsAndBytesConfig`, `AutoTokenizer`, `AutoModelForCausalLM`, and `torch` for the compute dtype.',
        },
        {
          lineRange: [4, 4],
          content: 'We point to Qwen 3.5 0.8B on the Hub.',
        },
        {
          lineRange: [7, 11],
          content: '`load_in_4bit=True` enables 4-bit quantization. `bnb_4bit_quant_type="nf4"` uses NormalFloat. `bnb_4bit_use_double_quant=True` quantizes the scale constants. `bnb_4bit_compute_dtype=torch.float16` keeps matrix multiplications in FP16.',
        },
        {
          lineRange: [13, 18],
          content: 'We load the tokenizer and quantized model. `device_map="auto"` distributes between GPU/CPU automatically.',
        },
        {
          lineRange: [19, 20],
          content: '`get_memory_footprint()` confirms ~0.4 GB for Qwen 0.8B in NF4 — four times less than FP16.',
        },
        {
          lineRange: [22, 25],
          content: 'Inference uses the standard transformers API — 4-bit quantization is transparent to the generation code.',
        },
      ],
    },
  },
  visual: {
    id: 'quantization-nf4-levels',
    copy: {
      'pt-br': {
        title: 'Níveis uniformes vs NF4: onde os dados realmente estão',
        subtitle: 'Precisão onde importa',
        uniformLabel: 'Uniform (INT4)',
        nf4Label: 'NF4 (quantis de N(0,1))',
        showErrorLabel: 'Mostrar erro de arredondamento',
        hideErrorLabel: 'Esconder erro',
        centralCoverageLabel: 'NF4 coloca 8 dos 16 níveis na região [-1σ, +1σ], onde vivem 68% dos pesos — o uniform coloca apenas 5.',
        takeaway: 'NF4 = precisão inteligente. Os 16 níveis são calibrados para onde os pesos realmente estão, não distribuídos uniformemente. Resultado: o mesmo número de bits, muito menos erro médio.',
      },
      'en-us': {
        title: 'Uniform levels vs NF4: where the data actually is',
        subtitle: 'Precision where it matters',
        uniformLabel: 'Uniform (INT4)',
        nf4Label: 'NF4 (N(0,1) quantiles)',
        showErrorLabel: 'Show rounding error',
        hideErrorLabel: 'Hide error',
        centralCoverageLabel: 'NF4 places 8 of the 16 levels in the [-1σ, +1σ] region, where 68% of weights live — uniform places only 5.',
        takeaway: 'NF4 = smart precision. The 16 levels are calibrated to where weights actually are, not spread uniformly. Result: same number of bits, much lower average error.',
      },
    },
  },
});
