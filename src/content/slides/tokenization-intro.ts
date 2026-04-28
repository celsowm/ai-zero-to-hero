import { defineSlide } from './_factory';

export const tokenizationIntro = defineSlide({
  id: 'tokenization-intro',
  type: 'two-column',
  options: {
    "columnRatios": [
      0.6,
      0.4
    ]
  },
  content: {
    'pt-br': {
      title: `A leitura das máquinas: Tokens`,
      body: `Nós lemos letras e palavras. Computadores leem números. Como transformamos texto em algo que a IA entenda? Através da **tokenização**.

1. **Letras são muito pequenas:** prever texto letra por letra seria muito lento e o modelo perderia o sentido da frase.

2. **Palavras são muito grandes:** existem milhões de palavras e conjugações. O dicionário do modelo ficaria gigante e ineficiente.

3. **A solução ideal (Subwords):** os modelos quebram o texto em pedaços (tokens) que podem ser palavras inteiras, sílabas ou até letras sozinhas. A palavra 'inconstitucional' pode virar três tokens: 'in', 'constitucion', 'al'.

> Tokens são o verdadeiro alfabeto dos grandes modelos de linguagem.`,
    },
    'en-us': {
      title: `How machines read: Tokens`,
      body: `We read letters and words. Computers read numbers. How do we turn text into something AI understands? Through **tokenization**.

1. **Letters are too small:** predicting text letter by letter would be too slow and the model would lose the meaning of the sentence.

2. **Words are too big:** there are millions of words and conjugations. The model's dictionary would be gigantic and inefficient.

3. **The ideal solution (Subwords):** models break text into chunks (tokens) that can be whole words, syllables, or even single letters. The word 'unbelievable' might become three tokens: 'un', 'believ', 'able'.

> Tokens are the true alphabet of large language models.`,
    },
  },
  visual: {
    id: 'token-size-comparison',
    copy: {
      "pt-br": {
        "chars": "Caracteres",
        "words": "Palavras",
        "tokens": "Tokens"
      },
      "en-us": {
        "chars": "Characters",
        "words": "Words",
        "tokens": "Tokens"
      }
    },
  },
});
