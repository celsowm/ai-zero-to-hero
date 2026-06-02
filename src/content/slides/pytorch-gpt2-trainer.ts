import { defineSlide } from './_factory';

export const pytorchGpt2Trainer = defineSlide({
  id: 'pytorch-gpt2-trainer',
  type: 'two-column',
  options: { columnRatios: [0.48, 0.52] },
  content: {
    'pt-br': {
      title: 'Trainer',
      body: `O \`Trainer\` junta tudo.

Ele cria device, seed, modelo, optimizer, DataLoader, scheduler e checkpoint. Depois executa o ciclo real: batch, forward, loss, backward, clipping, step, eval e save.

Esse slide precisa ter código porque é aqui que o aluno vê o treino inteiro se conectar.`,
      rightBody: `\`\`\`python
snippet:pytorch_gpt2/trainer
\`\`\``,
      codeExplanations: [
        { lineRange: [1, 189], content: '`Trainer`: inicialização com device/seed/model/optimizer/DataLoader, `fit()` com gradient accumulation, mixed precision, cosine LR, val eval, checkpoint, `evaluate()`.' },
      ],
    },
    'en-us': {
      title: 'Trainer',
      body: `The \`Trainer\` ties everything together.

It creates device, seed, model, optimizer, DataLoader, scheduler, and checkpoint. Then it runs the actual cycle: batch, forward, loss, backward, clipping, step, eval, and save.

This slide needs code because this is where the student sees the entire training pipeline connect.`,
      rightBody: `\`\`\`python
snippet:pytorch_gpt2/trainer
\`\`\``,
      codeExplanations: [
        { lineRange: [1, 189], content: '`Trainer`: initialization with device/seed/model/optimizer/DataLoader, `fit()` with gradient accumulation, mixed precision, cosine LR, val eval, checkpoint, `evaluate()`.' },
      ],
    },
  },
});

