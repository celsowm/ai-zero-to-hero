import { defineSlide } from './_factory';

export const neuralNetworkPytorchOptimizers = defineSlide({
  id: 'neural-network-pytorch-optimizers',
  type: 'two-column',
  options: {
    "columnRatios": [
      0.4,
      0.6
    ]
  },
  content: {
    'pt-br': {
      title: `Otimizadores: a mecânica do aprendizado`,
      body: `Calcular o gradiente diz para qual direção ajustar os pesos, mas **como** e **o quanto** ajustar é papel do módulo \`torch.optim\`.

### O Desafio do "Vale"
A perda raramente é um buraco perfeito. Frequentemente ela parece um "vale" estreito (ravine).
- **SGD puro (Stochastic Gradient Descent):** Como ele só olha o gradiente atual, ele acaba "quicando" nas paredes do vale, avançando muito pouco para o centro.
- **Momentum:** Adiciona uma média móvel dos gradientes anteriores. Isso cancela as oscilações laterais e acelera o progresso na direção correta.
- **Adam (Adaptive Moment Estimation):** O "padrão ouro". Ele adapta a taxa de aprendizado para cada peso individualmente. Se um peso oscila muito, ele freia; se move pouco, ele acelera.

---

### A Receita de Treino
No loop de treino, o processo é sempre o mesmo:
1. **\`optimizer.zero_grad()\`**: Limpa o lixo do passo anterior.
2. **\`loss.backward()\`**: Calcula a nova "bússola" (gradientes).
3. **\`optimizer.step()\`**: Move os pesos na direção da bússola.

\`\`\`python
snippet:neural-networks/optimizers-demo
\`\`\`
`,
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

### The "Ravine" Challenge
Loss is rarely a perfect bowl. It often looks like a narrow "ravine".
- **Pure SGD (Stochastic Gradient Descent):** Since it only looks at the current gradient, it ends up "bouncing" off the ravine walls, making very little progress toward the center.
- **Momentum:** Adds a moving average of previous gradients. This cancels out side-to-side oscillations and accelerates progress in the correct direction.
- **Adam (Adaptive Moment Estimation):** The "gold standard". It adapts the learning rate for each weight individually. If a weight oscillates too much, it brakes; if it moves too little, it accelerates.

---

### The Training Recipe
In the training loop, the process is always the same:
1. **\`optimizer.zero_grad()\`**: Clears the trash from the previous step.
2. **\`loss.backward()\`**: Computes the new "compass" (gradients).
3. **\`optimizer.step()\`**: Moves the weights in the compass direction.

\`\`\`python
snippet:neural-networks/optimizers-demo
\`\`\`
`,
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
  visual: {
    id: 'optimizer-trajectory-visual',
    copy: {
      'pt-br': {
        title: 'Simulador de Trajetória',
        description: 'Veja como diferentes algoritmos navegam em um "vale" de perda',
        startLabel: 'Iniciar',
        resetLabel: 'Resetar',
        optimizerLabel: 'Otimizador',
        sgdLabel: 'SGD',
        momentumLabel: 'Momentum',
        adamLabel: 'Adam',
        lossLabel: 'Perda',
        iterationLabel: 'Iteração',
        insightTitle: 'Comportamento',
        insights: {
          sgd: 'Oscila muito nas paredes do vale, progredindo lentamente.',
          momentum: 'Ganha velocidade e "atravessa" o vale, convergindo mais rápido.',
          adam: 'Adapta a velocidade em cada direção, suavizando a descida.'
        }
      },
      'en-us': {
        title: 'Trajectory Simulator',
        description: 'See how different algorithms navigate a loss "ravine"',
        startLabel: 'Start',
        resetLabel: 'Reset',
        optimizerLabel: 'Optimizer',
        sgdLabel: 'SGD',
        momentumLabel: 'Momentum',
        adamLabel: 'Adam',
        lossLabel: 'Loss',
        iterationLabel: 'Iteration',
        insightTitle: 'Behavior',
        insights: {
          sgd: 'Oscillates wildly on the ravine walls, progressing slowly.',
          momentum: 'Gains speed and "shoots through" the valley, converging faster.',
          adam: 'Adapts speed in each direction, smoothing the descent.'
        }
      }
    }
  }
});
