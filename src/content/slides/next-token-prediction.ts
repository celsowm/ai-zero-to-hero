import { defineSlide } from './_factory';

export const nextTokenPrediction = defineSlide({
  id: 'next-token-prediction',
  type: 'two-column',
  options: {
    "columnRatios": [
      0.6,
      0.4
    ]
  },
  content: {
    'pt-br': {
      title: `A previsão do próximo passo`,
      body: `Como um modelo escreve um parágrafo inteiro se ele só prevê uma palavra por vez? A resposta é simples: retroalimentação (loop).

1. **A semente:** você entrega um texto inicial (prompt) para o modelo. Ex: 'Era uma'.

2. **A previsão:** o modelo calcula e prevê que a próxima palavra é 'vez'.

3. **A recursão:** a palavra 'vez' é colada no texto original. O novo texto 'Era uma vez' entra de volta no modelo para prever a próxima ('um').

Esse processo (chamado de auto-regressivo) continua até o modelo prever um sinal de 'parada' ou atingir o limite de tamanho.

> Gerar texto longo é jogar 'adivinhe a próxima palavra' em um loop infinito.`,
    },
    'en-us': {
      title: `Predicting the next step`,
      body: `How does a model write an entire paragraph if it only predicts one word at a time? The answer is simple: a feedback loop.

1. **The seed:** you give an initial text (prompt) to the model. Ex: 'Once upon'.

2. **The prediction:** the model calculates and predicts the next word is 'a'.

3. **Recursion:** the word 'a' is glued to the original text. The new text 'Once upon a' goes back into the model to predict the next one ('time').

This process (called auto-regressive) continues until the model predicts a 'stop' signal or hits a length limit.

> Generating long text is playing 'guess the next word' in an infinite loop.`,
    },
  },
  visual: {
    id: 'next-token-interactive',
    copy: {
      "pt-br": {
        "startLabel": "Iniciar loop",
        "nextLabel": "Próxima iteração"
      },
      "en-us": {
        "startLabel": "Start loop",
        "nextLabel": "Next iteration"
      }
    },
  },
});
