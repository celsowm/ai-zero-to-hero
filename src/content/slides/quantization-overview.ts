import { defineSlide } from './_factory';

export const quantizationOverview = defineSlide({
  id: 'quantization-overview',
  type: 'two-column',
  options: { columnRatios: [0.5, 0.5] },
  content: {
    'pt-br': {
      title: 'Por que quantizar: o problema e a solução',
      body: `Um modelo de 7B parâmetros (com 7 bilhões de parâmetros) ocupa **28 GB** em FP32 e não cabe em uma única GPU de consumo. A quantização resolve isso trocando precisão por memória.

1. **O que é quantizar:** reduzir quantos bits cada peso usa. Em vez de guardar cada peso em 32 bits, guardamos em 16, 8 ou até 4 bits. O modelo continua funcionando, mas com menos memória.

2. **Por que funciona:** os pesos de um LLM após o treino seguem uma distribuição normal — a maioria concentrada perto de zero. Não precisamos de precisão absurda para distinguir 0.00123 de 0.00124.

3. **O trade-off:** perde-se ~2-5% de qualidade na geração, mas ganha-se até **85% de memória**. Um modelo que exigia uma A100 (80 GB) passa a rodar em uma RTX 4060 (8 GB).

4. **Três formatos na prática:** FP16 (corte de 50%), INT8 (75% menor) e NF4 (87% menor, qualidade próxima ao FP16).

> Quantização não é "perder informação" — é "descartar o ruído". O sinal útil vive em poucos bits.

---

\`\`\`python
snippet:transformers/quantization-overview
\`\`\``,
      codeExplanations: [
        {
          lineRange: [1, 1],
          content: 'Importamos `AutoModelForCausalLM` para carregar o modelo.',
        },
        {
          lineRange: [3, 3],
          content: 'Definimos o `model_id` que aponta para o Qwen 3.5 0.8B no Hub.',
        },
        {
          lineRange: [6, 6],
          content: 'Carregamos o modelo em FP32 (precisão padrão) com `device_map="auto"` para mandar para a GPU.',
        },
        {
          lineRange: [7, 7],
          content: '`get_memory_footprint()` retorna os bytes reais usados pelos pesos em runtime.',
        },
        {
          lineRange: [11, 12],
          content: 'A quantização troca bits por memória: 16, 8 ou 4 bits por peso em vez de 32.',
        },
      ],
    },
    'en-us': {
      title: 'Why quantize: the problem and the solution',
      body: `A 7B parameter model takes **28 GB** in FP32 and does not fit on a single consumer GPU. Quantization solves this by trading precision for memory.

1. **What is quantizing:** reducing how many bits each weight uses. Instead of storing each weight in 32 bits, we store it in 16, 8, or even 4 bits. The model keeps working, but with less memory.

2. **Why it works:** LLM weights after training follow a normal distribution — most cluster near zero. We don't need absurd precision to distinguish 0.00123 from 0.00124.

3. **The trade-off:** you lose ~2-5% generation quality, but gain up to **85% of memory**. A model that required an A100 (80 GB) now runs on an RTX 4060 (8 GB).

4. **Three formats in practice:** FP16 (50% cut), INT8 (75% smaller), and NF4 (87% smaller, quality close to FP16).

> Quantization isn't "losing information" — it's "discarding noise". The useful signal lives in few bits.

---

\`\`\`python
snippet:transformers/quantization-overview
\`\`\``,
      codeExplanations: [
        {
          lineRange: [1, 1],
          content: 'We import `AutoModelForCausalLM` to load the model.',
        },
        {
          lineRange: [3, 3],
          content: 'We define `model_id` pointing to Qwen 3.5 0.8B on the Hub.',
        },
        {
          lineRange: [6, 6],
          content: 'We load the model in FP32 (default precision) with `device_map="auto"` to send it to GPU.',
        },
        {
          lineRange: [7, 7],
          content: '`get_memory_footprint()` returns the actual bytes used by the weights at runtime.',
        },
        {
          lineRange: [11, 12],
          content: 'Quantization trades bits for memory: 16, 8, or 4 bits per weight instead of 32.',
        },
      ],
    },
  },
  visual: {
    id: 'quantization-memory-bar',
    copy: {
      'pt-br': {
        title: 'Quanto cada formato ocupa para um modelo 7B',
        subtitle: 'Memória por formato',
        entries: [
          {
            label: 'FP32',
            bytes: 4,
            vram7b: 28,
            color: 'pink',
            note: 'Não cabe em nenhuma GPU de consumo',
          },
          {
            label: 'FP16',
            bytes: 2,
            vram7b: 14,
            color: 'cyan',
            note: 'Cabe em uma RTX 4090 (24 GB)',
          },
          {
            label: 'INT8',
            bytes: 1,
            vram7b: 7,
            color: 'cyan',
            note: 'Cabe em uma RTX 3060 (12 GB)',
          },
          {
            label: 'NF4',
            bytes: 0.5,
            vram7b: 4,
            color: 'cyan',
            note: 'Cabe em qualquer GPU moderna (8 GB+)',
          },
        ],
        bytesLabel: 'bytes/peso',
        vramLabel: 'VRAM (7B)',
        requiresLabel: 'Requer',
        gbUnit: 'GB',
        modelLabel: 'Modelo 7B',
        note: 'Estimativas para pesos apenas. O uso real inclui KV cache e ativações — adicione ~20% ao total.',
      },
      'en-us': {
        title: 'How much each format takes for a 7B model',
        subtitle: 'Memory per format',
        entries: [
          {
            label: 'FP32',
            bytes: 4,
            vram7b: 28,
            color: 'pink',
            note: "Doesn't fit on any consumer GPU",
          },
          {
            label: 'FP16',
            bytes: 2,
            vram7b: 14,
            color: 'cyan',
            note: 'Fits on an RTX 4090 (24 GB)',
          },
          {
            label: 'INT8',
            bytes: 1,
            vram7b: 7,
            color: 'cyan',
            note: 'Fits on an RTX 3060 (12 GB)',
          },
          {
            label: 'NF4',
            bytes: 0.5,
            vram7b: 4,
            color: 'cyan',
            note: 'Fits on any modern GPU (8 GB+)',
          },
        ],
        bytesLabel: 'bytes/weight',
        vramLabel: 'VRAM (7B)',
        requiresLabel: 'Requires',
        gbUnit: 'GB',
        modelLabel: '7B Model',
        note: 'Estimates for weights only. Real usage includes KV cache and activations — add ~20% to the total.',
      },
    },
  },
});
