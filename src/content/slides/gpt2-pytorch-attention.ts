import { defineSlide } from './_factory';

export const gpt2PytorchAttention = defineSlide({
  id: 'gpt2-pytorch-attention',
  type: 'two-column',
  options: {
    "columnRatios": [0.40, 0.60]
  },
  content: {
    'pt-br': {
      title: `GPT-2 por dentro: Atenção Multi-Head`,
      body: `É aqui que a mágica acontece. A atenção é o coração do Transformer — é como cada token **busca contexto** nos outros tokens da sequência.

### QKV de uma vez só

O GPT-2 original projeta Query, Key e Value em uma única matriz \`c_attn\` de tamanho \`768 × 2304\`. Depois fazemos o split. Isso é mais eficiente que 3 projeções separadas.

### Scaled Dot-Product

A atenção é um produto escalar: query pergunta, key responde. O fator \`${'`'}head_dim^{-0.5}${'`'}\` evita que valores grandes dominem o softmax. O causal mask (matriz triangular) garante que cada token só vê o que veio **antes** — é isso que torna o modelo "causal".

---

\`\`\`python
snippet:gpt2_pytorch/gpt2-attention
\`\`\``,
      codeExplanations: [
        { "lineRange": [1, 7], "content": "Inicialização: embed_dim=768, 12 heads, head_dim=64, scaling=1/√64. Define c_attn (768→2304), c_proj e dropout." },
        { "lineRange": [8, 13], "content": "Camadas lineares: c_attn projeta Q+K+V juntos (mais eficiente), c_proj é a saída final, resid_dropout evita overfit." },
        { "lineRange": [14, 20], "content": "Carrega pesos reais do HuggingFace com torch.no_grad() — c_attn, c_proj (weight + bias)." },
        { "lineRange": [22, 24], "content": "forward(): projeta hidden_states em QKV de uma vez, depois split em 3 vetores de 768." },
        { "lineRange": [26, 28], "content": "Reshape: (batch, seq, heads, head_dim) → transpose para (batch, heads, seq, head_dim)." },
        { "lineRange": [30, 33], "content": "Scaled dot-product: query @ key.T * scaling. masked_fill com -inf bloqueia tokens futuros. Softmax normaliza." },
        { "lineRange": [35, 40], "content": "Output: weights @ value → transpose → reshape → c_proj → dropout → retorna (output, attn_weights)." }
      ],
    },
    'en-us': {
      title: `GPT-2 internals: Multi-Head Attention`,
      body: `This is where the magic happens. Attention is the heart of the Transformer — it's how each token **seeks context** from other tokens in the sequence.

### QKV all at once

The original GPT-2 projects Query, Key, and Value into a single \`c_attn\` matrix of size \`768 × 2304\`. Then we split. This is more efficient than 3 separate projections.

### Scaled Dot-Product

Attention is a dot product: query asks, key answers. The \`${'`'}head_dim^{-0.5}${'`'}\` factor prevents large values from dominating the softmax. The causal mask (triangular matrix) ensures each token only sees what came **before** — that's what makes the model "causal".

---

\`\`\`python
snippet:gpt2_pytorch/gpt2-attention
\`\`\``,
      codeExplanations: [
        { "lineRange": [1, 7], "content": "Initialization: embed_dim=768, 12 heads, head_dim=64, scaling=1/√64. Sets up c_attn (768→2304), c_proj, and dropout." },
        { "lineRange": [8, 13], "content": "Linear layers: c_attn projects Q+K+V together (more efficient), c_proj is the final output, resid_dropout prevents overfit." },
        { "lineRange": [14, 20], "content": "Loads real HuggingFace weights with torch.no_grad() — c_attn, c_proj (weight + bias)." },
        { "lineRange": [22, 24], "content": "forward(): projects hidden_states into QKV at once, then splits into 3 vectors of 768." },
        { "lineRange": [26, 28], "content": "Reshape: (batch, seq, heads, head_dim) → transpose to (batch, heads, seq, head_dim)." },
        { "lineRange": [30, 33], "content": "Scaled dot-product: query @ key.T * scaling. masked_fill with -inf blocks future tokens. Softmax normalizes." },
        { "lineRange": [35, 40], "content": "Output: weights @ value → transpose → reshape → c_proj → dropout → returns (output, attn_weights)." }
      ],
    },
  },
});
