import { defineSlide } from './_factory';

export const quantizationFp16 = defineSlide({
  id: 'quantization-fp16',
  type: 'two-column',
  options: { columnRatios: [0.5, 0.5] },
  content: {
    'pt-br': {
      title: 'FP16: o ponto de entrada da quantização',
      body: `FP16 é o formato mais simples: **metade dos bytes, quase zero perda de qualidade**. É o default de treino em GPU moderna.

1. **O que muda no layout:** um float é dividido em 3 partes — **sinal** (1 bit, positivo ou negativo), **expoente** (quantos bits definem a magnitude) e **mantissa** (os dígitos significativos depois do ponto). FP32 tem 1+8+23 = 32 bits. FP16 tem 1+5+10 = 16 bits. Mesma estrutura, menos bits.

2. **O que se perde:** a mantissa menor (10 vs 23 bits) significa que FP16 distingue ~1024 valores em cada expoente, contra ~8 milhões em FP32. Para a maioria dos pesos isso basta — mas valores que diferem por menos de 0.001 podem colapsar no mesmo bucket.

3. **O que NÃO se perde:** o sinal continua igual, e a *precisão relativa* (número de dígitos significativos) fica parecida. Por isso FP16 é quase "FP32 mais barato".

4. **Quando usar:** é o default para treino em GPU moderna. Em inferência, é a primeira compressão a tentar — corte de 50% de memória, qualidade praticamente intacta.

5. **O limite:** valores acima de 65504 ou abaixo de -65504 viram **inf** (infinito). Em prática, LLMs raramente atingem esse range, mas logits extremos podem estourar.

> FP16 é o "quase grátis": corte de 50% sem mexer nos pesos — só na computação.`,
    },
    'en-us': {
      title: 'FP16: the entry point of quantization',
      body: `FP16 is the simplest format: **half the bytes, almost zero quality loss**. It's the training default on modern GPUs.

1. **What changes in the layout:** a float is split into 3 parts — **sign** (1 bit, positive or negative), **exponent** (how many bits define the magnitude) and **mantissa** (the significant digits after the point). FP32 has 1+8+23 = 32 bits. FP16 has 1+5+10 = 16 bits. Same structure, fewer bits.

2. **What's lost:** the smaller mantissa (10 vs 23 bits) means FP16 distinguishes ~1024 values in each exponent, against ~8 million in FP32. For most weights that is enough — but values that differ by less than 0.001 may collapse into the same bucket.

3. **What's NOT lost:** the sign stays the same, and *relative precision* (number of significant digits) stays similar. That's why FP16 is almost "cheaper FP32".

4. **When to use:** it's the default for training on modern GPUs. For inference, it's the first compression to try — 50% memory cut, quality almost intact.

5. **The limit:** values above 65504 or below -65504 become **inf** (infinity). In practice, LLMs rarely hit this range, but extreme logits may overflow.

> FP16 is "almost free": 50% cut without touching weights — just the computation.`,
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
        takeaway: 'FP16 = metade da memória com quase a mesma precisão relativa. O risco é overflow em logits extremos — raro na prática.',
        tabs: [{ label: 'Visual' }, { label: 'Código' }],
        codePanel: {
          title: 'Carregar o modelo em FP16',
          description: 'A única mudança em relação ao FP32 é o parâmetro `torch_dtype`. Não precisa de bitsandbytes nem accelerate.',
          source: { snippetId: 'transformers/quantization-fp16', language: 'python' },
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
        takeaway: 'FP16 = half the memory with almost the same relative precision. The risk is overflow on extreme logits — rare in practice.',
        tabs: [{ label: 'Visual' }, { label: 'Code' }],
        codePanel: {
          title: 'Loading the model in FP16',
          description: 'The only change compared to FP32 is the `torch_dtype` parameter. No bitsandbytes or accelerate needed.',
          source: { snippetId: 'transformers/quantization-fp16', language: 'python' },
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
    },
  },
});
