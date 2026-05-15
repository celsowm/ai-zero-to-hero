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
      title: `Embeddings: do token ao vetor`,
      body: `Até aqui, o modelo viu o texto como números inteiros (token IDs): "We" → 464, "the" → 277, "People" → 2606. Mas IDs isolados não dizem nada sobre **relação entre palavras**.

Para o modelo entender que "rei" e "rainha" são parecidos — ou que "cachorro" e "gato" compartilham contexto — ele precisa de uma representação mais rica que um simples número. A solução são **Embeddings**.

1. **A tabela de embeddings:** o modelo aprende uma grande tabela (matriz) onde cada token ID aponta para uma lista de centenas de números (um vetor).

2. **Espaço semântico:** esses vetores são coordenadas em um mapa de milhares de dimensões. Tokens com significados próximos acabam com vetores próximos no espaço.

3. **De símbolo para conceito:** ao trocar o ID pelo vetor, o modelo para de tratar a palavra como um rótulo isolado e passa a operar sobre o *significado* que ela carrega.

> O próximo slide mostra exatamente como o GPT-2 pega o ID 464 ("We") e o transforma em um vetor de 768 dimensões.`,
    },
    'en-us': {
      title: `Embeddings: from token to vector`,
      body: `So far, the model sees text as integer numbers (token IDs): "We" → 464, "the" → 277, "People" → 2606. But isolated IDs say nothing about **relationships between words**.

For the model to understand that "king" and "queen" are similar — or that "dog" and "cat" share context — it needs a representation richer than a simple number. The solution is **Embeddings**.

1. **The embedding table:** the model learns a massive table (matrix) where each token ID maps to a list of hundreds of numbers (a vector).

2. **Semantic space:** these vectors are coordinates in a thousands-dimensional map. Tokens with similar meanings end up with close vectors in space.

3. **From symbol to concept:** by swapping the ID for its vector, the model stops treating the word as an isolated label and starts operating on the *meaning* it carries.

> The next slide shows exactly how GPT-2 takes ID 464 ("We") and transforms it into a 768-dimensional vector.`,
    },
  },
  visual: {
    id: 'embedding-space-3d-interactive',
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
