import { defineSlide } from './_factory';

export const languageModelingIntro = defineSlide({
  id: 'language-modeling-intro',
  type: 'two-column',
  options: { columnRatios: [0.55, 0.45] },
  content: {
    'pt-br': {
      title: 'O que é language modeling',
      body: `Um language model aprende uma tarefa simples de enunciar e difícil de escalar: **prever o próximo token**.

No treino:

1. damos um prefixo
2. mostramos qual era o próximo token correto
3. punimos a diferença`,
      rightBody: `\`\`\`python
snippet:pytorch-lm/token-batch
\`\`\``,
      codeExplanations: [
        { lineRange: [1, 6], content: 'O batch inteiro é só uma matriz de inteiros, mas já contém o problema completo.' },
        { lineRange: [8, 10], content: 'O deslocamento entre `x` e `y` materializa a tarefa de prever o próximo token.' },
        { lineRange: [12, 14], content: 'Os shapes deixam claro que o treino acontece para várias posições ao mesmo tempo.' },
      ],
    },
    'en-us': {
      title: 'What language modeling is',
      body: `A language model learns a task that is simple to state and hard to scale: **predict the next token**.

During training:

1. we provide a prefix
2. we show the correct next token
3. we penalize the mismatch`,
      rightBody: `\`\`\`python
snippet:pytorch-lm/token-batch
\`\`\``,
      codeExplanations: [
        { lineRange: [1, 6], content: 'The whole batch is just an integer matrix, but it already contains the full learning problem.' },
        { lineRange: [8, 10], content: 'The shift between `x` and `y` materializes the next-token task.' },
        { lineRange: [12, 14], content: 'The shapes make it clear that training happens for many positions at once.' },
      ],
    },
  },
});
