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
    id: 'quantization-int8-outliers',
    copy: {
      'pt-br': {
        title: 'Distribuição dos pesos: normal vs outliers',
        subtitle: '0.1% dos pesos, 99% do problema',
        thresholdLabel: 'Threshold',
        fp16Label: 'Mantidos em FP16',
        int8Label: 'Quantizados em INT8',
        outlierPercentLabel: 'dos pesos (outliers)',
        normalPercentLabel: 'dos pesos (normal)',
        insightTitle: 'Por que importa',
        insight: 'Pesos com magnitude > threshold são mantidos em FP16 pelo llm.int8(). O custo é mínimo (0.1% dos pesos), mas o ganho de qualidade é enorme — sem eles, a quantização uniforme destrói os logits dessas colunas.',
      },
      'en-us': {
        title: 'Weight distribution: normal vs outliers',
        subtitle: '0.1% of weights, 99% of the problem',
        thresholdLabel: 'Threshold',
        fp16Label: 'Kept in FP16',
        int8Label: 'Quantized to INT8',
        outlierPercentLabel: 'of weights (outliers)',
        normalPercentLabel: 'of weights (normal)',
        insightTitle: 'Why it matters',
        insight: 'Weights with magnitude > threshold are kept in FP16 by llm.int8(). The cost is minimal (0.1% of weights), but the quality gain is huge — without this, uniform quantization destroys the logits of those columns.',
      },
    },
  },
});
