import { defineSlide } from './_factory';

export const linearRegressionMse = defineSlide({
  id: 'linear-regression-mse',
  type: 'two-column',
  options: {
    "columnRatios": [
      0.62,
      0.38
    ]
  },
  content: {
    'pt-br': {
      title: `Regressão Linear: MSE, o erro médio ao quadrado`,
      body: `Para saber se o modelo está acertando, não podemos simplesmente somar os erros. Se ele prevê 5kg a mais numa pessoa (+5) e 5kg a menos noutra (-5), a soma dá zero. O modelo pareceria perfeito, mesmo tendo errado grosseiramente nas duas vezes!

Em vez de olhar para a "direção" do erro, o **MSE** (*Mean Squared Error*) olha para o **tamanho absoluto** dele, elevando cada erro ao quadrado:

1. **Fim dos cancelamentos:** Erros negativos viram positivos. Veja a aba *Regra de Sinais* ao lado: multiplicar um negativo por ele mesmo é como dar ré enquanto olha para o lado negativo — você sempre acaba avançando para o positivo. Errar é errar, não importa a direção.
2. **Punição severa:** Um erro de 2kg tem peso 4, mas um erro de 10kg explode para 100. O quadrado ensina o modelo a "odiar" erros gigantes.

O **MSE** é a **média** de todas essas punições. O objetivo matemático do treino é encontrar a reta que deixe esse número final o menor possível.

---`,
    },
    'en-us': {
      title: `Linear Regression: MSE, the mean squared error`,
      body: `To see if our model is doing well, we can't simply sum the errors. If it predicts 5kg too high for one person (+5) and 5kg too low for another (-5), the sum is zero. The model would look perfect, even though it made huge mistakes both times!

Instead of looking at the error's "direction", **MSE** (**Mean Squared Error**) looks at its **absolute size** by squaring each error:

1. **No more cancellations:** Negative errors become positive. Check the *Sign Rule* tab: multiplying a negative by a negative is like walking backwards while facing the negatives — you always end up in the positives. A mistake is a mistake, regardless of direction.
2. **Severe punishment:** A 2kg error has a weight of 4, but a 10kg error explodes to 100. The square teaches the model to "hate" extreme errors.

The **MSE** is the **average** of all these punishments. The mathematical goal of training is to find the line that makes this final number as small as possible.

---`,
    },
  },
  visual: {
    id: 'linear-regression-tabs',
    copy: {
      "pt-br": {
        "tabs": [
          {
            "label": "MSE"
          },
          {
            "label": "Resumo visual"
          },
          {
            "label": "Regra de Sinais"
          }
        ],
        "formulaPanel": {
          "eyebrow": "Erro total",
          "formula": "MSE = média((y - ŷ)²)",
          "description": "MSE significa Mean Squared Error, ou erro médio ao quadrado. No nosso exemplo, ele junta em um único número todos os erros de previsão de peso calculados a partir de altura e idade.",
          "points": [
            {
              "label": "erro ao quadrado não fica negativo",
              "accent": "#00e5ff"
            },
            {
              "label": "erros grandes contam mais",
              "accent": "#ff2e97"
            },
            {
              "label": "a média resume todo o dataset `(altura, idade, peso)`",
              "accent": "#fbbf24"
            }
          ],
          "footer": "Quando esse número cai, o modelo está ficando melhor."
        },
        "graphPanel": {
          "eyebrow": "Resumo do conjunto",
          "title": "Vários erros viram uma única medida",
          "description": "Cada erro de previsão de peso entra no cálculo e o conjunto todo é resumido em um valor único para orientar o treino.",
          "inputNodes": [],
          "outputLabel": "Custo do modelo",
          "outputNode": {
            "label": "MSE",
            "accent": "#fbbf24"
          },
          "chart": {
            "xLabel": "Exemplos do dataset",
            "yLabel": "Erro ao quadrado",
            "lineLabel": "cada erro contribui para o custo",
            "points": [
              {
                "x": 130,
                "y": 186,
                "label": "55",
                "accent": "#00e5ff"
              },
              {
                "x": 245,
                "y": 144,
                "label": "64",
                "accent": "#fbbf24"
              },
              {
                "x": 365,
                "y": 98,
                "label": "72",
                "accent": "#ff2e97"
              }
            ],
            "residuals": [
              {
                "x": 130,
                "yReal": 186,
                "yPred": 170,
                "label": "16²",
                "accent": "#ff2e97"
              },
              {
                "x": 245,
                "yReal": 144,
                "yPred": 136,
                "label": "8²",
                "accent": "#fbbf24"
              },
              {
                "x": 365,
                "yReal": 98,
                "yPred": 105,
                "label": "7²",
                "accent": "#00e5ff"
              }
            ],
            "lineStart": {
              "x": 112,
              "y": 194
            },
            "lineEnd": {
              "x": 398,
              "y": 90
            },
            "footer": "O treino observa esse custo agregado para ajustar `β₀`, `β₁` e `β₂`, não só um ponto isolado."
          },
          "footer": "O modelo não tenta “acertar um ponto”; ele tenta baixar o custo médio inteiro."
        },
        "numberLinePanel": {
          "eyebrow": "A Matemática Visual",
          "title": "Por que -4 × -4 = +16?",
          "description": "Multiplicar por um número negativo é inverter a direção. Veja o que acontece na reta numérica ao dar 4 passos para trás, virado para os números negativos.",
          "multiplyStart": -4,
          "multiplyEnd": -4,
          "steps": [
            { "value": 0, "label": "Ponto de partida: toda multiplicação começa do 0 (vazio)." },
            { "value": 4, "label": "Passo 1: olhando para os negativos e andando de costas, você cai no +4." },
            { "value": 8, "label": "Passo 2: mais um passo de costas, cai no +8." },
            { "value": 12, "label": "Passo 3: mais um passo, cai no +12." },
            { "value": 16, "label": "Passo 4: último passo, você termina no +16." }
          ],
          "footer": "Resultado: inverter a direção de um número negativo resulta na área positiva! (Nota: se a conta começasse do -4, estaríamos calculando -4 + (-4 × -4) = +12)."
        }
      },
      "en-us": {
        "tabs": [
          {
            "label": "MSE"
          },
          {
            "label": "Visual summary"
          },
          {
            "label": "Sign Rule"
          }
        ],
        "formulaPanel": {
          "eyebrow": "Total error",
          "formula": "MSE = mean((y - ŷ)²)",
          "description": "MSE means Mean Squared Error. In our example, it combines every weight prediction error generated from height and age into one number.",
          "points": [
            {
              "label": "squared error is never negative",
              "accent": "#00e5ff"
            },
            {
              "label": "large errors matter more",
              "accent": "#ff2e97"
            },
            {
              "label": "the mean summarizes the whole `(height, age, weight)` dataset",
              "accent": "#fbbf24"
            }
          ],
          "footer": "When this number goes down, the model is getting better."
        },
        "graphPanel": {
          "eyebrow": "Dataset summary",
          "title": "Many errors become one measure",
          "description": "Each weight prediction error enters the calculation and the full dataset is condensed into a single value that guides training.",
          "inputNodes": [],
          "outputLabel": "Model cost",
          "outputNode": {
            "label": "MSE",
            "accent": "#fbbf24"
          },
          "chart": {
            "xLabel": "Dataset examples",
            "yLabel": "Squared error",
            "lineLabel": "each error contributes to cost",
            "points": [
              {
                "x": 130,
                "y": 186,
                "label": "55",
                "accent": "#00e5ff"
              },
              {
                "x": 245,
                "y": 144,
                "label": "64",
                "accent": "#fbbf24"
              },
              {
                "x": 365,
                "y": 98,
                "label": "72",
                "accent": "#ff2e97"
              }
            ],
            "residuals": [
              {
                "x": 130,
                "yReal": 186,
                "yPred": 170,
                "label": "16²",
                "accent": "#ff2e97"
              },
              {
                "x": 245,
                "yReal": 144,
                "yPred": 136,
                "label": "8²",
                "accent": "#fbbf24"
              },
              {
                "x": 365,
                "yReal": 98,
                "yPred": 105,
                "label": "7²",
                "accent": "#00e5ff"
              }
            ],
            "lineStart": {
              "x": 112,
              "y": 194
            },
            "lineEnd": {
              "x": 398,
              "y": 90
            },
            "footer": "Training looks at this aggregated cost to adjust `a`, `b`, and `c`, not just one isolated point."
          },
          "footer": "The model does not try to “hit one point”; it tries to lower the overall mean cost."
        },
        "numberLinePanel": {
          "eyebrow": "Visual Math",
          "title": "Why is -4 × -4 = +16?",
          "description": "Multiplying by a negative number means reversing direction. See what happens on the number line when you take 4 steps backward while facing the negative numbers.",
          "multiplyStart": -4,
          "multiplyEnd": -4,
          "steps": [
            { "value": 0, "label": "Starting point: all multiplication starts at 0 (empty)." },
            { "value": 4, "label": "Step 1: facing the negatives and walking backwards, you land on +4." },
            { "value": 8, "label": "Step 2: one more step backwards, land on +8." },
            { "value": 12, "label": "Step 3: one more step, land on +12." },
            { "value": 16, "label": "Step 4: last step, you end up at +16." }
          ],
          "footer": "Result: reversing the direction of a negative puts you in the positive area! (Note: if we started from -4, we'd be calculating -4 + (-4 × -4) = +12)."
        }
      }
    },
  },
});
