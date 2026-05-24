import { defineSlide } from './_factory';

export const gpt2PytorchProjectMap = defineSlide({
  id: 'gpt2-pytorch-project-map',
  type: 'two-column',
  options: { columnRatios: [0.52, 0.48] },
  content: {
    'pt-br': {
      title: 'Mapa do projeto: as peças do nosso GPT',
      body: `Antes de escrever código, precisamos saber o que vamos montar.

Um GPT pequeno em PyTorch pode caber em poucas peças:

1. \`GPTConfig\`: números que definem os shapes.
2. Token stream: sequência longa de IDs.
3. HF dataset intake: inspeção de configs, splits e colunas.
4. Dataset -> token stream: normalização de texto real.
5. \`get_batch()\`: corta janelas \`x/y\`.
6. \`CausalSelfAttention\`: mistura tokens sem olhar o futuro.
7. \`MLP\`: transforma cada token individualmente.
8. \`TransformerBlock\`: atenção + MLP + residual.
9. \`GPT\`: embeddings, blocos, \`ln_f\`, \`lm_head\` e loss.
10. \`configure_optimizers()\`: AdamW com grupos de parâmetros.
11. \`generate()\`: loop autoregressivo de inferência.

A regra do bloco é simples: cada slide entrega uma dessas peças.`,
      rightBody: `\`\`\`txt
model.py
├── GPTConfig
├── CausalSelfAttention
├── MLP
├── TransformerBlock
└── GPT
    ├── forward()
    ├── configure_optimizers()
    └── generate()

data
├── HF dataset
├── schema/columns
├── normalized text
├── token stream
└── get_batch()

train
├── loss
├── backward
├── clip
└── optimizer.step()
\`\`\``,
    },
    'en-us': {
      title: 'Project map: the pieces of our GPT',
      body: `Before writing code, we need to know what we are building.

A small GPT in PyTorch can fit into a few pieces:

1. \`GPTConfig\`: numbers that define shapes.
2. Token stream: one long sequence of IDs.
3. HF dataset intake: inspect configs, splits, and columns.
4. Dataset -> token stream: normalize real text.
5. \`get_batch()\`: slices \`x/y\` windows.
6. \`CausalSelfAttention\`: mixes tokens without seeing the future.
7. \`MLP\`: transforms each token independently.
8. \`TransformerBlock\`: attention + MLP + residual.
9. \`GPT\`: embeddings, blocks, \`ln_f\`, \`lm_head\`, and loss.
10. \`configure_optimizers()\`: AdamW with parameter groups.
11. \`generate()\`: autoregressive inference loop.

The rule for this block is simple: each slide delivers one of these pieces.`,
      rightBody: `\`\`\`txt
model.py
├── GPTConfig
├── CausalSelfAttention
├── MLP
├── TransformerBlock
└── GPT
    ├── forward()
    ├── configure_optimizers()
    └── generate()

data
├── HF dataset
├── schema/columns
├── normalized text
├── token stream
└── get_batch()

train
├── loss
├── backward
├── clip
└── optimizer.step()
\`\`\``,
    },
  },
});
