import { defineSlide } from './_factory';

export const iaDefinition = defineSlide({
  id: 'ia-definition',
  type: 'two-column',
  content: {
    'pt-br': {
      title: `IA é Inferência`,
      body: `## IA não produz certezas

Inteligência Artificial, no seu núcleo, é o processo de inferir - estimar respostas a partir de dados, mesmo sob incerteza.

Na prática, sistemas de IA não "sabem" respostas.
Eles aprendem a mapear entradas para saídas prováveis, com base em padrões observados anteriormente.

- **Dados** representam o mundo real em forma estruturada.
- **Modelo** captura padrões e transforma entradas em previsões.
- **Predição** expressa uma estimativa, não uma verdade absoluta.

> Inferir é prever o desconhecido com base no conhecido.`,
    },
    'en-us': {
      title: `AI is Inference`,
      body: `## AI does not produce certainties

Artificial Intelligence, at its core, is the process of inferring - estimating answers from data, even under uncertainty.

In practice, AI systems do not "know" answers.
They learn to map inputs to likely outputs based on patterns observed before.

- **Data** represents the real world in structured form.
- **Model** captures patterns and turns inputs into predictions.
- **Prediction** expresses an estimate, not an absolute truth.

> To infer is to predict the unknown from the known.`,
    },
  },
  visual: {
    id: 'inference-diagram',
    copy: {
      "pt-br": {
        "diagramTitle": "Diagrama de inferência em IA",
        "diagramDescription": "Dados estruturados alimentam um modelo que produz predições e recebe feedback de loss para ajustar pesos e vieses, refinando a inferência.",
        "trainingTitle": "Dados de\nTreinamento",
        "modelTitle": "Modelo",
        "predictionsTitle": "Predições",
        "featuresLabel": "Atributos",
        "lossLabel": "Loss (Erro)",
        "updateLabel": "Ajuste de Pesos e Bias",
        "footerLabel": "Inferir é prever o desconhecido com base no conhecido"
      },
      "en-us": {
        "diagramTitle": "AI inference diagram",
        "diagramDescription": "Structured data feeds a model that produces predictions and receives loss feedback to adjust weights and biases, refining inference.",
        "trainingTitle": "Training\nData",
        "modelTitle": "Model",
        "predictionsTitle": "Predictions",
        "featuresLabel": "Features",
        "lossLabel": "Loss (Error)",
        "updateLabel": "Weight and Bias Updates",
        "footerLabel": "Inference means predicting the unknown from the known"
      }
    },
  },
});
