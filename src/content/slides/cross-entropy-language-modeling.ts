import { defineSlide } from './_factory';

export const crossEntropyLanguageModeling = defineSlide({
  id: 'cross-entropy-language-modeling',
  type: 'two-column',
  options: {
    "columnRatios": [
      0.6,
      0.4
    ]
  },
  content: {
    'pt-br': {
      title: `Medindo o erro: Cross-Entropy`,
      body: `Durante o treinamento, precisamos de um jeito matemático para dizer ao modelo se as previsões dele estão boas ou ruins. Entra a **Perda de Entropia Cruzada** (Cross-Entropy Loss).

1. **O gabarito:** no treino, nós sabemos qual é a verdadeira próxima palavra. Digamos que seja 'people'.

2. **A surpresa do modelo:** olhamos para a probabilidade que o modelo deu para a palavra correta 'people'. Se ele deu 99%, a perda é quase zero. Ele não ficou surpreso.

3. **A penalidade:** se ele deu apenas 1% para 'people', o modelo ficou muito surpreso. A função logarítmica penaliza severamente o modelo por estar muito confiante na palavra errada.

> Cross-entropy mede a surpresa do modelo. Menos surpresa = melhor aprendizado.`,
    },
    'en-us': {
      title: `Measuring error: Cross-Entropy`,
      body: `During training, we need a mathematical way to tell the model if its predictions are good or bad. Enter **Cross-Entropy Loss**.

1. **The answer key:** in training, we know the true next word. Let's say it is 'people'.

2. **The model's surprise:** we look at the probability the model assigned to the correct word 'people'. If it gave 99%, the loss is near zero. It was not surprised.

3. **The penalty:** if it gave only 1% for 'people', the model was very surprised. The logarithmic function severely penalizes the model for being confidently wrong.

> Cross-entropy measures the model's surprise. Less surprise = better learning.`,
    },
  },
  visual: {
    id: 'cross-entropy-chart',
    copy: {
      "pt-br": {
        "probAxis": "Probabilidade dada à palavra correta",
        "lossAxis": "Perda (Loss)",
        "highSurprise": "Alta surpresa (ruim)",
        "lowSurprise": "Baixa surpresa (bom)"
      },
      "en-us": {
        "probAxis": "Probability assigned to correct word",
        "lossAxis": "Loss",
        "highSurprise": "High surprise (bad)",
        "lowSurprise": "Low surprise (good)"
      }
    },
  },
});
