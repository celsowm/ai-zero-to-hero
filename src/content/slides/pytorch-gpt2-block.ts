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
        { lineRange: [1, 11], content: 'Imports: `torch`, `nn`, `ModelConfig`, `CausalSelfAttention` e `MLP`.' },
        { lineRange: [12, 19], content: '`TransformerBlock.__init__`: cria duas `LayerNorm`, `CausalSelfAttention` e `MLP`. Biases seguem `config.bias`.' },
        { lineRange: [20, 34], content: '`forward`: se `use_cache=True`, passa `past_kv` para atenção e retorna `new_kv`. Caso contrário, fluxo padrão pré-LayerNorm. Shape `(B, T, C)` inalterado.' },
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
        { lineRange: [1, 11], content: 'Imports: `torch`, `nn`, `ModelConfig`, `CausalSelfAttention`, and `MLP`.' },
        { lineRange: [12, 19], content: '`TransformerBlock.__init__`: creates two `LayerNorm`, `CausalSelfAttention`, and `MLP`. Biases follow `config.bias`.' },
        { lineRange: [20, 34], content: '`forward`: if `use_cache=True`, passes `past_kv` to attention and returns `new_kv`. Otherwise, standard pre-LayerNorm pattern. Shape `(B, T, C)` unchanged.' },
      ],
    },
  },
});

