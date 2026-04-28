import { defineSlide } from './_factory';

export const predictionEvolutionWeThePeople = defineSlide({
  id: 'prediction-evolution-we-the-people',
  type: 'two-column',
  options: {
    "columnRatios": [
      0.6,
      0.4
    ]
  },
  content: {
    'pt-br': {
      title: `Como o palpite evolui`,
      body: `O mais fascinante do fluxo residual é que podemos 'espiar' o que o modelo está pensando no meio do caminho.

1. **Camadas iniciais:** Se olharmos para a saída do Bloco 1, o modelo talvez ache que depois de 'We the people' deve vir um verbo genérico como 'are'.

2. **Camadas médias:** No Bloco 6, a Atenção já conectou 'people' com 'We', e o MLP ativou fatos históricos. O palpite muda para palavras como 'of', 'United'.

3. **Camadas finais:** No Bloco 12, o contexto está perfeitamente cristalizado. O palpite número 1 dispara: 'of' (de 'We the people of the United States').

> Camadas iniciais entendem gramática básica; camadas profundas acessam fatos e contexto complexo.`,
    },
    'en-us': {
      title: `How the guess evolves`,
      body: `The most fascinating thing about the residual stream is that we can 'peek' into what the model is thinking halfway through.

1. **Early layers:** If we look at the output of Block 1, the model might think a generic verb like 'are' comes after 'We the people'.

2. **Middle layers:** By Block 6, Attention has connected 'people' with 'We', and MLP has activated historical facts. The guess shifts to words like 'of', 'American'.

3. **Final layers:** By Block 12, the context is perfectly crystallized. The top guess shoots up: 'of' ('We the people of the United States').

> Early layers understand basic grammar; deep layers access facts and complex context.`,
    },
  },
  visual: {
    id: 'layer-evolution-chart',
    copy: {
      "pt-br": {
        "layerLabel": "Camada",
        "predictionLabel": "Previsão Principal"
      },
      "en-us": {
        "layerLabel": "Layer",
        "predictionLabel": "Top Prediction"
      }
    },
  },
});
