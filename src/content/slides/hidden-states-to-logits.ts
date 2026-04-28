import { defineSlide } from './_factory';

export const hiddenStatesToLogits = defineSlide({
  id: 'hidden-states-to-logits',
  type: 'two-column',
  options: {
    "columnRatios": [
      0.6,
      0.4
    ]
  },
  content: {
    'pt-br': {
      title: `A reta final: de volta às palavras`,
      body: `Depois de passar por 12 blocos de Atenção e MLP, o que temos na mão? Um vetor complexo cheio de contexto. Mas nós precisamos de uma palavra, não de um vetor!

1. **A Matriz Final (Unembedding):** pegamos esse vetor final e multiplicamos por uma gigantesca matriz que contém todos os tokens do vocabulário (ex: 50.000 palavras).

2. **Pontuações brutas (Logits):** o resultado dessa multiplicação é uma lista de 50.000 números. Cada número é a 'pontuação' que o modelo dá para aquele token ser o próximo.

3. **De volta ao Softmax:** como vimos antes, passamos esses Logits pela função Softmax para transformá-los em probabilidades limpas (0 a 100%).

> A última etapa traduz o 'pensamento' numérico de volta para o dicionário humano.`,
    },
    'en-us': {
      title: `The final stretch: back to words`,
      body: `After going through 12 blocks of Attention and MLP, what do we have? A complex vector full of context. But we need a word, not a vector!

1. **The Final Matrix (Unembedding):** we take this final vector and multiply it by a gigantic matrix containing all the tokens in the vocabulary (e.g., 50,000 words).

2. **Raw scores (Logits):** the result of this multiplication is a list of 50,000 numbers. Each number is the 'score' the model gives to that token for being the next one.

3. **Back to Softmax:** as we saw before, we pass these Logits through the Softmax function to turn them into clean probabilities (0 to 100%).

> The last step translates the numerical 'thought' back into the human dictionary.`,
    },
  },
  visual: {
    id: 'unembedding-diagram',
    copy: {
      "pt-br": {
        "vectorLabel": "Vetor Final",
        "vocabLabel": "Vocabulário",
        "logitsLabel": "Logits (Pontuações)"
      },
      "en-us": {
        "vectorLabel": "Final Vector",
        "vocabLabel": "Vocabulary",
        "logitsLabel": "Logits (Scores)"
      }
    },
  },
});
