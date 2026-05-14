import { defineSlide } from './_factory';

export const neuralNetworkPytorchNnLinear = defineSlide({
  id: 'neural-network-pytorch-nn-linear',
  type: 'two-column',
  options: {
    "columnRatios": [
      0.55,
      0.45
    ]
  },
  content: {
    'pt-br': {
      title: `A base das redes: nn.Linear e nn.Sequential`,
      body: `No PyTorch, não multiplicamos matrizes e somamos *bias* na mão o tempo todo. O módulo \`torch.nn\` fornece blocos de construção prontos — os **Modules**.

### 1. nn.Linear (Camada Densa / Fully Connected)
A camada mais básica é a \`nn.Linear(in_features, out_features)\`. Ela aplica uma transformação linear aos dados: \`y = xA^T + b\`.
- **Pesos e Bias:** Ela cria e gerencia internamente os tensores \`weight\` e \`bias\`.
- **Iniciação:** Os pesos são inicializados automaticamente usando estratégias otimizadas (como Kaiming/He).
- **Sem ativação:** \`nn.Linear\` faz *apenas* a matemática linear. A ativação vem separada.

### 2. nn.Sequential (O contêiner)
Quando temos uma arquitetura sequencial simples (camada → ativação → camada → ativação), usamos \`nn.Sequential\`.
- Ele agrupa vários módulos em um único bloco.
- Ao chamar \`model(x)\`, o PyTorch passa \`x\` pelo primeiro módulo, pega a saída e passa pro segundo, e assim por diante.

> Construir redes no PyTorch é como montar blocos de Lego. Você encaixa \`nn.Linear\` e funções de ativação dentro de um \`nn.Sequential\`.

---

\`\`\`python
import torch.nn as nn
import torch

# Criando uma única camada
camada = nn.Linear(in_features=4, out_features=3)

# Pesos e bias são parâmetros que requerem gradiente
print(camada.weight.shape) # torch.Size([3, 4])
print(camada.bias.shape)   # torch.Size([3])

# Agrupando em uma rede completa
model = nn.Sequential(
    nn.Linear(4, 3),
    nn.ReLU(),
    nn.Linear(3, 1),
    nn.Sigmoid()
)
\`\`\``,
    },
    'en-us': {
      title: `The foundation of networks: nn.Linear and nn.Sequential`,
      body: `In PyTorch, we don't multiply matrices and add biases by hand all the time. The \`torch.nn\` module provides ready-made building blocks — the **Modules**.

### 1. nn.Linear (Dense / Fully Connected Layer)
The most basic layer is \`nn.Linear(in_features, out_features)\`. It applies a linear transformation to the incoming data: \`y = xA^T + b\`.
- **Weights and Bias:** It internally creates and manages the \`weight\` and \`bias\` tensors.
- **Initialization:** Weights are automatically initialized using optimized strategies (like Kaiming/He).
- **No activation:** \`nn.Linear\` does *only* the linear math. The activation is separate.

### 2. nn.Sequential (The container)
When we have a simple sequential architecture (layer → activation → layer → activation), we use \`nn.Sequential\`.
- It groups multiple modules into a single block.
- When calling \`model(x)\`, PyTorch passes \`x\` through the first module, takes the output and passes it to the second, and so on.

> Building networks in PyTorch is like snapping Lego bricks together. You fit \`nn.Linear\` and activation functions inside an \`nn.Sequential\`.

---

\`\`\`python
import torch.nn as nn
import torch

# Creating a single layer
layer = nn.Linear(in_features=4, out_features=3)

# Weights and bias are parameters that require gradients
print(layer.weight.shape) # torch.Size([3, 4])
print(layer.bias.shape)   # torch.Size([3])

# Grouping into a full network
model = nn.Sequential(
    nn.Linear(4, 3),
    nn.ReLU(),
    nn.Linear(3, 1),
    nn.Sigmoid()
)
\`\`\``,
    },
  },
});
