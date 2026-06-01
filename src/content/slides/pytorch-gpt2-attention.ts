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
        { lineRange: [1, 10], content: 'Imports: `torch`, `F` (functional) para `scaled_dot_product_attention`, `nn`, e `ModelConfig`.' },
        { lineRange: [12, 32], content: '`CausalSelfAttention` estende `nn.Module`. `__init__`: guarda `n_head` e `n_embd`, calcula `head_dim = n_embd // n_head`. Cria `c_attn` que projeta `C -> 3C` (Q, K, V concatenados), `c_proj` que projeta de volta, e `dropout`.' },
        { lineRange: [34, 43], content: '`_shape()`: reshape de `(B, T, C)` para `(B, H, T, D)`. Usa `view` para separar heads e `transpose` para rearranjar. Isso permite operações matriciais por head.' },
        { lineRange: [45, 67], content: '`forward()`: projeta entrada em QKV com `c_attn(x)`, separa Q/K/V com `split`, aplica `_shape` em cada um, chama `scaled_dot_product_attention` com `is_causal=True` (máscara triangular automática), depois junta heads e projeta saída.' },
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
        { lineRange: [1, 10], content: 'Imports: `torch`, `F` (functional) for `scaled_dot_product_attention`, `nn`, and `ModelConfig`.' },
        { lineRange: [12, 32], content: '`CausalSelfAttention` extends `nn.Module`. `__init__`: stores `n_head` and `n_embd`, computes `head_dim = n_embd // n_head`. Creates `c_attn` projecting `C -> 3C` (Q, K, V concatenated), `c_proj` projecting back, and `dropout`.' },
        { lineRange: [34, 43], content: '`_shape()`: reshapes `(B, T, C)` to `(B, H, T, D)`. Uses `view` to split heads and `transpose` to rearrange. Enables per-head matrix operations.' },
        { lineRange: [45, 67], content: '`forward()`: projects input to QKV via `c_attn(x)`, splits Q/K/V with `.split`, applies `_shape` to each, calls `scaled_dot_product_attention` with `is_causal=True` (automatic triangular mask), then merges heads and projects output.' },
      ],
    },
  },
});

