import { defineSlide } from './_factory';

export const pytorchGpt2Optimizer = defineSlide({
  id: 'pytorch-gpt2-optimizer',
  type: 'two-column',
  options: { columnRatios: [0.48, 0.52] },
  content: {
    'pt-br': {
      title: 'Otimização do treino',
      body: `Depois de ter configuração, precisamos definir como os pesos serão atualizados.

O \`optimizer.py\` monta o AdamW separando parâmetros com decay e sem decay. Matrizes recebem regularização; bias e vetores de normalização não.

O \`scheduler.py\` calcula o learning rate a cada step. O treino começa com warmup e depois reduz o learning rate com curva cossenoidal.`,
      rightBody: `\`\`\`python
snippet:pytorch_gpt2/optim-build
\`\`\`

\`\`\`python
snippet:pytorch_gpt2/scheduler
\`\`\``,
      codeExplanations: [],
    },
    'en-us': {
      title: 'Training optimization',
      body: `After configuration, we need to define how weights will be updated.

\`optimizer.py\` builds AdamW separating parameters with and without decay. Matrices receive regularization; bias and normalization vectors do not.

\`scheduler.py\` computes the learning rate at each step. Training starts with warmup and then decays the learning rate with a cosine curve.`,
      rightBody: `\`\`\`python
snippet:pytorch_gpt2/optim-build
\`\`\`

\`\`\`python
snippet:pytorch_gpt2/scheduler
\`\`\``,
      codeExplanations: [],
    },
  },
});
