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
      body: `**Intuição:** embedding cria representação; **unembedding** transforma representação em decisão sobre vocabulário.

1. **Hidden State (estado interno):** depois de embedding e transformações internas, o modelo produz um vetor denso por posição. Esse vetor já carrega contexto, mas ainda não escolhe palavra.

2. **Unembedding (projeção para vocabulário):** multiplicamos esse vetor por uma matriz com uma coluna por token do vocabulário (ex: 50.000). O resultado é uma lista de 50.000 scores.

3. **Logits:** cada score dessa lista é um logit, isto é, uma pontuação bruta de próximo token.

4. **Softmax:** converte logits em probabilidades que somam 1. O maior logit tende a maior probabilidade, mas outros tokens permanecem possíveis.

> Logits são as pontuações brutas do modelo antes do softmax. O mecanismo mudou, mas a pergunta é a mesma: qual token vem a seguir?`,
    },
    'en-us': {
      title: `Raw numbers → Probabilities: what are Logits?`,
      body: `**Intuition:** embedding builds representation; **unembedding** turns representation into a vocabulary decision.

1. **Hidden State (internal state):** after embeddings and internal transformations, the model outputs one dense vector per position. It carries context, but no word is selected yet.

2. **Unembedding (vocabulary projection):** we multiply that vector by a matrix with one column per vocabulary token (for example 50,000). The result is a list of 50,000 scores.

3. **Logits:** each score in that list is a logit, i.e., a raw next-token score.

4. **Softmax:** converts logits into probabilities that sum to 1. The highest logit usually gets the highest probability, while other tokens remain possible.

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
