import { defineSlide } from './_factory';

export const treeOfThoughts = defineSlide({
  id: 'tree-of-thoughts',
  type: 'two-column',
  options: { columnRatios: [0.55, 0.45] },
  content: {
    'pt-br': {
      title: 'Tree of Thoughts & Self-Consistency',
      body: `Se Chain of Thought dá **um** caminho de raciocínio, Tree of Thoughts explora **múltiplos** caminhos e escolhe o melhor. É como ter vários especialistas debatendo.

### Self-Consistency (Wang et al., 2023)

1. Gera **N cadeias de pensamento** independentes (ex: 5 vezes)
2. Cada cadeia produz uma resposta final
3. **Votação majoritária** — a resposta mais frequente vence

### Tree of Thoughts (Yao et al., 2023)

1. **Gera** múltiplos próximos passos possíveis
2. **Avalia** cada caminho (o modelo mesmo classifica qualidade)
3. **Backtracks** se um caminho parece ruim
4. **Explora** alternativas até convergir

### Exemplo de branching

\`\`\`python
snippet:prompt-eng/tot-branching
\`\`\`

> Tree of Thoughts é "democracia de raciocínio" — múltiplas perspectivas votam na melhor resposta.`,
    },
    'en-us': {
      title: 'Tree of Thoughts & Self-Consistency',
      body: `If Chain of Thought gives **one** reasoning path, Tree of Thoughts explores **multiple** paths and picks the best one. It's like having several experts debating.

### Self-Consistency (Wang et al., 2023)

1. Generate **N independent thought chains** (e.g., 5 times)
2. Each chain produces a final answer
3. **Majority voting** — the most frequent answer wins

### Tree of Thoughts (Yao et al., 2023)

1. **Generate** multiple possible next steps
2. **Evaluate** each path (the model itself rates quality)
3. **Backtrack** if a path looks bad
4. **Explore** alternatives until convergence

### Branching example

\`\`\`python
snippet:prompt-eng/tot-branching
\`\`\`

> Tree of Thoughts is "reasoning democracy" — multiple perspectives vote on the best answer.`,
    },
  },
  visual: {
    id: 'tree-of-thoughts-visual',
    copy: {
      'pt-br': {
        title: 'Tree of Thoughts: Árvore de Raciocínio',
        rootLabel: 'Problema',
        branch1Label: 'Caminho A',
        branch2Label: 'Caminho B',
        branch3Label: 'Caminho C',
        voteLabel: 'Votação',
        answerLabel: 'Resposta final',
        evalLabel: 'Avaliação',
        backtrackLabel: 'Backtrack',
      },
      'en-us': {
        title: 'Tree of Thoughts: Reasoning Tree',
        rootLabel: 'Problem',
        branch1Label: 'Path A',
        branch2Label: 'Path B',
        branch3Label: 'Path C',
        voteLabel: 'Voting',
        answerLabel: 'Final answer',
        evalLabel: 'Evaluation',
        backtrackLabel: 'Backtrack',
      },
    },
  },
});
