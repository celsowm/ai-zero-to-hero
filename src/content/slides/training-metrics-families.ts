import { defineSlide } from './_factory';

export const trainingMetricsFamilies = defineSlide({
  id: 'training-metrics-families',
  type: 'two-column',
  options: {
    columnRatios: [0.5, 0.5],
  },
  content: {
    'pt-br': {
      title: `As Famílias de Métricas`,
      body: `Nem toda métrica mede a mesma coisa. Para não se perder no "mar de números" do Trainer, divida as métricas em quatro famílias de sinais:

1.  **Qualidade de Aprendizado:** Indica se o modelo está imitando o treino (\`loss\`, \`perplexity\`).
2.  **Generalização:** Indica se o aprendizado serve para dados novos (\`eval_loss\`).
3.  **Estabilidade:** Indica se o treino está saudável (\`grad_norm\`, \`learning_rate\`).
4.  **Performance:** Mede a velocidade e o custo (\`samples/s\`, \`GPU memory\`).

---

### O que buscar?
*   📉 **Loss e Eval Loss:** Devem descer.
*   📈 **Accuracy e F1:** Devem subir.
*   ⚖️ **Grad Norm:** Deve ser estável.
*   🚀 **Samples/s:** Quanto mais, melhor.

> O erro comum é focar só na \`loss\` e ignorar a estabilidade ou a generalização.`,
    },
    'en-us': {
      title: `The Metric Families`,
      body: `Not every metric measures the same thing. To avoid getting lost in the Trainer's "sea of numbers," divide the metrics into four signal families:

1.  **Learning Quality:** Indicates if the model is mimicking training (\`loss\`, \`perplexity\`).
2.  **Generalization:** Indicates if the learning applies to new data (\`eval_loss\`).
3.  **Stability:** Indicates if the training is healthy (\`grad_norm\`, \`learning_rate\`).
4.  **Performance:** Measures the speed and cost (\`samples/s\`, \`GPU memory\`).

---

### What to look for?
*   📉 **Loss and Eval Loss:** Should go down.
*   📈 **Accuracy and F1:** Should go up.
*   ⚖️ **Grad Norm:** Should be stable.
*   🚀 **Samples/s:** The more, the better.

> A common mistake is focusing only on \`loss\` and ignoring stability or generalization.`,
    },
  },
});
