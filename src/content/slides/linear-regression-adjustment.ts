import { defineSlide } from './_factory';

export const linearRegressionAdjustment = defineSlide({
  id: 'linear-regression-adjustment',
  type: 'two-column',
  options: {
    "columnRatios": [
      0.62,
      0.38
    ]
  },
  content: {
    'pt-br': {
      title: `Regressão Linear: ajustando os parâmetros`,
      body: `Agora que a função de custo está clara, o treino pode começar a mexer nos parâmetros para baixar esse número. No nosso exemplo, isso significa ajustar \`β₀\`, \`β₁\` e \`β₂\` para prever melhor o **peso** a partir de **altura** e **idade**.

1. **Começo com chute:** o modelo inicia com valores iniciais para \`β₀\`, \`β₁\` e \`β₂\`.

2. **Mede o custo:** cada chute gera um conjunto diferente de previsões e um MSE diferente.

3. **Ajusta um pouco:** se o custo piora, o treino recua; se melhora, ele continua na mesma direção.

4. **Repete muitas vezes:** esse processo vai afinando a fórmula até encontrar uma combinação melhor.

> O treino não adivinha a resposta final; ele percorre pequenos passos até encontrar parâmetros melhores.

---`,
    },
    'en-us': {
      title: `Linear Regression: adjusting parameters`,
      body: `Now that the cost function is clear, training can start changing the parameters to lower that number. In our example, that means adjusting \`β₀\`, \`β₁\`, and \`β₂\` to predict **weight** better from **height** and **age**.

1. **Start with a guess:** the model begins with initial values for \`β₀\`, \`β₁\`, and \`β₂\`.

2. **Measure the cost:** each guess produces a different set of predictions and a different MSE.

3. **Adjust a little:** if the cost gets worse, training steps back; if it improves, it keeps going in that direction.

4. **Repeat many times:** this process keeps refining the formula until a better combination is found.

> Training does not guess the final answer; it takes small steps until it finds better parameters.

---`,
    },
  },
  visual: {
    id: 'linear-regression-tabs',
    copy: {
      "pt-br": {
        "tabs": [
          {
          "label": "Ajuste"
        },
          {
          "label": "Curva"
        }
        ],
        "formulaPanel": {
          "eyebrow": "Loop de treino",
          "formula": "β₀, β₁, β₂ -> custo -> ajuste -> β₀, β₁, β₂ melhores",
          "description": "O treino gira em um ciclo: mede o custo das previsões de peso, faz um ajuste pequeno em `β₀`, `β₁` e `β₂`, e repete até encontrar um ponto melhor.",
          "points": [
            {
            "label": "chute inicial para `β₀`, `β₁` e `β₂`",
            "accent": "#00e5ff"
          },
            {
            "label": "cálculo do custo para saber se melhorou",
            "accent": "#fbbf24"
          },
            {
            "label": "novo ajuste pequeno na direção certa",
            "accent": "#ff2e97"
          }
          ],
          "footer": "No próximo slide, esse passo aparece como uma superfície 3D de custo."
        },
        "graphPanel": {
          "eyebrow": "Novos parâmetros",
          "title": "Cada nova combinação de `β₀`, `β₁` e `β₂` gera um novo MSE",
          "description": "O treino testa uma combinação de parâmetros, calcula o erro das previsões de peso feitas com altura e idade, e decide o próximo ajuste com base nesse resultado.",
          "inputNodes": [

          ],
          "outputLabel": "Objetivo",
          "outputNode": {
            "label": "Menor custo",
            "accent": "#fbbf24"
          },
          "chart": {
            "xLabel": "Tentativas com novos parâmetros",
            "yLabel": "Custo (MSE)",
            "lineLabel": "MSE de cada tentativa",
            "points": [
              {
              "x": 120,
              "y": 188,
              "label": "β₀₀,β₁₀,β₂₀",
              "accent": "#ff2e97"
            },
              {
              "x": 230,
              "y": 156,
              "label": "β₀₁,β₁₁,β₂₁",
              "accent": "#fbbf24"
            },
              {
              "x": 335,
              "y": 124,
              "label": "β₀₂,β₁₂,β₂₂",
              "accent": "#00e5ff"
            },
              {
              "x": 420,
              "y": 92,
              "label": "β₀₃,β₁₃,β₂₃",
              "accent": "#a855f7"
            }
            ],
            "lineStart": {
              "x": 110,
              "y": 192
            },
            "lineEnd": {
              "x": 440,
              "y": 84
            },
            "footer": "Se o MSE cai, a nova combinação de `β₀`, `β₁` e `β₂` está prevendo melhor o peso."
          },
          "footer": "Treinar é repetir esse ciclo: testar parâmetros, medir o MSE e guardar a direção que melhora a previsão."
        }
      },
      "en-us": {
        "tabs": [
          {
          "label": "Adjustment"
        },
          {
          "label": "Curve"
        }
        ],
        "formulaPanel": {
          "eyebrow": "Training loop",
          "formula": "β₀, β₁, β₂ -> cost -> adjustment -> better β₀, β₁, β₂",
          "description": "Training moves in a cycle: measure the cost of the weight predictions, make a small adjustment to `β₀`, `β₁`, and `β₂`, and repeat until it finds a better point.",
          "points": [
            {
            "label": "start from an initial guess for `β₀`, `β₁`, and `β₂`",
            "accent": "#00e5ff"
          },
            {
            "label": "compute the cost to see if it improved",
            "accent": "#fbbf24"
          },
            {
            "label": "make a small adjustment in the right direction",
            "accent": "#ff2e97"
          }
          ],
          "footer": "The next slide turns this step into a 3D cost surface."
        },
        "graphPanel": {
          "eyebrow": "New parameters",
          "title": "Each new `β₀`, `β₁`, and `β₂` combination produces a new MSE",
          "description": "Training tests one parameter combination, computes the error of the weight predictions made from height and age, and decides the next adjustment from that result.",
          "inputNodes": [

          ],
          "outputLabel": "Goal",
          "outputNode": {
            "label": "Lower cost",
            "accent": "#fbbf24"
          },
          "chart": {
            "xLabel": "Attempts with new parameters",
            "yLabel": "Cost (MSE)",
            "lineLabel": "MSE of each attempt",
            "points": [
              {
              "x": 120,
              "y": 188,
              "label": "β₀₀,β₁₀,β₂₀",
              "accent": "#ff2e97"
            },
              {
              "x": 230,
              "y": 156,
              "label": "β₀₁,β₁₁,β₂₁",
              "accent": "#fbbf24"
            },
              {
              "x": 335,
              "y": 124,
              "label": "β₀₂,β₁₂,β₂₂",
              "accent": "#00e5ff"
            },
              {
              "x": 420,
              "y": 92,
              "label": "β₀₃,β₁₃,β₂₃",
              "accent": "#a855f7"
            }
            ],
            "lineStart": {
              "x": 110,
              "y": 192
            },
            "lineEnd": {
              "x": 440,
              "y": 84
            },
            "footer": "If the MSE drops, the new `β₀`, `β₁`, and `β₂` combination is predicting weight better."
          },
          "footer": "Training repeats this cycle: test parameters, measure MSE, and keep the direction that improves prediction."
        }
      }
    },
  },
});
