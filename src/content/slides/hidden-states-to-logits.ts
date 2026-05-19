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
      body: `No modelo que vimos ate aqui, os "numeros brutos" saem de projecoes lineares. Em vez de contar frequencias, a rede gera pontuacoes por **multiplicacao de matrizes**.

1. **Hidden State (o "estado interno"):** depois do embedding e das transformacoes internas, o modelo produz um vetor denso por posicao. Esse vetor carrega contexto, mas ainda e so uma lista de numeros.

2. **A última multiplicação (Unembedding):** pegamos esse vetor e multiplicamos por uma matriz gigante com uma coluna por token do vocabulário (ex: 50.000). O resultado? Uma lista de 50.000 números — um por token possível.

3. **Logits:** é esse o nome técnico. Cada um desses 50.000 números é um **Logit** — a pontuação bruta que o modelo dá para aquele token ser o próximo. Quanto maior o logit, mais "candidato" aquele token é.

4. **Softmax transforma logits em probabilidades:** passamos os logits pelo Softmax para obter porcentagens que somam 100%. O token com maior logit tera maior probabilidade, mas outros ainda tem chance.

> Logits sao as pontuacoes brutas do modelo antes do softmax. O mecanismo mudou, mas a pergunta e a mesma: qual token vem a seguir?`,
    },
    'en-us': {
      title: `Raw numbers → Probabilities: what are Logits?`,
      body: `In the model flow we have seen so far, "raw numbers" come from linear projections. Instead of frequency counting, the network produces scores through **matrix multiplication**.

1. **Hidden State (the "internal state"):** after embeddings and internal transformations, the model produces one dense vector per position. It carries context, but it is still just numbers.

2. **The final multiplication (Unembedding):** we take this vector and multiply it by a giant matrix with one column per vocabulary token (e.g., 50,000). The result? A list of 50,000 numbers — one per possible token.

3. **Logits:** that's the technical name. Each of these 50,000 numbers is a **Logit** — the raw score the model gives to that token for being the next one. The higher the logit, the more of a "candidate" that token is.

4. **Softmax turns logits into probabilities:** we pass logits through Softmax to get percentages that sum to 100%. The highest logit gets the highest probability, but other tokens still keep some chance.

> Logits are the model's raw scores before softmax. The mechanism changed, but the question is the same: what token comes next?`,
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
