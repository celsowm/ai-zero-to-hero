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
    id: 'quantization-tabs',
    copy: {
      'pt-br': {
        tabs: [
          { label: 'Memória' },
          { label: 'Precisão' },
          { label: 'Como funciona' },
        ],
        panels: [
          {
            eyebrow: 'Memória',
            title: 'O modelo 7B cabe em qualquer GPU de consumo',
            body: 'Em NF4, cada peso usa 0.5 byte. O modelo 7B sai de 28 GB (FP32) para ~4 GB — cabe em uma RTX 3060 com folga. O Qwen 0.8B sai de 3.2 GB para ~0.4 GB.',
            highlight: { label: 'Corte de memória', value: '87%' },
            bullets: [
              'FP32: 4 bytes por peso (28 GB para 7B)',
              'NF4: 0.5 byte por peso (~4 GB para 7B)',
              'Qwen 0.8B em NF4: ~0.4 GB',
              'Cabe em QUALQUER GPU moderna, até 3060',
            ],
            footer: 'NF4 é o formato padrão para servir LLMs em hardware de consumo.',
          },
          {
            eyebrow: 'Precisão',
            title: 'Por que 4 bits não destroem a qualidade?',
            body: 'O segredo é que os 16 níveis não são uniformes: eles são posicionados nos quantis de uma distribuição N(0,1) — que é exatamente a distribuição que os pesos seguem após o treino. Os 16 níveis ficam BEM ONDE os pesos realmente estão.',
            highlight: { label: 'Qualidade vs FP16', value: '~95%' },
            bullets: [
              '16 valores posicionados nos quantis de N(0,1)',
              'Densos perto de zero (68% dos pesos)',
              'Espaçados nas caudas (outliers)',
              'Comparável: perplexity +0.5 vs FP16',
            ],
            footer: 'NF4 é INFORMATION-THEORETICALLY quase ótimo para pesos gaussianos.',
          },
          {
            eyebrow: 'Como funciona',
            title: 'BitsAndBytesConfig com 4 flags: a receita NF4',
            body: 'Para ativar NF4, passamos `load_in_4bit=True` com `bnb_4bit_quant_type="nf4"` no `BitsAndBytesConfig`. As flags adicionais (double_quant, compute_dtype) otimizam a memória e a precisão.',
            highlight: { label: 'Linhas de config', value: '4 flags' },
            bullets: [
              'load_in_4bit=True: ativa a quantização 4 bits',
              'bnb_4bit_quant_type="nf4": usa NormalFloat',
              'bnb_4bit_use_double_quant=True: economiza ~0.3 bits por peso',
              'bnb_4bit_compute_dtype=torch.float16: matmul em FP16',
            ],
            footer: 'É o default usado em QLoRA, GPTQ e na maioria dos pipelines de inferência.',
          },
        ],
      },
      'en-us': {
        tabs: [
          { label: 'Memory' },
          { label: 'Precision' },
          { label: 'How it works' },
        ],
        panels: [
          {
            eyebrow: 'Memory',
            title: 'The 7B model fits on any consumer GPU',
            body: 'In NF4, each weight uses 0.5 bytes. A 7B model goes from 28 GB (FP32) to ~4 GB — fits on an RTX 3060 with room to spare. Qwen 0.8B goes from 3.2 GB to ~0.4 GB.',
            highlight: { label: 'Memory cut', value: '87%' },
            bullets: [
              'FP32: 4 bytes per weight (28 GB for 7B)',
              'NF4: 0.5 bytes per weight (~4 GB for 7B)',
              'Qwen 0.8B in NF4: ~0.4 GB',
              'Fits on ANY modern GPU, even a 3060',
            ],
            footer: 'NF4 is the default format for serving LLMs on consumer hardware.',
          },
          {
            eyebrow: 'Precision',
            title: 'Why 4 bits do not destroy quality',
            body: 'The secret is that the 16 levels are not uniform: they are placed at the quantiles of an N(0,1) distribution — which is exactly the distribution weights follow after training. The 16 levels land RIGHT WHERE the weights actually are.',
            highlight: { label: 'Quality vs FP16', value: '~95%' },
            bullets: [
              '16 values placed at the quantiles of N(0,1)',
              'Dense near zero (68% of weights)',
              'Spaced at the tails (outliers)',
              'Comparable: perplexity +0.5 vs FP16',
            ],
            footer: 'NF4 is INFORMATION-THEORETICALLY near-optimal for gaussian weights.',
          },
          {
            eyebrow: 'How it works',
            title: 'BitsAndBytesConfig with 4 flags: the NF4 recipe',
            body: 'To enable NF4, we pass `load_in_4bit=True` with `bnb_4bit_quant_type="nf4"` to `BitsAndBytesConfig`. The additional flags (double_quant, compute_dtype) optimize memory and precision.',
            highlight: { label: 'Config lines', value: '4 flags' },
            bullets: [
              'load_in_4bit=True: enables 4-bit quantization',
              'bnb_4bit_quant_type="nf4": uses NormalFloat',
              'bnb_4bit_use_double_quant=True: saves ~0.3 bits per weight',
              'bnb_4bit_compute_dtype=torch.float16: matmul in FP16',
            ],
            footer: 'It is the default used in QLoRA, GPTQ, and most inference pipelines.',
          },
        ],
      },
    },
  },
});
