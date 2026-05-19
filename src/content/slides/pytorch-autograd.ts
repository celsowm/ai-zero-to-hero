import { defineSlide } from './_factory';

export const pytorchAutograd = defineSlide({
  id: 'pytorch-autograd',
  type: 'two-column',
  options: { columnRatios: [0.52, 0.48] },
  content: {
    'pt-br': {
      title: 'Autograd no treino real',
      body: `Aqui o Autograd deixa de ser teoria e vira o que interessa: **como o loss devolve sinal para ajustar pesos**.

O ciclo mínimo é:

1. produzir logits
2. comparar com o target
3. chamar \`loss.backward()\`
4. inspecionar gradientes

No treino de language model, o backward sempre responde à mesma pergunta: **o que precisa mudar para o token correto subir de probabilidade?**`,
      rightBody: `\`\`\`python
snippet:pytorch-lm/autograd-step
\`\`\``,
      codeExplanations: [
        { lineRange: [1, 5], content: 'Criamos logits pequenos com gradiente habilitado e um target correto para isolar a mecânica do backward.' },
        { lineRange: [7, 8], content: 'A cross-entropy mede o erro e `backward()` preenche os gradientes.' },
        { lineRange: [10, 11], content: 'Perda e gradiente deixam visível a direção do ajuste.' },
      ],
    },
    'en-us': {
      title: 'Autograd inside the real training loop',
      body: `Here Autograd stops being theory and becomes the useful part: **how the loss sends signal back to update weights**.

The minimal cycle is:

1. produce logits
2. compare them with the target
3. call \`loss.backward()\`
4. inspect gradients

In language-model training, backward always answers the same question: **what must change so the correct token becomes more likely?**`,
      rightBody: `\`\`\`python
snippet:pytorch-lm/autograd-step
\`\`\``,
      codeExplanations: [
        { lineRange: [1, 5], content: 'We create tiny logits with gradients enabled and one correct target to isolate the backward mechanics.' },
        { lineRange: [7, 8], content: 'Cross-entropy measures the error and `backward()` fills the gradients.' },
        { lineRange: [10, 11], content: 'Loss and gradient make the update direction visible.' },
      ],
    },
  },
});
