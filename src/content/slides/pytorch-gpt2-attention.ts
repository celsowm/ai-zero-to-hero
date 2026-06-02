import { defineSlide } from './_factory';

export const pytorchGpt2Attention = defineSlide({
  id: 'pytorch-gpt2-attention',
  type: 'two-column',
  options: { columnRatios: [0.48, 0.52] },
  content: {
    'pt-br': {
      title: 'Atenção causal',
      body: `A atenção causal mistura informações entre posições, mas impede que uma posição use tokens futuros.

O arquivo recebe \`x: (B, T, C)\`, cria \`qkv: (B, T, 3C)\`, separa Q, K e V, reorganiza em heads e aplica atenção causal.`,
      rightBody: `\`\`\`python
snippet:pytorch_gpt2/attention
\`\`\``,
      codeExplanations: [
        { lineRange: [1, 11], content: 'Imports: docstring, `torch`, `F`, `nn`, `ModelConfig`, e declaração da classe `CausalSelfAttention`.' },
        { lineRange: [12, 22], content: '`__init__`: guarda `n_head`, `n_embd`, `head_dim`, `dropout`. Cria `c_attn` (C → 3C), `c_proj`, `resid_dropout`.' },
        { lineRange: [23, 42], content: '`forward`: recebe `x`, opcionalmente `past_kv` e `use_cache`. Projeta QKV com `c_attn`, separa Q/K/V, reshape para heads. Se `past_kv` existe, concatena com cache anterior para geração incremental.' },
        { lineRange: [43, 52], content: 'Define `is_causal` baseado na presença de cache. Executa `scaled_dot_product_attention`. Junta heads, `c_proj` + `resid_dropout`.' },
        { lineRange: [53, 58], content: 'Retorna `(y, (k, v))` se `use_cache`. `_shape()`: reshape `(B, T, C)` → `(B, H, T, D)`.' },
      ],
    },
    'en-us': {
      title: 'Causal attention',
      body: `Causal attention mixes information between positions, but prevents a position from using future tokens.

The file receives \`x: (B, T, C)\`, creates \`qkv: (B, T, 3C)\`, splits Q, K, and V, reshapes into heads, and applies causal attention.`,
      rightBody: `\`\`\`python
snippet:pytorch_gpt2/attention
\`\`\``,
      codeExplanations: [
        { lineRange: [1, 11], content: 'Imports: docstring, `torch`, `F`, `nn`, `ModelConfig`, and `CausalSelfAttention` class declaration.' },
        { lineRange: [12, 22], content: '`__init__`: stores `n_head`, `n_embd`, `head_dim`, `dropout`. Creates `c_attn` (C → 3C), `c_proj`, `resid_dropout`.' },
        { lineRange: [23, 42], content: '`forward`: receives `x`, optionally `past_kv` and `use_cache`. Projects QKV with `c_attn`, splits Q/K/V, reshapes to heads. If `past_kv` exists, concatenates with prior cache for incremental generation.' },
        { lineRange: [43, 52], content: 'Sets `is_causal` based on cache presence. Runs `scaled_dot_product_attention`. Merges heads, `c_proj` + `resid_dropout`.' },
        { lineRange: [53, 58], content: 'Returns `(y, (k, v))` if `use_cache`. `_shape()`: reshapes `(B, T, C)` → `(B, H, T, D)`.' },
      ],
    },
  },
});

