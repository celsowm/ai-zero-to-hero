import { defineSlide } from './_factory';

export const neuralNetworkPytorchTraining = defineSlide({
  id: 'neural-network-pytorch-training',
  type: 'two-column',
  options: { columnRatios: [0.54, 0.46] },
  content: {
    'pt-br': {
      title: 'Loop de treino para next-token',
      body: `O loop de treino de um language model é o loop padrão do PyTorch, com uma diferença prática: o target é a sequência deslocada.

Checklist:

1. pegar \`x\` e \`y\`
2. chamar \`model(x, y)\`
3. zerar gradiente
4. fazer backward
5. atualizar pesos`,
      rightBody: `\`\`\`python
snippet:pytorch-lm/minimal-language-model
\`\`\``,
      codeExplanations: [
        { lineRange: [1, 5], content: 'Importamos só o necessário para um modelo mínimo de linguagem com perda.' },
        { lineRange: [6, 10], content: 'Embedding e `lm_head` já bastam para montar um LM treinável.' },
        { lineRange: [11, 14], content: 'O `forward` recebe token IDs, produz logits e opcionalmente devolve a loss para o loop.' },
      ],
    },
    'en-us': {
      title: 'Training loop for next-token prediction',
      body: `A language-model training loop is the standard PyTorch loop, with one practical twist: the target is the shifted sequence.

Checklist:

1. fetch \`x\` and \`y\`
2. call \`model(x, y)\`
3. zero gradients
4. run backward
5. update weights`,
      rightBody: `\`\`\`python
snippet:pytorch-lm/minimal-language-model
\`\`\``,
      codeExplanations: [
        { lineRange: [1, 5], content: 'We import only what is needed for a tiny language model with loss.' },
        { lineRange: [6, 10], content: 'Embedding and `lm_head` are already enough to build a trainable LM.' },
        { lineRange: [11, 14], content: 'The `forward` method receives token IDs, produces logits, and optionally returns loss for the loop.' },
      ],
    },
  },
});
