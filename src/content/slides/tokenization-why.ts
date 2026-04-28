import { defineSlide } from './_factory';

export const tokenizationWhy = defineSlide({
  id: 'tokenization-why',
  type: 'two-column',
  options: {
    "columnRatios": [
      0.55,
      0.45
    ]
  },
  content: {
    'pt-br': {
      title: `Por que tokenizar?`,
      body: `Computadores não entendem texto — entendem números. Mas como transformar palavras em números de forma inteligente?

1. **Nível palavra:** cada palavra vira um ID. Funciona bem para vocabulário pequeno, mas falha com palavras novas.

2. **Nível caractere:** cada letra vira um ID. Resolve o problema de palavras novas, mas a sequência fica muito longa e o modelo perde contexto.

3. **Nível subword (BPE):** o meio-termo inteligente. Palavras comuns ficam inteiras, palavras raras são quebradas em pedaços conhecidos.

> O tokenizador é a ponte entre linguagem humana e linguagem de máquina.

---

### O dilema
| Estratégia | Vocabulário | Sequência | Palavras novas |
| --- | --- | --- | --- |
| Palavra | Grande (~50k) | Curta | Falha |
| Caractere | Mínimo (256) | Muito longa | OK |
| Subword (BPE) | Médio (~30k) | Média | OK |

### Por que isso importa?
O GPT-2 usa vocabulário de ~50.000 tokens aprendido com BPE. O mesmo algoritmo que vamos reconstruir passo a passo.`,
    },
    'en-us': {
      title: `Why tokenize?`,
      body: `Computers don't understand text — they understand numbers. But how do we turn words into numbers intelligently?

1. **Word-level:** each word becomes an ID. Works well for small vocabularies but fails on unseen words.

2. **Character-level:** each letter becomes an ID. Solves the unseen-word problem, but sequences become very long and the model loses context.

3. **Subword-level (BPE):** the intelligent middle ground. Common words stay whole, rare words are split into known pieces.

> The tokenizer is the bridge between human language and machine language.

---

### The dilemma
| Strategy | Vocabulary | Sequence length | Unseen words |
| --- | --- | --- | --- |
| Word | Large (~50k) | Short | Fails |
| Character | Minimal (256) | Very long | OK |
| Subword (BPE) | Medium (~30k) | Medium | OK |

### Why does this matter?
GPT-2 uses a vocabulary of ~50,000 tokens learned with BPE. The same algorithm we're about to rebuild step by step.`,
    },
  },
  visual: {
    id: 'token-level-comparison',
    copy: {
      "pt-br": {
        "wordLevel": "Nível Palavra",
        "charLevel": "Nível Caractere",
        "subwordLevel": "Nível Subword (BPE)",
        "exampleText": "inconstitucionalissimamente",
        "prosLabel": "Vantagens",
        "consLabel": "Desvantagens",
        "wordPros": [
          "Sequência curta",
          "Cada token tem significado"
        ],
        "wordCons": [
          "Vocabulário gigante",
          "Falha em palavras novas"
        ],
        "charPros": [
          "Vocabulário mínimo",
          "Sem palavras desconhecidas"
        ],
        "charCons": [
          "Sequência muito longa",
          "Perde semântica"
        ],
        "subwordPros": [
          "Equilíbrio ideal",
          "Lida com palavras raras"
        ],
        "subwordCons": [
          "Requer treinamento",
          "Tokens sem significado claro"
        ]
      },
      "en-us": {
        "wordLevel": "Word-level",
        "charLevel": "Character-level",
        "subwordLevel": "Subword-level (BPE)",
        "exampleText": "unbelievably",
        "prosLabel": "Pros",
        "consLabel": "Cons",
        "wordPros": [
          "Short sequence",
          "Each token has meaning"
        ],
        "wordCons": [
          "Huge vocabulary",
          "Fails on unseen words"
        ],
        "charPros": [
          "Minimal vocabulary",
          "No unknown words"
        ],
        "charCons": [
          "Very long sequence",
          "Loses semantics"
        ],
        "subwordPros": [
          "Ideal balance",
          "Handles rare words"
        ],
        "subwordCons": [
          "Requires training",
          "Tokens unclear meaning"
        ]
      }
    },
  },
});
