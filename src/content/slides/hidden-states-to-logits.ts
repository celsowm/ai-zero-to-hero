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
      title: `Números brutos → Probabilidades: o que são Logits?`,
      body: `No bigrama, os "números brutos" eram contagens: quantas vezes 'the' apareceu após 'We'. Mas num modelo neural, não há contagem — há **multiplicação de matrizes**.

1. **Hidden State (o "pensamento"):** depois de passar pelos embeddings, atenção e MLPs, o modelo produz um vetor denso. Esse vetor carrega todo o contexto da frase — mas ainda é só uma lista de números abstratos.

2. **A última multiplicação (Unembedding):** pegamos esse vetor e multiplicamos por uma matriz gigante com uma coluna por token do vocabulário (ex: 50.000). O resultado? Uma lista de 50.000 números — um por token possível.

3. **Logits:** é esse o nome técnico. Cada um desses 50.000 números é um **Logit** — a pontuação bruta que o modelo dá para aquele token ser o próximo. Quanto maior o logit, mais "candidato" aquele token é.

4. **Softmax transforma logits em probabilidades:** passamos os 50.000 logits pelo Softmax para obter porcentagens que somam 100%. O token com maior logit terá maior probabilidade, mas outros ainda têm chance.

> Logits são as pontuações brutas do modelo antes do softmax. O bigrama contava, o neural multiplica — mas o conceito é o mesmo.`,
    },
    'en-us': {
      title: `Raw numbers → Probabilities: what are Logits?`,
      body: `In the bigram, "raw numbers" were counts: how many times 'the' appeared after 'We'. But in a neural model, there is no counting — only **matrix multiplication**.

1. **Hidden State (the "thought"):** after passing through embeddings, attention, and MLPs, the model produces a dense vector. This vector carries the entire sentence context — but it's still just a list of abstract numbers.

2. **The final multiplication (Unembedding):** we take this vector and multiply it by a giant matrix with one column per vocabulary token (e.g., 50,000). The result? A list of 50,000 numbers — one per possible token.

3. **Logits:** that's the technical name. Each of these 50,000 numbers is a **Logit** — the raw score the model gives to that token for being the next one. The higher the logit, the more of a "candidate" that token is.

4. **Softmax turns logits into probabilities:** we pass the 50,000 logits through Softmax to get percentages that sum to 100%. The token with the highest logit will have the highest probability, but others still have a chance.

> Logits are the model's raw scores before softmax. The bigram counted, the neural model multiplies — but the concept is the same.`,
    },
  },
  visual: {
    id: 'unembedding-diagram',
    copy: {
      "pt-br": {
        "vectorLabel": "Hidden State",
        "vocabLabel": "Vocabulário (50.000 tokens)",
        "logitsLabel": "Logits (Pontuações brutas)"
      },
      "en-us": {
        "vectorLabel": "Hidden State",
        "vocabLabel": "Vocabulary (50,000 tokens)",
        "logitsLabel": "Logits (Raw scores)"
      }
    },
  },
});
