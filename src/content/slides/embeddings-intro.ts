import { defineSlide } from './_factory';

export const embeddingsIntro = defineSlide({
  id: 'embeddings-intro',
  type: 'two-column',
  options: { columnRatios: [0.55, 0.45] },
  content: {
    'pt-br': {
      title: 'Embedding: ID não é vetor',
      body: `Token ID sozinho não carrega geometria. O embedding é a tabela treinável que troca cada inteiro por um vetor contínuo.

No GPT-2, isso faz duas coisas:

1. cria uma largura fixa \`C\` por token
2. prepara o residual stream inicial`,
      rightBody: `\`\`\`python
snippet:repo-gpt2/embedding-sum
\`\`\``,
      codeExplanations: [
        { lineRange: [1, 5], content: 'Começamos com IDs e posições explícitas para mostrar as duas fontes de informação.' },
        { lineRange: [7, 8], content: 'As duas tabelas aprendem coisas diferentes: conteúdo do token e posição.' },
        { lineRange: [10, 11], content: 'A soma já produz o tensor `(B, T, C)` que entra nos blocos do Transformer.' },
      ],
    },
    'en-us': {
      title: 'Embedding: an ID is not a vector',
      body: `A token ID alone carries no geometry. The embedding table is the trainable lookup that swaps each integer for a continuous vector.

In GPT-2, that does two jobs:

1. it creates a fixed width \`C\` per token
2. it prepares the initial residual stream`,
      rightBody: `\`\`\`python
snippet:repo-gpt2/embedding-sum
\`\`\``,
      codeExplanations: [
        { lineRange: [1, 5], content: 'We start with explicit IDs and positions to expose the two information sources.' },
        { lineRange: [7, 8], content: 'The two tables learn different things: token content and position.' },
        { lineRange: [10, 11], content: 'The sum already produces the `(B, T, C)` tensor that enters Transformer blocks.' },
      ],
    },
  },
});
