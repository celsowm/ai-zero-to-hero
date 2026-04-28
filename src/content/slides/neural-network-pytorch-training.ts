import { defineSlide } from './_factory';

export const neuralNetworkPytorchTraining = defineSlide({
  id: 'neural-network-pytorch-training',
  type: 'two-column',
  options: {
    "columnRatios": [
      0.48,
      0.52
    ]
  },
  content: {
    'pt-br': {
      title: `Rede Neural com \`torch\`: treinando o mesmo caso em menos linhas`,
      body: `Agora repetimos o problema e2e do paciente fumante, com as mesmas quatro features e o mesmo alvo binário, mas usando o backend que vai reaparecer depois com \`transformers\`.

1. **Os dados continuam iguais:** \`idade\`, \`pressao\`, \`colesterol\` e \`fumante\` entram; a classe binária continua saindo no fim.

2. **A arquitetura ainda é uma MLP \`4 -> 3 -> 1\`:** só que agora declaramos isso com \`nn.Sequential\`, \`nn.Linear\` e \`nn.Sigmoid\`.

3. **O treino ainda tem loss, gradiente e update:** a diferença é que \`BCELoss\`, \`backward()\` e \`optimizer.step()\` centralizam a parte mecânica.

4. **Mapeamento direto com o que vimos:** o \`forward\` ainda existe quando chamamos \`model(X)\`, o gradiente ainda existe em \`loss.backward()\`, e a atualização ainda existe em \`optimizer.step()\`.

> A rede continua aprendendo do mesmo jeito. O que some é o trabalho braçal de escrever tudo à mão.

---

\`\`\`python
snippet:neural-networks/pytorch-training
\`\`\`

### O que observar
- \`X\` e \`y\`: mesmo dataset do exemplo manual
- \`nn.Sequential(...)\`: descreve a arquitetura em poucas linhas
- \`loss.backward()\`: PyTorch calcula os gradientes
- \`optimizer.step()\`: PyTorch aplica a atualização dos pesos`,
      codeExplanations: [
    {
    "lineRange": [
      1,
      2
    ],
    "content": "Aqui importamos o backend principal e o módulo `nn`, que reúne as camadas e funções de rede neural."
  },
    {
    "lineRange": [
      4,
      14
    ],
    "content": "Este bloco recria o mesmo dataset do paciente fumante, agora como tensores PyTorch em vez de listas Python. O `manual_seed` garante que os pesos iniciais serão sempre os mesmos para fins didáticos."
  },
    {
    "lineRange": [
      16,
      21
    ],
    "content": "Aqui declaramos a MLP `4 -> 3 -> 1` em poucas linhas. As duas ativações sigmoid reaproveitam exatamente a ideia discutida nos slides anteriores."
  },
    {
    "lineRange": [
      23,
      24
    ],
    "content": "A função de loss mede o erro binário, e o optimizer define como os parâmetros vão ser ajustados a cada passo."
  },
    {
    "lineRange": [
      26,
      31
    ],
    "content": "Este é o loop de treino enxuto: forward com `model(X)`, cálculo da loss, zerar gradientes antigos, backprop automático e atualização dos pesos."
  },
    {
    "lineRange": [
      33,
      34
    ],
    "content": "No fim imprimimos a loss final e a saída da rede já treinada para o dataset inteiro."
  }
  ],
    },
    'en-us': {
      title: `Neural Network with \`torch\`: training the same case in fewer lines`,
      body: `Now we repeat the full smoker-patient problem, with the same four features and the same binary target, but using the backend that will reappear later with \`transformers\`.

1. **The data stays the same:** \`age\`, \`pressure\`, \`cholesterol\`, and \`smoker\` go in; the binary class still comes out at the end.

2. **The architecture is still a \`4 -> 3 -> 1\` MLP:** except now we declare it with \`nn.Sequential\`, \`nn.Linear\`, and \`nn.Sigmoid\`.

3. **Training still has loss, gradients, and updates:** the difference is that \`BCELoss\`, \`backward()\`, and \`optimizer.step()\` centralize the mechanical part.

4. **Direct mapping to what we already saw:** \`forward\` still exists when we call \`model(X)\`, gradients still exist in \`loss.backward()\`, and updates still exist in \`optimizer.step()\`.

> The network keeps learning the same way. What disappears is the manual work of writing everything by hand.

---

\`\`\`python
snippet:neural-networks/pytorch-training
\`\`\`

### What to watch
- \`X\` and \`y\`: the same dataset from the manual example
- \`nn.Sequential(...)\`: describes the architecture in a few lines
- \`loss.backward()\`: PyTorch computes gradients
- \`optimizer.step()\`: PyTorch applies the parameter update`,
      codeExplanations: [
    {
    "lineRange": [
      1,
      2
    ],
    "content": "Here we import the main backend and the `nn` module, which groups neural-network layers and utilities."
  },
    {
    "lineRange": [
      4,
      14
    ],
    "content": "This block recreates the same smoker-patient dataset, now as PyTorch tensors instead of Python lists. The `manual_seed` ensures initial weights stay the same for didactic purposes."
  },
    {
    "lineRange": [
      16,
      21
    ],
    "content": "Here we declare the `4 -> 3 -> 1` MLP in a few lines. Both sigmoid activations reuse the exact same idea discussed in the previous slides."
  },
    {
    "lineRange": [
      23,
      24
    ],
    "content": "The loss function measures binary error, and the optimizer defines how parameters are updated at each step."
  },
    {
    "lineRange": [
      26,
      31
    ],
    "content": "This is the compact training loop: forward with `model(X)`, loss calculation, clearing old gradients, automatic backpropagation, and parameter update."
  },
    {
    "lineRange": [
      33,
      34
    ],
    "content": "At the end we print the final loss and the trained network output for the full dataset."
  }
  ],
    },
  },
});
