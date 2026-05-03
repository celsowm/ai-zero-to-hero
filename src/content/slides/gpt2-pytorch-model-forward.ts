import { defineSlide } from './_factory';

export const gpt2PytorchModelForward = defineSlide({
  id: 'gpt2-pytorch-model-forward',
  type: 'two-column',
  options: {
    "columnRatios": [0.40, 0.60]
  },
  content: {
    'pt-br': {
      title: `GPT-2 por dentro: O Modelo Completo`,
      body: `Agora juntamos todas as peças. O \`GPT2Model\` é o **corpo** do modelo — ele não prevê tokens ainda, apenas transforma token IDs em vetores processados.

### Embeddings: texto → vetor

- **\`wte\`** (Word Token Embedding): cada token do vocabulário (50257) vira um vetor de 768 dimensões
- **\`wpe\`** (Word Position Embedding): cada posição (0-1023) ganha um vetor que diz "onde" o token está

Os dois embeddings são **somados** — o vetor final carrega tanto o significado quanto a posição do token.

### Causal Mask e a Torre

O \`tril\` cria uma matriz triangular inferior: \`[1,0,0; 1,1,0; 1,1,1]\`. Isso significa que o token na posição 2 só pode atender aos tokens 0, 1 e ele mesmo. O loop por \`self.h\` passa o vetor por cada um dos 12 blocos.

### LayerNorm final

Antes de enviar para o \`lm_head\`, normalizamos o vetor final. Isso estabiliza a distribuição para a etapa de previsão.

---

\`\`\`python
snippet:gpt2_pytorch/gpt2-model-forward
\`\`\``,
      codeExplanations: [
        { "lineRange": [1, 14], "content": "Inicialização: wte (token embedding), wpe (position embedding), lista de 12 blocos, ln_f final. Pesos carregados do state_dict." },
        { "lineRange": [15, 21], "content": "Embeddings: token IDs → vetores + posições → soma. O drop adiciona ruído zero em modo eval." },
        { "lineRange": [22, 27], "content": "Causal mask triu: True = bloquear tokens futuros. Shape [1, 1, T, T] para broadcast nos heads." },
        { "lineRange": [28, 29], "content": "Loop pelos 12 blocos: cada bloco aplica atenção + MLP com residual. O vetor flui pela 'via expressa'." },
        { "lineRange": [30, 32], "content": "LayerNorm final: estabiliza a distribuição antes de projetar para o vocabulário." }
      ],
    },
    'en-us': {
      title: `GPT-2 internals: The Complete Model`,
      body: `Now we put all the pieces together. \`GPT2Model\` is the **body** of the model — it doesn't predict tokens yet, it just transforms token IDs into processed vectors.

### Embeddings: text → vector

- **\`wte\`** (Word Token Embedding): each vocabulary token (50257) becomes a 768-dimensional vector
- **\`wpe\`** (Word Position Embedding): each position (0-1023) gets a vector that says "where" the token is

The two embeddings are **summed** — the final vector carries both the meaning and the position of the token.

### Causal Mask and the Tower

\`tril\` creates a lower triangular matrix: \`[1,0,0; 1,1,0; 1,1,1]\`. This means the token at position 2 can only attend to tokens 0, 1, and itself. The loop over \`self.h\` passes the vector through each of the 12 blocks.

### Final LayerNorm

Before sending to \`lm_head\`, we normalize the final vector. This stabilizes the distribution for the prediction step.

---

\`\`\`python
snippet:gpt2_pytorch/gpt2-model-forward
\`\`\``,
      codeExplanations: [
        { "lineRange": [1, 14], "content": "Initialization: wte (token embedding), wpe (position embedding), list of 12 blocks, final ln_f. Weights loaded from state_dict." },
        { "lineRange": [15, 21], "content": "Embeddings: token IDs → vectors + positions → sum. Drop adds zero noise in eval mode." },
        { "lineRange": [22, 27], "content": "Causal mask triu: True = block future tokens. Shape [1, 1, T, T] for broadcasting across heads." },
        { "lineRange": [28, 29], "content": "Loop through 12 blocks: each block applies attention + MLP with residual. The vector flows down the 'highway'." },
        { "lineRange": [30, 32], "content": "Final LayerNorm: stabilizes distribution before projecting to vocabulary." }
      ],
    },
  },
});
