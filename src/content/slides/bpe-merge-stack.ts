import { defineSlide } from './_factory';

export const bpeMergeStack = defineSlide({
  id: 'bpe-merge-stack',
  type: 'two-column',
  options: {
    "columnRatios": [0.55, 0.45]
  },
  content: {
    'pt-br': {
      title: `O Algoritmo de Merge`,
      body: `BPE não "adivinha" subpalavras — ele **aplica regras determinísticas** sobre os caracteres. Cada regra diz: "sempre que você ver X seguido de Y, funda-os em XY".

### A mecânica exata

1. **Comece com caracteres individuais:** cada letra é uma peça separada.

2. **Varra da esquerda para a direita:** encontre todas as ocorrências do par mais frequente e funda-as.

3. **Repita com o próximo par:** agora com peças maiores, novos pares emergem.

> Cada merge cria **novas adjacências** — "b"+"le" vira "ble", que agora pode ser fundido com outro merge.

---

### Exemplo real: "unbelievable"

Começa como 12 caracteres. O merge **(l,e)** funde os dois "le". Depois **(b,le)** funde "ble". Clique "Próximo Merge" para ver a cadeia de fusões.`,
    },
    'en-us': {
      title: `The Merge Algorithm`,
      body: `BPE doesn't "guess" subwords — it **applies deterministic rules** over characters. Each rule says: "whenever you see X followed by Y, fuse them into XY".

### The exact mechanics

1. **Start with individual characters:** each letter is a separate piece.

2. **Scan left-to-right:** find all occurrences of the most frequent pair and fuse them.

3. **Repeat with next pair:** now with larger pieces, new pairs emerge.

> Each merge creates **new adjacencies** — "b"+"le" becomes "ble", which can now be fused by another merge.

---

### Real example: "unbelievable"

Starts as 12 characters. Merge **(l,e)** fuses both "le". Then **(b,le)** fuses "ble". Click "Next Merge" to see the fusion chain.`,
    },
  },
  visual: {
    id: 'bpe-merge-stack',
    copy: {
      "pt-br": {
        "title": "Merge Stack: Redução de Token",
        "originalToken": "unbelievable",
        "stackLabel": "Regras de Merge (por prioridade)",
        "resultLabel": "Resultado",
        "nextMergeLabel": "Próximo Merge",
        "resetLabel": "Reset",
        "completedLabel": "Tokenização completa!",
        "mergeRules": [
          "(l, e)",
          "(b, le)",
          "(ble, iev)",
          "(n, believable)"
        ]
      },
      "en-us": {
        "title": "Merge Stack: Token Reduction",
        "originalToken": "unbelievable",
        "stackLabel": "Merge Rules (by priority)",
        "resultLabel": "Result",
        "nextMergeLabel": "Next Merge",
        "resetLabel": "Reset",
        "completedLabel": "Tokenization complete!",
        "mergeRules": [
          "(l, e)",
          "(b, le)",
          "(ble, iev)",
          "(n, believable)"
        ]
      }
    },
  },
});
