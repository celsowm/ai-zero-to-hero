import { defineSlide } from './_factory';

export const bpeFromScratch = defineSlide({
  id: 'bpe-from-scratch',
  type: 'two-column',
  options: {
    "columnRatios": [
      0.8,
      1.2
    ]
  },
  content: {
    'pt-br': {
      title: `BPE na mão: implementação completa`,
      body: `Aqui o objetivo nao e "rodar BPE por rodar". E entender **por que o tokenizer para de quebrar tudo em letras soltas**.

Quando o BPE encontra pares frequentes e funde esses pares:
1. reduz fragmentacao de palavras muito comuns;
2. reaproveita subpartes recorrentes em varios contextos;
3. cria um vocabulario mais util para o modelo aprender padroes.

Neste exemplo, usamos um corpus curto (\`once upon a time...\`) e exibimos:
1. estado inicial do corpus;
2. par escolhido em cada merge + frequencia;
3. novo simbolo criado;
4. amostra da evolucao do corpus;
5. resumo final de merges e vocabulario.

Conexao com tokenizacao real: e exatamente essa logica iterativa (contar -> fundir -> repetir) que torna os tokens mais informativos que caracteres puros.
`,
      rightBody: `
\`\`\`python
snippet:bpe/bpe-implementation
\`\`\``,
      codeExplanations: [
        { lineRange: [5, 11], content: 'Sensor do BPE: conta pares adjacentes no estado atual do corpus para decidir qual fusao gera mais ganho agora.' },
        { lineRange: [15, 28], content: 'Executor da fusao: substitui o par escolhido por um simbolo unico em todas as palavras, preservando a ordem dos demais simbolos.' },
        { lineRange: [32, 40], content: 'Camada de leitura didatica: reconstrui vocabulario por frequencia e formata corpus para imprimir a evolucao de forma humana.' },
        { lineRange: [44, 45], content: 'Corpus mais narrativo (`once upon a time...`) para facilitar leitura de merges e conexao com texto real.' },
        { lineRange: [49, 71], content: 'Loop principal: escolhe par mais frequente, funde, registra historico e imprime trilha por iteracao (par, frequencia, novo simbolo, amostra).' },
        { lineRange: [75, 82], content: 'Resumo final didatico: lista cronologica dos merges e top do vocabulario final para ver quais unidades sobreviveram.' },
      ],
    },
    'en-us': {
      title: `BPE from scratch: full implementation`,
      body: `The goal here is not just "running BPE". It is to see **why tokenization stops being pure character fragmentation**.

When BPE repeatedly merges frequent pairs, it:
1. reduces over-fragmentation of common words;
2. reuses recurring subparts across contexts;
3. builds a vocabulary that is more useful for model learning.

In this short corpus (\`once upon a time...\`) we print:
1. initial corpus state;
2. chosen pair per merge + frequency;
3. newly created symbol;
4. partial corpus evolution;
5. final merge history and final vocabulary summary.

Connection to real tokenizer training: this iterative loop (count -> merge -> repeat) is exactly what makes tokens more informative than isolated characters.
`,
      rightBody: `
\`\`\`python
snippet:bpe/bpe-implementation
\`\`\``,
      codeExplanations: [
        { lineRange: [5, 11], content: 'BPE sensor: counts adjacent pairs in the current corpus state to decide which merge yields the biggest immediate gain.' },
        { lineRange: [15, 28], content: 'Merge executor: replaces the chosen pair by a single symbol across all words while preserving the remaining order.' },
        { lineRange: [32, 40], content: 'Didactic visibility layer: rebuilds vocabulary and formats corpus strings so each iteration is easy to inspect.' },
        { lineRange: [44, 45], content: 'Narrative corpus (`once upon a time...`) improves readability of merges versus synthetic toy words.' },
        { lineRange: [49, 71], content: 'Main loop: choose most frequent pair, merge it, store history, and print per-step trail (pair, frequency, symbol, corpus sample).' },
        { lineRange: [75, 82], content: 'Final teaching output: chronological merge summary plus top final vocabulary entries.' },
      ],
    },
  },
});
