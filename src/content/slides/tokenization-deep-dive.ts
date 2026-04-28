import { defineSlide } from './_factory';

export const tokenizationDeepDive = defineSlide({
  id: 'tokenization-deep-dive',
  type: 'two-column',
  options: {
    "columnRatios": [
      0.55,
      0.45
    ]
  },
  content: {
    'pt-br': {
      title: `O que é um token?`,
      body: `Um token **não é** uma palavra. É um pedaço de texto que o modelo aprendeu a representar como um número.

1. **Alguns tokens são palavras inteiras:** "the", "cat", "run" — palavras comuns viram tokens únicos.

2. **Alguns tokens são pedaços:** "running" → ["run", "ning"]. O modelo aprendeu que "run" e "ning" aparecem frequentemente juntos.

3. **Alguns tokens são especiais:** espaços, pontuação, até caracteres Unicode raros.

> O modelo nunca "vê" texto. Ele só vê IDs como [4612, 287, 1045, ...].

---

### Exemplo prático
A frase "I love running" pode virar:
- Word-level: ["I", "love", "running"] → 3 tokens
- Subword: ["I", "lov", "ing"] → 3 tokens (mas "lov" não é palavra!)
- Caractere: ["I", " ", "l", "o", "v", "e", ...] → 14+ tokens

Use o slider ao lado para ver como a granularidade muda tudo.`,
    },
    'en-us': {
      title: `What is a token?`,
      body: `A token is **not** a word. It's a piece of text that the model learned to represent as a number.

1. **Some tokens are whole words:** "the", "cat", "run" — common words become single tokens.

2. **Some tokens are pieces:** "running" → ["run", "ning"]. The model learned that "run" and "ning" appear frequently together.

3. **Some tokens are special:** spaces, punctuation, even rare Unicode characters.

> The model never "sees" text. It only sees IDs like [4612, 287, 1045, ...].

---

### Practical example
The phrase "I love running" can become:
- Word-level: ["I", "love", "running"] → 3 tokens
- Subword: ["I", "lov", "ing"] → 3 tokens (but "lov" is not a word!)
- Character: ["I", " ", "l", "o", "v", "e", ...] → 14+ tokens

Use the slider to see how granularity changes everything.`,
    },
  },
  visual: {
    id: 'token-granularity-slider',
    copy: {
      "pt-br": {
        "sliderLabel": "Granularidade",
        "charLevel": "Caractere",
        "wordLevel": "Palavra",
        "subwordLevel": "Subword (BPE)",
        "exampleSentence": "I love running and playing",
        "tokenCount": "tokens"
      },
      "en-us": {
        "sliderLabel": "Granularity",
        "charLevel": "Character",
        "wordLevel": "Word",
        "subwordLevel": "Subword (BPE)",
        "exampleSentence": "I love running and playing",
        "tokenCount": "tokens"
      }
    },
  },
});
