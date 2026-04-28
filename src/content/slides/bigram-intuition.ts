import { defineSlide } from './_factory';

export const bigramIntuition = defineSlide({
  id: 'bigram-intuition',
  type: 'two-column',
  options: {
    "columnRatios": [
      0.6,
      0.4
    ]
  },
  content: {
    'pt-br': {
      title: `O modelo mais simples: Bigrama`,
      body: `Como começamos a prever tokens? Vamos construir o modelo mais simples possível: o modelo Bigrama.

1. **Memória de um peixinho dourado:** no modelo bigrama, a previsão do próximo token depende ÚNICA e EXCLUSIVAMENTE do token atual.

2. **Contando pares:** o modelo simplesmente lê um texto enorme e conta quantas vezes o token B apareceu imediatamente após o token A.

3. **Exemplo prático:** se ele viu 'We the' 100 vezes, 'We went' 50 vezes e 'We are' 10 vezes, ele sabe que depois de 'We', 'the' é a aposta mais segura.

> A forma mais simples de prever o futuro é olhar apenas para o passado imediato.`,
    },
    'en-us': {
      title: `The simplest model: Bigram`,
      body: `How do we start predicting tokens? Let's build the simplest possible model: the Bigram model.

1. **Goldfish memory:** in the bigram model, the prediction of the next token depends SOLELY on the current token.

2. **Counting pairs:** the model simply reads a massive text and counts how many times token B appeared immediately after token A.

3. **Practical example:** if it saw 'We the' 100 times, 'We went' 50 times, and 'We are' 10 times, it knows that after 'We', 'the' is the safest bet.

> The simplest way to predict the future is to look only at the immediate past.`,
    },
  },
  visual: {
    id: 'bigram-counter',
    copy: {
      "pt-br": {
        "text": "We the people. We the nation. We the world.",
        "currentToken": "We",
        "countsTitle": "Contagem após 'We':"
      },
      "en-us": {
        "text": "We the people. We the nation. We the world.",
        "currentToken": "We",
        "countsTitle": "Counts after 'We':"
      }
    },
  },
});
