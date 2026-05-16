import { defineSlide } from './_factory';

export const neuralNetworkPytorchActivationsOutput = defineSlide({
  id: 'neural-network-pytorch-activations-output',
  type: 'two-column',
  options: {
    columnRatios: [0.45, 0.55],
  },
  content: {
    'pt-br': {
      title: 'Camadas de Saída: Sigmoid e Softmax',
      body: `Na última camada, a ativação transforma os números brutos (**logits**) em algo que possamos interpretar, como probabilidades.

1. **Sigmoid (\`nn.Sigmoid\`):** Usada para **Classificação Binária** (ex: é SPAM ou não?). Ela mapeia o logit para um valor entre 0 e 1, que interpretamos como a probabilidade da classe positiva.

2. **Softmax (\`nn.Softmax\`):** Usada para **Classificação Multi-classe** (ex: qual é este dígito de 0 a 9?). Ela olha para todos os logits da saída e garante que a soma de todas as probabilidades seja exatamente **1.0**.

3. **Logits vs Probs:** Em treino, muitas vezes omitimos a ativação de saída e passamos os logits diretos para a função de perda (\`CrossEntropyLoss\`), que já aplica a matemática necessária internamente por questões de estabilidade numérica.

> **Importante:** \`nn.Softmax\` exige o parâmetro \`dim\` (geralmente \`dim=1\` para batches ou \`dim=0\` para um único vetor) para saber em qual direção somar.
`,
      rightBody: `
\`\`\`python
snippet:neural-networks/pytorch-activations-output
\`\`\``,
      codeExplanations: [
        {
          lineRange: [1, 5],
          content: 'Definimos os logits (saídas brutas) para três possíveis categorias.',
        },
        {
          lineRange: [7, 10],
          content: 'Sigmoid trata cada número de forma independente. Repare que a soma não será 1.',
        },
        {
          lineRange: [12, 17],
          content: 'Softmax força uma competição: o valor maior domina e a soma total fecha em 1.0.',
        },
      ],
    },
    'en-us': {
      title: 'Output Layers: Sigmoid and Softmax',
      body: `In the last layer, the activation transforms raw numbers (**logits**) into something we can interpret, such as probabilities.

1. **Sigmoid (\`nn.Sigmoid\`):** Used for **Binary Classification** (e.g., is it SPAM or not?). It maps the logit to a value between 0 and 1, which we interpret as the probability of the positive class.

2. **Softmax (\`nn.Softmax\`):** Used for **Multi-class Classification** (e.g., which digit is this from 0 to 9?). It looks at all output logits and ensures the sum of all probabilities is exactly **1.0**.

3. **Logits vs Probs:** During training, we often omit the output activation and pass raw logits directly to the loss function (\`CrossEntropyLoss\`), which handles the necessary math internally for numerical stability.

> **Important:** \`nn.Softmax\` requires the \`dim\` parameter (usually \`dim=1\` for batches or \`dim=0\` for a single vector) to know which direction to sum.
`,
      rightBody: `
\`\`\`python
snippet:neural-networks/pytorch-activations-output
\`\`\``,
      codeExplanations: [
        {
          lineRange: [1, 5],
          content: 'We define the logits (raw outputs) for three possible categories.',
        },
        {
          lineRange: [7, 10],
          content: 'Sigmoid treats each number independently. Notice the sum will not be 1.',
        },
        {
          lineRange: [12, 17],
          content: 'Softmax forces a competition: the higher value dominates and the total sum hits 1.0.',
        },
      ],
    },
  },
});
