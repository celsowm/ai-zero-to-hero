import { defineSlide } from './_factory';

export const gpt2WeThePeopleInput = defineSlide({
  id: 'gpt2-we-the-people-input',
  type: 'two-column',
  options: {
    "columnRatios": [
      0.6,
      0.4
    ]
  },
  content: {
    'pt-br': {
      title: `Alimentando o gigante`,
      body: `Vamos colocar nosso exemplo 'We the people' dentro do GPT-2. Lembre-se, o Transformer prevê simultaneamente o próximo token para CADA posição da sequência!

1. **Entrada paralela:** nós não damos as palavras uma a uma esperando o modelo terminar. Jogamos a frase inteira de uma vez.

2. **Múltiplas previsões:** o GPT-2 olha para 'We' e tenta prever 'the'. Olha para 'We the' e tenta prever 'people'. Olha para 'We the people' e tenta prever o que vem a seguir.

3. **Eficiência extrema:** prever todos os passos anteriores simultaneamente durante o treino é o que faz o Transformer ser treinado de forma muito mais rápida que modelos antigos (RNNs).

> Um Transformer não lê as palavras como um humano; ele engole a página inteira de uma vez.`,
    },
    'en-us': {
      title: `Feeding the giant`,
      body: `Let's put our 'We the people' example into GPT-2. Remember, the Transformer simultaneously predicts the next token for EVERY position in the sequence!

1. **Parallel input:** we do not feed words one by one waiting for the model to finish. We throw the entire sentence at once.

2. **Multiple predictions:** GPT-2 looks at 'We' and tries to predict 'the'. It looks at 'We the' and tries to predict 'people'. It looks at 'We the people' and tries to predict what comes next.

3. **Extreme efficiency:** predicting all previous steps simultaneously during training is what allows the Transformer to train much faster than older models (RNNs).

> A Transformer does not read words like a human; it swallows the whole page at once.`,
    },
  },
  visual: {
    id: 'parallel-prediction-diagram',
    copy: {
      "pt-br": {
        "step1": "'We' -> prever 'the'",
        "step2": "'We the' -> prever 'people'",
        "step3": "'We the people' -> prever '?'"
      },
      "en-us": {
        "step1": "'We' -> predict 'the'",
        "step2": "'We the' -> predict 'people'",
        "step3": "'We the people' -> predict '?'"
      }
    },
  },
});
