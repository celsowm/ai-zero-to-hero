import { defineSlide } from './_factory';

export const pytorchGpt2Block = defineSlide({
  id: 'pytorch-gpt2-block',
  type: 'two-column',
  options: { columnRatios: [0.48, 0.52] },
  content: {
    'pt-br': {
      title: 'Bloco Transformer',
      body: `O bloco Transformer junta atenção e MLP com LayerNorm e residual.

Ele recebe \`(B, T, C)\` e devolve \`(B, T, C)\`, por isso pode ser empilhado várias vezes.

A atenção atualiza o residual stream com informação de contexto. O MLP transforma a representação de cada posição.`,
      rightBody: `\`\`\`python
snippet:pytorch_gpt2/block
\`\`\``,
      codeExplanations: [
        { lineRange: [1, 11], content: 'Imports: `torch`, `nn`, `ModelConfig`, e os módulos `CausalSelfAttention` e `MLP` criados anteriormente.' },
        { lineRange: [13, 21], content: '`TransformerBlock` estende `nn.Module`. `__init__`: cria duas `LayerNorm`, `CausalSelfAttention` e `MLP`. Biases seguem `config.bias`.' },
        { lineRange: [23, 30], content: '`forward`: padrão pré-LayerNorm — `x + attn(ln_1(x))` depois `x + mlp(ln_2(x))`. Shape `(B, T, C)` inalterado.' },
      ],
    },
    'en-us': {
      title: 'Transformer Block',
      body: `The Transformer block combines attention and MLP with LayerNorm and residual connections.

It receives \`(B, T, C)\` and returns \`(B, T, C)\`, so it can be stacked many times.

Attention updates the residual stream with context information. The MLP transforms each position's representation.`,
      rightBody: `\`\`\`python
snippet:pytorch_gpt2/block
\`\`\``,
      codeExplanations: [
        { lineRange: [1, 11], content: 'Imports: `torch`, `nn`, `ModelConfig`, and the previously created `CausalSelfAttention` and `MLP` modules.' },
        { lineRange: [13, 21], content: '`TransformerBlock` extends `nn.Module`. `__init__`: creates two `LayerNorm`, `CausalSelfAttention`, and `MLP`. Biases follow `config.bias`.' },
        { lineRange: [23, 30], content: '`forward`: pre-LayerNorm pattern — `x + attn(ln_1(x))` then `x + mlp(ln_2(x))`. Shape `(B, T, C)` unchanged.' },
      ],
    },
  },
});
