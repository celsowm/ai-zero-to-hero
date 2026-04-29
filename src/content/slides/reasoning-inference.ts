import { defineSlide } from './_factory';

export const reasoningInference = defineSlide({
  id: 'reasoning-inference',
  type: 'two-column',
  options: { columnRatios: [0.55, 0.45] },
  content: {
    'pt-br': {
      title: 'Reasoning + Inference Engines',
      body: `Como motores de inferência como vLLM e sglang lidam com reasoning models?

### vLLM e Reasoning

vLLM suporta reasoning models, mas com considerações:

- **PagedAttention** funciona normalmente — thinking tokens são apenas tokens
- **Continuous batching** pode ser afetado: reasoning gera mais tokens → batch demora mais
- **Max tokens** precisa ser ajustado: default (2048) pode cortar thinking no meio

\`\`\`bash
snippet:reasoning/vllm-config
\`\`\`

### sglang e Structured Generation

sglang oferece **constrained decoding** que pode validar thinking blocks:

\`\`\`python
snippet:reasoning/sglang-reasoning
\`\`\`

### ONNX e Reasoning

ONNX é mais limitado — models com thinking blocks precisam de **schema customizado** no output.

### Comparação

| Motor | Suporte | Notas |
|-------|---------|-------|
| vLLM | ✅ Completo | Ajustar max_tokens |
| sglang | ✅ Completo | Constrained decoding |
| ONNX | ⚠️ Parcial | Schema customizado |
| Transformers | ✅ Completo | Via generate() |

> Inference engines tratam thinking tokens como tokens normais — mas a latência é maior.`,
    },
    'en-us': {
      title: 'Reasoning + Inference Engines',
      body: `How do inference engines like vLLM and sglang handle reasoning models?

### vLLM and Reasoning

vLLM supports reasoning models, but with considerations:

- **PagedAttention** works normally — thinking tokens are just tokens
- **Continuous batching** can be affected: reasoning generates more tokens → batch takes longer
- **Max tokens** needs adjustment: default (2048) may cut thinking mid-way

\`\`\`bash
snippet:reasoning/vllm-config
\`\`\`

### sglang and Structured Generation

sglang offers **constrained decoding** that can validate thinking blocks:

\`\`\`python
snippet:reasoning/sglang-reasoning
\`\`\`

### ONNX and Reasoning

ONNX is more limited — models with thinking blocks need **custom output schema**.

### Comparison

| Engine | Support | Notes |
|--------|---------|-------|
| vLLM | ✅ Full | Adjust max_tokens |
| sglang | ✅ Full | Constrained decoding |
| ONNX | ⚠️ Partial | Custom schema |
| Transformers | ✅ Full | Via generate() |

> Inference engines treat thinking tokens as normal tokens — but latency is higher.`,
    },
  },
  visual: {
    id: 'reasoning-inference-visual',
    copy: {
      'pt-br': {
        title: 'Reasoning nos Inference Engines',
        vllmLabel: 'vLLM: PagedAttention + mais tokens',
        sglangLabel: 'sglang: constrained decoding',
        onnxLabel: 'ONNX: schema customizado',
        transformersLabel: 'Transformers: suporte completo',
        latencyLabel: 'Latência 2-10x maior',
      },
      'en-us': {
        title: 'Reasoning in Inference Engines',
        vllmLabel: 'vLLM: PagedAttention + more tokens',
        sglangLabel: 'sglang: constrained decoding',
        onnxLabel: 'ONNX: custom schema',
        transformersLabel: 'Transformers: full support',
        latencyLabel: '2-10x higher latency',
      },
    },
  },
});
