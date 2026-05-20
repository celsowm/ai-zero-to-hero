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
        { lineRange: [1, 6], content: 'Essas linhas montam um lote de IDs de tokens; já é o problema real de treino, só que em formato numérico.' },
        { lineRange: [8, 10], content: 'Aqui fazemos o deslocamento temporal: `x` vira contexto de entrada e `y` vira alvo de próximo token.' },
        { lineRange: [12, 14], content: 'Os prints deixam explícito que o treino acontece em paralelo em várias posições, não uma palavra por vez.' },
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
        { lineRange: [1, 6], content: 'These lines build a batch of token IDs; this is already the real training problem in numeric form.' },
        { lineRange: [8, 10], content: 'This is the temporal shift: `x` becomes input context and `y` becomes next-token target.' },
        { lineRange: [12, 14], content: 'The prints make it clear that training runs in parallel over many positions, not one token at a time.' },
      ],
    },
  },
});
