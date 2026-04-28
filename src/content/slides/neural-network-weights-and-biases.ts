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
  content: {
    'pt-br': {
      title: `Pesos e vieses: o que cada um faz`,
      body: `Quando escrevemos \`z = w^T x + b\`, dois tipos de parâmetro aparecem. Eles não fazem a mesma coisa.

1. **Peso (\`w\`) multiplica entrada:** ele mede o quanto cada feature empurra a resposta do neurônio.

2. **Viés (\`b\`) soma uma base:** ele desloca a conta inteira para cima ou para baixo, mesmo quando as entradas são zero.

3. **Sinal importa:** peso positivo aumenta \`z\` quando a entrada cresce; peso negativo faz o contrário.

4. **Treino ajusta ambos:** aprender não é só trocar inclinação. É também mover o ponto em que o neurônio começa a ativar.

> Regra curta: peso decide "o quanto cada entrada conta"; viés decide "de onde a conta começa".

### Fórmula concreta
\`\`\`txt
z = w1*x1 + w2*x2 + w3*x3 + b
\`\`\`

### Leitura prática
- \`w1, w2, w3\`: importância relativa de cada entrada
- \`b\`: deslocamento da soma
- \`z\`: valor bruto antes da ativação

---

### Exemplo numérico
Suponha:

\`\`\`txt
x = [0.8, 0.4, 0.1]
w = [0.6, -0.5, 0.2]
b = -0.1
\`\`\`

Então:

\`\`\`txt
z = 0.6*0.8 + (-0.5)*0.4 + 0.2*0.1 - 0.1
z = 0.48 - 0.20 + 0.02 - 0.10 = 0.20
\`\`\`

### O que mudou cada termo
| Termo | Efeito |
| --- | --- |
| \`0.6*0.8\` | entrada 1 empurra \`z\` para cima |
| \`-0.5*0.4\` | entrada 2 empurra \`z\` para baixo |
| \`0.2*0.1\` | entrada 3 contribui pouco |
| \`b = -0.1\` | desloca a soma final para baixo |

### Ideia principal
Se dois neurônios recebem as mesmas entradas, mas têm pesos ou viés diferentes, eles podem reagir de formas completamente diferentes.`,
      codeExplanations: [

  ],
    },
    'en-us': {
      title: `Weights and biases: what each one does`,
      body: `When we write \`z = w^T x + b\`, two kinds of parameters appear. They do not play the same role.

1. **Weight (\`w\`) multiplies an input:** it measures how much each feature pushes the neuron's response.

2. **Bias (\`b\`) adds a base term:** it shifts the whole calculation up or down even when all inputs are zero.

3. **The sign matters:** a positive weight increases \`z\` as the input grows; a negative weight does the opposite.

4. **Training adjusts both:** learning is not only changing slopes. It also moves the point where the neuron starts to activate.

> Short rule: weight decides “how much each input counts”; bias decides “where the calculation starts”.

### Concrete formula
\`\`\`txt
z = w1*x1 + w2*x2 + w3*x3 + b
\`\`\`

### Practical reading
- \`w1, w2, w3\`: relative importance of each input
- \`b\`: shift applied to the sum
- \`z\`: raw value before activation

---

### Numerical example
Suppose:

\`\`\`txt
x = [0.8, 0.4, 0.1]
w = [0.6, -0.5, 0.2]
b = -0.1
\`\`\`

Then:

\`\`\`txt
z = 0.6*0.8 + (-0.5)*0.4 + 0.2*0.1 - 0.1
z = 0.48 - 0.20 + 0.02 - 0.10 = 0.20
\`\`\`

### What each term changed
| Term | Effect |
| --- | --- |
| \`0.6*0.8\` | input 1 pushes \`z\` upward |
| \`-0.5*0.4\` | input 2 pushes \`z\` downward |
| \`0.2*0.1\` | input 3 contributes only a little |
| \`b = -0.1\` | shifts the final sum downward |

### Main idea
If two neurons receive the same inputs but have different weights or bias, they can react in completely different ways.`,
      codeExplanations: [

  ],
    },
  },
});
