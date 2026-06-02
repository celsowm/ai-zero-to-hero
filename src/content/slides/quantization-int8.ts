import { defineSlide } from './_factory';

export const quantizationInt8 = defineSlide({
  id: 'quantization-int8',
  type: 'two-column',
  options: { columnRatios: [0.5, 0.5] },
  content: {
    'pt-br': {
      title: 'INT8: llm.int8() e o problema dos outliers',
      body: `INT8 reduz 4 vezes o uso de memória em relação ao FP32. Mas existe um **problema oculto** que o bitsandbytes resolveu de forma elegante.

1. **Recap** (do slide anterior): a maioria dos pesos segue uma distribuição normal, mas ~0.1% fogem do padrão — são os **outliers**, com magnitude até 1000× maior que a média. Esse detalhe é o que torna a quantização inteira (INT) traiçoeira.

2. **Por que INT8 quebra:** se definirmos os 256 buckets de INT8 usando o range completo \`[min, max]\`, os buckets ficam enormes para acomodar os outliers. Resultado: 99.9% dos pesos (os "normais") perdem toda a precisão porque cada bucket cobre uma faixa larga demais.

3. **llm.int8() do bitsandbytes:** processa a matriz **coluna por coluna**. Colunas com outliers (acima de 6σ) ficam em **FP16**. O resto vai para **INT8**. Overhead mínimo (0.1% dos pesos em FP16), mas a qualidade fica preservada.

4. **Quando usar:** inferência em GPUs com 8-12 GB. Um 7B em INT8 ocupa ~7 GB. Hoje, NF4 é o estado da arte — mas INT8 ainda vale a pena se você não tem NF4 disponível ou quer uma quantização mais rápida.

> llm.int8() foi o divisor de águas: provou que quantização mista funciona — alguns pesos em FP16, o resto em INT8.`,
    },
    'en-us': {
      title: 'INT8: llm.int8() and the outlier problem',
      body: `INT8 reduces memory usage 4x compared to FP32. But there's a **hidden problem** that bitsandbytes solved elegantly.

1. **Recap** (from the previous slide): most weights follow a normal distribution, but ~0.1% escape the pattern — those are the **outliers**, with magnitude up to 1000× the mean. This detail is what makes integer (INT) quantization tricky.

2. **Why INT8 breaks:** if we define the 256 INT8 buckets using the full range \`[min, max]\`, the buckets become huge to fit the outliers. Result: 99.9% of weights (the "normal" ones) lose all precision because each bucket covers a range that's too wide.

3. **bitsandbytes' llm.int8():** it processes the matrix **column by column**. Columns with outliers (above 6σ) stay in **FP16**. The rest goes to **INT8**. Minimal overhead (0.1% of weights in FP16), but quality is preserved.

4. **When to use:** inference on GPUs with 8-12 GB. A 7B in INT8 takes ~7 GB. Today, NF4 is the state of the art — but INT8 is still worth it if you don't have NF4 available or want faster quantization.

> llm.int8() was the watershed moment: it proved mixed quantization works — some weights in FP16, the rest in INT8.`,
    },
  },
  visual: {
    id: 'quantization-int8-outliers',
    copy: {
      'pt-br': {
        title: 'Distribuição dos pesos: normal vs outliers',
        subtitle: '0.1% dos pesos, 99% do problema',
        thresholdLabel: 'Threshold',
        fp16Label: 'Mantidos em FP16 (outliers)',
        int8Label: 'Quantizados em INT8 (99.9%)',
        outlierPercentLabel: 'dos pesos (outliers)',
        normalPercentLabel: 'dos pesos (normal)',
        insightTitle: 'Por que importa',
        insight: 'Pesos com magnitude > threshold são mantidos em FP16 pelo llm.int8(). O custo é mínimo (0.1% dos pesos), mas o ganho de qualidade é enorme — sem eles, a quantização uniforme destrói os logits dessas colunas.',
        tabs: [{ label: 'Visual' }, { label: 'Código' }],
        codePanel: {
          title: 'Ativando llm.int8() com BitsAndBytesConfig',
          description: 'Diferente de FP16, aqui precisamos configurar explicitamente. `load_in_8bit=True` ativa o algoritmo llm.int8().',
          source: { snippetId: 'transformers/quantization-int8', language: 'python' },
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
      },
      'en-us': {
        title: 'Weight distribution: normal vs outliers',
        subtitle: '0.1% of weights, 99% of the problem',
        thresholdLabel: 'Threshold',
        fp16Label: 'Kept in FP16 (outliers)',
        int8Label: 'Quantized to INT8 (99.9%)',
        outlierPercentLabel: 'of weights (outliers)',
        normalPercentLabel: 'of weights (normal)',
        insightTitle: 'Why it matters',
        insight: 'Weights with magnitude > threshold are kept in FP16 by llm.int8(). The cost is minimal (0.1% of weights), but the quality gain is huge — without this, uniform quantization destroys the logits of those columns.',
        tabs: [{ label: 'Visual' }, { label: 'Code' }],
        codePanel: {
          title: 'Enabling llm.int8() with BitsAndBytesConfig',
          description: 'Unlike FP16, here we need to configure explicitly. `load_in_8bit=True` activates the llm.int8() algorithm.',
          source: { snippetId: 'transformers/quantization-int8', language: 'python' },
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
    },
  },
});
