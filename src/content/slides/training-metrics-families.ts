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

1.  **Qualidade de Aprendizado:** Indica se o modelo está conseguindo imitar os dados de treino (\`loss\`, \`perplexity\`, \`accuracy\`).
2.  **Generalização:** Indica se o aprendizado serve para dados que o modelo nunca viu (\`eval_loss\`, \`eval_accuracy\`).
3.  **Estabilidade:** Indica se o treino está saudável ou prestes a "explodir" (\`grad_norm\`, \`learning_rate\`).
4.  **Performance:** Mede a velocidade e o custo do processo (\`samples_per_second\`, \`GPU memory\`).

> O erro comum é focar só na \`loss\` e ignorar a estabilidade ou a generalização.`,
    },
    'en-us': {
      title: `The Metric Families`,
      body: `Not every metric measures the same thing. To avoid getting lost in the Trainer's "sea of numbers," divide the metrics into four signal families:

1.  **Learning Quality:** Indicates if the model is succeeding in mimicking the training data (\`loss\`, \`perplexity\`, \`accuracy\`).
2.  **Generalization:** Indicates if the learning applies to data the model has never seen (\`eval_loss\`, \`eval_accuracy\`).
3.  **Stability:** Indicates if the training is healthy or about to "explode" (\`grad_norm\`, \`learning_rate\`).
4.  **Performance:** Measures the speed and cost of the process (\`samples_per_second\`, \`GPU memory\`).

> A common mistake is focusing only on \`loss\` and ignoring stability or generalization.`,
    },
  },
  visual: {
    id: 'training-metrics-families-visual',
    copy: {
      'pt-br': {
        q1Title: 'Loss e Eval Loss',
        q1Desc: 'Devem descer com o tempo',
        q2Title: 'Accuracy e F1',
        q2Desc: 'Devem subir e estabilizar',
        q3Title: 'Grad Norm',
        q3Desc: 'Deve se manter num patamar estável',
        q4Title: 'Samples/s',
        q4Desc: 'Quanto maior, mais rápido é o treino',
      },
      'en-us': {
        q1Title: 'Loss and Eval Loss',
        q1Desc: 'Should decrease over time',
        q2Title: 'Accuracy and F1',
        q2Desc: 'Should increase and stabilize',
        q3Title: 'Grad Norm',
        q3Desc: 'Should remain at a stable level',
        q4Title: 'Samples/s',
        q4Desc: 'Higher means faster training',
      },
    },
  },
});
