import { defineSlide } from './_factory';

export const bpeByHand = defineSlide({
  id: 'bpe-by-hand',
  type: 'two-column',
  options: { columnRatios: [0.55, 0.45] },
  content: {
    'pt-br': {
      title: 'BPE na mão, passo a passo',
      body: `Antes de deixar o computador fazer, vamos fazer BPE **manualmente** para fixar a intuição.

### O algoritmo em 3 passos

1. **Contar pares adjacentes:** para cada palavra, listamos todos os pares de símbolos consecutivos e contamos quantas vezes cada par aparece.

2. **Fundir o par mais frequente:** o par com maior contagem vira um único símbolo em todo o corpus.

3. **Repetir:** com o corpus atualizado, voltamos ao passo 1 até ter vocabulário suficiente.

---

### Exemplo com corpus pequeno

Corpus: **"low low lower newer newer newest"**

| Iteração | Par mais frequente | Merge resultado |
| --- | --- | --- |
| 1 | (w, e)×2 / (e, r)×2 | escolha determinística |
| 2 | novos pares emergem | subwords crescem |
| ... | ... | vocabulário evolui |

> O visual ao lado permite fazer cada merge interativamente e ver o corpus mudar em tempo real.`,
    },
    'en-us': {
      title: 'BPE by hand, step by step',
      body: `Before letting the computer do it, let's run BPE **manually** to build intuition.

### The algorithm in 3 steps

1. **Count adjacent pairs:** for each word, list all consecutive symbol pairs and count how many times each pair appears.

2. **Merge the most frequent pair:** the pair with the highest count becomes a single symbol across the whole corpus.

3. **Repeat:** with the updated corpus, go back to step 1 until the vocabulary is large enough.

---

### Example with a small corpus

Corpus: **"low low lower newer newer newest"**

| Iteration | Most frequent pair | Merge result |
| --- | --- | --- |
| 1 | (w, e)×2 / (e, r)×2 | deterministic choice |
| 2 | new pairs emerge | subwords grow |
| ... | ... | vocabulary evolves |

> The visual on the right lets you run each merge interactively and watch the corpus change in real time.`,
    },
  },
  visual: {
    id: 'bpe-step-by-step',
    copy: {
      'pt-br': {
        title: 'BPE Interativo',
        corpusLabel: 'Corpus atual',
        pairsLabel: 'Pares contados',
        pairCol: 'Par',
        countCol: 'Freq',
        rulesLabel: 'Regras aprendidas',
        mergeButton: 'Aplicar merge',
        nextMergeLabel: 'Próximo merge',
        resetButton: 'Recomeçar',
        doneLabel: 'Sem mais pares para fundir!',
        vocabSizeLabel: 'Tamanho do vocabulário',
        iterLabel: 'Iteração',
      },
      'en-us': {
        title: 'Interactive BPE',
        corpusLabel: 'Current corpus',
        pairsLabel: 'Counted pairs',
        pairCol: 'Pair',
        countCol: 'Freq',
        rulesLabel: 'Learned rules',
        mergeButton: 'Apply merge',
        nextMergeLabel: 'Next merge',
        resetButton: 'Reset',
        doneLabel: 'No more pairs to merge!',
        vocabSizeLabel: 'Vocabulary size',
        iterLabel: 'Iteration',
      },
    },
  },
});
