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
            title: 'O modelo 7B não cabe em uma GPU de 24 GB',
            body: 'Em FP32, cada peso ocupa 4 bytes. Um modelo de 7B precisa de 28 GB só para os pesos — mais o KV cache (a memória usada para guardar as chaves e valores da atenção) e as ativações. A quantização reduz esses 4 bytes por peso para 2, 1 ou até 0.5.',
            highlight: { label: '7B em NF4', value: '~4 GB' },
            bullets: [
              'FP32 → 28 GB (não cabe em uma GPU de 24 GB)',
              'FP16 → 14 GB (cabe em uma A6000 / 4090)',
              'INT8 → 7 GB (cabe em uma RTX 3060)',
              'NF4 → ~4 GB (cabe em qualquer GPU moderna)',
            ],
            footer: 'A escolha do formato depende da sua VRAM disponível, não do modelo.',
          },
          {
            eyebrow: 'Precisão',
            title: 'Quanto perdemos ao comprimir os pesos?',
            body: 'Cada formato joga fora parte da informação. A perda é mensurada em benchmarks como perplexity (uma métrica de quão "surpreso" o modelo fica com um texto — quanto menor, melhor) e em tarefas downstream (de aplicação, como responder perguntas). Na prática, NF4 entrega ~95% da qualidade do FP16.',
            highlight: { label: 'Qualidade vs FP16', value: '~95%' },
            bullets: [
              'FP16: quase nenhuma perda (default de treino)',
              'INT8: perda mínima, mix com FP16 para outliers',
              'NF4: 4 bits com quantiles da normal, melhor trade-off',
              'INT4: pesquisa ativa, qualidade cai bastante',
            ],
            footer: 'Perplexity +1 é o limite aceitável. Acima disso, o modelo começa a alucinar mais.',
          },
          {
            eyebrow: 'Como funciona',
            title: 'Menos bits, mais memória liberada',
            body: 'A operação central é simples: pegamos um tensor (matriz multidimensional) de pesos e o mapeamos para um conjunto menor de valores representáveis. O desafio é escolher BONS valores representáveis — e é aí que cada formato difere.',
            highlight: { label: 'Bits por peso', value: '32 → 4' },
            bullets: [
              'FP16: IEEE 754, 1 sign + 5 expoente + 10 mantissa (os bits que definem o sinal, a ordem de grandeza e a precisão do número)',
              'INT8: 256 valores lineares em [-127, 127]',
              'NF4: 16 valores nos quantiles de N(0,1)',
              'A "mágica" está em COMO escolhemos os valores representáveis',
            ],
            footer: 'FP16 troca precisão por memória, INT8 e NF4 trocam precisão por MUITO menos memória.',
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
            title: 'A 7B model does not fit on a 24 GB GPU',
            body: 'In FP32, each weight takes 4 bytes. A 7B model needs 28 GB just for the weights — plus the KV cache and activations. Quantization reduces those 4 bytes per weight down to 2, 1, or even 0.5.',
            highlight: { label: '7B in NF4', value: '~4 GB' },
            bullets: [
              'FP32 → 28 GB (does not fit on a 24 GB GPU)',
              'FP16 → 14 GB (fits on an A6000 / 4090)',
              'INT8 → 7 GB (fits on an RTX 3060)',
              'NF4 → ~4 GB (fits on any modern GPU)',
            ],
            footer: 'The format choice depends on your available VRAM, not on the model.',
          },
          {
            eyebrow: 'Precision',
            title: 'How much do we lose by compressing weights?',
            body: 'Each format discards part of the information. The loss is measured in benchmarks like perplexity and on downstream tasks. In practice, NF4 delivers ~95% of FP16 quality.',
            highlight: { label: 'Quality vs FP16', value: '~95%' },
            bullets: [
              'FP16: almost no loss (training default)',
              'INT8: minimal loss, mixed with FP16 for outliers',
              'NF4: 4 bits with normal quantiles, best trade-off',
              'INT4: active research, quality drops significantly',
            ],
            footer: 'Perplexity +1 is the acceptable limit. Above that, the model starts hallucinating more.',
          },
          {
            eyebrow: 'How it works',
            title: 'Fewer bits, more memory freed',
            body: 'The core operation is simple: we take a weight tensor and map it to a smaller set of representable values. The challenge is picking GOOD representable values — and that is where each format differs.',
            highlight: { label: 'Bits per weight', value: '32 → 4' },
            bullets: [
              'FP16: IEEE 754, 1 sign + 5 exponent + 10 mantissa',
              'INT8: 256 linear values in [-127, 127]',
              'NF4: 16 values at the quantiles of N(0,1)',
              'The "magic" is HOW we pick the representable values',
            ],
            footer: 'FP16 trades precision for memory; INT8 and NF4 trade precision for MUCH less memory.',
          },
        ],
      },
    },
  },
});
