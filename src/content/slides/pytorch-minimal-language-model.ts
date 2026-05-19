import { defineSlide } from './_factory';

export const pytorchMinimalLanguageModel = defineSlide({
  id: 'pytorch-minimal-language-model',
  type: 'two-column',
  options: { columnRatios: [0.5, 0.5] },
  content: {
    'pt-br': {
      title: 'Mini language model em PyTorch',
      body: `Antes do GPT-2 completo, vale congelar o menor modelo que já treina como LM:

- \`Embedding\`
- \`lm_head\`
- \`forward(idx, targets)\`
- \`cross_entropy\``,
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
      body: `Before the full GPT-2, it helps to freeze the smallest model that already trains like an LM:

- \`Embedding\`
- \`lm_head\`
- \`forward(idx, targets)\`
- \`cross_entropy\``,
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
