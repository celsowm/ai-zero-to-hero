import { defineSlide } from './_factory';

export const gpt2BlockAnatomy = defineSlide({
  id: 'gpt2-block-anatomy',
  type: 'two-column',
  options: { columnRatios: [0.56, 0.44] },
  content: {
    'pt-br': {
      title: 'Anatomia do bloco no repo novo',
      body: `No ` + '`pytorch-gpt2-from-scratch`' + `, o bloco é enxuto e direto:

1. \`ln_1\`
2. atenção causal
3. residual add
4. \`ln_2\`
5. MLP
6. residual add`,
      rightBody: '```txt\nx -> ln_1 -> attention -> +x\nx -> ln_2 -> mlp       -> +x\n```',
    },
    'en-us': {
      title: 'Block anatomy in the new repo',
      body: `In ` + '`pytorch-gpt2-from-scratch`' + `, the block is compact and direct:

1. \`ln_1\`
2. causal attention
3. residual add
4. \`ln_2\`
5. MLP
6. residual add`,
      rightBody: '```txt\nx -> ln_1 -> attention -> +x\nx -> ln_2 -> mlp       -> +x\n```',
    },
  },
});
