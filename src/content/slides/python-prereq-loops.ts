import { defineSlide } from './_factory';

export const pythonPrereqLoops = defineSlide({
  id: 'python-prereq-loops',
  type: 'two-column',
  options: {
    "columnRatios": [
      0.95,
      1.05
    ]
  },
  content: {
    'pt-br': {
      title: `Python Essencial: loop e acumulador`,
      body: `Agora juntamos dados e função com iteração, que é a base de várias rotinas de ML.

1. **\`for\` percorre o dataset:** cada tupla vira uma rodada de cálculo.

2. **Desempacotamento:** \`altura, idade, y_real\` deixa o código legível.

3. **Acumulador (\`+=\`):** soma resultados parciais sem perder o histórico.

4. **Média com \`len\`:** divide o total pelo número de exemplos.

> Esse padrão de loop prepara o terreno para MSE e treino por gradiente.

---

### Prévia de erro médio
\`\`\`python
snippet:python-prereq/loops
\`\`\`

- loop: calcula erro para cada amostra
- acumulador: soma os erros
- média final: referência rápida para qualidade da predição`,
      codeExplanations: [
    {
    "lineRange": [
      1,
      6
    ],
    "content": "Este bloco prepara o dataset e os coeficientes fixos usados na simulação."
  },
    {
    "lineRange": [
      7,
      7
    ],
    "content": "O acumulador é zerado antes do loop para receber a soma parcial dos erros."
  },
    {
    "lineRange": [
      8,
      11
    ],
    "content": "O loop percorre cada amostra, calcula a predição e transforma isso em erro por exemplo."
  },
    {
    "lineRange": [
      12,
      12
    ],
    "content": "Aqui usamos `len(dados)` para transformar o total acumulado em erro médio."
  },
    {
    "lineRange": [
      13,
      13
    ],
    "content": "A linha final imprime a média para leitura imediata."
  }
  ],
    },
    'en-us': {
      title: `Python Essentials: loop and accumulator`,
      body: `Now we combine data and functions with iteration, which underpins many ML routines.

1. **\`for\` walks through the dataset:** each tuple becomes one computation step.

2. **Unpacking:** \`height, age, y_real\` keeps code readable.

3. **Accumulator (\`+=\`):** adds partial results while preserving history.

4. **Average with \`len\`:** divide the total by the number of examples.

> This loop pattern prepares the ground for MSE and gradient-based training.

---

### Average error preview
\`\`\`python
snippet:python-prereq/loops
\`\`\`

- loop: computes one error per sample
- accumulator: sums all errors
- final average: quick reference for prediction quality`,
      codeExplanations: [
    {
    "lineRange": [
      1,
      6
    ],
    "content": "This block prepares the dataset and fixed coefficients used in the simulation."
  },
    {
    "lineRange": [
      7,
      7
    ],
    "content": "The accumulator is zeroed before the loop to collect the partial sum of errors."
  },
    {
    "lineRange": [
      8,
      11
    ],
    "content": "The loop iterates through samples, computes one prediction, and derives one error each round."
  },
    {
    "lineRange": [
      12,
      12
    ],
    "content": "Here `len(data)` converts the accumulated total into an average error value."
  },
    {
    "lineRange": [
      13,
      13
    ],
    "content": "The final line prints the average for immediate inspection."
  }
  ],
    },
  },
  visual: {
    id: 'python-prereq-tabs',
    copy: {
      "pt-br": {
        "tabs": [
          {
          "label": "Código"
        },
          {
          "label": "Gráfico interativo"
        }
        ],
        "codePanel": {
          "title": "Código: loop com acumulador",
          "description": "Prévia do padrão de iteração usado depois no cálculo de erro e treino.",
          "source": {
            "snippetId": "python-prereq/loops",
            "language": "python"
          },
          "codeExplanations": [
            {
            "lineRange": [
              1,
              6
            ],
            "content": "Este bloco prepara o dataset e os coeficientes fixos usados na simulação."
          },
            {
            "lineRange": [
              7,
              7
            ],
            "content": "O acumulador é zerado antes do loop para receber a soma parcial dos erros."
          },
            {
            "lineRange": [
              8,
              11
            ],
            "content": "O loop percorre cada amostra, calcula a predição e transforma isso em erro por exemplo."
          },
            {
            "lineRange": [
              12,
              12
            ],
            "content": "Aqui usamos `len(dados)` para transformar o total acumulado em erro médio."
          },
            {
            "lineRange": [
              13,
              13
            ],
            "content": "A linha final imprime a média para leitura imediata."
          }
          ]
        },
        "graphPanel": {
          "type": "loops",
          "title": "Evolução do erro no loop",
          "description": "Avance o passo para ver o acumulador sendo construído amostra por amostra.",
          "xLabel": "Amostras",
          "yLabel": "Erro por amostra",
          "stepLabel": "Passo do loop",
          "processedLabel": "Processadas",
          "totalErrorLabel": "Erro total",
          "averageErrorLabel": "Erro médio",
          "dataset": [
            {
            "label": "A",
            "height": 160,
            "age": 20,
            "realWeight": 55
          },
            {
            "label": "B",
            "height": 165,
            "age": 24,
            "realWeight": 59
          },
            {
            "label": "C",
            "height": 170,
            "age": 28,
            "realWeight": 64
          }
          ],
          "coefficients": {
            "beta0": -21,
            "beta1": 0.4,
            "beta2": 0.6
          }
        },
        "footer": "A lógica do acumulador aparece aqui em versão reduzida, antes de entrar no MSE completo."
      },
      "en-us": {
        "tabs": [
          {
          "label": "Code"
        },
          {
          "label": "Interactive chart"
        }
        ],
        "codePanel": {
          "title": "Code: loop with accumulator",
          "description": "Preview of the iteration pattern used later for error computation and training.",
          "source": {
            "snippetId": "python-prereq/loops",
            "language": "python"
          },
          "codeExplanations": [
            {
            "lineRange": [
              1,
              6
            ],
            "content": "This block prepares the dataset and fixed coefficients used in the simulation."
          },
            {
            "lineRange": [
              7,
              7
            ],
            "content": "The accumulator is zeroed before the loop to collect the partial sum of errors."
          },
            {
            "lineRange": [
              8,
              11
            ],
            "content": "The loop iterates through samples, computes one prediction, and derives one error each round."
          },
            {
            "lineRange": [
              12,
              12
            ],
            "content": "Here `len(data)` converts the accumulated total into an average error value."
          },
            {
            "lineRange": [
              13,
              13
            ],
            "content": "The final line prints the average for immediate inspection."
          }
          ]
        },
        "graphPanel": {
          "type": "loops",
          "title": "Error evolution in the loop",
          "description": "Advance the step to see the accumulator being built sample by sample.",
          "xLabel": "Samples",
          "yLabel": "Error per sample",
          "stepLabel": "Loop step",
          "processedLabel": "Processed",
          "totalErrorLabel": "Total error",
          "averageErrorLabel": "Average error",
          "dataset": [
            {
            "label": "A",
            "height": 160,
            "age": 20,
            "realWeight": 55
          },
            {
            "label": "B",
            "height": 165,
            "age": 24,
            "realWeight": 59
          },
            {
            "label": "C",
            "height": 170,
            "age": 28,
            "realWeight": 64
          }
          ],
          "coefficients": {
            "beta0": -21,
            "beta1": 0.4,
            "beta2": 0.6
          }
        },
        "footer": "The accumulator logic appears here in compact form before full MSE."
      }
    },
  },
});
