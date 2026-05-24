import { defineSlide } from './_factory';

export const gpt2PytorchHeadShapes = defineSlide({
  id: 'gpt2-pytorch-head-shapes',
  type: 'two-column',
  options: { columnRatios: [0.48, 0.52] },
  content: {
    'pt-br': {
      title: 'Head shapes: de (B,T,C) para (B,H,T,D)',
      body: `Multi-head attention não cria vários modelos separados. Ela divide a largura \`C\` do vetor em \`H\` heads menores.

Regras que precisam fechar:

- \`C = H x D\`
- \`D = C // H\`
- \`C % H == 0\`

No GPT-2 pequeno:

\`\`\`txt
C = 768
H = 12
D = 64
\`\`\`

Fluxo:

\`\`\`txt
x:                 (B, T, C)
q/k/v:             (B, T, C)
view:              (B, T, H, D)
transpose:         (B, H, T, D)
attention:         (B, H, T, D)
contiguous + view: (B, T, C)
\`\`\`

Erro comum: esquecer \`contiguous()\` antes de \`view\` depois de \`transpose\`.`,
      rightBody: `\`\`\`python
snippet:gpt2_manual/head-shapes
\`\`\``,
      codeExplanations: [
        { lineRange: [1, 5], content: 'Lemos `B,T,C`, calculamos `H,D` e validamos que a largura pode ser dividida em heads.' },
        { lineRange: [7, 14], content: 'O reshape cria `(B,H,T,D)` e depois junta as heads de volta em `(B,T,C)`.' },
      ],
    },
    'en-us': {
      title: 'Head shapes: from (B,T,C) to (B,H,T,D)',
      body: `Multi-head attention does not create several separate models. It splits vector width \`C\` into \`H\` smaller heads.

Rules that must hold:

- \`C = H x D\`
- \`D = C // H\`
- \`C % H == 0\`

In small GPT-2:

\`\`\`txt
C = 768
H = 12
D = 64
\`\`\`

Flow:

\`\`\`txt
x:                 (B, T, C)
q/k/v:             (B, T, C)
view:              (B, T, H, D)
transpose:         (B, H, T, D)
attention:         (B, H, T, D)
contiguous + view: (B, T, C)
\`\`\`

Common error: forgetting \`contiguous()\` before \`view\` after \`transpose\`.`,
      rightBody: `\`\`\`python
snippet:gpt2_manual/head-shapes
\`\`\``,
      codeExplanations: [
        { lineRange: [1, 5], content: 'We read `B,T,C`, compute `H,D`, and validate that width can be split into heads.' },
        { lineRange: [7, 14], content: 'The reshape creates `(B,H,T,D)` and then joins heads back into `(B,T,C)`.' },
      ],
    },
  },
});
