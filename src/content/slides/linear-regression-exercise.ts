import { defineSlide } from './_factory';

export const linearRegressionExercise = defineSlide({
  id: 'linear-regression-exercise',
  type: 'exercise',
  content: {
    'pt-br': {
      title: `Exercício: Mãos na massa com Regressão Linear`,
      body: `Agora é sua vez de implementar os cálculos fundamentais que fazem a Regressão Linear funcionar.`,
    },
    'en-us': {
      title: `Exercise: Hands-on with Linear Regression`,
      body: `Now it's your turn to implement the fundamental calculations that make Linear Regression work.`,
    },
  },
  visual: {
    id: 'python-exercise',
    copy: {
      "pt-br": {
        "title": "Exercício: Regressão Linear",
        "description": "Complete as funções para calcular o erro e atualizar os parâmetros.",
        "layout": "two-column",
        "runButtonLabel": "Executar",
        "checkButtonLabel": "Verificar",
        "successMessage": "Excelente! Você dominou a base da Regressão Linear!",
        "errorMessage": "Ops, os cálculos não bateram. Verifique as fórmulas.",
        "hintLabel": "Dica",
        "outputLabel": "Saída do Console",
        "exercises": [
          {
          "id": "1. Cálculo do MSE",
          "instructions": "Complete a função `calculate_mse(y_true, y_pred)` que calcula o Erro Quadrático Médio.\n\nA fórmula é: `média((y_true - y_pred) ** 2)`",
          "snippetId": "linear-regression-exercise-1-en-us",
          "validators": [
            {
            "type": "assertFunctionReturn",
            "functionName": "calculate_mse",
            "args": [
              [
              10,
              20,
              30
            ],
              [
              12,
              18,
              33
            ]
            ],
            "expectedReturn": 5.666666666666667,
            "tolerance": 0.001
          }
          ],
          "hints": [
            "diff = y_true[i] - y_pred[i]",
            "total_error += diff ** 2"
          ]
        },
          {
          "id": "2. Fix the Bug: Gradient Descent ao Contrário?",
          "instructions": "Alguém escreveu a atualização do Gradient Descent — mas tem um bug sutil.\n\nRode o código e observe: os valores de `w` estão **explodindo** ao invés de convergir.\n\nEncontre o sinal errado e corrija. O Gradient Descent deve **subtrair** o gradiente, não somar.\n\n**Dica:** observe a direção em que `w` está se movendo a cada passo.",
          "snippetId": "linear-regression-exercise-2-en-us",
          "validators": [
            {
            "type": "assertOutput",
            "expected": "Com o BUG:\n  Passo 1: w = 6.0000\n  Passo 2: w = 7.2000\n  Passo 3: w = 8.6400\n  Passo 4: w = 10.3680\n  Passo 5: w = 12.4416\n\nCorrigido:\n  Passo 1: w = 4.0000\n  Passo 2: w = 3.2000\n  Passo 3: w = 2.5600\n  Passo 4: w = 2.0480\n  Passo 5: w = 1.6384"
          }
          ],
          "hints": [
            "Troque `w + lr * gradient` por `w - lr * gradient`",
            "Com sinal positivo, w vai para +∞. Com sinal negativo, w converge para 0 (o mínimo de f(w) = w²)."
          ]
        },
          {
          "id": "3. Treino + Predição: Quanto vale o apartamento?",
          "instructions": "Você tem um dataset real de apartamentos e vai treinar um modelo do zero.\n\n**Dataset:**\n\n| Apt | Área (m²) | Dist. (km) | Preço (R$ mil) |\n|-----|-----------|------------|----------------|\n| A   | 45        | 8          | 62             |\n| B   | 70        | 3          | 105            |\n| C   | 55        | 6          | 78             |\n| D   | 90        | 2          | 130            |\n| E   | 40        | 10         | 50             |\n\n**Etapa 1 — Treino:** complete a função `train` que faz Gradient Descent para aprender os coeficientes.\n\n**Etapa 2 — Predição:** com o modelo treinado, preveja o preço de um apartamento de 60m² a 5km e analise os erros do dataset original.",
          "snippetId": "linear-reg-exercise-3-starter",
          "validators": [
            {
            "type": "assertFunctionReturn",
            "functionName": "predict",
            "args": [
              60,
              5,
              30,
              1.2,
              -2.0
            ],
            "expectedReturn": 92.0,
            "tolerance": 0.001
          },
            {
            "type": "assertVariable",
            "variableName": "b0",
            "expectedValue": 30,
            "tolerance": 3
          },
            {
            "type": "assertVariable",
            "variableName": "b1",
            "expectedValue": 1.2,
            "tolerance": 0.2
          },
            {
            "type": "assertVariable",
            "variableName": "b2",
            "expectedValue": -2.0,
            "tolerance": 0.3
          }
          ],
          "hints": [
            "grad0 = grad0 - lr * grad0 / n  (ou seja, beta0 = beta0 - lr * grad0/n)",
            "beta0 = beta0 - lr * grad0 / n",
            "beta1 = beta1 - lr * grad1 / n",
            "beta2 = beta2 - lr * grad2 / n"
          ]
        },
          {
          "id": "4. Experiment: Qual predição erra mais?",
          "instructions": "Dado um modelo `y_hat = 10 + 2*x`, temos 4 pontos reais:\n\n| x | y_real |\n|---|--------|\n| 3 | 18     |\n| 5 | 15     |\n| 7 | 30     |\n| 1 | 14     |\n\n**Antes de rodar:** qual ponto tem o maior erro absoluto? Calcule mentalmente.\n\nDepois rode e descubra se acertou!",
          "snippetId": "linear-regression-exercise-4-en-us",
          "validators": [
            {
            "type": "assertOutput",
            "expected": "Erros:\n  x=3: y_hat=16, y_real=18, erro=2\n  x=5: y_hat=20, y_real=15, erro=5\n  x=7: y_hat=24, y_real=30, erro=6\n  x=1: y_hat=12, y_real=14, erro=2\n\nMaior erro: x=7 com erro=6"
          }
          ],
          "hints": [
            "x=7: y_hat=24, y_real=30, |erro|=6 — o maior!",
            "x=5 também erra bastante: |15-20|=5"
          ]
        },
          {
          "id": "5. Gradient Descent 1D",
          "instructions": "Simule 5 passos de Gradient Descent para encontrar o mínimo de `f(w) = w²`.\n\nO gradiente é `df/dw = 2*w`. A cada passo: `w = w - lr * 2*w`.\n\nComece com `w = 5.0` e `lr = 0.1`.",
          "snippetId": "linear-regression-exercise-5-en-us",
          "validators": [
            {
            "type": "assertOutput",
            "expected": "Passo 1: w = 4.0000\nPasso 2: w = 3.2000\nPasso 3: w = 2.5600\nPasso 4: w = 2.0480\nPasso 5: w = 1.6384"
          }
          ],
          "hints": [
            "gradiente = 2 * w",
            "w = w - lr * gradiente"
          ]
        }
        ]
      },
      "en-us": {
        "title": "Exercise: Linear Regression",
        "description": "Complete the functions to calculate the error and update parameters.",
        "layout": "two-column",
        "runButtonLabel": "Run",
        "checkButtonLabel": "Check",
        "successMessage": "Excellent! You've mastered the basics of Linear Regression!",
        "errorMessage": "Oops, the calculations don't match. Check the formulas.",
        "hintLabel": "Hint",
        "outputLabel": "Console Output",
        "exercises": [
          {
          "id": "1. MSE Calculation",
          "instructions": "Complete the `calculate_mse(y_true, y_pred)` function that calculates the Mean Squared Error.\n\nThe formula is: `mean((y_true - y_pred) ** 2)`",
          "snippetId": "linear-regression-exercise-6-en-us",
          "validators": [
            {
            "type": "assertFunctionReturn",
            "functionName": "calculate_mse",
            "args": [
              [
              10,
              20,
              30
            ],
              [
              12,
              18,
              33
            ]
            ],
            "expectedReturn": 5.666666666666667,
            "tolerance": 0.001
          }
          ],
          "hints": [
            "diff = y_true[i] - y_pred[i]",
            "total_error += diff ** 2"
          ]
        },
          {
          "id": "2. Fix the Bug: Gradient Descent Backwards?",
          "instructions": "Someone wrote the Gradient Descent update — but there's a subtle bug.\n\nRun the code and observe: the `w` values are **exploding** instead of converging.\n\nFind the wrong sign and fix it. Gradient Descent should **subtract** the gradient, not add it.\n\n**Hint:** watch the direction `w` moves each step.",
          "snippetId": "linear-regression-exercise-7-en-us",
          "validators": [
            {
            "type": "assertOutput",
            "expected": "With the BUG:\n  Step 1: w = 6.0000\n  Step 2: w = 7.2000\n  Step 3: w = 8.6400\n  Step 4: w = 10.3680\n  Step 5: w = 12.4416\n\nFixed:\n  Step 1: w = 4.0000\n  Step 2: w = 3.2000\n  Step 3: w = 2.5600\n  Step 4: w = 2.0480\n  Step 5: w = 1.6384"
          }
          ],
          "hints": [
            "Change `w + lr * gradient` to `w - lr * gradient`",
            "With a positive sign, w goes to +∞. With a negative sign, w converges to 0 (the minimum of f(w) = w²)."
          ]
        },
          {
          "id": "3. Training + Prediction: How much is the apartment worth?",
          "instructions": "You have a real apartment dataset and will train a model from scratch.\n\n**Dataset:**\n\n| Apt | Area (m²) | Dist. (km) | Price (BRL k) |\n|-----|-----------|------------|---------------|\n| A   | 45        | 8          | 62            |\n| B   | 70        | 3          | 105           |\n| C   | 55        | 6          | 78            |\n| D   | 90        | 2          | 130           |\n| E   | 40        | 10         | 50            |\n\n**Step 1 — Training:** complete the `train` function that does Gradient Descent to learn coefficients.\n\n**Step 2 — Prediction:** with the trained model, predict the price of a 60m² apartment 5km away and analyze the training errors.",
          "snippetId": "linear-reg-exercise-3-starter",
          "validators": [
            {
            "type": "assertFunctionReturn",
            "functionName": "predict",
            "args": [
              60,
              5,
              30,
              1.2,
              -2.0
            ],
            "expectedReturn": 92.0,
            "tolerance": 0.001
          },
            {
            "type": "assertVariable",
            "variableName": "b0",
            "expectedValue": 30,
            "tolerance": 3
          },
            {
            "type": "assertVariable",
            "variableName": "b1",
            "expectedValue": 1.2,
            "tolerance": 0.2
          },
            {
            "type": "assertVariable",
            "variableName": "b2",
            "expectedValue": -2.0,
            "tolerance": 0.3
          }
          ],
          "hints": [
            "beta0 = beta0 - lr * grad0 / n",
            "beta1 = beta1 - lr * grad1 / n",
            "beta2 = beta2 - lr * grad2 / n"
          ]
        },
          {
          "id": "4. Experiment: Which prediction is most wrong?",
          "instructions": "Given a model `y_hat = 10 + 2*x`, we have 4 real data points:\n\n| x | y_real |\n|---|--------|\n| 3 | 18     |\n| 5 | 15     |\n| 7 | 30     |\n| 1 | 14     |\n\n**Before running:** which point has the largest absolute error? Calculate mentally.\n\nThen run and see if you were right!",
          "snippetId": "linear-regression-exercise-9-en-us",
          "validators": [
            {
            "type": "assertOutput",
            "expected": "Errors:\n  x=3: y_hat=16, y_real=18, error=2\n  x=5: y_hat=20, y_real=15, error=5\n  x=7: y_hat=24, y_real=30, error=6\n  x=1: y_hat=12, y_real=14, error=2\n\nLargest error: x=7 with error=6"
          }
          ],
          "hints": [
            "x=7: y_hat=24, y_real=30, |error|=6 — the largest!",
            "x=5 also misses a lot: |15-20|=5"
          ]
        },
          {
          "id": "5. 1D Gradient Descent",
          "instructions": "Simulate 5 steps of Gradient Descent to find the minimum of `f(w) = w²`.\n\nThe gradient is `df/dw = 2*w`. Each step: `w = w - lr * 2*w`.\n\nStart with `w = 5.0` and `lr = 0.1`.",
          "snippetId": "linear-regression-exercise-10-en-us",
          "validators": [
            {
            "type": "assertOutput",
            "expected": "Step 1: w = 4.0000\nStep 2: w = 3.2000\nStep 3: w = 2.5600\nStep 4: w = 2.0480\nStep 5: w = 1.6384"
          }
          ],
          "hints": [
            "gradient = 2 * w",
            "w = w - lr * gradient"
          ]
        }
        ]
      }
    },
  },
});
