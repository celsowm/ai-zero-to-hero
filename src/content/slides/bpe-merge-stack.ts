import { defineSlide } from './_factory';

export const bpeMergeStack = defineSlide({
  id: 'bpe-merge-stack',
  type: 'two-column',
  options: {
    "columnRatios": [
      0.55,
      0.45
    ]
  },
  content: {
    'pt-br': {
      title: `Algoritmo de Merge Stack`,
      body: `O algoritmo de pilha reduz o token **exactamente como a aplicação repetida das fusões, da maior para a menor prioridade**. É a mesma semântica da BPE canônica e produz os mesmos pieces.

### Como funciona

1. **Lista de merges ordenada:** os merges são aplicados do mais antigo (maior prioridade) para o mais recente.

2. **Scan left-to-right:** para cada posição no token, verifica se o par atual corresponde ao merge ativo.

3. **Fusão imediata:** quando há match, os dois símbolos são fundidos e o scan continua.

> O resultado é determinístico: mesmo input + mesmas regras = mesmo output.

---

### Exemplo passo a passo
Token: "unbelievable"
Regras (prioridade): 1. (un,) 2. (bel,iev) 3. (able,)

Clique "Próximo Merge" ao lado para ver cada fusão acontecer.`,
    },
    'en-us': {
      title: `Merge Stack Algorithm`,
      body: `The stack algorithm reduces a token **exactly as the repeated application of merges, from highest to lowest priority**. It's the same semantics as canonical BPE and produces the same pieces.

### How it works

1. **Ordered merge list:** merges are applied from oldest (highest priority) to newest.

2. **Left-to-right scan:** for each position in the token, check if the current pair matches the active merge.

3. **Immediate fusion:** when there's a match, the two symbols are fused and the scan continues.

> The result is deterministic: same input + same rules = same output.

---

### Step-by-step example
Token: "unbelievable"
Rules (priority): 1. (un,) 2. (bel,iev) 3. (able,)

Click "Next Merge" to see each fusion happen.`,
    },
  },
  visual: {
    id: 'bpe-merge-stack',
    copy: {
      "pt-br": {
        "title": "Merge Stack: Redução de Token",
        "originalToken": "Token Original",
        "stackLabel": "Pilha de Merges",
        "priorityLabel": "Prioridade",
        "resultLabel": "Resultado",
        "nextMergeLabel": "Próximo Merge",
        "resetLabel": "Reset",
        "completedLabel": "Completo!",
        "mergeRules": [
          "(un, )",
          "(bel, iev)",
          "(able, )"
        ]
      },
      "en-us": {
        "title": "Merge Stack: Token Reduction",
        "originalToken": "Original Token",
        "stackLabel": "Merge Stack",
        "priorityLabel": "Priority",
        "resultLabel": "Result",
        "nextMergeLabel": "Next Merge",
        "resetLabel": "Reset",
        "completedLabel": "Complete!",
        "mergeRules": [
          "(un, )",
          "(bel, iev)",
          "(able, )"
        ]
      }
    },
  },
});
