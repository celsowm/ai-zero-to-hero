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
        { "lineRange": [1, 21], "content": "Inicialização: c_attn projeta 768 → 2304 (Q+K+V juntos). Os pesos reais do HuggingFace são copiados com torch.no_grad()." },
        { "lineRange": [23, 26], "content": "Projeção QKV em uma operação. O split separa em 3 vetores de 768 cada." },
        { "lineRange": [27, 30], "content": "Reshape para (batch, 12 heads, seq_len, 64). Cada head trabalha com uma fatia diferente do embedding." },
        { "lineRange": [31, 35], "content": "Scaled dot-product: query @ key.T * scaling. masked_fill com -inf bloqueia tokens futuros antes do softmax." },
        { "lineRange": [36, 40], "content": "Aplica pesos @ value, reshape de volta, projeção final e dropout. Retorna output + atenção." }
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
        { "lineRange": [1, 21], "content": "Initialization: c_attn projects 768 → 2304 (Q+K+V together). Real HuggingFace weights are copied with torch.no_grad()." },
        { "lineRange": [23, 26], "content": "QKV projection in one operation. Split separates into 3 vectors of 768 each." },
        { "lineRange": [27, 30], "content": "Reshape to (batch, 12 heads, seq_len, 64). Each head works on a different slice of the embedding." },
        { "lineRange": [31, 35], "content": "Scaled dot-product: query @ key.T * scaling. masked_fill with -inf blocks future tokens before softmax." },
        { "lineRange": [36, 40], "content": "Apply weights @ value, reshape back, final projection and dropout. Returns output + attention." }
      ],
    },
  },
});
