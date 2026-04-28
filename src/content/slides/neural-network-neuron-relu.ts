import { defineSlide } from './_factory';

export const neuralNetworkNeuronRelu = defineSlide({
  id: 'neural-network-neuron-relu',
  type: 'two-column',
  options: {
    "columnRatios": [
      0.4,
      0.6
    ]
  },
  content: {
    'pt-br': {
      title: `O neurônio: a menor peça da rede`,
      body: `Agora a ponte fica concreta. Um neurônio artificial começa como uma soma ponderada, muito parecida com regressão linear, e só depois passa por uma função de ativação.

1. **Soma linear:** \`z = w * x + b\` calcula um valor bruto a partir da entrada.

2. **ReLU:** a ativação mais simples é \`relu(z) = max(0, z)\`. Se \`z\` for negativo, ela devolve \`0\`; se for positivo, devolve o próprio valor.

3. **Por que isso existe:** sem ativação, várias camadas lineares continuam equivalendo a uma única transformação linear.

4. **O efeito prático:** a ReLU cria uma quebra simples. Isso permite representar limiares, trechos e mudanças de ritmo.

> Sem ativação, a rede só empilha retas. Com ReLU, ela ganha uma dobra.

### Fórmula mínima
\`\`\`txt
z = w * x + b
a = relu(z)
\`\`\`

- \`z\` é a resposta bruta
- \`a\` é a saída ativada
- ReLU zera o que está abaixo de zero

### Intuição
Se \`x\` medir carga:
- abaixo do limiar, o neurônio fica em zero
- acima do limiar, ele começa a reagir`,
      codeExplanations: [
    {
    "lineRange": [
      1,
      1
    ],
    "content": "A parte linear (idêntica à regressão). O peso w pondera a entrada, e b desloca a base."
  },
    {
    "lineRange": [
      2,
      2
    ],
    "content": "A não-linearidade. Se z for negativo, o neurônio desliga. Se positivo, ativa com o próprio valor de z."
  }
  ],
    },
    'en-us': {
      title: `The neuron: the smallest piece of the network`,
      body: `Now the bridge becomes concrete. An artificial neuron starts as a weighted sum, very close to linear regression, and only then passes through an activation function.

1. **Linear sum:** \`z = w * x + b\` computes a raw score from the input.

2. **ReLU:** the simplest activation is \`relu(z) = max(0, z)\`. If \`z\` is negative, it returns \`0\`; if it is positive, it returns the value itself.

3. **Why it exists:** without activation, several linear layers still collapse into a single linear transformation.

4. **The practical effect:** ReLU creates a simple break. That lets the model represent thresholds, segments, and changes in pace.

> Without activation, the network only stacks lines. With ReLU, it gets a bend.

### Minimum formula
\`\`\`txt
z = w * x + b
a = relu(z)
\`\`\`

- \`z\` is the raw response
- \`a\` is the activated output
- ReLU zeros out what is below zero

### Intuition
If \`x\` measures load:
- below the threshold, the neuron stays at zero
- above the threshold, it starts reacting`,
      codeExplanations: [
    {
    "lineRange": [
      1,
      1
    ],
    "content": "The linear part (identical to regression). The weight w multiplies the input, and b shifts the base."
  },
    {
    "lineRange": [
      2,
      2
    ],
    "content": "The non-linearity. If z is negative, the neuron turns off. If positive, it activates with the value of z."
  }
  ],
    },
  },
  visual: {
    id: 'neuron-architecture-animated',
    copy: {
      "pt-br": {
        "ariaLabel": "Diagrama animado do neurônio artificial",
        "title": "ARQUITETURA NEURAL",
        "subtitle": "entradas, pesos, viés, soma ponderada, ativação e saída",
        "inputs": "Entradas",
        "weights": "pesos",
        "examples": "exemplos: pixels, atributos, medições",
        "bias": "viés",
        "biasNote": "o viés entra somando ao bloco",
        "weightedSum": "soma ponderada",
        "activation": "função de ativação",
        "outputAfterActivation": [
          "saída",
          "após",
          "ativação"
        ],
        "outputFinal": "saída final",
        "centerNote": "o neurônio primeiro calcula z e depois aplica f(z)",
        "legendTitle": "Legenda dos símbolos",
        "legend": [
          {
          "symbol": "xᵢ",
          "title": "entrada",
          "desc": "valor de entrada",
          "color": "#00f3ff"
        },
          {
          "symbol": "wᵢ",
          "title": "peso",
          "desc": "importância da entrada",
          "color": "#00f3ff"
        },
          {
          "symbol": "b",
          "title": "viés",
          "desc": "termo aditivo",
          "color": "#ff8fc5"
        },
          {
          "symbol": "∑",
          "title": "somatório",
          "desc": "soma ponderada",
          "color": "#00f3ff"
        },
          {
          "symbol": "f(z)",
          "title": "ativação",
          "desc": "não linearidade",
          "color": "#ff8fc5"
        },
          {
          "symbol": "y",
          "title": "saída",
          "desc": "resultado final",
          "color": "#eaf3ff"
        }
        ]
      },
      "en-us": {
        "ariaLabel": "Animated artificial neuron diagram",
        "title": "NEURAL ARCHITECTURE",
        "subtitle": "inputs, weights, bias, weighted sum, activation, and output",
        "inputs": "Inputs",
        "weights": "weights",
        "examples": "examples: pixels, attributes, measurements",
        "bias": "bias",
        "biasNote": "bias enters as an additive term",
        "weightedSum": "weighted sum",
        "activation": "activation function",
        "outputAfterActivation": [
          "output",
          "after",
          "activation"
        ],
        "outputFinal": "final output",
        "centerNote": "the neuron first computes z and then applies f(z)",
        "legendTitle": "Symbol legend",
        "legend": [
          {
          "symbol": "xᵢ",
          "title": "input",
          "desc": "input value",
          "color": "#00f3ff"
        },
          {
          "symbol": "wᵢ",
          "title": "weight",
          "desc": "input importance",
          "color": "#00f3ff"
        },
          {
          "symbol": "b",
          "title": "bias",
          "desc": "additive term",
          "color": "#ff8fc5"
        },
          {
          "symbol": "∑",
          "title": "sum",
          "desc": "weighted sum",
          "color": "#00f3ff"
        },
          {
          "symbol": "f(z)",
          "title": "activation",
          "desc": "non-linearity",
          "color": "#ff8fc5"
        },
          {
          "symbol": "y",
          "title": "output",
          "desc": "final result",
          "color": "#eaf3ff"
        }
        ]
      }
    },
  },
});
