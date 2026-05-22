import { defineSlide } from './_factory';

export const gpt2BlockAnatomy = defineSlide({
  id: 'gpt2-block-anatomy',
  type: 'two-column',
  options: { columnRatios: [0.56, 0.44] },
  content: {
    'pt-br': {
      title: 'Anatomia de um bloco GPT-2',
      body: `Um bloco do decoder segue um fluxo compacto e repetível:

1. \`ln_1\`
2. atenção causal
3. residual add
4. \`ln_2\`
5. MLP
6. residual add

Empilhar esse bloco \`N\` vezes é o que forma a torre do Transformer.`,
      rightBody: '```txt\nx -> ln_1 -> attention -> +x\nx -> ln_2 -> mlp       -> +x\n```',
    },
    'en-us': {
      title: 'Anatomy of a GPT-2 block',
      body: `A decoder block follows a compact, repeatable flow:

1. \`ln_1\`
2. causal attention
3. residual add
4. \`ln_2\`
5. MLP
6. residual add

Stacking this block \`N\` times is what builds the Transformer tower.`,
      rightBody: '```txt\nx -> ln_1 -> attention -> +x\nx -> ln_2 -> mlp       -> +x\n```',
    },
  },
});

