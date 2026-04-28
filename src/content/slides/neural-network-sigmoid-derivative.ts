import { defineSlide } from './_factory';

export const neuralNetworkSigmoidDerivative = defineSlide({
  id: 'neural-network-sigmoid-derivative',
  type: 'two-column',
  options: {
    "columnRatios": [
      0.42,
      0.58
    ]
  },
  content: {
    'pt-br': {
      title: `Sigmoid e sua derivada: onde o gradiente ainda esta vivo`,
      body: `Depois de entender a formula da sigmoid, agora o foco muda: **como ela influencia o treino**.

1. **A derivada pode ser escrita de forma muito compacta:**

\`\`\`txt
sigmoid'(z) = sigmoid(z) * (1 - sigmoid(z))
\`\`\`

2. **O pico acontece em \`z = 0\`:** nesse ponto, \`sigmoid(z) = 0.5\`, entao a derivada vira \`0.5 * 0.5 = 0.25\`. Esse e o maior valor possivel.

3. **Nas pontas, a derivada cai:** quando a saida se aproxima muito de \`0\` ou \`1\`, o produto \`y * (1 - y)\` fica pequeno. Isso enfraquece o sinal de correcao no backpropagation.

4. **Conexao direta com o nosso codigo:** no exemplo minimo usamos \`dsigmoid(y) = y * (1 - y)\`. A funcao recebe a ativacao \`y\`, nao o \`z\`, porque ja podemos reaproveitar a saida da sigmoid para calcular o gradiente local.

> O ponto principal agora nao e so a forma da curva. E o quanto de inclinacao ainda resta para o erro conseguir ajustar os pesos.

### Leitura pratica
- em \`z = 0\`, o gradiente local esta no maximo
- nas caudas, o gradiente encolhe
- backpropagation forte depende de derivadas que ainda nao colapsaram`,
      codeExplanations: [

  ],
    },
    'en-us': {
      title: `Sigmoid and its derivative: where the gradient is still alive`,
      body: `After understanding the sigmoid formula, the focus now shifts to **how it affects training**.

1. **Its derivative can be written in a very compact form:**

\`\`\`txt
sigmoid'(z) = sigmoid(z) * (1 - sigmoid(z))
\`\`\`

2. **The peak happens at \`z = 0\`:** at that point \`sigmoid(z) = 0.5\`, so the derivative becomes \`0.5 * 0.5 = 0.25\`. That is the largest value it can reach.

3. **At the tails the derivative drops:** when the output gets very close to \`0\` or \`1\`, the product \`y * (1 - y)\` becomes small. That weakens the correction signal during backpropagation.

4. **Direct connection to our code:** in the minimal example we use \`dsigmoid(y) = y * (1 - y)\`. The function receives the activation \`y\`, not \`z\`, because we can reuse the sigmoid output to compute the local gradient.

> The key point now is not only the curve shape. It is how much slope is still left for the error signal to adjust the weights.

### Practical reading
- at \`z = 0\`, the local gradient is at its maximum
- on the tails, the gradient shrinks
- strong backpropagation depends on derivatives that have not collapsed yet`,
      codeExplanations: [

  ],
    },
  },
  visual: {
    id: 'sigmoid-derivative-explorer',
    copy: {
      "pt-br": {
        "ariaLabel": "Explorador da sigmoid e de sua derivada",
        "sliderLabel": "Deslize o valor bruto",
        "sigmoidChartTitle": "Curva da sigmoid",
        "derivativeChartTitle": "Curva da derivada",
        "inputLabel": "z",
        "sigmoidLabel": "sigmoid(z)",
        "derivativeLabel": "sigmoid prime",
        "equivalenceLabel": "y * (1 - y)",
        "formulaTitle": "Formula central",
        "formula": "sigmoid(z) = 1 / (1 + e^-z)",
        "derivativeFormula": "sigmoid prime = sigmoid(z) * (1 - sigmoid(z))",
        "maxDerivativeLabel": "max = 0.25 em z = 0",
        "peakTitle": "Pico de aprendizado",
        "peakBody": "Em `z = 0`, a sigmoid vale `0.5`, entao a derivada vira `0.5 * 0.5 = 0.25`. Esse e o ponto em que o gradiente local carrega mais informacao.",
        "saturationTitle": "Saturacao e gradiente fraco",
        "saturationBody": "Quando `z` vai muito para a esquerda ou direita, a saida se aproxima de `0` ou `1`. O produto `y * (1 - y)` encolhe e o erro volta enfraquecido.",
        "trainingTitle": "Conexao direta com dsigmoid(y)",
        "trainingBody": "No nosso codigo, `dsigmoid(y)` recebe a ativacao ja calculada. Isso evita recalcular `sigmoid(z)` e mostra que o gradiente local pode ser obtido so com `y`.",
        "zones": {
          "center": "Centro: gradiente forte",
          "transition": "Transicao: gradiente moderado",
          "tail": "Cauda: gradiente fraco"
        }
      },
      "en-us": {
        "ariaLabel": "Sigmoid and derivative explorer",
        "sliderLabel": "Slide the raw value",
        "sigmoidChartTitle": "Sigmoid curve",
        "derivativeChartTitle": "Derivative curve",
        "inputLabel": "z",
        "sigmoidLabel": "sigmoid(z)",
        "derivativeLabel": "sigmoid prime",
        "equivalenceLabel": "y * (1 - y)",
        "formulaTitle": "Core formula",
        "formula": "sigmoid(z) = 1 / (1 + e^-z)",
        "derivativeFormula": "sigmoid prime = sigmoid(z) * (1 - sigmoid(z))",
        "maxDerivativeLabel": "max = 0.25 at z = 0",
        "peakTitle": "Learning peak",
        "peakBody": "At `z = 0`, sigmoid equals `0.5`, so the derivative becomes `0.5 * 0.5 = 0.25`. That is the point where the local gradient carries the most information.",
        "saturationTitle": "Saturation and weak gradient",
        "saturationBody": "When `z` moves far left or right, the output approaches `0` or `1`. The product `y * (1 - y)` shrinks and the returning error signal gets weaker.",
        "trainingTitle": "Direct link to dsigmoid(y)",
        "trainingBody": "In our code, `dsigmoid(y)` receives the already computed activation. That avoids recomputing `sigmoid(z)` and shows that the local gradient can be recovered from `y` alone.",
        "zones": {
          "center": "Center: strong gradient",
          "transition": "Transition: moderate gradient",
          "tail": "Tail: weak gradient"
        }
      }
    },
  },
});
