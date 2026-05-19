import { defineSlide } from './_factory';

export const neuralNetworkPytorchOptimizers = defineSlide({
  id: 'neural-network-pytorch-optimizers',
  type: 'two-column',
  options: { columnRatios: [0.54, 0.46] },
  content: {
    'pt-br': {
      title: 'Otimizador no loop certo',
      body: `Para language modeling, o importante não é decorar catálogo de otimizadores. É saber o ritual:

1. forward
2. loss
3. \`zero_grad()\`
4. backward
5. \`step()\`

O otimizador entra depois que o Autograd já calculou os gradientes.`,
      rightBody: `\`\`\`python
snippet:pytorch-lm/autograd-step
\`\`\``,
      codeExplanations: [
        { lineRange: [1, 5], content: 'Começamos com logits e target para isolar a parte matemática do ajuste.' },
        { lineRange: [7, 8], content: 'A dupla `loss` + `backward` produz exatamente o sinal que o otimizador consumirá.' },
        { lineRange: [10, 11], content: 'Mesmo sem `optimizer.step()` aqui, já vemos o que será atualizado.' },
      ],
    },
    'en-us': {
      title: 'The optimizer in the right loop',
      body: `For language modeling, what matters is not memorizing an optimizer catalog. It is knowing the ritual:

1. forward
2. loss
3. \`zero_grad()\`
4. backward
5. \`step()\`

The optimizer enters only after Autograd has already computed gradients.`,
      rightBody: `\`\`\`python
snippet:pytorch-lm/autograd-step
\`\`\``,
      codeExplanations: [
        { lineRange: [1, 5], content: 'We start from logits and targets to isolate the math behind the update.' },
        { lineRange: [7, 8], content: 'The pair `loss` + `backward` produces exactly the signal the optimizer will consume.' },
        { lineRange: [10, 11], content: 'Even without `optimizer.step()` here, we can already inspect what will be updated.' },
      ],
    },
  },
});
