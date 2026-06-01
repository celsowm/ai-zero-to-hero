import { defineSlide } from './_factory';

export const quantizationFp16 = defineSlide({
  id: 'quantization-fp16',
  type: 'two-column',
  options: { columnRatios: [0.5, 0.5] },
  content: {
    'pt-br': {
      title: 'FP16: o ponto de entrada da quantização',
      body: `FP16 é o formato mais simples: **metade dos bytes, quase zero perda de qualidade**. É o default de treino em GPU moderna.

1. **Como funciona:** FP32 usa 32 bits (1 sinal + 8 expoente + 23 mantissa). FP16 usa 16 bits (1 sinal + 5 expoente + 10 mantissa). Metade da memória, mas menos precisão nos valores.

2. **Mixed precision:** durante o treino, mantemos **master weights em FP32** e fazemos o **forward/backward em FP16**. O gradient step usa FP32 para não perder informação.

3. **Quando usar:** é o default para treino em GPU moderna. Tensor Cores da NVIDIA aceleram FP16 nativamente — até 3x mais rápido que FP32.

4. **O limite:** FP16 tem range menor. Valores acima de 65504 ou abaixo de -65504 viram **inf** (infinito). Para inferência de LLMs grandes, FP16 ainda ocupa 14 GB para um 7B.

> FP16 é o "quase grátis": corte de 50% sem mexer nos pesos — só na computação.

---

\`\`\`python
snippet:transformers/quantization-fp16
\`\`\``,
      codeExplanations: [
        {
          lineRange: [1, 2],
          content: 'Importamos `torch` para o dtype e `transformers` para o modelo.',
        },
        {
          lineRange: [4, 4],
          content: 'Definimos o identificador do Qwen 3.5 0.8B no Hub.',
        },
        {
          lineRange: [7, 11],
          content: '`torch_dtype=torch.float16` carrega os pesos em 16 bits. `device_map="auto"` envia o modelo para a GPU disponível.',
        },
        {
          lineRange: [14, 15],
          content: 'Confirmamos o dtype (`torch.float16`) e o footprint real — em torno de 1.6 GB para o Qwen 0.8B.',
        },
      ],
    },
    'en-us': {
      title: 'FP16: the entry point of quantization',
      body: `FP16 is the simplest format: **half the bytes, almost zero quality loss**. It's the training default on modern GPUs.

1. **How it works:** FP32 uses 32 bits (1 sign + 8 exponent + 23 mantissa). FP16 uses 16 bits (1 sign + 5 exponent + 10 mantissa). Half the memory, but less precision on values.

2. **Mixed precision:** during training, we keep **master weights in FP32** and run **forward/backward in FP16**. The gradient step uses FP32 to not lose information.

3. **When to use:** it's the default for training on modern GPUs. NVIDIA Tensor Cores accelerate FP16 natively — up to 3x faster than FP32.

4. **The limit:** FP16 has a smaller range. Values above 65504 or below -65504 become **inf** (infinity). For large LLM inference, FP16 still takes 14 GB for a 7B.

> FP16 is "almost free": 50% cut without touching weights — just the computation.

---

\`\`\`python
snippet:transformers/quantization-fp16
\`\`\``,
      codeExplanations: [
        {
          lineRange: [1, 2],
          content: 'We import `torch` for the dtype and `transformers` for the model.',
        },
        {
          lineRange: [4, 4],
          content: 'We define the Qwen 3.5 0.8B identifier on the Hub.',
        },
        {
          lineRange: [7, 11],
          content: '`torch_dtype=torch.float16` loads weights in 16 bits. `device_map="auto"` sends the model to the available GPU.',
        },
        {
          lineRange: [14, 15],
          content: 'We confirm the dtype (`torch.float16`) and the real footprint — around 1.6 GB for Qwen 0.8B.',
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
            title: 'Corte de 50% sem perda de qualidade perceptível',
            body: 'Em FP16, cada peso passa de 4 bytes para 2 bytes. O modelo 7B sai de 28 GB (FP32) para 14 GB (FP16) — cabe em GPUs de 16 GB. O Qwen 0.8B sai de ~3.2 GB para ~1.6 GB.',
            highlight: { label: 'Corte de memória', value: '50%' },
            bullets: [
              'FP32: 4 bytes por peso (padrão)',
              'FP16: 2 bytes por peso (metade)',
              '7B em FP16: ~14 GB (cabe em uma 4090)',
              'Qwen 0.8B em FP16: ~1.6 GB (qualquer GPU)',
            ],
            footer: 'A economia vem do dtype, sem perda de qualidade mensurável na maioria dos casos.',
          },
          {
            eyebrow: 'Precisão',
            title: 'Onde o FP16 tropeça: o range de [-65504, 65504]',
            body: 'FP16 mantém a precisão RELATIVA (mantissa de 10 bits), mas sacrifica o range ABSOLUTO (expoente de 5 bits). Valores grandes demais viram infinito. Em LLMs, isso é raro — mas pode aparecer em logits (a saída bruta do modelo antes de virar probabilidade) de uma camada específica.',
            highlight: { label: 'Range máximo', value: '±65504' },
            bullets: [
              'FP32: range de ~1e38, mantissa de 23 bits',
              'FP16: range de ±65504, mantissa de 10 bits',
              'Valores fora do range viram inf (infinito)',
              'Por isso misturamos FP16 com FP32 no treino (mixed precision)',
            ],
            footer: 'Em inferência, overflow é raro. Em treino, mixed precision é obrigatório.',
          },
          {
            eyebrow: 'Como funciona',
            title: 'torch_dtype é o único parâmetro necessário',
            body: 'A magia do FP16 no transformers está em UMA flag: `torch_dtype=torch.float16` no `from_pretrained`. O resto do código não muda — generate, forward, loss funcionam idênticos.',
            highlight: { label: 'Linhas de mudança', value: '1 flag' },
            bullets: [
              'from_pretrained recebe torch_dtype=torch.float16',
              'Os pesos são convertidos na hora do load',
              'Tensor Cores fazem a multiplicação de matrizes em FP16',
              'O resultado final é o mesmo, com metade da memória',
            ],
            footer: 'Se o modelo não cabe na GPU em FP32, tente FP16 antes de partir para INT8 ou NF4.',
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
            title: '50% cut without noticeable quality loss',
            body: 'In FP16, each weight goes from 4 bytes to 2 bytes. A 7B model goes from 28 GB (FP32) to 14 GB (FP16) — fits on 16 GB GPUs. Qwen 0.8B goes from ~3.2 GB to ~1.6 GB.',
            highlight: { label: 'Memory cut', value: '50%' },
            bullets: [
              'FP32: 4 bytes per weight (default)',
              'FP16: 2 bytes per weight (half)',
              '7B in FP16: ~14 GB (fits on a 4090)',
              'Qwen 0.8B in FP16: ~1.6 GB (any GPU)',
            ],
            footer: 'The saving comes from the dtype, with no measurable quality loss in most cases.',
          },
          {
            eyebrow: 'Precision',
            title: 'Where FP16 stumbles: the [-65504, 65504] range',
            body: 'FP16 keeps RELATIVE precision (10-bit mantissa) but sacrifices ABSOLUTE range (5-bit exponent). Values that are too large become infinity. In LLMs this is rare — but it can show up in logits from a specific layer.',
            highlight: { label: 'Max range', value: '±65504' },
            bullets: [
              'FP32: range of ~1e38, 23-bit mantissa',
              'FP16: range of ±65504, 10-bit mantissa',
              'Values outside the range become inf (infinity)',
              'That is why we mix FP16 with FP32 in training (mixed precision)',
            ],
            footer: 'In inference, overflow is rare. In training, mixed precision is required.',
          },
          {
            eyebrow: 'How it works',
            title: 'torch_dtype is the only parameter you need',
            body: 'The magic of FP16 in transformers lives in ONE flag: `torch_dtype=torch.float16` in `from_pretrained`. The rest of the code is unchanged — generate, forward, and loss work identically.',
            highlight: { label: 'Lines of change', value: '1 flag' },
            bullets: [
              'from_pretrained receives torch_dtype=torch.float16',
              'Weights are converted on load',
              'Tensor Cores do matrix multiplication in FP16',
              'The final result is the same, with half the memory',
            ],
            footer: 'If the model does not fit on the GPU in FP32, try FP16 before going to INT8 or NF4.',
          },
        ],
      },
    },
  },
});
