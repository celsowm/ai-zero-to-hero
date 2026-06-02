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
        { lineRange: [1, 13], content: 'Docstring e imports: `math`, `torch`, `F`, `nn`, `ModelConfig`, `TransformerBlock`. Type alias `KVCache`.' },
        { lineRange: [16, 32], content: '`GPT.__init__`: cria embeddings de token e posição, dropout, stack de `TransformerBlock`, `ln_f`, `lm_head`. Opcionalmente ata pesos. Aplica `_init_weights` e `_scale_residual_projections`.' },
        { lineRange: [34, 52], content: '`forward` assinatura e validação: recebe `idx`, `targets`, `past_kv`, `use_cache`. Valida `seq_len` e `past_len + seq_len` contra `block_size`.' },
        { lineRange: [53, 67], content: 'Embeddings + posições: soma token_embedding e position_embedding, dropout. Passa por blocos com suporte a cache. `ln_f` e `lm_head` para logits.' },
        { lineRange: [69, 75], content: 'Loss (cross-entropy) se `targets` fornecido. Retorna com ou sem cache.' },
        { lineRange: [77, 82], content: '`crop_block_size`: reduz `block_size` recortando position_embedding.' },
        { lineRange: [84, 88], content: '`num_parameters`: conta parâmetros, opcionalmente excluindo embeddings.' },
        { lineRange: [90, 102], content: '`_init_weights` e `_scale_residual_projections`: inicialização estilo GPT-2 — normal(0, 0.02) para Linear/Embedding, zeros para bias, escala residual.' },
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
        { lineRange: [1, 13], content: 'Docstring and imports: `math`, `torch`, `F`, `nn`, `ModelConfig`, `TransformerBlock`. `KVCache` type alias.' },
        { lineRange: [16, 32], content: '`GPT.__init__`: creates token/position embeddings, dropout, `TransformerBlock` stack, `ln_f`, `lm_head`. Optionally ties weights. Applies `_init_weights` and `_scale_residual_projections`.' },
        { lineRange: [34, 52], content: '`forward` signature and validation: receives `idx`, `targets`, `past_kv`, `use_cache`. Validates `seq_len` and `past_len + seq_len` against `block_size`.' },
        { lineRange: [53, 67], content: 'Embeddings + positions: sums token_embedding and position_embedding, dropout. Passes through blocks with cache support. `ln_f` and `lm_head` for logits.' },
        { lineRange: [69, 75], content: 'Loss (cross-entropy) if `targets` provided. Returns with or without cache.' },
        { lineRange: [77, 82], content: '`crop_block_size`: reduces `block_size` by trimming position_embedding.' },
        { lineRange: [84, 88], content: '`num_parameters`: counts params, optionally excluding embeddings.' },
        { lineRange: [90, 102], content: '`_init_weights` and `_scale_residual_projections`: GPT-2 style initialization — normal(0, 0.02) for Linear/Embedding, zeros for bias, residual scaling.' },
      ],
    },
  },
});

