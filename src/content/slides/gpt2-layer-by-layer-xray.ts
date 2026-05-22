import { defineSlide } from './_factory';

export const gpt2LayerByLayerXray = defineSlide({
  id: 'gpt2-layer-by-layer-xray',
  type: 'two-column',
  options: { columnRatios: [0.44, 0.56] },
  content: {
    'pt-br': {
      title: 'Raio-X do forward completo',
      body: `Depois do embedding, \`x\` atravessa a torre do GPT-2.

O detalhe que muita gente perde: os 12 blocos não mudam o shape principal.

\`\`\`txt
(B,T,C) -> block[0] -> ... -> block[11] -> (B,T,C)
\`\`\`

O que muda é a representação:

1. blocos iniciais ajustam padrões locais e sintaxe
2. blocos médios misturam contexto por atenção e MLP
3. blocos finais deixam a última posição pronta para prever o próximo token

Só depois da torre vem:

- \`ln_f(x)\`
- \`lm_head(x)\`
- \`logits (B,T,V)\`

Para geração, a linha importante é \`logits[:, -1, :]\`: o placar do próximo token depois de \`people\`.`,
      rightBody: `\`\`\`python
snippet:gpt2_manual/forward-trace
\`\`\``,
      codeExplanations: [
        { lineRange: [1, 6], content: 'Fixamos `B,T,C,V`, criamos `idx` e um `x` com o shape que sai dos embeddings.' },
        { lineRange: [8, 11], content: 'A lista de 12 blocos preserva o shape `(B,T,C)` em cada etapa da torre.' },
        { lineRange: [13, 17], content: '`ln_f` mantém `(B,T,C)`, `lm_head` troca a última dimensão de `C` para vocabulário `V`.' },
        { lineRange: [19, 21], content: 'Os prints destacam o contrato final: logits completos e a linha usada para prever o próximo token.' },
      ],
    },
    'en-us': {
      title: 'X-ray of the full forward pass',
      body: `After embedding, \`x\` crosses the GPT-2 tower.

The detail many people miss: the 12 blocks do not change the main shape.

\`\`\`txt
(B,T,C) -> block[0] -> ... -> block[11] -> (B,T,C)
\`\`\`

What changes is the representation:

1. early blocks adjust local patterns and syntax
2. middle blocks mix context through attention and MLP
3. final blocks prepare the last position to predict the next token

Only after the tower do we get:

- \`ln_f(x)\`
- \`lm_head(x)\`
- \`logits (B,T,V)\`

For generation, the important row is \`logits[:, -1, :]\`: the next-token score board after \`people\`.`,
      rightBody: `\`\`\`python
snippet:gpt2_manual/forward-trace
\`\`\``,
      codeExplanations: [
        { lineRange: [1, 6], content: 'We fix `B,T,C,V`, create `idx`, and create an `x` with the shape produced by embeddings.' },
        { lineRange: [8, 11], content: 'The list of 12 blocks preserves `(B,T,C)` shape at every tower step.' },
        { lineRange: [13, 17], content: '`ln_f` keeps `(B,T,C)`, while `lm_head` changes the last dimension from `C` to vocabulary `V`.' },
        { lineRange: [19, 21], content: 'The prints highlight the final contract: full logits and the row used to predict the next token.' },
      ],
    },
  },
  visual: {
    id: 'gpt2-layer-by-layer-xray',
    copy: {
      'pt-br': {
        title: 'Trace da torre GPT-2',
        subtitle: 'O shape principal fica estável; a representação fica mais contextual.',
        shapeInvariantLabel: 'Invariante de shape',
        shapeInvariant: '(B,T,C) = (1,3,768)',
        stages: [
          { label: 'wte + wpe', shape: '(1,3,768)', detail: 'residual stream inicial' },
          { label: 'block[0]', shape: '(1,3,768)', detail: 'padrões locais' },
          { label: 'block[5]', shape: '(1,3,768)', detail: 'contexto intermediário' },
          { label: 'block[11]', shape: '(1,3,768)', detail: 'última posição refinada' },
          { label: 'lm_head', shape: '(1,3,50257)', detail: 'placares do vocabulário' },
        ],
        checkpoints: [
          { layer: 'entrada', representation: 'IDs + posição', prediction: 'fraca' },
          { layer: 'meio', representation: 'contexto sintático', prediction: 'of sobe' },
          { layer: 'final', representation: 'contexto constitucional', prediction: 'of domina' },
        ],
        footer: 'A torre não muda o tamanho do vetor; ela muda o que o vetor representa.',
      },
      'en-us': {
        title: 'GPT-2 tower trace',
        subtitle: 'The main shape stays stable; the representation becomes more contextual.',
        shapeInvariantLabel: 'Shape invariant',
        shapeInvariant: '(B,T,C) = (1,3,768)',
        stages: [
          { label: 'wte + wpe', shape: '(1,3,768)', detail: 'initial residual stream' },
          { label: 'block[0]', shape: '(1,3,768)', detail: 'local patterns' },
          { label: 'block[5]', shape: '(1,3,768)', detail: 'intermediate context' },
          { label: 'block[11]', shape: '(1,3,768)', detail: 'refined last position' },
          { label: 'lm_head', shape: '(1,3,50257)', detail: 'vocabulary scores' },
        ],
        checkpoints: [
          { layer: 'input', representation: 'IDs + position', prediction: 'weak' },
          { layer: 'middle', representation: 'syntactic context', prediction: 'of rises' },
          { layer: 'final', representation: 'constitutional context', prediction: 'of dominates' },
        ],
        footer: 'The tower does not change vector size; it changes what the vector represents.',
      },
    },
  },
});
