import { defineSlide } from './_factory';

export const neuralNetworkWeightsAndBiases = defineSlide({
  id: 'neural-network-weights-and-biases',
  type: 'two-column',
  options: {
    "columnRatios": [
      0.52,
      0.48
    ]
  },
  visual: {
    id: 'weights-biases-explorer',
    copy: {
      'pt-br': {
        tabs: [{ label: 'O Peso (w)' }, { label: 'O Viés (b)' }, { label: 'Juntos (w e b)' }],
        weightPanel: {
          eyebrow: 'O Efeito Multiplicador',
          title: 'Pesos giram a reta',
          description: 'O peso funciona como um acelerador ou freio. Um peso positivo amplifica a entrada. Um peso negativo inverte a lógica (entrada grande = saída pequena). Tente chegar a zero para anular a entrada.',
          sliderLabel: 'Valor do Peso',
          min: -3,
          max: 3,
          step: 0.1,
          initialValue: 1,
        },
        biasPanel: {
          eyebrow: 'O Deslocamento',
          title: 'Vieses movem a reta',
          description: 'O viés funciona como uma vantagem inicial. Mesmo se a entrada for zero (no centro do gráfico), o viés garante que o neurônio tenha uma base positiva ou negativa.',
          sliderLabel: 'Valor do Viés',
          min: -5,
          max: 5,
          step: 0.5,
          initialValue: 0,
        },
        combinedPanel: {
          eyebrow: 'A Combinação',
          title: 'Criando qualquer reta',
          description: 'Sozinho, o peso só consegue girar a reta em torno do zero. Sozinho, o viés só sobe e desce a reta sem mudar a inclinação. Juntos, eles podem posicionar a ativação do neurônio em qualquer lugar do espaço!',
        },
        chartTitle: 'Gráfico: y = w*x + b',
        xLabel: 'Entrada (x)',
        yLabel: 'Saída (y)',
      },
      'en-us': {
        tabs: [{ label: 'The Weight (w)' }, { label: 'The Bias (b)' }, { label: 'Combined (w & b)' }],
        weightPanel: {
          eyebrow: 'The Multiplier Effect',
          title: 'Weights rotate the line',
          description: 'The weight acts like an accelerator or a brake. A positive weight amplifies the input. A negative weight reverses the logic (large input = small output). Try reaching zero to cancel out the input.',
          sliderLabel: 'Weight Value',
          min: -3,
          max: 3,
          step: 0.1,
          initialValue: 1,
        },
        biasPanel: {
          eyebrow: 'The Shift',
          title: 'Biases translate the line',
          description: 'The bias acts as a head start. Even if the input is zero (at the center of the graph), the bias ensures the neuron has a positive or negative baseline.',
          sliderLabel: 'Bias Value',
          min: -5,
          max: 5,
          step: 0.5,
          initialValue: 0,
        },
        combinedPanel: {
          eyebrow: 'The Combination',
          title: 'Creating any line',
          description: 'Alone, the weight can only rotate the line around zero. Alone, the bias can only shift the line without changing its slope. Together, they can position the neuron\'s activation anywhere in space!',
        },
        chartTitle: 'Graph: y = w*x + b',
        xLabel: 'Input (x)',
        yLabel: 'Output (y)',
      },
    }
  },
  content: {
    'pt-br': {
      title: `Pesos e vieses: o que cada um faz`,
      body: `Quando escrevemos \`z = w^T x + b\` *(lê-se: "zê é igual ao vetor de pesos transposto multiplicado pela entrada xis, mais o viés")*, dois tipos de parâmetro aparecem. Eles não fazem a mesma coisa.

1. **Peso (\`w\`) multiplica entrada:** ele mede o quanto cada feature empurra a resposta do neurônio.

2. **Viés (\`b\`) soma uma base:** ele desloca a conta inteira para cima ou para baixo, mesmo quando as entradas são zero.

3. **Sinal importa:** peso positivo aumenta \`z\` quando a entrada cresce; peso negativo faz o contrário.

4. **Treino ajusta ambos:** aprender não é só trocar inclinação. É também mover o ponto em que o neurônio começa a ativar.

> Regra curta: peso decide "o quanto cada entrada conta"; viés decide "de onde a conta começa".

### Fórmula concreta
\`\`\`python
snippet:neural-networks/weights-biases-formula
\`\`\`

### Cada símbolo, o que é

\`\`\`python
snippet:neural-networks/weights-biases-symbols
\`\`\`

### Exemplo numérico

\`\`\`python
snippet:neural-networks/weights-biases-example
\`\`\`

### Ideia principal
Se dois neurônios recebem as mesmas entradas, mas têm pesos ou viés diferentes, eles podem reagir de formas completamente diferentes.

### Por que uma reta se neurônios são não-lineares?
Boa pergunta. Este slide mostra **só a parte linear** — o cálculo de \`z\` **antes** da ativação. A função \`σ(z)\` (sigmoid, ReLU, etc.) entra no próximo slide e é ela que curva a reta.

1. **Pesos + viés** → produzem uma reta (combinação linear)
2. **Ativação** → "dobra" essa reta, criando não-linearidade

Sem o passo 2, toda a rede seria equivalente a uma única regressão linear — por isso a ativação é essencial.`,
      codeExplanations: [
        {
          lineRange: [1, 2],
          content: 'A operação fundamental: multiplicamos cada entrada pelo seu peso e somamos tudo, incluindo o viés.',
        },
        {
          lineRange: [1, 1],
          content: 'As entradas são os dados brutos ou a saída da camada anterior.',
        },
        {
          lineRange: [2, 2],
          content: 'Os pesos representam a força da conexão de cada entrada.',
        },
        {
          lineRange: [3, 3],
          content: 'O viés permite que o neurônio tenha uma saída mesmo com entradas nulas.',
        },
        {
          lineRange: [4, 4],
          content: 'O cálculo final combina tudo em um único valor escalar.',
        },
        {
          lineRange: [1, 3],
          content: 'Valores concretos para testar a matemática.',
        },
        {
          lineRange: [6, 8],
          content: 'Cada termo (t) mostra a contribuição individual de cada entrada.',
        },
        {
          lineRange: [9, 9],
          content: 'A soma final de todos os termos ponderados mais o viés.',
        },
      ],
    },
    'en-us': {
      title: `Weights and biases: what each one does`,
      body: `When we write \`z = w^T x + b\` *(read as: "z equals the weight vector transpose multiplied by the input x, plus the bias")*, two kinds of parameters appear. They do not play the same role.

1. **Weight (\`w\`) multiplies an input:** it measures how much each feature pushes the neuron's response.

2. **Bias (\`b\`) adds a base term:** it shifts the whole calculation up or down even when all inputs are zero.

3. **The sign matters:** a positive weight increases \`z\` as the input grows; a negative weight does the opposite.

4. **Training adjusts both:** learning is not only changing slopes. It also moves the point where the neuron starts to activate.

> Short rule: weight decides “how much each input counts”; bias decides “where the calculation starts”.

### Concrete formula
\`\`\`python
snippet:neural-networks/weights-biases-formula
\`\`\`

### What each symbol means

\`\`\`python
snippet:neural-networks/weights-biases-symbols
\`\`\`

### Numerical example

\`\`\`python
snippet:neural-networks/weights-biases-example
\`\`\`

### Main idea
If two neurons receive the same inputs but have different weights or bias, they can react in completely different ways.

### Why a straight line if neurons are non-linear?
Good question. This slide shows **only the linear part** — the calculation of \`z\` **before** activation. The function \`σ(z)\` (sigmoid, ReLU, etc.) comes in the next slide and is what curves the line.

1. **Weights + bias** → produce a straight line (linear combination)
2. **Activation** → "bends" that line, creating non-linearity

Without step 2, the entire network would be equivalent to a single linear regression — that's why activation is essential.`,
      codeExplanations: [
        {
          lineRange: [1, 2],
          content: 'The fundamental operation: multiply each input by its weight and sum everything up, including the bias.',
        },
        {
          lineRange: [1, 1],
          content: 'Inputs are the raw data or the output from the previous layer.',
        },
        {
          lineRange: [2, 2],
          content: 'Weights represent the strength of each input connection.',
        },
        {
          lineRange: [3, 3],
          content: 'The bias allows the neuron to have an output even with zero inputs.',
        },
        {
          lineRange: [4, 4],
          content: 'The final calculation combines everything into a single scalar value.',
        },
        {
          lineRange: [1, 3],
          content: 'Concrete values to test the math.',
        },
        {
          lineRange: [6, 8],
          content: 'Each term (t) shows the individual contribution of each input.',
        },
        {
          lineRange: [9, 9],
          content: 'The final sum of all weighted terms plus the bias.',
        },
      ],
    },
  },
});
