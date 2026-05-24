import { defineSlide } from './_factory';

export const gpt2PytorchOptimizerSetup = defineSlide({
  id: 'gpt2-pytorch-optimizer-setup',
  type: 'two-column',
  options: { columnRatios: [0.46, 0.54] },
  content: {
    'pt-br': {
      title: 'AdamW do jeito certo: decay e no_decay',
      body: `Em GPT, nem todo parâmetro deve receber weight decay.

Regra prática:

- matrizes grandes recebem weight decay
- bias, LayerNorm e vetores 1D não recebem

Por isso criamos dois grupos de parâmetros:

1. \`decay\`
2. \`no_decay\`

\`\`\`txt
Parâmetro         Grupo
Linear.weight     decay
Embedding.weight  decay
Linear.bias       no_decay
LayerNorm.weight  no_decay
LayerNorm.bias    no_decay
\`\`\`

Contrato:
- entrada: \`model.named_parameters()\`
- operação: separar por \`param.dim()\`
- saída: \`torch.optim.AdamW\`
- teste: conferir que grupos têm weight decay diferente`,
      rightBody: `\`\`\`python
snippet:gpt2_manual/optimizer-setup
\`\`\``,
      codeExplanations: [
        { lineRange: [1, 15], content: 'A função percorre parâmetros treináveis e separa matrizes de vetores/bias pelo número de dimensões.' },
        { lineRange: [17, 28], content: 'Os grupos entram no AdamW com `weight_decay` diferente e betas usados em GPTs pequenos.' },
      ],
    },
    'en-us': {
      title: 'AdamW done right: decay and no_decay',
      body: `In GPT, not every parameter should receive weight decay.

Practical rule:

- large matrices receive weight decay
- bias, LayerNorm, and 1D vectors do not

So we create two parameter groups:

1. \`decay\`
2. \`no_decay\`

\`\`\`txt
Parameter         Group
Linear.weight     decay
Embedding.weight  decay
Linear.bias       no_decay
LayerNorm.weight  no_decay
LayerNorm.bias    no_decay
\`\`\`

Contract:
- input: \`model.named_parameters()\`
- operation: split by \`param.dim()\`
- output: \`torch.optim.AdamW\`
- test: verify groups use different weight decay`,
      rightBody: `\`\`\`python
snippet:gpt2_manual/optimizer-setup
\`\`\``,
      codeExplanations: [
        { lineRange: [1, 15], content: 'The function walks trainable parameters and separates matrices from vectors/biases by dimensionality.' },
        { lineRange: [17, 28], content: 'Groups enter AdamW with different `weight_decay` and betas used in small GPTs.' },
      ],
    },
  },
});
