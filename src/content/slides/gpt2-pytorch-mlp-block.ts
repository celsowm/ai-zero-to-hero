import { defineSlide } from './_factory';

export const gpt2PytorchMlpBlock = defineSlide({
  id: 'gpt2-pytorch-mlp-block',
  type: 'two-column',
  options: {
    "columnRatios": [0.40, 0.60]
  },
  content: {
    'pt-br': {
      title: `GPT-2 por dentro: MLP e o Bloco Transformer`,
      body: `Depois da atenção, o **MLP** processa. Se a atenção é "olhar para os outros tokens", o MLP é "pensar sobre o que vi".

### O MLP: expansão e contração

O MLP expande de 768 para 3072 (4×), aplica **GELU** (ativação mais suave que ReLU), e projeta de volta para 768. Essa expansão intermediária dá capacidade computacional ao bloco — é onde a rede faz deduções não-lineares.

### O bloco completo: Residual + LayerNorm

Cada bloco do Transformer segue a mesma receita:
1. **LayerNorm** → estabiliza a distribuição dos vetores
2. **Atenção** → busca contexto
3. **Residual** → soma o original com a saída da atenção
4. Repete com MLP em vez de atenção

O residual é a **via expressa**: preserva o sinal original para que nenhuma informação se perca ao longo das 12 camadas.

---

\`\`\`python
snippet:gpt2_pytorch/gpt2-mlp-block
\`\`\``,
      codeExplanations: [
        { "lineRange": [1, 23], "content": "MLP: expande 768 → 3072, aplica GELU, contrai 3072 → 768. Pesos reais carregados do checkpoint." },
        { "lineRange": [25, 41], "content": "GPT2Block: dois LayerNorm, uma Atenção, um MLP. Carrega pesos reais do ln_1 e ln_2." },
        { "lineRange": [43, 53], "content": "Forward: residual → ln_1 → atenção → residual → ln_2 → MLP → residual. Cada '+' preserva informação." }
      ],
    },
    'en-us': {
      title: `GPT-2 internals: MLP and the Transformer Block`,
      body: `After attention, the **MLP** processes. If attention is "looking at other tokens", the MLP is "thinking about what I saw".

### The MLP: expansion and contraction

The MLP expands from 768 to 3072 (4×), applies **GELU** (smoothing activation than ReLU), and projects back to 768. This intermediate expansion gives the block computational capacity — this is where the network makes non-linear deductions.

### The complete block: Residual + LayerNorm

Each Transformer block follows the same recipe:
1. **LayerNorm** → stabilizes vector distribution
2. **Attention** → seeks context
3. **Residual** → adds the original with attention output
4. Repeats with MLP instead of attention

The residual is the **highway**: it preserves the original signal so no information is lost across the 12 layers.

---

\`\`\`python
snippet:gpt2_pytorch/gpt2-mlp-block
\`\`\``,
      codeExplanations: [
        { "lineRange": [1, 23], "content": "MLP: expands 768 → 3072, applies GELU, contracts 3072 → 768. Real weights loaded from checkpoint." },
        { "lineRange": [25, 41], "content": "GPT2Block: two LayerNorms, one Attention, one MLP. Loads real weights for ln_1 and ln_2." },
        { "lineRange": [43, 53], "content": "Forward: residual → ln_1 → attention → residual → ln_2 → MLP → residual. Each '+' preserves information." }
      ],
    },
  },
});
