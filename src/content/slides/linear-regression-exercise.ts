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
          "starterCode": "def calculate_mse(y_true, y_pred):\n    # y_true e y_pred são listas de números de mesmo tamanho\n    total_error = 0\n    for i in range(len(y_true)):\n        # complete: calcule o erro ao quadrado e some ao total\n        diff = \n        total_error += \n    \n    return total_error / len(y_true)\n\n# teste\ny_real = [10, 20, 30]\ny_previsto = [12, 18, 33]\nprint(f\"MSE: {calculate_mse(y_real, y_previsto)}\")",
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
          "starterCode": "def update_w(w, gradient, lr):\n    # BUG: esta função está fazendo w divergir!\n    # Encontre e corrija o sinal errado.\n    return w + lr * gradient\n\nw = 5.0\nlr = 0.1\nprint(\"Com o BUG:\")\nfor i in range(5):\n    grad = 2 * w\n    w = update_w(w, grad, lr)\n    print(f\"  Passo {i+1}: w = {w:.4f}\")\n\n# Agora corrija a função e rode de novo:\nw = 5.0\nprint(\"\\nCorrigido:\")\nfor i in range(5):\n    grad = 2 * w\n    w = update_w(w, grad, lr)\n    print(f\"  Passo {i+1}: w = {w:.4f}\")",
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
          "id": "3. Predict & Verify: Quanto vale o apartamento?",
          "instructions": "Você treinou um modelo de regressão com dados reais de apartamentos. Agora use o modelo para prever preços e verifique se sua intuição bate com a matemática.\n\n**Contexto:** os dados abaixo foram usados para treinar o modelo:\n\n| Apt | Área (m²) | Dist. (km) | Preço (R$ mil) |\n|-----|-----------|------------|----------------|\n| A   | 45        | 8          | 62             |\n| B   | 70        | 3          | 105            |\n| C   | 55        | 6          | 78             |\n| D   | 90        | 2          | 130            |\n| E   | 40        | 10         | 50             |\n\nO modelo treinado tem coeficientes: `beta0=30, beta1=1.2, beta2=-2.0`\n\n**Fase 1 — Treino:** complete a função `train` que faz Gradient Descent para aprender os coeficientes a partir dos dados.\n\n**Fase 2 — Predição:** com os coeficientes aprendidos, preveja o preço de apartamentos novos.\n\n**Fase 3 — Verificação:** calcule mentalmente o preço de um apt de 60m² a 5km e rode para conferir!",
          "starterCode": "# Dados de treino: (area_m2, distancia_km, preco_mil)\ndataset = [\n    (45, 8, 62),\n    (70, 3, 105),\n    (55, 6, 78),\n    (90, 2, 130),\n    (40, 10, 50),\n]\n\ndef predict(area, distance, beta0, beta1, beta2):\n    return beta0 + beta1 * area + beta2 * distance\n\ndef train(dataset, epochs=100, lr=0.0001):\n    beta0, beta1, beta2 = 0.0, 0.0, 0.0\n    n = len(dataset)\n    \n    for epoch in range(epochs):\n        # calcule os gradientes (soma dos erros * derivada)\n        grad0 = 0.0\n        grad1 = 0.0\n        grad2 = 0.0\n        for area, distance, price in dataset:\n            y_hat = predict(area, distance, beta0, beta1, beta2)\n            error = y_hat - price\n            grad0 += error          # dMSE/dbeta0\n            grad1 += error * area    # dMSE/dbeta1\n            grad2 += error * distance # dMSE/dbeta2\n        \n        # complete: atualize os betas com Gradient Descent\n        beta0 = \n        beta1 = \n        beta2 = \n    \n    return beta0, beta1, beta2\n\n# Fase 1: treinar o modelo\nb0, b1, b2 = train(dataset)\nprint(f\"Coeficientes aprendidos: beta0={b0:.2f}, beta1={b1:.4f}, beta2={b2:.4f}\")\n\n# Fase 2: prever preço de um apartamento de 60m² a 5km\narea_nova, dist_nova = 60, 5\npreco_estimado = predict(area_nova, dist_nova, b0, b1, b2)\nprint(f\"\\nPrevisão para {area_nova}m² a {dist_nova}km: R$ {preco_estimado:.1f} mil\")\n\n# Fase 3: sua conta mental (usando coeficientes aproximados)\n# Dica: beta1 ≈ 1.2 significa cada m² vale ~R$1.2k\n#       beta2 ≈ -2.0 significa cada km custa ~R$2.0k\nprint(f\"\\nConta mental rápida (beta0≈30, beta1≈1.2, beta2≈-2.0):\")\nprint(f\"  30 + 1.2*60 + (-2.0)*5 = 30 + 72 - 10 = R$ {30 + 72 - 10} mil\")\n\n# Verifique nos dados originais: qual apt do dataset tem área e distância mais próximas?\nprint(f\"\\nComparação com dados originais:\")\nfor area, distance, price in dataset:\n    pred = predict(area, distance, b0, b1, b2)\n    erro = abs(price - pred)\n    print(f\"  Apt {area}m²/{distance}km: real=R${price}k, predito=R${pred:.1f}k, erro=R${erro:.1f}k\")",
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
            "type": "assertFunctionReturn",
            "functionName": "predict",
            "args": [
              70,
              3,
              30,
              1.2,
              -2.0
            ],
            "expectedReturn": 108.0,
            "tolerance": 0.001
          },
            {
            "type": "assertFunctionReturn",
            "functionName": "predict",
            "args": [
              45,
              8,
              30,
              1.2,
              -2.0
            ],
            "expectedReturn": 68.0,
            "tolerance": 0.001
          }
          ],
          "hints": [
            "grad0 = grad0 - lr * grad0 / n  (ou seja, beta0 = beta0 - lr * grad0/n)",
            "beta0 = beta0 - lr * grad0 / n",
            "beta1 = beta1 - lr * grad1 / n",
            "beta2 = beta2 - lr * grad2 / n",
            "A conta mental: 30 + 1.2*60 - 2.0*5 = 30 + 72 - 10 = R$92 mil"
          ]
        },
          {
          "id": "4. Experiment: Qual predição erra mais?",
          "instructions": "Dado um modelo `y_hat = 10 + 2*x`, temos 4 pontos reais:\n\n| x | y_real |\n|---|--------|\n| 3 | 18     |\n| 5 | 15     |\n| 7 | 30     |\n| 1 | 14     |\n\n**Antes de rodar:** qual ponto tem o maior erro absoluto? Calcule mentalmente.\n\nDepois rode e descubra se acertou!",
          "starterCode": "def predict(x):\n    return 10 + 2 * x\n\ndata = [(3, 18), (5, 15), (7, 30), (1, 14)]\n\nprint(\"Erros:\")\nmax_err = 0\nworst_x = None\nfor x, y_real in data:\n    y_hat = predict(x)\n    erro = abs(y_real - y_hat)\n    print(f\"  x={x}: y_hat={y_hat}, y_real={y_real}, erro={erro}\")\n    if erro > max_err:\n        max_err = erro\n        worst_x = x\n\nprint(f\"\\nMaior erro: x={worst_x} com erro={max_err}\")",
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
          "starterCode": "w = 5.0\nlr = 0.1\n\nfor i in range(5):\n    # calcule o gradiente de f(w) = w²\n    gradiente = \n    # atualize w\n    w = \n    print(f\"Passo {i+1}: w = {w:.4f}\")",
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
          "starterCode": "def calculate_mse(y_true, y_pred):\n    # y_true and y_pred are lists of numbers of the same length\n    total_error = 0\n    for i in range(len(y_true)):\n        # complete: calculate squared error and add to total\n        diff = \n        total_error += \n    \n    return total_error / len(y_true)\n\n# test\ny_real = [10, 20, 30]\ny_previsto = [12, 18, 33]\nprint(f\"MSE: {calculate_mse(y_real, y_previsto)}\")",
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
          "starterCode": "def update_w(w, gradient, lr):\n    # BUG: this function makes w diverge!\n    # Find and fix the wrong sign.\n    return w + lr * gradient\n\nw = 5.0\nlr = 0.1\nprint(\"With the BUG:\")\nfor i in range(5):\n    grad = 2 * w\n    w = update_w(w, grad, lr)\n    print(f\"  Step {i+1}: w = {w:.4f}\")\n\n# Now fix the function and run again:\nw = 5.0\nprint(\"\\nFixed:\")\nfor i in range(5):\n    grad = 2 * w\n    w = update_w(w, grad, lr)\n    print(f\"  Step {i+1}: w = {w:.4f}\")",
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
          "id": "3. Predict & Verify: How much is the apartment worth?",
          "instructions": "You trained a regression model on real apartment data. Now use the model to predict prices and check if your intuition matches the math.\n\n**Context:** the data below was used to train the model:\n\n| Apt | Area (m²) | Dist. (km) | Price (BRL k) |\n|-----|-----------|------------|---------------|\n| A   | 45        | 8          | 62            |\n| B   | 70        | 3          | 105           |\n| C   | 55        | 6          | 78            |\n| D   | 90        | 2          | 130           |\n| E   | 40        | 10         | 50            |\n\nThe trained model has coefficients: `beta0=30, beta1=1.2, beta2=-2.0`\n\n**Phase 1 — Training:** complete the `train` function that does Gradient Descent to learn coefficients from the data.\n\n**Phase 2 — Prediction:** with the learned coefficients, predict prices for new apartments.\n\n**Phase 3 — Verification:** mentally calculate the price of a 60m² apartment 5km away, then run to check!",
          "starterCode": "# Training data: (area_m2, distance_km, price_k)\ndataset = [\n    (45, 8, 62),\n    (70, 3, 105),\n    (55, 6, 78),\n    (90, 2, 130),\n    (40, 10, 50),\n]\n\ndef predict(area, distance, beta0, beta1, beta2):\n    return beta0 + beta1 * area + beta2 * distance\n\ndef train(dataset, epochs=100, lr=0.0001):\n    beta0, beta1, beta2 = 0.0, 0.0, 0.0\n    n = len(dataset)\n    \n    for epoch in range(epochs):\n        # calculate gradients (sum of errors * derivative)\n        grad0 = 0.0\n        grad1 = 0.0\n        grad2 = 0.0\n        for area, distance, price in dataset:\n            y_hat = predict(area, distance, beta0, beta1, beta2)\n            error = y_hat - price\n            grad0 += error          # dMSE/dbeta0\n            grad1 += error * area    # dMSE/dbeta1\n            grad2 += error * distance # dMSE/dbeta2\n        \n        # complete: update betas with Gradient Descent\n        beta0 = \n        beta1 = \n        beta2 = \n    \n    return beta0, beta1, beta2\n\n# Phase 1: train the model\nb0, b1, b2 = train(dataset)\nprint(f\"Learned coefficients: beta0={b0:.2f}, beta1={b1:.4f}, beta2={b2:.4f}\")\n\n# Phase 2: predict price for a 60m² apartment 5km away\narea_new, dist_new = 60, 5\nprice_estimate = predict(area_new, dist_new, b0, b1, b2)\nprint(f\"\\nPrediction for {area_new}m² at {dist_new}km: BRL {price_estimate:.1f}k\")\n\n# Phase 3: your mental math (using approximate coefficients)\n# Tip: beta1 ≈ 1.2 means each m² is worth ~BRL 1.2k\n#       beta2 ≈ -2.0 means each km costs ~BRL 2.0k\nprint(f\"\\nQuick mental math (beta0≈30, beta1≈1.2, beta2≈-2.0):\")\nprint(f\"  30 + 1.2*60 + (-2.0)*5 = 30 + 72 - 10 = BRL {30 + 72 - 10}k\")\n\n# Check against original data: which apt in the dataset has closest area and distance?\nprint(f\"\\nComparison with original data:\")\nfor area, distance, price in dataset:\n    pred = predict(area, distance, b0, b1, b2)\n    error = abs(price - pred)\n    print(f\"  Apt {area}m²/{distance}km: real=BRL{price}k, predicted=BRL{pred:.1f}k, error=BRL{error:.1f}k\")",
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
            "type": "assertFunctionReturn",
            "functionName": "predict",
            "args": [
              70,
              3,
              30,
              1.2,
              -2.0
            ],
            "expectedReturn": 108.0,
            "tolerance": 0.001
          },
            {
            "type": "assertFunctionReturn",
            "functionName": "predict",
            "args": [
              45,
              8,
              30,
              1.2,
              -2.0
            ],
            "expectedReturn": 68.0,
            "tolerance": 0.001
          }
          ],
          "hints": [
            "beta0 = beta0 - lr * grad0 / n",
            "beta1 = beta1 - lr * grad1 / n",
            "beta2 = beta2 - lr * grad2 / n",
            "Mental math: 30 + 1.2*60 - 2.0*5 = 30 + 72 - 10 = BRL 92k"
          ]
        },
          {
          "id": "4. Experiment: Which prediction is most wrong?",
          "instructions": "Given a model `y_hat = 10 + 2*x`, we have 4 real data points:\n\n| x | y_real |\n|---|--------|\n| 3 | 18     |\n| 5 | 15     |\n| 7 | 30     |\n| 1 | 14     |\n\n**Before running:** which point has the largest absolute error? Calculate mentally.\n\nThen run and see if you were right!",
          "starterCode": "def predict(x):\n    return 10 + 2 * x\n\ndata = [(3, 18), (5, 15), (7, 30), (1, 14)]\n\nprint(\"Errors:\")\nmax_err = 0\nworst_x = None\nfor x, y_real in data:\n    y_hat = predict(x)\n    error = abs(y_real - y_hat)\n    print(f\"  x={x}: y_hat={y_hat}, y_real={y_real}, error={error}\")\n    if error > max_err:\n        max_err = error\n        worst_x = x\n\nprint(f\"\\nLargest error: x={worst_x} with error={max_err}\")",
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
          "starterCode": "w = 5.0\nlr = 0.1\n\nfor i in range(5):\n    # calculate gradient of f(w) = w²\n    gradient = \n    # update w\n    w = \n    print(f\"Step {i+1}: w = {w:.4f}\")",
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
