import { defineSlide } from './_factory';

export const quantizationBnb = defineSlide({
  id: 'quantization-bnb',
  type: 'two-column',
  options: {
    columnRatios: [0.5, 0.5],
  },
  content: {
    'pt-br': {
      title: `Por que quantização funciona?`,
      body: `Um modelo de 7B parâmetros ocupa **28GB** em FP32. Isso cabe em **~4GB** com NF4. Como?

1. **O que é quantizar:** reduzir a precisão dos pesos. Em vez de guardar 3.14159265358979, guardamos 3.14. O modelo continua funcionando.

2. **Por que funciona:** os pesos de um LLM após treino seguem uma distribuição normal — a maioria concentrada perto de zero. Não precisamos de precisão absurda para distinguir 0.00123 de 0.00124.

3. **A matemática:** cada peso de FP32 (32 bits) tem ~4 bilhões de valores possíveis. NF4 (4 bits) tem apenas 16. Mas os 16 níveis do NF4 estão **onde os pesos realmente estão**.

4. **O trade-off:** perde-se ~2-5% de qualidade na geração, mas ganha-se **85% de memória**. Um Llama-3-8B que exigia A100 (80GB) roda em uma RTX 4060 (8GB).

> Quantização não é "perder informação" — é "descartar o ruído". O sinal útil vive em poucos bits.

---

\`\`\`python
# Comparação rápida de VRAM para um modelo 7B:
# FP32: 28 GB  |  FP16: 14 GB  |  INT8: 7 GB  |  NF4: ~4 GB

from transformers import AutoModelForCausalLM
model = AutoModelForCausalLM.from_pretrained("gpt2")  # 124M → ~250MB FP32
print(f"Model size: {model.get_memory_footprint() / 1e6:.0f} MB")
\`\`\``,
      codeExplanations: [
        {
          lineRange: [1, 2],
          content: 'Comentário com a comparação de VRAM por formato de quantização.',
        },
        {
          lineRange: [4, 4],
          content: 'Importamos o modelo causal — o mesmo para qualquer formato.',
        },
        {
          lineRange: [5, 5],
          content: 'GPT-2 (124M) em FP32 ocupa ~250MB. Um 7B ocuparia ~14GB em FP16.',
        },
        {
          lineRange: [6, 6],
          content: '`get_memory_footprint()` retorna o uso real em bytes.',
        },
      ],
    },
    'en-us': {
      title: `Why quantization works?`,
      body: `A 7B parameter model takes **28GB** in FP32. It fits in **~4GB** with NF4. How?

1. **What is quantizing:** reducing weight precision. Instead of storing 3.14159265358979, we store 3.14. The model keeps working.

2. **Why it works:** LLM weights after training follow a normal distribution — most cluster near zero. We don't need absurd precision to distinguish 0.00123 from 0.00124.

3. **The math:** each FP32 weight (32 bits) has ~4 billion possible values. NF4 (4 bits) has only 16. But NF4's 16 levels are **where the weights actually are**.

4. **The trade-off:** you lose ~2-5% generation quality, but gain **85% memory back**. A Llama-3-8B that required an A100 (80GB) runs on an RTX 4060 (8GB).

> E quantization isn't "losing information" — it's "discarding noise". The useful signal lives in few bits.

---

\`\`\`python
# Quick VRAM comparison for a 7B model:
# FP32: 28 GB  |  FP16: 14 GB  |  INT8: 7 GB  |  NF4: ~4 GB

from transformers import AutoModelForCausalLM
model = AutoModelForCausalLM.from_pretrained("gpt2")  # 124M → ~250MB FP32
print(f"Model size: {model.get_memory_footprint() / 1e6:.0f} MB")
\`\`\``,
      codeExplanations: [
        {
          lineRange: [1, 2],
          content: 'Comment with VRAM comparison by quantization format.',
        },
        {
          lineRange: [4, 4],
          content: 'We import the causal model — the same for any format.',
        },
        {
          lineRange: [5, 5],
          content: 'GPT-2 (124M) in FP32 takes ~250MB. A 7B would take ~14GB in FP16.',
        },
        {
          lineRange: [6, 6],
          content: '`get_memory_footprint()` returns actual memory usage in bytes.',
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
