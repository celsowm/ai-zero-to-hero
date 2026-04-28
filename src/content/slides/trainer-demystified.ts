import { defineSlide } from './_factory';

export const trainerDemystified = defineSlide({
  id: 'trainer-demystified',
  type: 'two-column',
  options: {
    columnRatios: [0.45, 0.55],
  },
  content: {
    'pt-br': {
      title: `O Trainer por dentro`,
      body: `O \`Trainer\` é a abstração mais poderosa da Hugging Face. Mas o que ele faz por baixo dos panos?

1. **Loop de treino:** itera sobre o dataset em epochs, chama \`forward()\`, calcula loss, faz \`backward()\` e \`step()\` — igual ao seu código PyTorch manual.

2. **Gradient accumulation:** se a GPU não cabe o batch inteiro, acumula gradients de N mini-batches antes do \`step()\`. Efetivamente multiplica o batch size.

3. **Mixed precision (FP16):** usa \`torch.cuda.amp\` para operações em float16, mantendo master weights em float32. ~2x mais rápido com mesma qualidade.

4. **Evaluation loop:** roda o modelo em modo eval, sem gradientes, calcula métricas. Salva o checkpoint se melhorar.

5. **Callbacks:** pontos de extensão (on_log, on_evaluate, on_save) para customizar comportamento.

6. **Distributed:** com \`accelerate\`, o Trainer coordena multi-GPU (DDP) e sharding (FSDP) automaticamente.

> O Trainer não é mágica — é PyTorch organizado com boas práticas de produção.

---

\`\`\`python
snippet:transformers/trainer-demystified
\`\`\``,
      codeExplanations: [
        {
          lineRange: [1, 6],
          content: 'Importamos as classes centrais: modelo, args, trainer e callback.',
        },
        {
          lineRange: [9, 21],
          content: '`TrainingArguments`: cada parâmetro controla um aspecto do treino — batch, LR, precision, eval, saving.',
        },
        {
          lineRange: [24, 27],
          content: 'Callback customizado: intercepta logs a cada step para monitorar loss.',
        },
        {
          lineRange: [30, 37],
          content: 'O Trainer recebe modelo, args, datasets, collator e callbacks.',
        },
        {
          lineRange: [40, 40],
          content: '`train()` roda o loop completo: forward, backward, step, eval, save.',
        },
      ],
    },
    'en-us': {
      title: `The Trainer under the hood`,
      body: `The \`Trainer\` is Hugging Face's most powerful abstraction. But what does it do under the hood?

1. **Training loop:** iterates over the dataset in epochs, calls \`forward()\`, computes loss, does \`backward()\` and \`step()\` — just like your manual PyTorch code.

2. **Gradient accumulation:** if the GPU can't fit the full batch, accumulates gradients from N mini-batches before \`step()\`. Effectively multiplies batch size.

3. **Mixed precision (FP16):** uses \`torch.cuda.amp\` for float16 operations, keeping master weights in float32. ~2x faster with same quality.

4. **Evaluation loop:** runs the model in eval mode, no gradients, computes metrics. Saves the checkpoint if it improves.

5. **Callbacks:** extension points (on_log, on_evaluate, on_save) to customize behavior.

6. **Distributed:** with \`accelerate\`, the Trainer coordinates multi-GPU (DDP) and sharding (FSDP) automatically.

> The Trainer isn't magic — it's PyTorch organized with production best practices.

---

\`\`\`python
snippet:transformers/trainer-demystified
\`\`\``,
      codeExplanations: [
        {
          lineRange: [1, 6],
          content: 'We import the central classes: model, args, trainer and callback.',
        },
        {
          lineRange: [9, 21],
          content: '`TrainingArguments`: each parameter controls a training aspect — batch, LR, precision, eval, saving.',
        },
        {
          lineRange: [24, 27],
          content: 'Custom callback: intercepts logs at each step to monitor loss.',
        },
        {
          lineRange: [30, 37],
          content: 'The Trainer receives model, args, datasets, collator and callbacks.',
        },
        {
          lineRange: [40, 40],
          content: '`train()` runs the full loop: forward, backward, step, eval, save.',
        },
      ],
    },
  },
});
