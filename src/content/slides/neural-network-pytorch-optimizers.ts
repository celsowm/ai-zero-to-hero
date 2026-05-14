import { defineSlide } from './_factory';

export const neuralNetworkPytorchOptimizers = defineSlide({
  id: 'neural-network-pytorch-optimizers',
  type: 'two-column',
  options: {
    "columnRatios": [
      0.55,
      0.45
    ]
  },
  content: {
    'pt-br': {
      title: `Otimizadores: a mecânica do aprendizado`,
      body: `Calcular o gradiente diz para qual direção ajustar os pesos, mas **como** e **o quanto** ajustar é papel do módulo \`torch.optim\`.

### SGD (Stochastic Gradient Descent)
É a aplicação literal da fórmula: \`novo_peso = peso - (learning_rate * gradiente)\`.
- **Momentum:** Imagine uma bolinha descendo uma ladeira. O SGD puro para nos buracos. Com *Momentum*, a bolinha ganha inércia e consegue passar por "vales falsos" (mínimos locais) usando a velocidade acumulada das etapas anteriores.

### Adam (Adaptive Moment Estimation)
O padrão de ouro da indústria. Em vez de usar a mesma \`learning_rate\` para tudo, o Adam mantém um histórico estatístico para cada peso individual.
- Pesos que mudam muito pouco ganham um "empurrão extra" na taxa de aprendizado.
- Pesos que oscilam descontroladamente são "freados".
- **Resultado:** Convergência muito mais rápida e estável na maioria dos problemas.

---

### A mecânica do passo a passo
Durante o loop de treino, você sempre chamará três métodos do otimizador:

1. **\`optimizer.zero_grad()\`**: O PyTorch *acumula* gradientes por padrão. Você precisa limpá-los antes do próximo cálculo, senão os erros do passo anterior se misturam com os novos.
2. **\`loss.backward()\`** *(do tensor, não do optim)*: Calcula todos os gradientes.
3. **\`optimizer.step()\`**: Lê os gradientes recém calculados e aplica a matemática do SGD ou do Adam para atualizar os pesos do \`model\`.

---

\`\`\`python
snippet:neural-networks/optimizers-demo
\`\`\`

### O que observar
- \`zero_grad()\` **antes** do \`backward()\): sem isso, gradientes acumulam
- \`step()\` **depois** do \`backward()\): a ordem é fixa
- Trocar de otimizador = trocar apenas a linha de criação`,
      codeExplanations: [
    {
      "lineRange": [1, 6],
      "content": "Preparação dos dados e modelo simples para demonstrar os otimizadores."
    },
    {
      "lineRange": [8, 12],
      "content": "SGD com momentum=0.9: acumula velocidade das iterações anteriores para passar mínimos locais."
    },
    {
      "lineRange": [14, 16],
      "content": "Adam: mantém taxa de aprendizado adaptativa por parâmetro — é o padrão da indústria."
    },
    {
      "lineRange": [18, 34],
      "content": "Loop de treino com os 3 passos obrigatórios: zero_grad() limpa, backward() calcula gradientes, step() aplica atualização."
    },
    {
      "lineRange": [35, 36],
      "content": "Dica prática: trocar de otimizador requer mudar apenas uma linha — a interface é sempre a mesma."
    }
  ],
    },
    'en-us': {
      title: `Optimizers: the mechanics of learning`,
      body: `Calculating the gradient tells us which direction to adjust the weights, but **how** and **how much** to adjust is the job of the \`torch.optim\` module.

### SGD (Stochastic Gradient Descent)
It's the literal application of the formula: \`new_weight = weight - (learning_rate * gradient)\`.
- **Momentum:** Imagine a marble rolling down a hill. Pure SGD stops in potholes. With *Momentum*, the marble gains inertia and can push through "fake valleys" (local minima) using the accumulated speed from previous steps.

### Adam (Adaptive Moment Estimation)
The industry gold standard. Instead of using the same \`learning_rate\` for everything, Adam maintains a statistical history for each individual weight.
- Weights that change very little get an "extra push" in their learning rate.
- Weights that oscillate wildly are "braked".
- **Result:** Much faster and stable convergence in most problems.

---

### The step-by-step mechanics
During the training loop, you will always call three optimizer methods:

1. **\`optimizer.zero_grad()\`**: PyTorch *accumulates* gradients by default. You need to clear them before the next calculation, otherwise errors from the previous step mix with the new ones.
2. **\`loss.backward()\`** *(from the tensor, not the optim)*: Calculates all gradients.
3. **\`optimizer.step()\`**: Reads the newly calculated gradients and applies the math of SGD or Adam to update the \`model\`'s weights.

---

\`\`\`python
snippet:neural-networks/optimizers-demo
\`\`\`

### What to watch
- \`zero_grad()\` **before** \`backward()\`: without this, gradients accumulate
- \`step()\` **after** \`backward()\`: the order is fixed
- Switching optimizer = changing only the optimizer creation line`,
      codeExplanations: [
    {
      "lineRange": [1, 6],
      "content": "Data and simple model setup to demonstrate the optimizers."
    },
    {
      "lineRange": [8, 12],
      "content": "SGD with momentum=0.9: accumulates speed from previous iterations to pass local minima."
    },
    {
      "lineRange": [14, 16],
      "content": "Adam: maintains adaptive learning rate per parameter — it's the industry standard."
    },
    {
      "lineRange": [18, 34],
      "content": "Training loop with the 3 mandatory steps: zero_grad() clears, backward() computes gradients, step() applies update."
    },
    {
      "lineRange": [35, 36],
      "content": "Practical tip: switching optimizer requires changing only one line — the interface is always the same."
    }
  ],
    },
  },
});
