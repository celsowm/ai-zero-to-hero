import { defineSlide } from './_factory';

export const neuralNetworkPytorchPrediction = defineSlide({
  id: 'neural-network-pytorch-prediction',
  type: 'two-column',
  options: {
    "columnRatios": [
      0.48,
      0.52
    ]
  },
  content: {
    'pt-br': {
      title: `Rede Neural com \`torch\`: prevendo o novo paciente`,
      body: `Depois do treino, a inferência continua sendo o mesmo raciocínio do slide manual: entra um paciente novo, a rede faz um \`forward\` e devolve probabilidade mais classe final.

1. **Mesmo paciente de comparação:** mantemos \`58\`, \`150\`, \`245\` e \`fumante = 1.0\` para que a leitura lado a lado continue fácil.

2. **A entrada agora vira tensor:** em vez de lista Python e loops manuais, empacotamos as quatro features no formato que o modelo espera.

3. **\`torch.no_grad()\` desliga o modo de treino:** como aqui só queremos usar a rede, não faz sentido calcular gradiente.

4. **O limiar continua igual:** a rede devolve uma probabilidade, e a regra final ainda é comparar com \`0.5\` para transformar isso em classe.

> A interface mudou. A ideia de inferência não mudou.

---

\`\`\`python
snippet:neural-networks/pytorch-prediction
\`\`\`

### O que observar
- \`x_novo\`: o mesmo paciente do slide manual, agora em tensor
- \`with torch.no_grad()\`: modo de uso, sem backprop
- \`model(x_novo)\`: o \`forward\` ficou escondido atrás da chamada do modelo
- o próximo slide muda a arquitetura, não a lógica básica de prever`,
      codeExplanations: [
    {
    "lineRange": [
      1,
      1
    ],
    "content": "Aqui reabrimos o backend PyTorch para montar o tensor de entrada e controlar o modo de inferência."
  },
    {
    "lineRange": [
      3,
      5
    ],
    "content": "Este bloco cria exatamente o mesmo paciente do slide manual, já normalizado na escala esperada pela rede."
  },
    {
    "lineRange": [
      7,
      8
    ],
    "content": "Com `torch.no_grad()` fazemos somente o `forward`, sem guardar gradientes nem preparar atualização de pesos."
  },
    {
    "lineRange": [
      10,
      12
    ],
    "content": "No fim extraímos a probabilidade escalar, aplicamos o limiar de `0.5` e imprimimos a classe prevista."
  }
  ],
    },
    'en-us': {
      title: `Neural Network with \`torch\`: predicting the new patient`,
      body: `After training, inference keeps the same reasoning from the manual slide: a new patient comes in, the network performs one \`forward\` pass, and returns probability plus final class.

1. **Same comparison patient:** we keep \`58\`, \`150\`, \`245\`, and \`smoker = 1.0\` so the side-by-side reading stays easy.

2. **The input now becomes a tensor:** instead of Python lists and manual loops, we package the four features into the format expected by the model.

3. **\`torch.no_grad()\` disables training mode:** since we only want to use the network here, computing gradients would make no sense.

4. **The threshold stays the same:** the network returns a probability, and the final rule is still comparing it with \`0.5\` to turn that into a class.

> The interface changed. The inference idea did not.

---

\`\`\`python
snippet:neural-networks/pytorch-prediction
\`\`\`

### What to watch
- \`x_new\`: the same patient from the manual slide, now as a tensor
- \`with torch.no_grad()\`: usage mode, no backpropagation
- \`model(x_new)\`: the \`forward\` pass is hidden behind the model call
- the next slide changes the architecture, not the basic prediction logic`,
      codeExplanations: [
    {
    "lineRange": [
      1,
      1
    ],
    "content": "Here we reopen the PyTorch backend to build the input tensor and control inference mode."
  },
    {
    "lineRange": [
      3,
      5
    ],
    "content": "This block creates the exact same patient from the manual slide, already normalized to the scale expected by the network."
  },
    {
    "lineRange": [
      7,
      8
    ],
    "content": "With `torch.no_grad()` we perform only the `forward` pass, without storing gradients or preparing parameter updates."
  },
    {
    "lineRange": [
      10,
      12
    ],
    "content": "At the end we extract the scalar probability, apply the `0.5` threshold, and print the predicted class."
  }
  ],
    },
  },
});
