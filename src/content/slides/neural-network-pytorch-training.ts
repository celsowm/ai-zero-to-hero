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
      body: `No slide anterior vimos o loop de treino completo — aqui repetimos o problema e2e do paciente fumante com **os dados como tensores PyTorch**, o que antes era lista Python pura.

1. **A novidade são os tensores:** \`idade\`, \`pressao\`, \`colesterol\` e \`fumante\` agora entram como \`torch.tensor\` com \`dtype=torch.float32\`. É o formato que o PyTorch espera.

2. **A arquitetura é a mesma MLP \`4 -> 3 -> 1\`:** já explicada no slide anterior — o que muda aqui é que os dados de entrada são tensores desde o início.

3. **BCELoss e o loop já foram apresentados:** a única diferença aqui é que os dados são reais (criados como tensores), não placeholders.

4. **Mapeamento direto com o que vimos:** o \`forward\` ainda existe quando chamamos \`model(X)\`, o gradiente ainda existe em \`loss.backward()\`, e a atualização ainda existe em \`optimizer.step()\`.

> A rede continua aprendendo do mesmo jeito. O que muda é que agora os dados já nascem no formato que o PyTorch entende.
`,
      rightBody: `
\`\`\`python
snippet:neural-networks/pytorch-training
\`\`\`

### O que observar
- \`X\` e \`y\`: agora como \`torch.tensor\`, não listas Python
- \`dtype=torch.float32\`: tipo numérico que o PyTorch espera
- \`manual_seed(7)\`: garante reprodutibilidade dos pesos iniciais
- O resto do loop é **idêntico** ao slide anterior`,
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
      body: `In the previous slide we saw the full training loop — here we repeat the smoker-patient e2e problem with **the data as PyTorch tensors**, which was previously plain Python lists.

1. **The novelty is the tensors:** \`age\`, \`pressure\`, \`cholesterol\`, and \`smoker\` now enter as \`torch.tensor\` with \`dtype=torch.float32\`. This is the format PyTorch expects.

2. **The architecture is the same \`4 -> 3 -> 1\` MLP:** already explained in the previous slide — what changes here is that input data are tensors from the start.

3. **BCELoss and the loop were already introduced:** the only difference here is that the data are real (created as tensors), not placeholders.

4. **Direct mapping to what we already saw:** \`forward\` still exists when we call \`model(X)\`, gradients still exist in \`loss.backward()\`, and updates still exist in \`optimizer.step()\`.

> The network keeps learning the same way. What changes is that data now start in the format PyTorch understands.
`,
      rightBody: `
\`\`\`python
snippet:neural-networks/pytorch-training
\`\`\`

### What to watch
- \`X\` and \`y\`: now as \`torch.tensor\`, not Python lists
- \`dtype=torch.float32\`: numeric type PyTorch expects
- \`manual_seed(7)\`: ensures reproducibility of initial weights
- The rest of the loop is **identical** to the previous slide`,
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
