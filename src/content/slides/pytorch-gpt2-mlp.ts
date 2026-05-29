import { defineSlide } from './_factory';

export const pytorchGpt2Mlp = defineSlide({
  id: 'pytorch-gpt2-mlp',
  type: 'two-column',
  options: { columnRatios: [0.48, 0.52] },
  content: {
    'pt-br': {
      title: 'MLP',
      body: `Agora entramos no modelo.

O MLP transforma cada posição separadamente. Ele recebe \`(B, T, C)\` e devolve \`(B, T, C)\`.

A forma usada no GPT-2 é expandir a dimensão interna para \`4C\`, aplicar GELU e projetar de volta para \`C\`.`,
      rightBody: `\`\`\`python
snippet:pytorch_gpt2/mlp
\`\`\``,
      codeExplanations: [
        { lineRange: [1, 9], content: 'Imports: `torch`, `nn` do PyTorch, e `ModelConfig` do projeto. `MLP` herda de `nn.Module`.' },
        { lineRange: [11, 29], content: '`MLP` estende `nn.Module`. `__init__`: recebe `ModelConfig` e cria quatro camadas — `c_fc` expande de `C` para `4C`, `gelu` (aproximação tanh, como no GPT-2 original), `c_proj` projeta de `4C` de volta para `C`, e `dropout` para regularização.' },
        { lineRange: [31, 37], content: '`forward`: sequência linear → GELU → projeção → dropout. O shape de entrada `(B, T, C)` é preservado na saída — a transformação é posição-a-posição.' },
      ],
    },
    'en-us': {
      title: 'MLP',
      body: `Now we enter the model.

The MLP transforms each position independently. It receives \`(B, T, C)\` and returns \`(B, T, C)\`.

The GPT-2 approach expands the inner dimension to \`4C\`, applies GELU, and projects back to \`C\`.`,
      rightBody: `\`\`\`python
snippet:pytorch_gpt2/mlp
\`\`\``,
      codeExplanations: [
        { lineRange: [1, 9], content: 'Imports: `torch`, `nn` from PyTorch, and `ModelConfig` from the project. `MLP` extends `nn.Module`.' },
        { lineRange: [11, 29], content: '`MLP` extends `nn.Module`. `__init__`: receives `ModelConfig` and creates four layers — `c_fc` expands from `C` to `4C`, `gelu` (tanh approximation, as in original GPT-2), `c_proj` projects from `4C` back to `C`, and `dropout` for regularization.' },
        { lineRange: [31, 37], content: '`forward`: linear → GELU → projection → dropout sequence. The input shape `(B, T, C)` is preserved — the transformation is position-wise.' },
      ],
    },
  },
});
