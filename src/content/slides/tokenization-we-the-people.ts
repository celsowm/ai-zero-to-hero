import { defineSlide } from './_factory';

export const tokenizationWeThePeople = defineSlide({
  id: 'tokenization-we-the-people',
  type: 'two-column',
  options: {
    "columnRatios": [
      0.6,
      0.4
    ]
  },
  content: {
    'pt-br': {
      title: `Tokens na prática`,
      body: `Vamos ver isso acontecendo. Cada pedaço de texto (token) mapeia exatamente para um número inteiro (Token ID) no 'dicionário' do modelo (o vocabulário).

1. **O texto original:** usamos um texto para o modelo processar.

2. **O fatiamento:** o texto é cortado usando as regras do vocabulário que o modelo aprendeu.

3. **A conversão numérica:** cada pedaço é trocado pelo seu ID. O modelo só enxerga essa lista de números!

Espaços, pontuações e quebras de linha também fazem parte dos tokens. O espaço antes de uma palavra frequentemente gruda nela formando um único token.

> Texto entra, um array de números inteiros sai.`,
    },
    'en-us': {
      title: `Tokens in practice`,
      body: `Let's see this in action. Each piece of text (token) maps exactly to an integer (Token ID) in the model's 'dictionary' (the vocabulary).

1. **Original text:** we provide text for the model to process.

2. **Slicing:** the text is cut using the vocabulary rules the model learned.

3. **Numeric conversion:** each piece is swapped for its ID. The model only sees this list of numbers!

Spaces, punctuation, and line breaks are also part of tokens. The space before a word often sticks to it, forming a single token.

> Text goes in, an array of integers comes out.`,
    },
  },
  visual: {
    id: 'tokenization-visualizer',
    copy: {
      "pt-br": {
        "inputText": "We the people",
        "tokenLabel": "Tokens",
        "idLabel": "Token IDs"
      },
      "en-us": {
        "inputText": "We the people",
        "tokenLabel": "Tokens",
        "idLabel": "Token IDs"
      }
    },
  },
});
