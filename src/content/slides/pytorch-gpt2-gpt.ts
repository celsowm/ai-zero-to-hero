import { defineSlide } from './_factory';

export const pytorchGpt2Gpt = defineSlide({
  id: 'pytorch-gpt2-gpt',
  type: 'two-column',
  options: { columnRatios: [0.48, 0.52] },
  content: {
    'pt-br': {
      title: 'GPT completo',
      body: `Agora as peças viram o modelo completo.

O GPT recebe IDs \`(B, T)\`, cria embeddings de token e posição, passa por blocos Transformer, aplica \`ln_f\` e projeta para logits \`(B, T, V)\`.

Se receber \`targets\`, calcula cross-entropy contra o próximo token esperado.`,
      rightBody: `\`\`\`python
snippet:pytorch_gpt2/gpt
\`\`\``,
      codeExplanations: [
        { lineRange: [1, 102], content: '`GPT`: modelo completo com token/position embedding, stack de TransformerBlocks, ln_f e lm_head. Forward com suporte a past_kv (KV cache). Inicialização estilo GPT-2 com _init_weights e _scale_residual_projections.' },
      ],
    },
    'en-us': {
      title: 'Complete GPT',
      body: `Now the pieces become the full model.

GPT receives IDs \`(B, T)\`, creates token and position embeddings, passes through Transformer blocks, applies \`ln_f\`, and projects to logits \`(B, T, V)\`.

If it receives \`targets\`, it computes cross-entropy against the expected next token.`,
      rightBody: `\`\`\`python
snippet:pytorch_gpt2/gpt
\`\`\``,
      codeExplanations: [
        { lineRange: [1, 102], content: '`GPT`: complete model with token/position embedding, TransformerBlock stack, ln_f and lm_head. Forward with past_kv (KV cache) support. GPT-2 style weight initialization via _init_weights and _scale_residual_projections.' },
      ],
    },
  },
});

