import { defineSlide } from './_factory';

export const neuralNetworkPytorchModelLifecycle = defineSlide({
  id: 'neural-network-pytorch-model-lifecycle',
  type: 'two-column',
  options: { columnRatios: [0.52, 0.48] },
  content: {
    'pt-br': {
      title: 'Ciclo de vida do modelo',
      body: `Antes de chegar ao repo do GPT-2, precisamos fixar quatro operações que voltam sempre:

1. **\`model.train()\`**
2. **\`model.eval()\`**
3. **\`torch.no_grad()\`**
4. **checkpoint**`,
      rightBody: `\`\`\`python
snippet:pytorch-lm/model-lifecycle
\`\`\``,
      codeExplanations: [
        { lineRange: [1, 4], content: 'Montamos um modelo pequeno com `Dropout` para que a diferença entre treino e avaliação faça sentido.' },
        { lineRange: [5, 8], content: 'Em modo treino, o forward ainda pode aplicar ruído e atualizar comportamento interno.' },
        { lineRange: [9, 14], content: 'Em modo avaliação, com `no_grad`, a inferência fica estável e barata sem mudar o shape.' },
      ],
    },
    'en-us': {
      title: 'Model lifecycle',
      body: `Before we get to the GPT-2 repo, we need to lock in four operations that keep coming back:

1. **\`model.train()\`**
2. **\`model.eval()\`**
3. **\`torch.no_grad()\`**
4. **checkpointing**`,
      rightBody: `\`\`\`python
snippet:pytorch-lm/model-lifecycle
\`\`\``,
      codeExplanations: [
        { lineRange: [1, 4], content: 'We build a tiny model with `Dropout` so the train/eval difference is concrete.' },
        { lineRange: [5, 8], content: 'In train mode, the forward pass may still inject noise and update internal behavior.' },
        { lineRange: [9, 14], content: 'In eval mode, with `no_grad`, inference becomes stable and cheaper without changing shape.' },
      ],
    },
  },
});
