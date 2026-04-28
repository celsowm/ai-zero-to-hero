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
      body: `Agora que já sabemos medir o erro para cada pessoa com **altura**, **idade** e **peso real**, precisamos juntar tudo em um número só. Esse número é o MSE, abreviação de **Mean Squared Error**, ou **erro médio ao quadrado**.

1. **Cada exemplo gera um erro:** para cada linha do dataset \`(altura, idade, peso)\`, comparamos \`ŷ\` com \`y\`.

2. **Elevamos ao quadrado:** assim o erro negativo não cancela o positivo e os erros grandes pesam mais.

3. **Tiramos a média:** o resultado resume o comportamento do modelo em todo o conjunto.

4. **Objetivo do treino:** a regressão linear procura os parâmetros \`β₀\`, \`β₁\` e \`β₂\` que deixam esse número o menor possível.

> Em regressão linear, o treino quer minimizar o MSE do conjunto inteiro, não apenas um erro isolado.

---`,
    },
    'en-us': {
      title: `Linear Regression: MSE, the mean squared error`,
      body: `Now that we can measure the error for each person with **height**, **age**, and **real weight**, we need to combine everything into one number. That number is MSE, short for **Mean Squared Error**.

1. **Each example produces an error:** for every row in the dataset \`(height, age, weight)\`, we compare \`ŷ\` with \`y\`.

2. **We square the error:** this keeps negative errors from canceling positive ones and makes large mistakes matter more.

3. **We take the average:** the result summarizes how the model behaves across the whole dataset.

4. **Training objective:** linear regression looks for the parameters \`β₀\`, \`β₁\`, and \`β₂\` that make this number as small as possible.

> In linear regression, training minimizes the MSE of the whole dataset, not just one isolated error.

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
          "inputNodes": [

          ],
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
        }
      },
      "en-us": {
        "tabs": [
          {
          "label": "MSE"
        },
          {
          "label": "Visual summary"
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
          "inputNodes": [

          ],
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
        }
      }
    },
  },
});
