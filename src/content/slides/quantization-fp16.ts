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
    id: 'quantization-fp16-bits',
    copy: {
      'pt-br': {
        title: 'Layout de bits: FP32 vs FP16',
        subtitle: 'O expoente menor limita o range, não a precisão relativa',
        fp32: {
          name: 'FP32',
          fields: [
            { label: 'Sign', bits: 1, color: '#FFD166', description: 'sinal' },
            { label: 'Exponent', bits: 8, color: '#FF6B9D', description: 'range (~1e38)' },
            { label: 'Mantissa', bits: 23, color: '#00D4E8', description: 'precisão relativa' },
          ],
          maxValue: '±3.4 × 10³⁸',
          minPositive: '1.2 × 10⁻³⁸',
          insight: 'Expoente de 8 bits → range enorme. Usado como referência de qualidade.',
        },
        fp16: {
          name: 'FP16',
          fields: [
            { label: 'Sign', bits: 1, color: '#FFD166', description: 'sinal' },
            { label: 'Exponent', bits: 5, color: '#FF6B9D', description: 'range (±65504)' },
            { label: 'Mantissa', bits: 10, color: '#00D4E8', description: 'precisão relativa' },
          ],
          maxValue: '±65504',
          minPositive: '6.1 × 10⁻⁵',
          insight: 'Expoente de 5 bits → range menor, mas precisão RELATIVA semelhante. Overflow é raro em inferência.',
        },
        takeaway: 'FP16 = metade da memória com quase a mesma precisão relativa. O risco é overflow em logits extremos — raro na prática, mas contornado com mixed precision no treino.',
      },
      'en-us': {
        title: 'Bit layout: FP32 vs FP16',
        subtitle: 'The smaller exponent limits range, not relative precision',
        fp32: {
          name: 'FP32',
          fields: [
            { label: 'Sign', bits: 1, color: '#FFD166', description: 'sign' },
            { label: 'Exponent', bits: 8, color: '#FF6B9D', description: 'range (~1e38)' },
            { label: 'Mantissa', bits: 23, color: '#00D4E8', description: 'relative precision' },
          ],
          maxValue: '±3.4 × 10³⁸',
          minPositive: '1.2 × 10⁻³⁸',
          insight: '8-bit exponent → huge range. Used as the quality reference.',
        },
        fp16: {
          name: 'FP16',
          fields: [
            { label: 'Sign', bits: 1, color: '#FFD166', description: 'sign' },
            { label: 'Exponent', bits: 5, color: '#FF6B9D', description: 'range (±65504)' },
            { label: 'Mantissa', bits: 10, color: '#00D4E8', description: 'relative precision' },
          ],
          maxValue: '±65504',
          minPositive: '6.1 × 10⁻⁵',
          insight: '5-bit exponent → smaller range, but similar RELATIVE precision. Overflow is rare in inference.',
        },
        takeaway: 'FP16 = half the memory with almost the same relative precision. The risk is overflow on extreme logits — rare in practice, but handled with mixed precision in training.',
      },
    },
  },
});
