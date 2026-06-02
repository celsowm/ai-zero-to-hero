import { defineSlide } from './_factory';

export const quantizationFp8 = defineSlide({
  id: 'quantization-fp8',
  type: 'two-column',
  options: { columnRatios: [0.5, 0.5] },
  content: {
    'pt-br': {
      title: 'FP8: E4M3 e E5M2 — o "FP16 com esteroides"',
      body: `FP8 é o formato de **8 bits em ponto flutuante** introduzido pela NVIDIA para GPUs Hopper (H100). É a próxima escada depois do FP16.

1. **Por que FP8 existe:** a H100 tem Tensor Cores que executam operações FP8 nativamente, com até **2× mais throughput** que FP16. Em treino de modelos grandes (Mixtral, Llama-3 70B+), o forward/backward em FP8 economiza memória e tempo sem degradação mensurável de qualidade.

2. **As duas variantes** (cada uma usa 8 bits, mas distribui de forma diferente):
   - **E4M3**: 1 sinal + 4 expoente + **3 mantissa**. Range ~±448, ~6% de precisão. Mais mantissa = mais dígitos = ideal para **forward pass** (ativações e pesos).
   - **E5M2**: 1 sinal + 5 expoente + **2 mantissa**. Range ~±57344, ~3% de precisão. Mais expoente = mais range = ideal para **backward pass** (gradientes podem ser grandes).

3. **Posicionamento:** FP8 não substitui FP16 — complementa. A escada de compressão é: FP32 (4 bytes) → FP16 (2 bytes) → **FP8 (1 byte)** → INT8 (1 byte) → NF4 (0.5 byte).

4. **Limitação crítica:** FP8 só tem aceleração de hardware em **GPUs Hopper (sm_90+)** — H100, H200. Em Turing/Ampere o storage funciona, mas a operação cai para FP32 (sem speedup).

5. **Quando usar:** treino de modelos grandes em H100, e inferência de modelos já convertidos. Fora desse nicho, FP8 ainda é experimental — INT8 e NF4 têm tooling mais maduro.

> FP8 = 2× mais rápido que FP16, mas só se você tiver Hopper. Para a maioria, FP16 continua sendo o sweet spot.`,
    },
    'en-us': {
      title: 'FP8: E4M3 and E5M2 — "FP16 on steroids"',
      body: `FP8 is the **8-bit floating point** format introduced by NVIDIA for Hopper GPUs (H100). It's the next step after FP16.

1. **Why FP8 exists:** the H100 has Tensor Cores that execute FP8 operations natively, with up to **2× more throughput** than FP16. When training large models (Mixtral, Llama-3 70B+), forward/backward in FP8 saves memory and time without measurable quality loss.

2. **The two variants** (each uses 8 bits, but distributed differently):
   - **E4M3**: 1 sign + 4 exponent + **3 mantissa**. Range ~±448, ~6% precision. More mantissa = more digits = ideal for **forward pass** (activations and weights).
   - **E5M2**: 1 sign + 5 exponent + **2 mantissa**. Range ~±57344, ~3% precision. More exponent = more range = ideal for **backward pass** (gradients can be large).

3. **Positioning:** FP8 doesn't replace FP16 — it complements it. The compression ladder is: FP32 (4 bytes) → FP16 (2 bytes) → **FP8 (1 byte)** → INT8 (1 byte) → NF4 (0.5 byte).

4. **Critical limitation:** FP8 only has hardware acceleration on **Hopper GPUs (sm_90+)** — H100, H200. On Turing/Ampere, storage works, but the operation falls back to FP32 (no speedup).

5. **When to use:** training large models on H100, and inference of pre-converted models. Outside that niche, FP8 is still experimental — INT8 and NF4 have more mature tooling.

> FP8 = 2× faster than FP16, but only if you have Hopper. For most people, FP16 is still the sweet spot.`,
    },
  },
  visual: {
    id: 'quantization-fp8',
    copy: {
      'pt-br': {
        title: 'Layout de bits: FP16 vs E4M3 vs E5M2',
        subtitle: '8 bits, duas estratégias: precisão ou range',
        fp16: {
          name: 'FP16',
          fields: [
            { label: 'Sign', bits: 1, color: '#FFD166', description: 'sinal' },
            { label: 'Exponent', bits: 5, color: '#FF6B9D', description: 'range (±65504)' },
            { label: 'Mantissa', bits: 10, color: '#00D4E8', description: 'precisão relativa' },
          ],
          maxValue: '±65504',
          minPositive: '6.1 × 10⁻⁵',
          useCase: 'Referência',
          insight: '16 bits no total. A "escala" antes do FP8 — cada formato abaixo é metade do tamanho.',
        },
        e4m3: {
          name: 'E4M3',
          fields: [
            { label: 'Sign', bits: 1, color: '#FFD166', description: 'sinal' },
            { label: 'Exponent', bits: 4, color: '#FF6B9D', description: 'range (±448)' },
            { label: 'Mantissa', bits: 3, color: '#00D4E8', description: 'precisão' },
          ],
          maxValue: '±448',
          minPositive: '2⁻⁹ ≈ 0.002',
          useCase: 'Forward (ativações, pesos)',
          insight: 'Mais mantissa = distingue melhor valores pequenos. Satura em ~448 — use para forward.',
        },
        e5m2: {
          name: 'E5M2',
          fields: [
            { label: 'Sign', bits: 1, color: '#FFD166', description: 'sinal' },
            { label: 'Exponent', bits: 5, color: '#FF6B9D', description: 'range (±57344)' },
            { label: 'Mantissa', bits: 2, color: '#00D4E8', description: 'precisão' },
          ],
          maxValue: '±57344',
          minPositive: '2⁻¹⁴ ≈ 6.1 × 10⁻⁵',
          useCase: 'Backward (gradientes)',
          insight: 'Mais expoente = range maior. Perde precisão nos pequenos, mas não estoura em gradientes grandes.',
        },
        forwardLabel: 'Forward',
        backwardLabel: 'Backward',
        takeaway: 'FP8 = duas estratégias para 8 bits. E4M3 sacrifica range por precisão (forward); E5M2 sacrifica precisão por range (backward). Em produção, transformers usa E4M3 para forward e E5M2 para gradientes.',
        tabs: [{ label: 'Visual' }, { label: 'Código' }],
        codePanel: {
          title: 'FP8 com torch puro',
          description: 'PyTorch expõe FP8 como dtypes de tensor. Acelerado por Tensor Cores em GPUs Hopper (H100, H200).',
          source: { snippetId: 'transformers/quantization-fp8', language: 'python' },
          codeExplanations: [
            {
              lineRange: [1, 1],
              content: 'Importamos `torch` para acessar os dtypes FP8 (`float8_e4m3fn` e `float8_e5m2`).',
            },
            {
              lineRange: [3, 5],
              content: 'Os dois dtypes FP8 canônicos: `e4m3` prioriza precisão (3 bits de mantissa) e `e5m2` prioriza range (5 bits de expoente).',
            },
            {
              lineRange: [7, 11],
              content: 'Criamos um tensor FP32 com valores que testam diferentes escalas: pequenos (0.01), médios (1.5) e grandes (200.0). Convertendo para E4M3 e E5M2, depois imprimimos o original.',
            },
            {
              lineRange: [12, 14],
              content: 'Note como E4M3 preserva melhor os valores pequenos (1.5, -0.7) mas satura nos grandes (200.0 vira ~448). E5M2 mantém o range, mas com menos precisão nos valores pequenos.',
            },
            {
              lineRange: [16, 22],
              content: '`get_device_capability()` retorna `(major, minor)`. `(9, 0)` = Hopper (H100), primeira arquitetura com Tensor Cores FP8 nativos.',
            },
          ],
        },
      },
      'en-us': {
        title: 'Bit layout: FP16 vs E4M3 vs E5M2',
        subtitle: '8 bits, two strategies: precision or range',
        fp16: {
          name: 'FP16',
          fields: [
            { label: 'Sign', bits: 1, color: '#FFD166', description: 'sign' },
            { label: 'Exponent', bits: 5, color: '#FF6B9D', description: 'range (±65504)' },
            { label: 'Mantissa', bits: 10, color: '#00D4E8', description: 'relative precision' },
          ],
          maxValue: '±65504',
          minPositive: '6.1 × 10⁻⁵',
          useCase: 'Reference',
          insight: '16 bits total. The "rung" before FP8 — every format below is half the size.',
        },
        e4m3: {
          name: 'E4M3',
          fields: [
            { label: 'Sign', bits: 1, color: '#FFD166', description: 'sign' },
            { label: 'Exponent', bits: 4, color: '#FF6B9D', description: 'range (±448)' },
            { label: 'Mantissa', bits: 3, color: '#00D4E8', description: 'precision' },
          ],
          maxValue: '±448',
          minPositive: '2⁻⁹ ≈ 0.002',
          useCase: 'Forward (activations, weights)',
          insight: 'More mantissa = better discrimination of small values. Saturates at ~448 — use for forward.',
        },
        e5m2: {
          name: 'E5M2',
          fields: [
            { label: 'Sign', bits: 1, color: '#FFD166', description: 'sign' },
            { label: 'Exponent', bits: 5, color: '#FF6B9D', description: 'range (±57344)' },
            { label: 'Mantissa', bits: 2, color: '#00D4E8', description: 'precision' },
          ],
          maxValue: '±57344',
          minPositive: '2⁻¹⁴ ≈ 6.1 × 10⁻⁵',
          useCase: 'Backward (gradients)',
          insight: 'More exponent = larger range. Loses precision on small values, but never overflows on large gradients.',
        },
        forwardLabel: 'Forward',
        backwardLabel: 'Backward',
        takeaway: 'FP8 = two strategies for 8 bits. E4M3 trades range for precision (forward); E5M2 trades precision for range (backward). In production, transformers uses E4M3 for forward and E5M2 for gradients.',
        tabs: [{ label: 'Visual' }, { label: 'Code' }],
        codePanel: {
          title: 'FP8 with plain torch',
          description: 'PyTorch exposes FP8 as tensor dtypes. Accelerated by Tensor Cores on Hopper GPUs (H100, H200).',
          source: { snippetId: 'transformers/quantization-fp8', language: 'python' },
          codeExplanations: [
            {
              lineRange: [1, 1],
              content: 'We import `torch` to access the FP8 dtypes (`float8_e4m3fn` and `float8_e5m2`).',
            },
            {
              lineRange: [3, 5],
              content: 'The two canonical FP8 dtypes: `e4m3` favors precision (3 mantissa bits) and `e5m2` favors range (5 exponent bits).',
            },
            {
              lineRange: [7, 11],
              content: 'We create an FP32 tensor with values that test different scales: small (0.01), medium (1.5), and large (200.0). Casting to E4M3 and E5M2, then printing the original.',
            },
            {
              lineRange: [12, 14],
              content: 'Note how E4M3 preserves small values (1.5, -0.7) better but saturates on large ones (200.0 becomes ~448). E5M2 keeps the range but loses precision on small values.',
            },
            {
              lineRange: [16, 22],
              content: '`get_device_capability()` returns `(major, minor)`. `(9, 0)` = Hopper (H100), the first architecture with native FP8 Tensor Cores.',
            },
          ],
        },
      },
    },
  },
});
