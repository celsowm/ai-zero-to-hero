import { defineSlide } from './_factory';

export const neuralNetworkPytorchNnLinear = defineSlide({
  id: 'neural-network-pytorch-nn-linear',
  type: 'two-column',
  options: { columnRatios: [0.52, 0.48] },
  content: {
    'pt-br': {
      title: '`nn.Linear` como projeção',
      body: `Neste trecho do curso, \`Linear\` não é “uma camada qualquer”. Ela é o jeito mais direto de **trocar um shape por outro**.

Exemplos que vamos reutilizar:

- \`C -> V\` para virar logits
- \`C -> 3C\` para produzir Q, K e V
- \`4C -> C\` para fechar o MLP`,
      rightBody: `\`\`\`python
snippet:pytorch-lm/linear-to-logits
\`\`\``,
      codeExplanations: [
        { lineRange: [1, 4], content: 'Definimos explicitamente batch, tempo, embedding e vocabulário para ligar leitura de código à leitura de shape.' },
        { lineRange: [6, 7], content: 'Embedding e Linear são as duas peças mínimas da projeção para LM.' },
        { lineRange: [9, 11], content: 'O forward faz exatamente a ponte token IDs -> embeddings -> logits.' },
        { lineRange: [13, 14], content: 'Os prints mostram a troca da última dimensão sem mudar batch nem sequência.' },
      ],
    },
    'en-us': {
      title: '`nn.Linear` as projection',
      body: `In this part of the course, \`Linear\` is not just “some dense layer”. It is the direct way to **change one shape into another**.

Examples we will reuse:

- \`C -> V\` to become logits
- \`C -> 3C\` to produce Q, K, and V
- \`4C -> C\` to close the MLP`,
      rightBody: `\`\`\`python
snippet:pytorch-lm/linear-to-logits
\`\`\``,
      codeExplanations: [
        { lineRange: [1, 4], content: 'We explicitly name batch, time, embedding, and vocabulary so code reading stays tied to shape reading.' },
        { lineRange: [6, 7], content: 'Embedding and Linear are the two minimum pieces behind LM projection.' },
        { lineRange: [9, 11], content: 'The forward pass is exactly the bridge token IDs -> embeddings -> logits.' },
        { lineRange: [13, 14], content: 'The prints show the last dimension changing while batch and sequence stay fixed.' },
      ],
    },
  },
});
