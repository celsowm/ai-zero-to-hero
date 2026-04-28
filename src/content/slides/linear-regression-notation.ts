import { defineSlide } from './_factory';

export const linearRegressionNotation = defineSlide({
  id: 'linear-regression-notation',
  type: 'two-column',
  options: {
    "columnRatios": [
      0.8,
      1.2
    ]
  },
  content: {
    'pt-br': {
      title: `Regressão Linear: lendo o plano de previsão em 3D`,
      body: `Agora a regressão deixa de ser apenas fórmula e vira geometria. O mesmo modelo dos próximos slides aparece aqui como um gráfico 3D real.

Mapa rápido da fórmula:
- \`β₀\`: coeficiente linear / intercepto, o valor base do modelo
- \`β₁\`: coeficiente angular da altura, o quanto a previsão sobe quando a altura aumenta
- \`β₂\`: coeficiente angular da idade, o quanto a previsão sobe quando a idade aumenta
- \`ŷ\`: soma final da previsão, depois que \`β₀\`, \`β₁\` e \`β₂\` fazem seu trabalho

1. **Eixo X = altura:** cada pessoa entra com um valor conhecido de altura.

2. **Eixo Z = idade:** a segunda entrada também entra no espaço, sem ser escondida em uma reta 2D.

3. **Eixo Y = peso:** a altura vertical mostra o peso, que pode ser o valor real \`y\` ou o valor previsto \`ŷ\`.

4. **Pontos coloridos = \`y\`:** cada ponto observado é um peso real do dataset \`(160,20,55)\` até \`(180,36,72)\`.

5. **Plano = \`ŷ = β₀ + β₁ * altura + β₂ * idade\`:** neste exemplo didático, fixamos \`β₀ = -21\`, \`β₁ = 0.4\` e \`β₂ = 0.6\` manualmente para visualizar a superfície de previsão antes de mostrar o treino aprendendo seus próprios coeficientes. Aqui \`β₁\` e \`β₂\` funcionam como coeficientes angulares / inclinações, e \`β₀\` funciona como coeficiente linear / intercepto.

Legenda curta:
- \`y\`: peso real observado
- \`ŷ\`: peso previsto pelo modelo
- \`β₀\`: coeficiente linear / intercepto
- \`β₁\` e \`β₂\`: coeficientes angulares / inclinações

> Quando o ponto real fica longe do plano previsto, a diferença visual já antecipa o erro que depois vira MSE.

---`,
    },
    'en-us': {
      title: `Linear Regression: reading the prediction plane in 3D`,
      body: `Here regression stops being only a formula and becomes geometry. The same model from the next slides is shown as a real 3D chart.

Quick formula map:
- \`β₀\`: linear coefficient / intercept, the model’s base value
- \`β₁\`: angular coefficient for height, how much the prediction changes when height increases
- \`β₂\`: angular coefficient for age, how much the prediction changes when age increases
- \`ŷ\`: final prediction after \`β₀\`, \`β₁\`, and \`β₂\` do their work

1. **X axis = height:** each person enters with a known height value.

2. **Z axis = age:** the second input stays visible in space instead of being flattened into a 2D line.

3. **Y axis = weight:** the vertical dimension shows weight, either as the real value \`y\` or the predicted value \`ŷ\`.

4. **Colored points = \`y\`:** each observed point is a real dataset weight from \`(160,20,55)\` to \`(180,36,72)\`.

5. **Plane = \`ŷ = β₀ + β₁ * height + β₂ * age\`:** in this teaching example, we manually fix \`β₀ = -21\`, \`β₁ = 0.4\`, and \`β₂ = 0.6\` to visualize the prediction surface before showing training learn its own coefficients. Here \`β₁\` and \`β₂\` act like angular coefficients / slopes, and \`β₀\` acts like the linear coefficient / intercept.

Short legend:
- \`y\`: observed real weight
- \`ŷ\`: model prediction
- \`β₀\`: linear coefficient / intercept
- \`β₁\` and \`β₂\`: angular coefficients / slopes

> When the real point sits far from the prediction plane, that visual gap already anticipates the error that later becomes MSE.

---`,
    },
  },
  visual: {
    id: 'linear-regression-3d-chart',
    copy: {
      "pt-br": {
        "eyebrow": "Plano de previsão",
        "title": "Altura, idade e peso no mesmo espaço",
        "description": "Os pontos mostram pesos reais do dataset. O plano semi-transparente mostra o que a regressão linear prevê para cada combinação de altura e idade.",
        "tabs": [
          {
          "label": "3D"
        },
          {
          "label": "2D"
        }
        ],
        "axisLabels": {
          "x": "Altura (X)",
          "y": "Peso (Y)",
          "z": "Idade (Z)"
        },
        "dataset": [
          {
          "height": 160,
          "age": 20,
          "realWeight": 55,
          "label": "160 / 20 / 55",
          "accent": "#00e5ff"
        },
          {
          "height": 165,
          "age": 24,
          "realWeight": 59,
          "label": "165 / 24 / 59",
          "accent": "#fbbf24"
        },
          {
          "height": 170,
          "age": 28,
          "realWeight": 64,
          "label": "170 / 28 / 64",
          "accent": "#ff2e97"
        },
          {
          "height": 175,
          "age": 32,
          "realWeight": 68,
          "label": "175 / 32 / 68",
          "accent": "#a855f7"
        },
          {
          "height": 180,
          "age": 36,
          "realWeight": 72,
          "label": "180 / 36 / 72",
          "accent": "#34d399"
        }
        ],
        "coefficients": {
          "beta0": -21,
          "beta1": 0.4,
          "beta2": 0.6,
          "formula": "ŷ = -21 + 0.4h + 0.6i"
        },
        "realLabel": "ponto real `y`",
        "predictedLabel": "projeção prevista `ŷ`",
        "planeLabel": "plano de regressão",
        "symbolGuideTitle": "Leitura dos símbolos",
        "symbolGuide": [
          {
          "symbol": "β₀",
          "label": "Intercepto / coeficiente linear",
          "description": "É a base do modelo. Ele move a superfície inteira para cima ou para baixo.",
          "accent": "#fbbf24"
        },
          {
          "symbol": "β₁",
          "label": "Coeficiente angular da altura",
          "description": "Mostra o quanto a previsão muda quando a altura aumenta.",
          "accent": "#00e5ff"
        },
          {
          "symbol": "β₂",
          "label": "Coeficiente angular da idade",
          "description": "Mostra o quanto a previsão muda quando a idade aumenta.",
          "accent": "#ff2e97"
        }
        ],
        "comparisonChart": {
          "eyebrow": "Projeção plana",
          "title": "A mesma relação vista em 2D perde a dimensão da idade",
          "description": "Aqui olhamos apenas altura vs peso para mostrar que um gráfico plano não consegue exibir, ao mesmo tempo, o efeito da idade na previsão.",
          "xLabel": "Altura (X)",
          "yLabel": "Peso (Y)",
          "lineLabel": "reta ajustada em 2D",
          "dataset": [
            {
            "height": 160,
            "age": 20,
            "realWeight": 55,
            "label": "160 / 55",
            "accent": "#00e5ff"
          },
            {
            "height": 165,
            "age": 24,
            "realWeight": 59,
            "label": "165 / 59",
            "accent": "#fbbf24"
          },
            {
            "height": 170,
            "age": 28,
            "realWeight": 64,
            "label": "170 / 64",
            "accent": "#ff2e97"
          },
            {
            "height": 175,
            "age": 32,
            "realWeight": 68,
            "label": "175 / 68",
            "accent": "#a855f7"
          },
            {
            "height": 180,
            "age": 36,
            "realWeight": 72,
            "label": "180 / 72",
            "accent": "#34d399"
          }
          ],
          "lineStart": {
            "x": 104,
            "y": 224
          },
          "lineEnd": {
            "x": 432,
            "y": 86
          },
          "symbolGuideTitle": "Leitura dos símbolos",
          "symbolGuide": [
            {
            "symbol": "β₀",
            "label": "Intercepto / coeficiente linear",
            "description": "É a base da reta. Se ele muda, a reta sobe ou desce sem mudar a inclinação.",
            "accent": "#fbbf24"
          },
            {
            "symbol": "β₁",
            "label": "Coeficiente angular da altura",
            "description": "Mostra o quanto o peso previsto muda quando a altura aumenta.",
            "accent": "#00e5ff"
          },
            {
            "symbol": "β₂",
            "label": "Coeficiente angular da idade",
            "description": "Existe no modelo, mas não aparece no 2D porque a idade saiu do gráfico.",
            "accent": "#ff2e97"
          }
          ],
          "footer": "No plano 2D, a leitura vira uma reta e `β₂` fica escondido; no 3D, a mesma ideia vira uma superfície e a idade volta a aparecer."
        },
        "footer": "A leitura correta é: entradas no plano X/Z, peso no eixo Y, previsão no plano e desvio vertical como erro."
      },
      "en-us": {
        "eyebrow": "Prediction plane",
        "title": "Height, age, and weight in the same space",
        "description": "The points show real dataset weights. The semi-transparent plane shows what linear regression predicts for each height and age combination.",
        "tabs": [
          {
          "label": "3D"
        },
          {
          "label": "2D"
        }
        ],
        "axisLabels": {
          "x": "Height (X)",
          "y": "Weight (Y)",
          "z": "Age (Z)"
        },
        "dataset": [
          {
          "height": 160,
          "age": 20,
          "realWeight": 55,
          "label": "160 / 20 / 55",
          "accent": "#00e5ff"
        },
          {
          "height": 165,
          "age": 24,
          "realWeight": 59,
          "label": "165 / 24 / 59",
          "accent": "#fbbf24"
        },
          {
          "height": 170,
          "age": 28,
          "realWeight": 64,
          "label": "170 / 28 / 64",
          "accent": "#ff2e97"
        },
          {
          "height": 175,
          "age": 32,
          "realWeight": 68,
          "label": "175 / 32 / 68",
          "accent": "#a855f7"
        },
          {
          "height": 180,
          "age": 36,
          "realWeight": 72,
          "label": "180 / 36 / 72",
          "accent": "#34d399"
        }
        ],
        "coefficients": {
          "beta0": -21,
          "beta1": 0.4,
          "beta2": 0.6,
          "formula": "ŷ = -21 + 0.4h + 0.6a"
        },
        "realLabel": "real point `y`",
        "predictedLabel": "predicted projection `ŷ`",
        "planeLabel": "regression plane",
        "symbolGuideTitle": "Symbol reading",
        "symbolGuide": [
          {
          "symbol": "β₀",
          "label": "Intercept / linear coefficient",
          "description": "It is the model base. It moves the whole surface up or down.",
          "accent": "#fbbf24"
        },
          {
          "symbol": "β₁",
          "label": "Angular coefficient for height",
          "description": "It shows how much the prediction changes when height increases.",
          "accent": "#00e5ff"
        },
          {
          "symbol": "β₂",
          "label": "Angular coefficient for age",
          "description": "It shows how much the prediction changes when age increases.",
          "accent": "#ff2e97"
        }
        ],
        "comparisonChart": {
          "eyebrow": "Flat projection",
          "title": "The same relationship in 2D loses the age dimension",
          "description": "Here we look only at height vs weight to show that a flat chart cannot display, at the same time, the effect of age on the prediction.",
          "xLabel": "Height (X)",
          "yLabel": "Weight (Y)",
          "lineLabel": "2D fitted line",
          "dataset": [
            {
            "height": 160,
            "age": 20,
            "realWeight": 55,
            "label": "160 / 55",
            "accent": "#00e5ff"
          },
            {
            "height": 165,
            "age": 24,
            "realWeight": 59,
            "label": "165 / 59",
            "accent": "#fbbf24"
          },
            {
            "height": 170,
            "age": 28,
            "realWeight": 64,
            "label": "170 / 64",
            "accent": "#ff2e97"
          },
            {
            "height": 175,
            "age": 32,
            "realWeight": 68,
            "label": "175 / 68",
            "accent": "#a855f7"
          },
            {
            "height": 180,
            "age": 36,
            "realWeight": 72,
            "label": "180 / 72",
            "accent": "#34d399"
          }
          ],
          "lineStart": {
            "x": 104,
            "y": 224
          },
          "lineEnd": {
            "x": 432,
            "y": 86
          },
          "symbolGuideTitle": "Symbol reading",
          "symbolGuide": [
            {
            "symbol": "β₀",
            "label": "Intercept / linear coefficient",
            "description": "It is the base of the line. If it changes, the line moves up or down without changing slope.",
            "accent": "#fbbf24"
          },
            {
            "symbol": "β₁",
            "label": "Angular coefficient for height",
            "description": "It shows how much the predicted weight changes when height increases.",
            "accent": "#00e5ff"
          },
            {
            "symbol": "β₂",
            "label": "Angular coefficient for age",
            "description": "It still exists in the model, but it is hidden here because age is not drawn on the graph.",
            "accent": "#ff2e97"
          }
          ],
          "footer": "In 2D, the line shows only the height effect and `β₂` stays hidden; in 3D, the surface shows both height and age."
        },
        "footer": "The correct reading is: inputs on the X/Z plane, weight on Y, prediction on the plane, and the vertical gap as error."
      }
    },
  },
});
