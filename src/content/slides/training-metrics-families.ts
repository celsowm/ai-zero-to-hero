import { defineSlide } from './_factory';

export const trainingMetricsFamilies = defineSlide({
  id: 'training-metrics-families',
  type: 'markdown',
  content: {
    'pt-br': {
      title: `As Famílias de Métricas`,
      body: `Nem toda métrica mede a mesma coisa. Para não se perder no "mar de números" do Trainer, divida as métricas em quatro famílias de sinais:

1.  **Qualidade de Aprendizado:** Indica se o modelo está conseguindo imitar os dados de treino.
    *   *Ex:* \`loss\`, \`perplexity\`, \`accuracy\`.

2.  **Generalização:** Indica se o aprendizado serve para dados que o modelo nunca viu.
    *   *Ex:* \`eval_loss\`, \`eval_accuracy\`, \`benchmark_score\`.

3.  **Estabilidade:** Indica se o treino está saudável ou prestes a "explodir".
    *   *Ex:* \`grad_norm\`, \`learning_rate\`, \`loss_spikes\`.

4.  **Performance & Infra:** Mede a velocidade e o custo do processo.
    *   *Ex:* \`samples_per_second\`, \`steps_per_second\`, \`GPU memory\`.

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

1.  **Learning Quality:** Indicates if the model is succeeding in mimicking the training data.
    *   *Ex:* \`loss\`, \`perplexity\`, \`accuracy\`.

2.  **Generalization:** Indicates if the learning applies to data the model has never seen.
    *   *Ex:* \`eval_loss\`, \`eval_accuracy\`, \`benchmark_score\`.

3.  **Stability:** Indicates if the training is healthy or about to "explode."
    *   *Ex:* \`grad_norm\`, \`learning_rate\`, \`loss_spikes\`.

4.  **Performance & Infra:** Measures the speed and cost of the process.
    *   *Ex:* \`samples_per_second\`, \`steps_per_second\`, \`GPU memory\`.

### What to look for?
*   📉 **Loss and Eval Loss:** Should go down.
*   📈 **Accuracy and F1:** Should go up.
*   ⚖️ **Grad Norm:** Should be stable.
*   🚀 **Samples/s:** The more, the better.

> A common mistake is focusing only on \`loss\` and ignoring stability or generalization.`,
    },
  },
});
