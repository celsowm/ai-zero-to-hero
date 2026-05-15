import { defineSlide } from './_factory';

export const neuralNetworkPytorchActivations = defineSlide({
  id: 'neural-network-pytorch-activations',
  type: 'two-column',
  options: {
    "columnRatios": [
      0.4,
      0.6
    ]
  },
  content: {
    'pt-br': {
      title: `O Zoológico de Ativações: qual escolher?`,
      body: `Funções de ativação quebram a linearidade. Sem elas, 100 camadas \`Linear\` equivalem matematicamente a apenas 1 camada. Mas existem várias, e cada uma resolve um problema específico:

### As Clássicas (Históricas e de Saída)
- **Sigmoid (\`nn.Sigmoid\`):** Esmaga a saída para \`[0, 1]\`. Ótima para a última camada em classificação binária (probabilidade), mas ruim nas camadas intermediárias por causar o problema de "vanishing gradient" (gradiente some).
- **Tanh (\`nn.Tanh\`):** Esmaga para \`[-1, 1]\`. Centrada no zero, fluía melhor os gradientes que a Sigmoid, mas ainda sofria do mesmo problema em redes profundas.

### As Modernas (Camadas Intermediárias)
- **ReLU (\`nn.ReLU\`):** \`max(0, x)\`. A salvadora das redes profundas. Simples, super rápida e não esmaga gradientes positivos. **É a escolha padrão para iniciar.**
- **GELU (\`nn.GELU\`):** Uma versão mais suave da ReLU baseada na distribuição gaussiana. É o **padrão absoluto em modelos gigantes** (Transformers, GPT, BERT) porque flui gradientes levemente até para números negativos próximos a zero.

### Distribuição (Saída)
- **Softmax (\`nn.Softmax\`):** Transforma uma lista de números em uma distribuição de probabilidades que soma 1. Usada na última camada de problemas com múltiplas categorias (ex: identificar dígito de 0 a 9 ou prever a próxima palavra).

> **API Funcional vs Orientada a Objetos:**
> O PyTorch oferece \`nn.ReLU()\` (para por no \`nn.Sequential\`) e \`torch.nn.functional.relu()\` (para chamar dentro de um método \`forward\` customizado). Elas fazem exatamente a mesma matemática.

---

\`\`\`python
snippet:neural-networks/activations-demo
\`\`\`

### O que observar
- Mesmas entradas \`[-2, -1, 0, 1, 2]\` produzem saídas radicalmente diferentes
- ReLU e GELU são as escolhas padrão para camadas internas
- Softmax só faz sentido na última camada de classificação`,
      codeExplanations: [
    {
      "lineRange": [1, 6],
      "content": "Importações e criação do tensor de teste com valores negativos, zero e positivos para comparar as ativações."
    },
    {
      "lineRange": [7, 10],
      "content": "Sigmoid comprime tudo para [0, 1] — útil para probabilidades mas sofre vanishing gradient."
    },
    {
      "lineRange": [12, 14],
      "content": "Tanh comprime para [-1, 1] — centrada no zero, melhor que sigmoid mas ainda satura."
    },
    {
      "lineRange": [16, 18],
      "content": "ReLU zera negativos e mantém positivos — simples, rápida e não satura no lado positivo."
    },
    {
      "lineRange": [20, 22],
      "content": "GELU é uma ReLU suave que permite gradientes pequenos para negativos próximos de zero — padrão em Transformers."
    },
    {
      "lineRange": [24, 28],
      "content": "Softmax transforma logits em distribuição de probabilidades que soma 1 — usada na camada de saída para classificação multi-classe."
    },
    {
      "lineRange": [30, 36],
      "content": "Exemplo de modelo com nn.Sequential: ReLU nas camadas intermediárias, logits crus na saída para CrossEntropyLoss."
    }
  ],
    },
    'en-us': {
      title: `The Activation Zoo: which one to choose?`,
      body: `Activation functions break linearity. Without them, 100 \`Linear\` layers are mathematically equivalent to just 1 layer. But there are several, and each solves a specific problem:

### The Classics (Historical and Output)
- **Sigmoid (\`nn.Sigmoid\`):** Squashes output to \`[0, 1]\`. Great for the last layer in binary classification (probability), but bad in intermediate layers as it causes the "vanishing gradient" problem.
- **Tanh (\`nn.Tanh\`):** Squashes to \`[-1, 1]\`. Zero-centered, flowed gradients better than Sigmoid, but still suffered from the same issue in deep networks.

### The Moderns (Hidden Layers)
- **ReLU (\`nn.ReLU\`):** \`max(0, x)\`. The savior of deep networks. Simple, lightning-fast, and doesn't squash positive gradients. **It's the default choice to start.**
- **GELU (\`nn.GELU\`):** A smoother version of ReLU based on the Gaussian distribution. It is the **absolute standard in giant models** (Transformers, GPT, BERT) because it flows gradients slightly even for negative numbers near zero.

### Distribution (Output)
- **Softmax (\`nn.Softmax\`):** Transforms a list of numbers into a probability distribution that sums to 1. Used in the last layer of multi-category problems (e.g., identifying digits 0-9 or predicting the next word).

> **Functional vs Object-Oriented API:**
> PyTorch offers \`nn.ReLU()\` (to put in an \`nn.Sequential\`) and \`torch.nn.functional.relu()\` (to call inside a custom \`forward\` method). They do exactly the same math.

---

\`\`\`python
snippet:neural-networks/activations-demo
\`\`\`

### What to watch
- Same inputs \`[-2, -1, 0, 1, 2]\` produce radically different outputs
- ReLU and GELU are the default choices for hidden layers
- Softmax only makes sense in the last classification layer`,
      codeExplanations: [
    {
      "lineRange": [1, 6],
      "content": "Imports and test tensor with negative, zero, and positive values to compare activations."
    },
    {
      "lineRange": [7, 10],
      "content": "Sigmoid compresses everything to [0, 1] — useful for probabilities but suffers vanishing gradient."
    },
    {
      "lineRange": [12, 14],
      "content": "Tanh compresses to [-1, 1] — zero-centered, better than sigmoid but still saturates."
    },
    {
      "lineRange": [16, 18],
      "content": "ReLU zeros negatives and keeps positives — simple, fast, and doesn't saturate on the positive side."
    },
    {
      "lineRange": [20, 22],
      "content": "GELU is a smooth ReLU that allows small gradients for negatives near zero — standard in Transformers."
    },
    {
      "lineRange": [24, 28],
      "content": "Softmax turns logits into a probability distribution summing to 1 — used in the output layer for multi-class classification."
    },
    {
      "lineRange": [30, 36],
      "content": "Example model with nn.Sequential: ReLU in hidden layers, raw logits at output for CrossEntropyLoss."
    }
  ],
    },
  },
  visual: {
    id: 'activation-functions-comparator',
    copy: {
      "pt-br": {
        "ariaLabel": "Comparador visual de funções de ativação",
        "tabsAriaLabel": "Escolha a função de ativação",
        "sliderLabel": "Ajuste o valor bruto",
        "inputLabel": "z",
        "outputLabel": "a",
        "chartTitle": "Compare a mesma entrada em três funções",
        "infoTitle": "Leitura da função",
        "takeawayTitle": "O que fixar",
        "takeawayBody": "Ativação não é um detalhe cosmético. Ela define o formato da resposta do neurônio e, portanto, quais padrões a rede consegue representar e aprender.",
        "comparisonNote": "O mesmo \`z\` gera saídas bem diferentes dependendo da ativação escolhida.",
        "functions": {
          "linear": {
            "label": "Linear",
            "formula": "a = z",
            "headline": "Não dobra nem comprime o sinal: ela só repassa o valor.",
            "body": "Funciona como referência útil para comparação, mas não adiciona não linearidade.",
            "behavior": "Se todas as camadas fossem lineares, a rede inteira continuaria equivalente a uma única transformação linear.",
            "gradientNote": "Derivada constante: o gradiente local é sempre 1.",
            "outputRange": "Saída sem limite superior ou inferior",
            "example": "Quando olhar para ela"
          },
          "relu": {
            "label": "ReLU",
            "formula": "a = max(0, z)",
            "headline": "Corta tudo abaixo de zero e deixa passar o que está acima.",
            "body": "Ela introduz um limiar simples: desligado para valores negativos, ativo para positivos.",
            "behavior": "Isso produz dobras por partes e torna a rede capaz de montar fronteiras mais flexíveis.",
            "gradientNote": "Gradiente local é 0 no lado negativo e 1 no lado positivo.",
            "outputRange": "Saída entre 0 e infinito",
            "example": "Quando olhar para ela"
          },
          "sigmoid": {
            "label": "Sigmoid",
            "formula": "a = 1 / (1 + e^-z)",
            "headline": "Converte qualquer valor bruto em uma resposta suave entre 0 e 1.",
            "body": "Ela comprime extremos e deixa a faixa central mais sensível a pequenas mudanças.",
            "behavior": "Por isso é boa para interpretar saídas como probabilidade, embora possa saturar nas pontas.",
            "gradientNote": "Gradiente local é maior no meio e pequeno nas extremidades.",
            "outputRange": "Saída entre 0 e 1",
            "example": "Quando olhar para ela"
          }
        }
      },
      "en-us": {
        "ariaLabel": "Activation function visual comparator",
        "tabsAriaLabel": "Choose the activation function",
        "sliderLabel": "Adjust the raw value",
        "inputLabel": "z",
        "outputLabel": "a",
        "chartTitle": "Compare the same input across three functions",
        "infoTitle": "Function reading",
        "takeawayTitle": "What to retain",
        "takeawayBody": "Activation is not a cosmetic detail. It defines the neuron's response shape and therefore which patterns the network can represent and learn.",
        "comparisonNote": "The same \`z\` produces very different outputs depending on the chosen activation.",
        "functions": {
          "linear": {
            "label": "Linear",
            "formula": "a = z",
            "headline": "It neither bends nor compresses the signal: it only forwards the value.",
            "body": "It is a useful reference for comparison, but it does not add non-linearity.",
            "behavior": "If every layer were linear, the whole network would still collapse into a single linear transformation.",
            "gradientNote": "Constant derivative: the local gradient is always 1.",
            "outputRange": "Output has no upper or lower bound",
            "example": "When to read it"
          },
          "relu": {
            "label": "ReLU",
            "formula": "a = max(0, z)",
            "headline": "It cuts everything below zero and lets positive values pass through.",
            "body": "It introduces a simple threshold: off for negative values, active for positive ones.",
            "behavior": "That creates piecewise bends and lets the network assemble more flexible boundaries.",
            "gradientNote": "Local gradient is 0 on the negative side and 1 on the positive side.",
            "outputRange": "Output ranges from 0 to infinity",
            "example": "When to read it"
          },
          "sigmoid": {
            "label": "Sigmoid",
            "formula": "a = 1 / (1 + e^-z)",
            "headline": "It converts any raw value into a smooth response between 0 and 1.",
            "body": "It compresses extremes and makes the center region more sensitive to small changes.",
            "behavior": "That makes it useful for probability-like outputs, although it can saturate on the tails.",
            "gradientNote": "Local gradient is largest in the middle and small at the extremes.",
            "outputRange": "Output ranges from 0 to 1",
            "example": "When to read it"
          }
        }
      }
    },
  },
});
