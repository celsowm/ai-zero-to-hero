import { defineSlide } from './_factory';

export const bigramSampling = defineSlide({
  id: 'bigram-sampling',
  type: 'two-column',
  options: {
    "columnRatios": [
      0.6,
      0.4
    ]
  },
  content: {
    'pt-br': {
      title: `Sorteando o próximo token`,
      body: `Agora que temos as probabilidades, como escolhemos a palavra? Não pegamos apenas a maior porcentagem o tempo todo.

1. **O problema de ser ganancioso:** se sempre pegarmos a opção mais provável (algoritmo guloso), o modelo ficará preso em loops chatos e repetitivos ('We the people the people the people...').

2. **O dado viciado:** em vez disso, usamos as probabilidades para rolar um dado viciado (amostragem multinomial). Se 'the' tem 80% de chance e 'went' tem 20%, ainda há 1 em 5 chances de escolhermos 'went'.

3. **Criatividade mecânica:** essa amostragem estatística é o que dá ao texto gerado a sua naturalidade e variedade, fazendo com que a mesma pergunta nunca tenha a mesma resposta.

> Não escolhemos a melhor palavra; rolamos um dado onde a melhor palavra tem mais lados.`,
    },
    'en-us': {
      title: `Sampling the next token`,
      body: `Now that we have probabilities, how do we pick the word? We do not just grab the highest percentage every time.

1. **The problem of being greedy:** if we always take the most likely option (greedy algorithm), the model will get stuck in boring, repetitive loops ('We the people the people...').

2. **The loaded die:** instead, we use the probabilities to roll a loaded die (multinomial sampling). If 'the' has an 80% chance and 'went' has 20%, there is still a 1 in 5 chance we pick 'went'.

3. **Mechanical creativity:** this statistical sampling is what gives generated text its natural feel and variety, ensuring the same question never gets the exact same answer twice.

> We don't pick the best word; we roll a die where the best word has more sides.`,
    },
  },
  visual: {
    id: 'sampling-roulette',
    copy: {
      "pt-br": {
        "rollLabel": "Rolar dado",
        "resultLabel": "Escolhido:"
      },
      "en-us": {
        "rollLabel": "Roll die",
        "resultLabel": "Picked:"
      }
    },
  },
});
