import { defineSlide } from './_factory';

export const embeddingsIntro = defineSlide({
  id: 'embeddings-intro',
  type: 'two-column',
  options: {
    "columnRatios": [
      0.6,
      0.4
    ]
  },
  content: {
    'pt-br': {
      title: `Embeddings: o significado em números`,
      body: `Token IDs são apenas rótulos. O ID 10 e o ID 11 podem ser 'cachorro' e 'rei', sem nenhuma relação. Como o modelo entende que 'cachorro' é parecido com 'gato'? Através de **Embeddings**.

1. **A grande tabela:** o modelo aprende uma grande tabela (matriz) onde cada token ganha uma lista de centenas de números (um vetor).

2. **Espaço de significado:** esses números agem como coordenadas em um mapa de milhares de dimensões. Tokens com significados parecidos ('rei' e 'rainha') acabam com coordenadas próximas.

3. **De palavra para conceito:** ao trocar o ID pelo vetor numérico correspondente, o modelo para de ver a palavra como um símbolo isolado e passa a ver o *conceito* que ela representa.

> Embeddings transformam IDs frios em coordenadas ricas de significado.`,
    },
    'en-us': {
      title: `Embeddings: meaning in numbers`,
      body: `Token IDs are just labels. ID 10 and ID 11 could be 'dog' and 'king', completely unrelated. How does the model understand that 'dog' is similar to 'cat'? Through **Embeddings**.

1. **The grand table:** the model learns a massive table (matrix) where each token gets a list of hundreds of numbers (a vector).

2. **Meaning space:** these numbers act as coordinates in a thousands-dimensional map. Tokens with similar meanings ('king' and 'queen') end up with close coordinates.

3. **From word to concept:** by swapping the ID for its numerical vector, the model stops seeing the word as an isolated symbol and starts seeing the *concept* it represents.

> Embeddings transform cold IDs into rich coordinates of meaning.`,
    },
  },
  visual: {
    id: 'embedding-space-3d',
    copy: {
      "pt-br": {
        "title": "Espaço de Embeddings",
        "distanceLabel": "Distância semântica"
      },
      "en-us": {
        "title": "Embedding Space",
        "distanceLabel": "Semantic distance"
      }
    },
  },
});
