import { defineSlide } from './_factory';

export const mlPipeline = defineSlide({
  id: 'ml-pipeline',
  type: 'two-column',
  options: {
    "columnRatios": [
      0.4,
      0.6
    ]
  },
  content: {
    'pt-br': {
      title: `Machine Learning: o pipeline`,
      body: `Machine Learning não começa no algoritmo. Começa no dado e só termina quando o modelo continua funcionando em produção.

1. **Dados e preparação:** a qualidade do pipeline começa na origem. Limpeza, seleção e engenharia de atributos definem o teto do modelo.

2. **Separação correta:** treino, validação e teste precisam estar bem isolados para medir generalização de verdade.

3. **Treinamento e ajuste:** o modelo aprende padrões, compara métricas e passa por iterações até reduzir erro sem decorar o conjunto.

4. **Deploy e monitoramento:** depois da entrega, o sistema precisa ser observado. Mudança de contexto, viés e drift exigem acompanhamento contínuo. Quando precisamos entender a predição em si, o próximo passo é um modelo simples: regressão linear.

> Em ML, o valor não está só no algoritmo. Está no fluxo que sustenta o algoritmo.`,
    },
    'en-us': {
      title: `Machine Learning: the pipeline`,
      body: `Machine Learning does not start with the algorithm. It starts with data and only ends when the model keeps working in production.

1. **Data and preparation:** pipeline quality starts at the source. Cleaning, selection, and feature engineering define the model’s ceiling.

2. **Correct splitting:** training, validation, and test sets must stay isolated to measure true generalization.

3. **Training and tuning:** the model learns patterns, compares metrics, and iterates until error drops without memorizing the dataset.

4. **Deployment and monitoring:** after release, the system still needs observation. Context shifts, bias, and drift require continuous tracking. When we want to understand prediction itself, the next step is a simple model: linear regression.

> In ML, the value is not only in the algorithm. It is in the flow that supports the algorithm.`,
    },
  },
  visual: {
    id: 'machine-learning-pipeline',
    copy: {
      "pt-br": {
        "diagramTitle": "Pipeline de Machine Learning",
        "diagramDescription": "Um pipeline bem desenhado transforma dado bruto em decisão confiável. O ciclo começa na origem do dado, passa por preparação e treino, e continua em produção com monitoramento e realimentação.",
        "stages": [
          {
          "title": "Dados",
          "subtitle": "origem e qualidade",
          "accent": "#38bdf8"
        },
          {
          "title": "Preparo",
          "subtitle": "limpeza e features",
          "accent": "#0ea5e9"
        },
          {
          "title": "Split",
          "subtitle": "treino, validação e teste",
          "accent": "#facc15"
        },
          {
          "title": "Treino",
          "subtitle": "ajuste de parâmetros",
          "accent": "#d946ef"
        },
          {
          "title": "Avaliação",
          "subtitle": "métricas e generalização",
          "accent": "#f97316"
        },
          {
          "title": "Deploy",
          "subtitle": "produção e drift",
          "accent": "#f43f5e"
        }
        ],
        "loopLabel": "retroalimenta",
        "footerLabel": "O melhor modelo continua útil quando o mundo muda."
      },
      "en-us": {
        "diagramTitle": "Machine Learning pipeline",
        "diagramDescription": "A well-designed pipeline turns raw data into reliable decisions. The cycle begins at the data source, moves through preparation and training, and continues in production with monitoring and feedback.",
        "stages": [
          {
          "title": "Data",
          "subtitle": "source and quality",
          "accent": "#38bdf8"
        },
          {
          "title": "Prepare",
          "subtitle": "cleaning and features",
          "accent": "#0ea5e9"
        },
          {
          "title": "Split",
          "subtitle": "training, validation, test",
          "accent": "#facc15"
        },
          {
          "title": "Train",
          "subtitle": "parameter fitting",
          "accent": "#d946ef"
        },
          {
          "title": "Evaluate",
          "subtitle": "metrics and generalization",
          "accent": "#f97316"
        },
          {
          "title": "Deploy",
          "subtitle": "production and drift",
          "accent": "#f43f5e"
        }
        ],
        "loopLabel": "feeds back",
        "footerLabel": "The best model stays useful as the world changes."
      }
    },
  },
});
