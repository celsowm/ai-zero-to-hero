import { defineSlide } from './_factory';

export const neuralNetworkPytorchActivations = defineSlide({
  id: 'neural-network-pytorch-activations',
  type: 'two-column',
  options: {
    "columnRatios": [
      0.55,
      0.45
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
> O PyTorch oferece \`nn.ReLU()\` (para por no \`nn.Sequential\`) e \`torch.nn.functional.relu()\` (para chamar dentro de um método \`forward\` customizado). Elas fazem exatamente a mesma matemática.`,
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
> PyTorch offers \`nn.ReLU()\` (to put in an \`nn.Sequential\`) and \`torch.nn.functional.relu()\` (to call inside a custom \`forward\` method). They do exactly the same math.`,
    },
  },
});
