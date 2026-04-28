import { defineSlide } from './_factory';

export const linearRegressionSimpleLine = defineSlide({
  id: 'linear-regression-simple-line',
  type: 'two-column',
  options: {
    "columnRatios": [
      0.65,
      0.35
    ]
  },
  content: {
    'pt-br': {
      title: `Regressão Linear: um corte da superfície`,
      body: `Agora que a superfície já foi apresentada em 3D, vale olhar a mesma ideia por um ângulo mais simples. Este slide não introduz uma fórmula nova; ele mostra um corte da previsão para deixar a tendência mais fácil de ler.

1. **A mesma relação continua valendo:** altura e idade seguem entrando no modelo como entradas conhecidas.

2. **O corte 2D é uma simplificação visual:** ele não mostra toda a superfície, mas ajuda a enxergar o comportamento geral da previsão.

3. **O efeito da idade:** ao mover o controle deslizante, você verá o "corte" da superfície subindo ou descendo. Isso mostra como o coeficiente \`β₂\` (idade) desloca a reta de previsão.

4. **Próximo passo:** depois de enxergar a tendência, fica natural medir a diferença entre a previsão e o peso real.

> Use o slider de idade para ver como a reta se desloca no espaço.

---`,
    },
    'en-us': {
      title: `Linear Regression: a slice of the surface`,
      body: `Now that the surface has already been introduced in 3D, it helps to look at the same idea from a simpler angle. This slide does not introduce a new formula; it shows a prediction slice so the trend is easier to read.

1. **The same relationship still applies:** height and age keep entering the model as known inputs.

2. **The 2D slice is a visual simplification:** it does not show the whole surface, but it makes the overall prediction behavior easier to see.

3. **The effect of age:** as you move the slider, you will see the surface "slice" moving up or down. This shows how the \`β₂\` coefficient (age) shifts the prediction line.

4. **Next step:** once the trend is visible, it becomes natural to measure the gap between prediction and real weight.

> Use the age slider to see how the line shifts in space.

---`,
    },
  },
  visual: {
    id: 'linear-regression-simple-line',
    copy: {
      "pt-br": {
        "eyebrow": "Projeção interativa",
        "title": "O corte mostra a tendência variando com a idade",
        "description": "Ajuste a idade para ver como o intercepto da reta muda enquanto a inclinação (altura) permanece constante.",
        "xLabel": "Altura (cm)",
        "yLabel": "Peso (kg)",
        "lineLabel": "Corte da superfície",
        "ageLabel": "Idade",
        "footer": "Ao mudar a idade, a reta inteira sobe ou desce porque β₂ * idade altera o valor base da previsão.",
        "coefficients": {
          "beta0": -21,
          "beta1": 0.4,
          "beta2": 0.6
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
        ]
      },
      "en-us": {
        "eyebrow": "Interactive projection",
        "title": "The slice shows trend varying with age",
        "description": "Adjust age to see how the line intercept changes while slope (height) remains constant.",
        "xLabel": "Height (cm)",
        "yLabel": "Weight (kg)",
        "lineLabel": "Surface slice",
        "ageLabel": "Age",
        "footer": "By changing age, the whole line moves up or down because β₂ * age alters the base prediction value.",
        "coefficients": {
          "beta0": -21,
          "beta1": 0.4,
          "beta2": 0.6
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
        ]
      }
    },
  },
});
