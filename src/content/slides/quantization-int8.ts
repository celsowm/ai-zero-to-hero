import { defineSlide } from './_factory';

export const quantizationInt8 = defineSlide({
  id: 'quantization-int8',
  type: 'two-column',
  options: { columnRatios: [0.5, 0.5] },
  content: {
    'pt-br': {
      title: 'INT8: llm.int8() e o problema dos outliers',
      body: `INT8 reduz 4 vezes o uso de memória em relação ao FP32. Mas existe um **problema oculto** que o bitsandbytes resolveu de forma elegante.

1. **Como funciona:** cada peso é escalado para caber em [-127, 127]. Um fator de escala (S) guarda a magnitude original: \`W_original = W_int8 × S\`. O processo reverso é multiplicação simples.

2. **O problema dos outliers:** em LLMs, algumas features têm valores **extremamente grandes** (até 1000× a média). Se quantizarmos tudo uniformemente, esses outliers são destruídos e a qualidade despenca.

3. **llm.int8() do bitsandbytes:** detecta automaticamente colunas com outliers e as **mantém em FP16**. Só o resto vai para INT8. Mix inteligente que preserva qualidade.

4. **Quando usar:** inferência em GPUs com menos de 12 GB de VRAM. Um 7B em INT8 ocupa ~7 GB. Boa qualidade, mas NF4 é o estado da arte hoje.

> llm.int8() foi o divisor de águas: provou que quantização mista funciona — alguns pesos em FP16, o resto em INT8.

---

\`\`\`python
snippet:transformers/quantization-int8
\`\`\``,
      codeExplanations: [
        {
          lineRange: [1, 1],
          content: 'Importamos `AutoModelForCausalLM` e `BitsAndBytesConfig`, a config do bitsandbytes para quantização.',
        },
        {
          lineRange: [3, 3],
          content: 'Apontamos para o Qwen 3.5 0.8B no Hub.',
        },
        {
          lineRange: [6, 9],
          content: '`load_in_8bit=True` ativa a quantização INT8 com o algoritmo llm.int8(). O `llm_int8_threshold=6.0` define que colunas com valores acima de 6 sigmas viram outliers e são mantidas em FP16.',
        },
        {
          lineRange: [11, 15],
          content: 'Carregamos o modelo passando `quantization_config`. O mix de outliers (FP16) + pesos normais (INT8) é transparente para o usuário.',
        },
        {
          lineRange: [16, 16],
          content: '`get_memory_footprint()` confirma ~0.8 GB para o Qwen 0.8B em INT8 — metade do FP16.',
        },
      ],
    },
    'en-us': {
      title: 'INT8: llm.int8() and the outlier problem',
      body: `INT8 reduces memory usage 4x compared to FP32. But there's a **hidden problem** that bitsandbytes solved elegantly.

1. **How it works:** each weight is scaled to fit in [-127, 127]. A scale factor (S) stores the original magnitude: \`W_original = W_int8 × S\`. The reverse process is simple multiplication.

2. **The outlier problem:** in LLMs, some features have **extremely large** values (up to 1000× the mean). If we quantize everything uniformly, those outliers are destroyed and quality plummets.

3. **bitsandbytes' llm.int8():** automatically detects columns with outliers and **keeps them in FP16**. Only the rest goes to INT8. Smart mix that preserves quality.

4. **When to use:** inference on GPUs with less than 12 GB of VRAM. A 7B in INT8 takes ~7 GB. Good quality, but NF4 is the state of the art today.

> llm.int8() was the watershed moment: it proved mixed quantization works — some weights in FP16, the rest in INT8.

---

\`\`\`python
snippet:transformers/quantization-int8
\`\`\``,
      codeExplanations: [
        {
          lineRange: [1, 1],
          content: 'We import `AutoModelForCausalLM` and `BitsAndBytesConfig`, the bitsandbytes quantization config.',
        },
        {
          lineRange: [3, 3],
          content: 'We point to Qwen 3.5 0.8B on the Hub.',
        },
        {
          lineRange: [6, 9],
          content: '`load_in_8bit=True` enables INT8 quantization via the llm.int8() algorithm. `llm_int8_threshold=6.0` defines that columns with values above 6 sigmas become outliers and are kept in FP16.',
        },
        {
          lineRange: [11, 15],
          content: 'We load the model passing `quantization_config`. The mix of outliers (FP16) + normal weights (INT8) is transparent to the user.',
        },
        {
          lineRange: [16, 16],
          content: '`get_memory_footprint()` confirms ~0.8 GB for Qwen 0.8B in INT8 — half of FP16.',
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
            title: '4× menos memória que FP32, com trick para outliers',
            body: 'INT8 comprime cada peso de 4 bytes (FP32) para 1 byte — uma redução de 75%. O trade-off é que a precisão numérica cai, especialmente em pesos outliers. A solução do bitsandbytes: manter outliers em FP16.',
            highlight: { label: 'Corte de memória', value: '75%' },
            bullets: [
              'FP32: 4 bytes por peso (28 GB para 7B)',
              'INT8: 1 byte por peso (7 GB para 7B)',
              'Outliers (colunas > 6σ): mantidos em FP16',
              'Qwen 0.8B em INT8: ~0.8 GB',
            ],
            footer: 'A economia é maior que FP16, mas requer análise dos outliers para não quebrar o modelo.',
          },
          {
            eyebrow: 'Precisão',
            title: 'Outliers: 0.1% dos pesos, 99% da dor',
            body: 'Em qualquer LLM, ~0.1% dos pesos concentram magnitudes absurdas (até 1000× a média). Se tratarmos todos os pesos iguais, esses outliers viram o gargalo — ou estouramos o range, ou perdemos precisão no resto.',
            highlight: { label: 'Outliers detectados', value: '~0.1%' },
            bullets: [
              'Threshold padrão: 6.0 (acima de 6 sigmas)',
              'Colunas outliers: ~0.1% do total',
              'Mantidas em FP16 para preservar a qualidade',
              'O resto segue em INT8 normalmente',
            ],
            footer: 'O custo de manter outliers em FP16 é mínimo; o ganho de qualidade é enorme.',
          },
          {
            eyebrow: 'Como funciona',
            title: 'BitsAndBytesConfig: a porta de entrada do llm.int8()',
            body: 'Para ativar o llm.int8(), basta passar um `BitsAndBytesConfig` com `load_in_8bit=True` para o `from_pretrained`. O bitsandbytes faz toda a detecção de outliers internamente.',
            highlight: { label: 'Linhas de config', value: '3 flags' },
            bullets: [
              'load_in_8bit=True: ativa a quantização 8 bits',
              'llm_int8_threshold=6.0: cutoff para outliers',
              'O from_pretrained recebe quantization_config',
              'O resto da API (generate, forward) é igual ao FP16',
            ],
            footer: 'Se a GPU não tem VRAM para FP16, INT8 com llm.int8() é o próximo passo natural.',
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
            title: '4× less memory than FP32, with an outlier trick',
            body: 'INT8 compresses each weight from 4 bytes (FP32) to 1 byte — a 75% reduction. The trade-off is that numeric precision drops, especially in outlier weights. The bitsandbytes solution: keep outliers in FP16.',
            highlight: { label: 'Memory cut', value: '75%' },
            bullets: [
              'FP32: 4 bytes per weight (28 GB for 7B)',
              'INT8: 1 byte per weight (7 GB for 7B)',
              'Outliers (columns > 6σ): kept in FP16',
              'Qwen 0.8B in INT8: ~0.8 GB',
            ],
            footer: 'The saving is larger than FP16, but it requires outlier analysis to not break the model.',
          },
          {
            eyebrow: 'Precision',
            title: 'Outliers: 0.1% of weights, 99% of the pain',
            body: 'In any LLM, ~0.1% of the weights concentrate absurd magnitudes (up to 1000× the mean). If we treat all weights the same, those outliers become the bottleneck — either we blow the range, or we lose precision on the rest.',
            highlight: { label: 'Outliers detected', value: '~0.1%' },
            bullets: [
              'Default threshold: 6.0 (above 6 sigmas)',
              'Outlier columns: ~0.1% of the total',
              'Kept in FP16 to preserve quality',
              'The rest stays in INT8 as usual',
            ],
            footer: 'The cost of keeping outliers in FP16 is minimal; the quality gain is huge.',
          },
          {
            eyebrow: 'How it works',
            title: 'BitsAndBytesConfig: the entry point of llm.int8()',
            body: 'To enable llm.int8(), just pass a `BitsAndBytesConfig` with `load_in_8bit=True` to `from_pretrained`. bitsandbytes handles all the outlier detection internally.',
            highlight: { label: 'Config lines', value: '3 flags' },
            bullets: [
              'load_in_8bit=True: enables 8-bit quantization',
              'llm_int8_threshold=6.0: outlier cutoff',
              'from_pretrained receives quantization_config',
              'The rest of the API (generate, forward) is the same as FP16',
            ],
            footer: 'If your GPU does not have VRAM for FP16, INT8 with llm.int8() is the next natural step.',
          },
        ],
      },
    },
  },
});
