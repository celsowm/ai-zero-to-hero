import { defineSlide } from './_factory';

export const trainingLossExplained = defineSlide({
  id: 'training-loss-explained',
  type: 'two-column',
  options: {
    columnRatios: [0.45, 0.55],
  },
  content: {
    'pt-br': {
      title: `Entendendo a Loss`,
      body: `A **Loss** é o erro que o modelo tenta minimizar. Em LLMs, usamos a *Cross-Entropy*: ela mede o quão "surpreso" o modelo fica ao ver o token correto.

*   **Loss baixa:** O modelo deu alta probabilidade ao token correto.
*   **Loss alta:** O modelo errou feio a previsão.

### Perplexity (PPL)
É derivada da loss (\`exp(loss)\`). Pense nela como o número de "opções plausíveis" que o modelo está considerando. Quanto menor, mais confiante e preciso é o modelo.

> **Dica:** Não se assuste com oscilações locais. A loss pode subir num step porque o batch era difícil. O que importa é a **tendência global** de queda.
`,
      rightBody: `
\`\`\`python
snippet:transformers/training-metrics-log
\`\`\``,
      codeExplanations: [
        {
          lineRange: [4, 4],
          content: 'No início (step 1), a loss costuma ser alta e os gradientes grandes.',
        },
        {
          lineRange: [10, 10],
          content: 'Após alguns passos, a loss começa a cair consistentemente.',
        },
        {
          lineRange: [16, 17],
          content: 'A avaliação (\`eval_loss\`) é o teste real em dados não vistos.',
        },
      ],
    },
    'en-us': {
      title: `Understanding Loss`,
      body: `**Loss** is the error the model tries to minimize. In LLMs, we use *Cross-Entropy*: it measures how "surprised" the model is when seeing the correct token.

*   **Low Loss:** The model gave high probability to the correct token.
*   **High Loss:** The model's prediction was way off.

### Perplexity (PPL)
Derived from loss (\`exp(loss)\`). Think of it as the number of "plausible options" the model is considering. The lower it is, the more confident and precise the model is.

> **Tip:** Don't be scared by local oscillations. Loss might go up in a step because the batch was difficult. What matters is the **global downward trend**.
`,
      rightBody: `
\`\`\`python
snippet:transformers/training-metrics-log
\`\`\``,
      codeExplanations: [
        {
          lineRange: [4, 4],
          content: 'At the start (step 1), loss is usually high and gradients are large.',
        },
        {
          lineRange: [10, 10],
          content: 'After a few steps, loss starts to drop consistently.',
        },
        {
          lineRange: [16, 17],
          content: 'The evaluation (\`eval_loss\`) is the real test on unseen data.',
        },
      ],
    },
  },
});
