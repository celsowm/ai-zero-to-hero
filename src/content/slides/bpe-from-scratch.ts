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
      body: `Aqui o objetivo não é "rodar BPE por rodar". É entender **por que o tokenizer para de quebrar tudo em letras soltas**.

Quando o BPE encontra pares frequentes e funde esses pares:
1. reduz fragmentação de palavras muito comuns;
2. reaproveita subpartes recorrentes em vários contextos;
3. cria um vocabulário mais útil para o modelo aprender padrões.

Loop principal do BPE neste exemplo:
1. conta todos os pares de símbolos adjacentes no corpus;
2. escolhe o par mais frequente;
3. junta esse par em um novo símbolo;
4. atualiza o corpus com esse novo token;
5. guarda o histórico da fusão.

Neste exemplo, usamos um corpus curto (\`once upon a time...\`) e exibimos:
1. estado inicial do corpus;
2. par escolhido em cada merge + frequência;
3. novo símbolo criado;
4. amostra da evolução do corpus;
5. resumo final de merges e vocabulário.

Conexão com tokenização real: é exatamente essa lógica iterativa (contar -> fundir -> repetir) que torna os tokens mais informativos que caracteres puros.
`,
      rightBody: `
\`\`\`python
snippet:bpe/bpe-implementation
\`\`\``,
      codeExplanations: [
        { lineRange: [5, 6], content: 'Função `get_stats`: recebe o corpus e inicializa um dicionário vazio. Cada chave será um par de símbolos adjacentes (tupla de dois elementos), cada valor será a contagem de ocorrências daquele par no corpus atual.' },
        { lineRange: [7, 11], content: 'Percorre cada palavra do corpus e, para cada posição, forma um par `(símbolo_atual, próximo_símbolo)`. Incrementa a contagem desse par no dicionário. Ao final, retorna `stats` com a frequência de todos os pares adjacentes — é o "sensor" do BPE que decide qual fusão vale a pena.' },
        { lineRange: [15, 16], content: 'Função `merge_pair`: recebe o par escolhido e o corpus. Cria uma lista vazia `merged` que vai acumular as palavras já fundidas. O `par` é o par `(esquerda, direita)` que venceu na etapa atual.' },
        { lineRange: [17, 28], content: 'Para cada palavra, percorre os símbolos com um `while`. Se encontrar o par alvo lado a lado, funde os dois em um único símbolo (concatenação) e avança 2 posições. Caso contrário, copia o símbolo atual e avança 1. No fim, cada palavra vira uma tupla de símbolos pós-merge.' },
        { lineRange: [32, 37], content: '`get_vocab`: junta os símbolos de cada palavra em uma string e conta quantas vezes cada token aparece. Mostra quais "pedaços" de palavras o vocabulário contém depois dos merges.' },
        { lineRange: [39, 40], content: '`formatar_corpus`: converte cada palavra (tupla) em uma string legível com espaços entre símbolos, só para exibição didática.' },
        { lineRange: [44, 45], content: 'Corpus de exemplo: uma frase curta em inglês (`once upon a time...`). Cada palavra vira uma tupla de caracteres individuais — este é o estado atômico inicial antes de qualquer merge.' },
        { lineRange: [49, 50], content: 'Parâmetros: `num_merges = 8` define quantas fusões executar. A lista `historico` vai guardar (passo, par, frequência, novo token) para o resumo final.' },
        { lineRange: [52, 54], content: 'Imprime o estado inicial: corpus como lista de palavras com símbolos separados, e o vocabulário inicial (apenas caracteres individuais como "o", "n", "c", "e" etc.).' },
        { lineRange: [56, 63], content: 'A cada iteração: (1) recalcula `stats` dos pares no corpus atual, (2) escolhe o par mais frequente com `max(stats, key=stats.get)`, (3) extrai frequência e cria o novo token concatenando os dois símbolos.' },
        { lineRange: [65, 71], content: 'Aplica o merge no corpus com `merge_pair`, registra no histórico, e imprime o passo atual: par escolhido, frequência, novo símbolo, e uma amostra do corpus evoluído. A saída visual mostra o BPE "aprendendo" token por token.' },
        { lineRange: [75, 82], content: 'Resumo final: ordena o vocabulário por frequência (mais frequente primeiro) e exibe (1) a lista cronológica de todos os merges e (2) o top 12 do vocabulário final — mostrando quais tokens sobreviveram e com que frequência.' },
      ],
    },
    'en-us': {
      title: `BPE from scratch: full implementation`,
      body: `The goal here is not just "running BPE". It is to see **why tokenization stops being pure character fragmentation**.

When BPE repeatedly merges frequent pairs, it:
1. reduces over-fragmentation of common words;
2. reuses recurring subparts across contexts;
3. builds a vocabulary that is more useful for model learning.

Main BPE loop in this example:
1. counts all adjacent symbol pairs in the corpus;
2. picks the most frequent pair;
3. merges that pair into a new symbol;
4. updates the corpus with this new token;
5. stores the merge in history.

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
        { lineRange: [5, 6], content: 'Function `get_stats`: receives the corpus and initializes an empty dictionary. Each key will be an adjacent symbol pair (two-element tuple), each value the count of occurrences of that pair in the current corpus.' },
        { lineRange: [7, 11], content: 'Iterates over each word in the corpus, forming a pair `(current_symbol, next_symbol)` at each position. Increments the count for that pair in the dictionary. Returns `stats` holding frequencies of all adjacent pairs — the BPE "sensor" that decides which merge yields the most gain.' },
        { lineRange: [15, 16], content: 'Function `merge_pair`: receives the chosen pair and the corpus. Creates an empty `merged` list that will accumulate post-merge words. The `pair` is the `(left, right)` pair that won the current step.' },
        { lineRange: [17, 28], content: 'For each word, walks through symbols with a `while` loop. If the target pair is found side by side, merges both into a single symbol (string concatenation) and advances 2 positions. Otherwise copies the current symbol and advances 1. Each word becomes a tuple of post-merge symbols.' },
        { lineRange: [32, 37], content: '`get_vocab`: joins each word\'s symbols into a string and counts occurrences per token. Shows which "chunks" the vocabulary contains after merges.' },
        { lineRange: [39, 40], content: '`format_corpus`: converts each word (tuple) into a readable string with spaces between symbols, purely for didactic display.' },
        { lineRange: [44, 45], content: 'Example corpus: a short English sentence (`once upon a time...`). Each word becomes a tuple of individual characters — the atomic pre-merge state.' },
        { lineRange: [49, 50], content: 'Parameters: `num_merges = 8` defines how many merges to run. The `history` list stores (step, pair, frequency, new token) for the final summary.' },
        { lineRange: [52, 54], content: 'Prints the initial state: corpus as a list of words with separated symbols, and the initial vocabulary (individual characters like "o", "n", "c", "e" etc.).' },
        { lineRange: [56, 63], content: 'Each iteration: (1) recalculates pair `stats` on the current corpus, (2) picks the most frequent pair with `max(stats, key=stats.get)`, (3) extracts frequency and creates the new token by concatenating the two symbols.' },
        { lineRange: [65, 71], content: 'Applies the merge via `merge_pair`, records it in history, and prints the current step: chosen pair, frequency, new symbol, and a corpus sample. The visual output shows BPE "learning" one token at a time.' },
        { lineRange: [75, 82], content: 'Final summary: sorts the vocabulary by frequency (most frequent first), then displays (1) the chronological merge log and (2) the top 12 final vocabulary entries — showing which tokens survived and how often they appear.' },
      ],
    },
  },
});
