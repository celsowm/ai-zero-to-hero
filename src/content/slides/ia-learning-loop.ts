import { defineSlide } from './_factory';

export const iaLearningLoop = defineSlide({
  id: 'ia-learning-loop',
  type: 'two-column',
  content: {
    'pt-br': {
      title: `O ciclo de aprendizado`,
      body: `## A IA aprende em ciclo

1. **Dados** fornecem exemplos do mundo real.
2. **Modelo** transforma entrada em predição.
3. **Erro** mostra a distância até o resultado real.
4. **Ajuste** corrige os parâmetros.

> Repetir esse ciclo melhora a generalização.`,
    },
    'en-us': {
      title: `The Learning Loop`,
      body: `## AI learns in a loop

1. **Data** provides examples from the real world.
2. **Model** turns input into a prediction.
3. **Error** shows the gap to the real result.
4. **Adjustment** corrects the parameters.

> Repeating this cycle improves generalization.`,
    },
  },
  visual: {
    id: 'learning-loop-diagram',
    copy: {
      "pt-br": {
        "diagramTitle": "O ciclo de aprendizado da IA",
        "diagramDescription": "Dados alimentam o modelo, que gera predições, recebe feedback de erro e ajusta seus parâmetros até a próxima rodada.",
        "dataTitle": "Dados",
        "modelTitle": "Modelo",
        "predictionTitle": "Predição",
        "errorTitle": "Erro",
        "adjustTitle": "Ajuste",
        "loopLabel": "prever → medir → corrigir",
        "footerLabel": "Repetir esse ciclo melhora a generalização do sistema"
      },
      "en-us": {
        "diagramTitle": "The AI learning loop",
        "diagramDescription": "Data feeds the model, which generates predictions, receives error feedback, and adjusts its parameters for the next round.",
        "dataTitle": "Data",
        "modelTitle": "Model",
        "predictionTitle": "Prediction",
        "errorTitle": "Error",
        "adjustTitle": "Adjustment",
        "loopLabel": "predict → measure → correct",
        "footerLabel": "Repeating this loop improves the system’s generalization"
      }
    },
  },
});
