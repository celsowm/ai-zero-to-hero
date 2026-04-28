import { defineSlide } from './_factory';

export const languageModelingIntro = defineSlide({
  id: 'language-modeling-intro',
  type: 'two-column',
  options: {
    "columnRatios": [
      0.6,
      0.4
    ]
  },
  content: {
    'pt-br': {
      title: `Modelagem de Linguagem: o que é?`,
      body: `Agora o mesmo raciocínio de previsão sai dos dados tabulares e entra no texto. Em vez de prever \`sim/não\` para um paciente, a rede tenta prever qual token faz mais sentido depois do contexto atual.

1. **A tarefa central:** um modelo de linguagem recebe uma sequência de texto e tenta adivinhar qual é a próxima palavra mais provável.

2. **A ilusão de inteligência:** ao fazer isso bilhões de vezes, muito rápido e com extrema precisão, o modelo parece estar raciocinando, mas está apenas calculando a continuação estatisticamente mais adequada.

3. **Do zero ao GPT:** todo modelo moderno, do corretor do celular ao GPT-4, compartilha esse mesmo princípio básico de previsão.

> Modelos de linguagem não têm opiniões; eles são calculadoras de probabilidade incrivelmente sofisticadas.`,
    },
    'en-us': {
      title: `Language Modeling: what is it?`,
      body: `Now the same prediction logic moves from tabular data into text. Instead of predicting \`yes/no\` for a patient, the network tries to predict which token makes the most sense after the current context.

1. **The core task:** a language model receives a sequence of text and tries to guess what the most likely next word is.

2. **The illusion of intelligence:** by doing this billions of times, very fast and with extreme precision, the model appears to be reasoning, but it is just calculating the most statistically sound continuation.

3. **From scratch to GPT:** every modern model, from your phone's autocomplete to GPT-4, shares this same basic prediction principle.

> Language models do not have opinions; they are incredibly sophisticated probability calculators.`,
    },
  },
  visual: {
    id: 'language-modeling-diagram',
    copy: {
      "pt-br": {
        "text": "O gato sentou no ___",
        "options": [
          "tapete (85%)",
          "carro (10%)",
          "foguete (5%)"
        ]
      },
      "en-us": {
        "text": "The cat sat on the ___",
        "options": [
          "mat (85%)",
          "car (10%)",
          "rocket (5%)"
        ]
      }
    },
  },
});
