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

### SentencePiece (biblioteca de tokenização)

1. **Framework, não algoritmo:** SentencePiece é uma biblioteca que implementa **BPE** ou **Unigram LM**. Treina diretamente de texto bruto, sem exigir pré-tokenização por espaços.

2. **Unigram LM (modo padrão):** em vez de merges gananciosos, otimiza qual subconjunto de tokens maximiza a probabilidade do corpus.

3. **Codificação de espaços:** usa \`▁\` (U+2581) para representar espaços no texto original, permitindo trabalhar com idiomas sem delimitadores visíveis (chinês, japonês).

> BPE, WordPiece e SentencePiece são variações do mesmo princípio: encontrar o equilíbrio certo entre vocabulário e granularidade.

> **Nota:** os exemplos de tokenização na visualização ao lado são ilustrativos — a divisão real depende do vocabulário treinado.`,
    },
    'en-us': {
      title: `WordPiece & SentencePiece`,
      body: `BPE is not the only approach. Two popular variants deserve mention:

### WordPiece (BERT, Google models)

1. **Different training:** instead of maximizing pair frequency, it maximizes data *likelihood*. The chosen pair is the one that increases corpus probability the most.

2. **Main use:** BERT and masked language models. The tokenizer is optimized for coverage, not compression.

3. **Notation:** uses \`##\` to indicate continuation. E.g., "playing" → ["play", "##ing"].

### SentencePiece (tokenization library)

1. **Framework, not an algorithm:** SentencePiece is a library that implements **BPE** or **Unigram LM**. It trains directly on raw text without requiring pre-tokenization by spaces.

2. **Unigram LM (default mode):** instead of greedy merges, it optimizes which token subset maximizes corpus probability.

3. **Space encoding:** uses \`▁\` (U+2581) to represent spaces in the original text, enabling support for languages without visible delimiters (Chinese, Japanese).

> BPE, WordPiece and SentencePiece are variations on the same principle: find the right balance between vocabulary and granularity.

> **Note:** the tokenization examples in the visualization to the right are illustrative — the actual split depends on the trained vocabulary.`,
    },
  },
  visual: {
    id: 'token-level-comparison',
    copy: {
      "pt-br": {
        "wordLevel": "BPE",
        "charLevel": "WordPiece",
        "subwordLevel": "SentencePiece",
        "tokenCountLabel": "partes",
        "exampleText": "unbelievably",
        "subwordExample": ["un", "believ", "ably"],
        "prosLabel": "Características",
        "consLabel": "Limitações",
        "wordPros": [
          "Merge por frequência",
          "Simples e eficiente"
        ],
        "wordCons": [
          "Critério puramente frequencial",
          "Pode criar tokens estranhos"
        ],
        "charPros": [
          "Otimiza likelihood do corpus",
          "Longest-match-first na inferência"
        ],
        "charCons": [
          "Requer pré-tokenização",
          "Notação ## para continuação"
        ],
        "subwordPros": [
          "Framework flexível (BPE/Unigram)",
          "Não requer pré-tokenização"
        ],
        "subwordCons": [
          "Mais complexo",
          "Treinamento mais lento"
        ]
      },
      "en-us": {
        "wordLevel": "BPE",
        "charLevel": "WordPiece",
        "subwordLevel": "SentencePiece",
        "tokenCountLabel": "tokens",
        "exampleText": "unbelievably",
        "subwordExample": ["un", "believ", "ably"],
        "prosLabel": "Features",
        "consLabel": "Limitations",
        "wordPros": [
          "Frequency-based merge",
          "Simple and efficient"
        ],
        "wordCons": [
          "Purely frequency criterion",
          "May create weird tokens"
        ],
        "charPros": [
          "Optimizes corpus likelihood",
          "Longest-match-first at inference"
        ],
        "charCons": [
          "Requires pre-tokenization",
          "## notation for continuation"
        ],
        "subwordPros": [
          "Flexible framework (BPE/Unigram)",
          "No pre-tokenization required"
        ],
        "subwordCons": [
          "More complex",
          "Slower training"
        ]
      }
    },
  },
});
