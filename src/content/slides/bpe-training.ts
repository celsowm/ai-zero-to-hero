import { defineSlide } from './_factory';

export const bpeTraining = defineSlide({
  id: 'bpe-training',
  type: 'two-column',
  options: {
    "columnRatios": [
      0.55,
      0.45
    ]
  },
  content: {
    'pt-br': {
      title: `Treinando um tokenizador`,
      body: `Treinar um tokenizador BPE é escolher **quantos merges** fazer. Mais merges = vocabulário maior = tokens mais longos em média.

### O trade-off fundamental

1. **Poucos merges:** vocabulário pequeno, coberto por caracteres e pedaços curtos. Sequências ficam longas — o modelo processa mais tokens.

2. **Muitos merges:** vocabulário grande, muitas palavras inteiras. Sequências ficam curtas, mas o modelo precisa de mais memória para embeddings.

3. **Ponto ideal:** geralmente entre 30k-50k merges para modelos de linguagem modernos.

> O GPT-2 usa 50.257 tokens após ~50k merges no corpus de treino.

---

### Métricas importantes
- **Coverage:** % do texto coberto por tokens do vocabulário
- **OOV rate:** % de palavras desconhecidas (Out-Of-Vocabulary)
- **Tokens por palavra:** média de tokens necessários por palavra

O gráfico ao lado mostra como coverage e OOV mudam com o número de merges.`,
    },
    'en-us': {
      title: `Training a tokenizer`,
      body: `Training a BPE tokenizer is choosing **how many merges** to make. More merges = larger vocabulary = longer tokens on average.

### The fundamental trade-off

1. **Few merges:** small vocabulary, covered by characters and short pieces. Sequences become long — the model processes more tokens.

2. **Many merges:** large vocabulary, many whole words. Sequences become shorter, but the model needs more memory for embeddings.

3. **Sweet spot:** usually between 30k-50k merges for modern language models.

> GPT-2 uses 50,257 tokens after ~50k merges on the training corpus.

---

### Key metrics
- **Coverage:** % of text covered by vocabulary tokens
- **OOV rate:** % of unknown words (Out-Of-Vocabulary)
- **Tokens per word:** average tokens needed per word

The chart shows how coverage and OOV change with merge count.`,
    },
  },
  visual: {
    id: 'bpe-training-curve',
    copy: {
      "pt-br": {
        "title": "Training Curve: Vocab Size vs Coverage",
        "vocabAxis": "Tamanho do Vocabulário",
        "coverageAxis": "Coverage (%)",
        "oovLabel": "OOV Rate",
        "mergesLabel": "Número de Merges",
        "smallVocab": "Vocab pequeno",
        "largeVocab": "Vocab grande",
        "optimalLabel": "Zona ideal",
        "tradeoffDesc": "Mais merges → melhor coverage, mas mais memória"
      },
      "en-us": {
        "title": "Training Curve: Vocab Size vs Coverage",
        "vocabAxis": "Vocabulary Size",
        "coverageAxis": "Coverage (%)",
        "oovLabel": "OOV Rate",
        "mergesLabel": "Number of Merges",
        "smallVocab": "Small vocab",
        "largeVocab": "Large vocab",
        "optimalLabel": "Sweet spot",
        "tradeoffDesc": "More merges → better coverage, but more memory"
      }
    },
  },
});
