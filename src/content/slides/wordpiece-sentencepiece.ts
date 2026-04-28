import { defineSlide } from './_factory';

export const wordpieceSentencepiece = defineSlide({
  id: 'wordpiece-sentencepiece',
  type: 'two-column',
  options: {
    "columnRatios": [
      0.55,
      0.45
    ]
  },
  content: {
    'pt-br': {
      title: `WordPiece & SentencePiece`,
      body: `BPE não é a única abordagem. Duas variantes populares merecem menção:

### WordPiece (BERT, modelos Google)

1. **Treinamento diferente:** em vez de maximizar frequência de pares, maximiza o *likelihood* do dado. O par escolhido é aquele que mais aumenta a probabilidade do corpus.

2. **Uso principal:** BERT e modelos de linguagem masked. O tokenizador é otimizado para cobertura, não para compressão.

3. **Notação:** usa \`##\` para indicar continuação. Ex: "playing" → ["play", "##ing"].

### SentencePiece (T5, modelos multilíngues)

1. **Trata texto como sequência de caracteres:** não requer tokenização prévia por espaços. Funciona com idiomas sem separadores (chinês, japonês).

2. **Unigram Language Model:** em vez de merges gananciosos, otimiza qual subconjunto de tokens maximiza a probabilidade do corpus.

3. **Especial tokens:** usa \`_\` para prefixo de início de palavra.

> BPE, WordPiece e SentencePiece são variações do mesmo princípio: encontrar o equilíbrio certo entre vocabulário e granularidade.`,
    },
    'en-us': {
      title: `WordPiece & SentencePiece`,
      body: `BPE is not the only approach. Two popular variants deserve mention:

### WordPiece (BERT, Google models)

1. **Different training:** instead of maximizing pair frequency, it maximizes data *likelihood*. The chosen pair is the one that increases corpus probability the most.

2. **Main use:** BERT and masked language models. The tokenizer is optimized for coverage, not compression.

3. **Notation:** uses \`##\` to indicate continuation. E.g., "playing" → ["play", "##ing"].

### SentencePiece (T5, multilingual models)

1. **Treats text as character sequence:** does not require pre-tokenization by spaces. Works with languages without separators (Chinese, Japanese).

2. **Unigram Language Model:** instead of greedy merges, it optimizes which token subset maximizes corpus probability.

3. **Special tokens:** uses \`_\` for word-start prefix.

> BPE, WordPiece and SentencePiece are variations on the same principle: find the right balance between vocabulary and granularity.`,
    },
  },
  visual: {
    id: 'token-level-comparison',
    copy: {
      "pt-br": {
        "wordLevel": "BPE (GPT-2)",
        "charLevel": "WordPiece (BERT)",
        "subwordLevel": "SentencePiece (T5)",
        "exampleText": "unbelievably",
        "prosLabel": "Características",
        "consLabel": "Limitações",
        "wordPros": [
          "Merge ganancioso",
          "Simples de implementar"
        ],
        "wordCons": [
          "Não otimiza probabilidade",
          "Pode criar tokens estranhos"
        ],
        "charPros": [
          "Otimiza likelihood",
          "Usado em BERT"
        ],
        "charCons": [
          "Requer tokenização prévia",
          "Notação ##"
        ],
        "subwordPros": [
          "Funciona sem espaços",
          "Multilíngue nativo"
        ],
        "subwordCons": [
          "Mais complexo",
          "Treinamento mais lento"
        ]
      },
      "en-us": {
        "wordLevel": "BPE (GPT-2)",
        "charLevel": "WordPiece (BERT)",
        "subwordLevel": "SentencePiece (T5)",
        "exampleText": "unbelievably",
        "prosLabel": "Features",
        "consLabel": "Limitations",
        "wordPros": [
          "Greedy merge",
          "Simple to implement"
        ],
        "wordCons": [
          "Does not optimize probability",
          "May create weird tokens"
        ],
        "charPros": [
          "Optimizes likelihood",
          "Used in BERT"
        ],
        "charCons": [
          "Requires pre-tokenization",
          "## notation"
        ],
        "subwordPros": [
          "Works without spaces",
          "Native multilingual"
        ],
        "subwordCons": [
          "More complex",
          "Slower training"
        ]
      }
    },
  },
});
