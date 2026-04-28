import { defineSlide } from './_factory';

export const gpt2EmbeddingsPlusPosition = defineSlide({
  id: 'gpt2-embeddings-plus-position',
  type: 'two-column',
  options: {
    "columnRatios": [
      0.6,
      0.4
    ]
  },
  content: {
    'pt-br': {
      title: `O primeiro passo: Embeddings + Posição`,
      body: `Se o Transformer 'engole' a página inteira de uma vez, como ele sabe qual palavra veio primeiro? Sem ajuda, 'O cão mordeu o homem' seria igual a 'O homem mordeu o cão'.

1. **Token Embeddings:** primeiro, trocamos os IDs pelas coordenadas de significado (exatamente como vimos antes).

2. **Positional Embeddings:** criamos um SEGUNDO vetor para cada token, não com o seu significado, mas com a sua **posição** na frase (1º, 2º, 3º).

3. **A soma:** nós literalmente somamos o vetor de significado com o vetor de posição. O resultado é um vetor misto: 'eu sou a palavra cachorro, e estou na posição 2'.

> Como os Transformers processam tudo ao mesmo tempo, a ordem das palavras precisa ser carimbada matematicamente em cada token.`,
    },
    'en-us': {
      title: `The first step: Embeddings + Position`,
      body: `If the Transformer 'swallows' the whole page at once, how does it know which word came first? Without help, 'Dog bites man' would be identical to 'Man bites dog'.

1. **Token Embeddings:** first, we swap the IDs for the meaning coordinates (exactly as we saw earlier).

2. **Positional Embeddings:** we create a SECOND vector for each token, not with its meaning, but with its **position** in the sentence (1st, 2nd, 3rd).

3. **The sum:** we literally add the meaning vector and the position vector together. The result is a mixed vector: 'I am the word dog, and I am in position 2'.

> Because Transformers process everything at once, the word order must be mathematically stamped onto each token.`,
    },
  },
  visual: {
    id: 'positional-embedding-adder',
    copy: {
      "pt-br": {
        "tokenVector": "Vetor do Token",
        "posVector": "Vetor de Posição",
        "resultVector": "Vetor Combinado"
      },
      "en-us": {
        "tokenVector": "Token Vector",
        "posVector": "Position Vector",
        "resultVector": "Combined Vector"
      }
    },
  },
});
