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
      body: `BPE não é a única forma de criar subpalavras. Aqui vale separar **algoritmo** de **ferramenta**:

### WordPiece (BERT, modelos Google)

1. **Treino probabilístico:** assim como BPE, constrói um vocabulário de subpalavras. A diferença é o critério: WordPiece escolhe peças pelo ganho esperado de *likelihood* do corpus, não apenas pela frequência bruta do par.

2. **Inferência:** com o vocabulário pronto, segmenta cada palavra por **longest-match-first**: tenta usar o maior pedaço conhecido possível. Se não conseguir decompor, cai em \`[UNK]\`.

3. **Notação:** ficou conhecido pelo BERT. Usa \`##\` para marcar continuação dentro da palavra. Ex: "playing" → ["play", "##ing"].

### SentencePiece (biblioteca/framework)

1. **Não é um algoritmo único:** SentencePiece é uma biblioteca que implementa **BPE** e **Unigram LM**. Ela treina direto em texto bruto, sem exigir pré-tokenização por espaços.

2. **Unigram LM:** parte de um vocabulário grande e remove peças para manter o subconjunto que melhor explica o corpus. Diferente do BPE, não depende de uma sequência fixa de merges gananciosos.

3. **Espaços como símbolo:** representa espaços com \`▁\` (U+2581). Isso preserva informação de whitespace na detokenização e ajuda em textos multilíngues, inclusive línguas sem separadores visíveis entre palavras.

> O trio mais preciso é: **BPE** e **WordPiece** são algoritmos de subword; **SentencePiece** é um framework que pode usar BPE ou Unigram LM. Todos lidam com o mesmo trade-off: vocabulário finito vs. granularidade.

> **Nota:** os exemplos de tokenização na visualização são ilustrativos — a divisão real depende do vocabulário treinado.`,
    },
    'en-us': {
      title: `WordPiece & SentencePiece`,
      body: `BPE is not the only way to build subwords. It is useful to separate **algorithm** from **tooling**:

### WordPiece (BERT, Google models)

1. **Probabilistic training:** like BPE, WordPiece builds a subword vocabulary. The difference is the criterion: it selects pieces by expected corpus *likelihood* gain, not just raw pair frequency.

2. **Inference:** once the vocabulary is fixed, it segments each word with **longest-match-first**: it tries to use the longest known piece available. If the word cannot be decomposed, it falls back to \`[UNK]\`.

3. **Notation:** popularized by BERT. It uses \`##\` to mark continuation inside a word. Example: "playing" → ["play", "##ing"].

### SentencePiece (library/framework)

1. **Not a single algorithm:** SentencePiece is a library that implements **BPE** and **Unigram LM**. It trains directly on raw text without requiring whitespace pre-tokenization.

2. **Unigram LM:** starts from a large vocabulary and prunes pieces to keep the subset that best explains the corpus. Unlike BPE, it is not a fixed sequence of greedy merges.

3. **Spaces as symbols:** represents spaces with \`▁\` (U+2581). This preserves whitespace information for detokenization and helps with multilingual text, including languages without visible word separators.

> The precise trio is: **BPE** and **WordPiece** are subword algorithms; **SentencePiece** is a framework that can use BPE or Unigram LM. All address the same trade-off: finite vocabulary vs. granularity.

> **Note:** the tokenization examples in the visualization are illustrative — the actual split depends on the trained vocabulary.`,
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
          "Merges por frequência",
          "Simples e eficiente"
        ],
        "wordCons": [
          "Critério local/frequencial",
          "Pode ignorar morfologia"
        ],
        "charPros": [
          "Score probabilístico",
          "Longest-match-first"
        ],
        "charCons": [
          "Pode gerar [UNK]",
          "Notação ##"
        ],
        "subwordPros": [
          "Texto bruto, sem split por espaços",
          "BPE ou Unigram LM"
        ],
        "subwordCons": [
          "É framework, não algoritmo",
          "Normalização impacta o resultado"
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
          "Frequency-based merges",
          "Simple and efficient"
        ],
        "wordCons": [
          "Local/frequency criterion",
          "May ignore morphology"
        ],
        "charPros": [
          "Probabilistic score",
          "Longest-match-first"
        ],
        "charCons": [
          "May produce [UNK]",
          "## notation"
        ],
        "subwordPros": [
          "Raw text, no whitespace split",
          "BPE or Unigram LM"
        ],
        "subwordCons": [
          "Framework, not algorithm",
          "Normalization affects results"
        ]
      }
    },
  },
});
