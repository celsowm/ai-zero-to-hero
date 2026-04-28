import { defineSlide } from './_factory';

export const bpeAlgorithm = defineSlide({
  id: 'bpe-algorithm',
  type: 'two-column',
  options: {
    "columnRatios": [
      0.55,
      0.45
    ]
  },
  content: {
    'pt-br': {
      title: `Byte Pair Encoding: o algoritmo`,
      body: `BPE começa com um corpus de texto e um vocabulário de **caracteres individuais**. Depois, repete um processo simples até ter o número de merges desejado.

### O algoritmo em 3 passos

1. **Contar pares adjacentes:** no corpus "low low lower newer", os pares são (l,o), (o,w), (w,_), etc. O par mais frequente vence.

2. **Merge:** o par mais frequente é fundido em um novo símbolo. Se (e,r) é o mais comum, "n e w e r" → "n e w er".

3. **Repetir:** volta ao passo 1 com o corpus atualizado. O próximo par mais frequente é fundido.

> Cada merge cria um token novo no vocabulário. O processo para quando atingimos o tamanho desejado.

---

### Exemplo real do GPT-2
O GPT-2 foi treinado com ~40.000 merges. Cada merge expandiu o vocabulário em 1 símbolo.

Use a tabela ao lado para ver os pares e clicar no próximo merge.`,
    },
    'en-us': {
      title: `Byte Pair Encoding: the algorithm`,
      body: `BPE starts with a text corpus and a vocabulary of **individual characters**. Then, it repeats a simple process until it reaches the desired number of merges.

### The algorithm in 3 steps

1. **Count adjacent pairs:** in the corpus "low low lower newer", pairs are (l,o), (o,w), (w,_), etc. The most frequent pair wins.

2. **Merge:** the most frequent pair is fused into a new symbol. If (e,r) is most common, "n e w e r" → "n e w er".

3. **Repeat:** go back to step 1 with the updated corpus. The next most frequent pair gets merged.

> Each merge creates a new token in the vocabulary. The process stops when we reach the desired size.

---

### Real GPT-2 example
GPT-2 was trained with ~40,000 merges. Each merge expanded the vocabulary by 1 symbol.

Use the table to see pairs and click the next merge.`,
    },
  },
  visual: {
    id: 'bpe-frequency-table',
    copy: {
      "pt-br": {
        "title": "BPE: Frequência de Pares",
        "pairLabel": "Par",
        "freqLabel": "Frequência",
        "mergeLabel": "Fazer Merge",
        "nextMergeLabel": "Próximo Merge",
        "vocabularyLabel": "Vocabulário",
        "corpusLabel": "Corpus: low low lower newer newer newest"
      },
      "en-us": {
        "title": "BPE: Pair Frequency",
        "pairLabel": "Pair",
        "freqLabel": "Frequency",
        "mergeLabel": "Merge",
        "nextMergeLabel": "Next Merge",
        "vocabularyLabel": "Vocabulary",
        "corpusLabel": "Corpus: low low lower newer newer newest"
      }
    },
  },
});
