import { defineSlide } from './_factory';

export const pytorchMinimalLanguageModel = defineSlide({
  id: 'pytorch-minimal-language-model',
  type: 'two-column',
  options: { columnRatios: [0.5, 0.5] },
  content: {
    'pt-br': {
      title: 'Mini language model em PyTorch',
      body: `Antes de ampliar a arquitetura, vale congelar o menor modelo que ja treina como LM:

- \`Embedding\`
- \`lm_head\`
- \`forward(idx, targets)\`
- \`cross_entropy\`

Se isso estiver claro, o restante do curso vira escala e composicao de modulos.`,
      rightBody: `\`\`\`python
snippet:pytorch-lm/minimal-language-model
\`\`\``,
      codeExplanations: [
        { lineRange: [1, 5], content: 'Importamos o mínimo necessário e declaramos uma classe que já se comporta como LM.' },
        { lineRange: [6, 10], content: 'A classe expõe as duas peças essenciais: tabela de embeddings e cabeça de linguagem.' },
        { lineRange: [11, 14], content: 'O `forward` produz logits e, quando houver `targets`, devolve também a perda.' },
      ],
    },
    'en-us': {
      title: 'A minimal PyTorch language model',
      body: `Before scaling the architecture, it helps to lock in the smallest model that already trains like an LM:

- \`Embedding\`
- \`lm_head\`
- \`forward(idx, targets)\`
- \`cross_entropy\`

Once this is clear, the rest of the course becomes scale plus module composition.`,
      rightBody: `\`\`\`python
snippet:pytorch-lm/minimal-language-model
\`\`\``,
      codeExplanations: [
        { lineRange: [1, 5], content: 'We import the minimum needed and declare a class that already behaves like an LM.' },
        { lineRange: [6, 10], content: 'The class exposes the two essential parts: embedding table and language head.' },
        { lineRange: [11, 14], content: 'The `forward` method produces logits and also returns loss when targets exist.' },
      ],
    },
  },
});
