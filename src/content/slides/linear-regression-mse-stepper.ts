import { defineSlide } from './_factory';

export const linearRegressionMseStepper = defineSlide({
  id: 'linear-regression-mse-stepper',
  type: 'two-column',
  content: {
    'pt-br': {
      title: `Regressão Linear: calculando o MSE com dados reais`,
      body: `Agora o MSE deixa de ser definição abstrata e vira conta com dados reais.

1. **Dataset usado:** \`(160, 20, 55)\`, \`(165, 24, 59)\`, \`(170, 28, 64)\`, \`(175, 32, 68)\`, \`(180, 36, 72)\`.

2. **Entradas e saída:** altura e idade entram; \`y\` guarda o peso real e \`ŷ\` guarda a previsão.

3. **Modelo de exemplo:** vamos usar \`ŷ = β₀ + β₁ * altura + β₂ * idade\`, com \`β₀ = -21\`, \`β₁ = 0.4\` e \`β₂ = 0.6\` escolhidos para este exemplo didático.

4. **Objetivo da conta:** calcular erro, elevar ao quadrado, somar tudo e dividir pelo total de exemplos.

> **Lembrete matemático:** Elevamos ao quadrado para que erros negativos (como \`-0.2\`) não anulem erros positivos. Ao fazer \`-0.2 * -0.2 = 0.04\`, garantimos que toda imprecisão aumente o custo final.

---`,
    },
    'en-us': {
      title: `Linear Regression: calculating MSE with real data`,
      body: `Now MSE stops being an abstract definition and becomes arithmetic with real data.

1. **Dataset used:** \`(160, 20, 55)\`, \`(165, 24, 59)\`, \`(170, 28, 64)\`, \`(175, 32, 68)\`, \`(180, 36, 72)\`.

2. **Inputs and output:** height and age go in; \`y\` stores the real weight and \`ŷ\` stores the prediction.

3. **Example model:** we will use \`ŷ = β₀ + β₁ * height + β₂ * age\`, with \`β₀ = -21\`, \`β₁ = 0.4\`, and \`β₂ = 0.6\` chosen for this teaching example.

4. **Goal of the calculation:** compute the error, square it, add everything, and divide by the total number of examples.

> **Math reminder:** We square the errors so that negative ones (like \`-0.2\`) don't cancel out positive ones. By doing \`-0.2 * -0.2 = 0.04\`, we ensure that every inaccuracy increases the final cost.

---`,
    },
  },
  visual: {
    id: 'progress-stepper',
    copy: {
      "pt-br": {
        "eyebrow": "Revisão guiada",
        "title": "MSE com altura, idade e peso reais",
        "description": "Usando o mesmo dataset do slide de Python, vamos abrir a conta do MSE passo a passo com previsões numéricas.",
        "progressLabel": "Passo",
        "previousLabel": "Anterior",
        "nextLabel": "Próximo",
        "completionLabel": "Fechamento do raciocínio",
        "completionDescription": "Com esse exemplo, o MSE do conjunto fica `0.12`. No próximo slide, essa mesma sequência aparece em Python como função e loop.",
        "footer": "Aqui a conta fecha de ponta a ponta: prever peso, medir erro, elevar ao quadrado, somar e dividir por 5.",
        "table": {
          "title": "Dataset e resultados do exemplo",
          "headers": {
            "height": "Altura",
            "age": "Idade",
            "beta0": "β₀",
            "beta1": "β₁",
            "beta2": "β₂",
            "realWeight": "Peso real",
            "predictedWeight": "Previsto",
            "error": "Erro",
            "squaredError": "Erro²"
          },
          "rows": [
            {
            "height": "160",
            "age": "20",
            "beta0": "-21",
            "beta1": "0.4",
            "beta2": "0.6",
            "realWeight": "55",
            "predictedWeight": "55.0",
            "error": "0.0",
            "squaredError": "0.00"
          },
            {
            "height": "165",
            "age": "24",
            "beta0": "-21",
            "beta1": "0.4",
            "beta2": "0.6",
            "realWeight": "59",
            "predictedWeight": "59.4",
            "error": "0.4",
            "squaredError": "0.16"
          },
            {
            "height": "170",
            "age": "28",
            "beta0": "-21",
            "beta1": "0.4",
            "beta2": "0.6",
            "realWeight": "64",
            "predictedWeight": "63.8",
            "error": "-0.2",
            "squaredError": "0.04"
          },
            {
            "height": "175",
            "age": "32",
            "beta0": "-21",
            "beta1": "0.4",
            "beta2": "0.6",
            "realWeight": "68",
            "predictedWeight": "68.2",
            "error": "0.2",
            "squaredError": "0.04"
          },
            {
            "height": "180",
            "age": "36",
            "beta0": "-21",
            "beta1": "0.4",
            "beta2": "0.6",
            "realWeight": "72",
            "predictedWeight": "72.6",
            "error": "0.6",
            "squaredError": "0.36"
          }
          ]
        },
        "steps": [
          {
          "label": "Linha 1",
          "title": "Preveja o peso do primeiro exemplo",
          "description": "Para `(altura=160, idade=20, peso=55)`, a fórmula gera `ŷ = -21 + 0.4 * 160 + 0.6 * 20 = 55`. O peso previsto bate exatamente com o peso real.",
          "formula": "ŷ = -21 + 0.4*160 + 0.6*20 = 55",
          "accent": "#00e5ff",
          "highlightedRowIndexes": [
            0
          ]
        },
          {
          "label": "Linha 2",
          "title": "Calcule o erro do segundo exemplo",
          "description": "Para `(165, 24, 59)`, a previsão fica `ŷ = -21 + 0.4 * 165 + 0.6 * 24 = 59.4`. O erro é `ŷ - y = 59.4 - 59 = 0.4`.",
          "formula": "erro = 59.4 - 59 = 0.4",
          "accent": "#ff2e97",
          "highlightedRowIndexes": [
            1
          ]
        },
          {
          "label": "Linha 3",
          "title": "Terceiro exemplo: erro negativo",
          "description": "Para `(170, 28, 64)`, a previsão é `63.8`. Como o peso real é `64`, o erro é `-0.2`. O MSE vai lidar com esse sinal negativo depois.",
          "formula": "erro = 63.8 - 64 = -0.2",
          "accent": "#a855f7",
          "highlightedRowIndexes": [
            2
          ]
        },
          {
          "label": "Linha 4",
          "title": "Quarto exemplo: nova previsão",
          "description": "Para `(175, 32, 68)`, o modelo prevê `68.2`. O erro em relação ao real (`68`) é de `0.2`.",
          "formula": "erro = 68.2 - 68 = 0.2",
          "accent": "#fbbf24",
          "highlightedRowIndexes": [
            3
          ]
        },
          {
          "label": "Linha 5",
          "title": "Último exemplo do conjunto",
          "description": "Para `(180, 36, 72)`, a previsão é `72.6`. O erro final deste dataset é `0.6`.",
          "formula": "erro = 72.6 - 72 = 0.6",
          "accent": "#f43f5e",
          "highlightedRowIndexes": [
            4
          ]
        },
          {
          "label": "Quadrados",
          "title": "Eleve os erros ao quadrado",
          "description": "Agora que temos os 5 erros, elevamos todos ao quadrado. Isso elimina os sinais negativos e penaliza erros maiores.",
          "formula": "0² + 0.4² + (-0.2)² + 0.2² + 0.6²",
          "accent": "#6366f1",
          "highlightedRowIndexes": [
            0,
            1,
            2,
            3,
            4
          ]
        },
          {
          "label": "Soma",
          "title": "Some todos os erros quadráticos",
          "description": "Juntamos as contribuições: `0 + 0.16 + 0.04 + 0.04 + 0.36 = 0.60`.",
          "formula": "Σ(erro²) = 0.60",
          "accent": "#8b5cf6",
          "highlightedRowIndexes": [
            0,
            1,
            2,
            3,
            4
          ]
        },
          {
          "label": "MSE final",
          "title": "Divida pelo total de exemplos",
          "description": "O erro médio ao quadrado (MSE) é a soma dividida por `n=5`. Chegamos ao custo final de `0.12`.",
          "formula": "MSE = 0.60 / 5 = 0.12",
          "accent": "#34d399",
          "highlightedRowIndexes": [
            0,
            1,
            2,
            3,
            4
          ]
        }
        ]
      },
      "en-us": {
        "eyebrow": "Guided review",
        "title": "MSE with real height, age, and weight",
        "description": "Using the same dataset from the Python slide, we now open the MSE calculation step by step with numeric predictions.",
        "progressLabel": "Step",
        "previousLabel": "Previous",
        "nextLabel": "Next",
        "completionLabel": "Reasoning complete",
        "completionDescription": "With this example, the dataset MSE becomes `0.12`. In the next slide, the same sequence appears in Python as a function and a loop.",
        "footer": "This closes the arithmetic from end to end: predict weight, measure error, square it, add everything, and divide by 5.",
        "table": {
          "title": "Dataset and example results",
          "headers": {
            "height": "Height",
            "age": "Age",
            "beta0": "β₀",
            "beta1": "β₁",
            "beta2": "β₂",
            "realWeight": "Real weight",
            "predictedWeight": "Predicted",
            "error": "Error",
            "squaredError": "Error²"
          },
          "rows": [
            {
            "height": "160",
            "age": "20",
            "beta0": "-21",
            "beta1": "0.4",
            "beta2": "0.6",
            "realWeight": "55",
            "predictedWeight": "55.0",
            "error": "0.0",
            "squaredError": "0.00"
          },
            {
            "height": "165",
            "age": "24",
            "beta0": "-21",
            "beta1": "0.4",
            "beta2": "0.6",
            "realWeight": "59",
            "predictedWeight": "59.4",
            "error": "0.4",
            "squaredError": "0.16"
          },
            {
            "height": "170",
            "age": "28",
            "beta0": "-21",
            "beta1": "0.4",
            "beta2": "0.6",
            "realWeight": "64",
            "predictedWeight": "63.8",
            "error": "-0.2",
            "squaredError": "0.04"
          },
            {
            "height": "175",
            "age": "32",
            "beta0": "-21",
            "beta1": "0.4",
            "beta2": "0.6",
            "realWeight": "68",
            "predictedWeight": "68.2",
            "error": "0.2",
            "squaredError": "0.04"
          },
            {
            "height": "180",
            "age": "36",
            "beta0": "-21",
            "beta1": "0.4",
            "beta2": "0.6",
            "realWeight": "72",
            "predictedWeight": "72.6",
            "error": "0.6",
            "squaredError": "0.36"
          }
          ]
        },
        "steps": [
          {
          "label": "Row 1",
          "title": "Predict the first example",
          "description": "For `(height=160, age=20, weight=55)`, the formula gives `ŷ = -21 + 0.4 * 160 + 0.6 * 20 = 55`. The predicted weight matches the real weight exactly.",
          "formula": "ŷ = -21 + 0.4*160 + 0.6*20 = 55",
          "accent": "#00e5ff",
          "highlightedRowIndexes": [
            0
          ]
        },
          {
          "label": "Row 2",
          "title": "Compute the second error",
          "description": "For `(165, 24, 59)`, the prediction becomes `ŷ = -21 + 0.4 * 165 + 0.6 * 24 = 59.4`. The error is `ŷ - y = 59.4 - 59 = 0.4`.",
          "formula": "error = 59.4 - 59 = 0.4",
          "accent": "#ff2e97",
          "highlightedRowIndexes": [
            1
          ]
        },
          {
          "label": "Row 3",
          "title": "Third example: negative error",
          "description": "For `(170, 28, 64)`, the prediction is `63.8`. Since the real weight is `64`, the error is `-0.2`. MSE will handle this negative sign later.",
          "formula": "error = 63.8 - 64 = -0.2",
          "accent": "#a855f7",
          "highlightedRowIndexes": [
            2
          ]
        },
          {
          "label": "Row 4",
          "title": "Fourth example: new prediction",
          "description": "For `(175, 32, 68)`, the model predicts `68.2`. The error relative to the real weight (`68`) is `0.2`.",
          "formula": "error = 68.2 - 68 = 0.2",
          "accent": "#fbbf24",
          "highlightedRowIndexes": [
            3
          ]
        },
          {
          "label": "Row 5",
          "title": "Last example in the set",
          "description": "For `(180, 36, 72)`, the prediction is `72.6`. The final error for this dataset is `0.6`.",
          "formula": "error = 72.6 - 72 = 0.6",
          "accent": "#f43f5e",
          "highlightedRowIndexes": [
            4
          ]
        },
          {
          "label": "Squares",
          "title": "Square the errors",
          "description": "Now that we have all 5 errors, we square them all. This removes negative signs and penalizes larger errors.",
          "formula": "0² + 0.4² + (-0.2)² + 0.2² + 0.6²",
          "accent": "#6366f1",
          "highlightedRowIndexes": [
            0,
            1,
            2,
            3,
            4
          ]
        },
          {
          "label": "Sum",
          "title": "Add all squared errors",
          "description": "We aggregate the contributions: `0 + 0.16 + 0.04 + 0.04 + 0.36 = 0.60`.",
          "formula": "Σ(error²) = 0.60",
          "accent": "#8b5cf6",
          "highlightedRowIndexes": [
            0,
            1,
            2,
            3,
            4
          ]
        },
          {
          "label": "Final MSE",
          "title": "Divide by the number of examples",
          "description": "The mean squared error (MSE) is the sum divided by `n=5`. We reach the final cost of `0.12`.",
          "formula": "MSE = 0.60 / 5 = 0.12",
          "accent": "#34d399",
          "highlightedRowIndexes": [
            0,
            1,
            2,
            3,
            4
          ]
        }
        ]
      }
    },
  },
});
