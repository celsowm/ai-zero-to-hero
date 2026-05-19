import { defineSlide } from './_factory';

export const gpt2PytorchAttention = defineSlide({
  id: 'gpt2-pytorch-attention',
  type: 'two-column',
  options: { columnRatios: [0.46, 0.54] },
  content: {
    'pt-br': {
      title: 'Atenção causal no repo',
      body: `O repo usa o padrão GPT-2 clássico:

1. projeção \`C -> 3C\` para QKV
2. reshape para múltiplas heads
3. atenção causal
4. projeção final de volta para \`C\``,
      rightBody: `\`\`\`python
snippet:repo-gpt2/attention
\`\`\``,
      codeExplanations: [
        { lineRange: [1, 11], content: 'A classe guarda número de heads, largura do embedding e as projeções lineares centrais.' },
        { lineRange: [13, 20], content: 'No forward, o tensor vira QKV, ganha formato multi-head, passa pela atenção causal e volta para `(B, T, C)`.' },
      ],
    },
    'en-us': {
      title: 'Causal attention in the repo',
      body: `The repo follows the classic GPT-2 pattern:

1. one \`C -> 3C\` projection for QKV
2. reshape into multiple heads
3. causal attention
4. final projection back to \`C\``,
      rightBody: `\`\`\`python
snippet:repo-gpt2/attention
\`\`\``,
      codeExplanations: [
        { lineRange: [1, 11], content: 'The class stores number of heads, embedding width, and the central linear projections.' },
        { lineRange: [13, 20], content: 'In the forward pass, the tensor becomes QKV, gains multi-head shape, runs causal attention, and returns to `(B, T, C)`.' },
      ],
    },
  },
});
