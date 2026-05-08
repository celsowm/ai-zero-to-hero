import { defineSlide } from './_factory';

export const neuralNetworkExercise = defineSlide({
  id: 'neural-network-exercise',
  type: 'exercise',
  content: {
    'pt-br': {
      title: `Exercício: Anatomia de uma Rede Neural`,
      body: `Vamos subir o nível. Agora você vai implementar a lógica completa de uma camada e o motor do Backpropagation.`,
    },
    'en-us': {
      title: `Exercise: Neural Network Anatomy`,
      body: `Let's level up. Now you will implement the full logic of a layer and the Backpropagation engine.`,
    },
  },
  visual: {
    id: 'python-exercise',
    copy: {
      "pt-br": {
        "title": "Exercício: Redes Neurais Pro",
        "description": "Implemente Forward, Derivada da Ativação e o Gradiente de Saída.",
        "runButtonLabel": "Executar",
        "checkButtonLabel": "Verificar",
        "successMessage": "Incrível! Você implementou os componentes críticos do treinamento de IAs!",
        "errorMessage": "A matemática não fechou. Revise a derivada ou o cálculo do delta.",
        "hintLabel": "Dica",
        "outputLabel": "Saída do Console",
        "exercises": [
          {
          "id": "1. Fix the Bug: Derivada da Sigmoid invertida?",
          "instructions": "Alguém implementou a derivada da sigmoid — mas o resultado está **negativo** para alguns valores!\n\nA derivada correta é `s * (1 - s)`, que para s ∈ (0,1) é sempre positiva.\n\nRode o código, observe o comportamento estranho, encontre e corrija o bug.",
          "snippetId": "neural-network-exercise-1-en-us",
          "validators": [
            {
            "type": "assertFunctionReturn",
            "functionName": "sigmoid_derivative",
            "args": [
              0.5
            ],
            "expectedReturn": 0.25,
            "tolerance": 0.001
          },
            {
            "type": "assertFunctionReturn",
            "functionName": "sigmoid_derivative",
            "args": [
              0.8
            ],
            "expectedReturn": 0.16,
            "tolerance": 0.001
          }
          ],
          "hints": [
            "Troque `(1 + s)` por `(1 - s)`",
            "A derivada da sigmoid é sempre positiva para s entre 0 e 1, porque s*(1-s) forma uma parábola com máximo em 0.25."
          ]
        },
          {
          "id": "2. Forward Pass de uma Camada",
          "instructions": "Em vez de um único neurônio, vamos calcular uma camada inteira. \n\nImplemente `layer_forward(inputs, weight_matrix, biases)` onde:\n- `inputs` é uma lista de entradas.\n- `weight_matrix` é uma lista de listas (pesos de cada neurônio).\n- `biases` é uma lista de vieses.\n\nRetorne as ativações finais.",
          "snippetId": "neural-network-exercise-2-en-us",
          "validators": [
            {
            "type": "assertFunctionReturn",
            "functionName": "layer_forward",
            "args": [
              [
              1,
              0.5
            ],
              [
              [
              0.2,
              0.8
            ],
              [
              -0.5,
              0.1
            ]
            ],
              [
              0,
              0
            ]
            ],
            "expectedReturn": [
              0.645656,
              0.38936
            ],
            "tolerance": 0.001
          }
          ],
          "hints": [
            "Para cada neurônio, aplique sigmoid(z) e use activations.append()."
          ]
        },
          {
          "id": "3. Erro e Delta de Saída",
          "instructions": "No backpropagation, o 'delta' do neurônio de saída é: \n`delta = (predição - alvo) * derivada_da_ativacao(predição)`.\n\nImplemente a função `calculate_output_delta(pred, target)`.",
          "snippetId": "neural-network-exercise-3-en-us",
          "validators": [
            {
            "type": "assertFunctionReturn",
            "functionName": "calculate_output_delta",
            "args": [
              0.6,
              0
            ],
            "expectedReturn": 0.144,
            "tolerance": 0.001
          }
          ],
          "hints": [
            "O delta é o erro multiplicado pela derivada.",
            "error = pred - target"
          ]
        },
          {
          "id": "4. Compare: Sigmoid vs ReLU",
          "instructions": "Duas funções de ativação populares se comportam de forma **muito diferente**.\n\n**Antes de rodar:** para cada valor abaixo, pense mentalmente:\n- `sigmoid(-2)` é próximo de 0 ou de 1?\n- `relu(-2)` é 0 ou negativo?\n- Qual função 'mata' sinais negativos?\n\nDepois rode e compare!",
          "snippetId": "neural-network-exercise-4-en-us",
          "validators": [
            {
            "type": "assertFunctionReturn",
            "functionName": "relu",
            "args": [
              -2
            ],
            "expectedReturn": 0,
            "tolerance": 0.001
          },
            {
            "type": "assertFunctionReturn",
            "functionName": "relu",
            "args": [
              0.5
            ],
            "expectedReturn": 0.5,
            "tolerance": 0.001
          },
            {
            "type": "assertFunctionReturn",
            "functionName": "relu",
            "args": [
              2
            ],
            "expectedReturn": 2,
            "tolerance": 0.001
          },
            {
            "type": "assertOutput",
            "expected": "     x | sigmoid(x) | relu(x)\n------------------------------\n  -5.0 |     0.0067 |   0.0000\n  -2.0 |     0.1192 |   0.0000\n  -0.5 |     0.3775 |   0.0000\n   0.0 |     0.5000 |   0.0000\n   0.5 |     0.6225 |   0.5000\n   2.0 |     0.8808 |   2.0000\n   5.0 |     0.9933 |   5.0000\n\nObserve:\n- sigmoid: sempre entre 0 e 1 (suave)\n- relu: 0 para negativos, identidade para positivos"
          }
          ],
          "hints": [
            "sigmoid(-5) ≈ 0.007 (quase zero), relu(-5) = 0",
            "relu 'mata' negativos e passa positivos direto. Sigmoid comprime tudo para (0,1)."
          ]
        },
          {
          "id": "5. Forward Pass de 2 Camadas",
          "instructions": "Combine tudo! Implemente uma rede com 2 camadas:\n- Camada oculta: 2 entradas → 2 neurônios (sigmoid)\n- Camada de saída: 2 entradas → 1 neurônio (sigmoid)\n\nUse `layer_forward` que você já criou como base.",
          "snippetId": "neural-network-exercise-5-en-us",
          "validators": [
            {
            "type": "assertFunctionReturn",
            "functionName": "forward_2layer",
            "args": [
              [
              1,
              0.5
            ],
              [
              [
              0.2,
              0.8
            ],
              [
              -0.5,
              0.1
            ]
            ],
              [
              0,
              0
            ],
              [
              0.5,
              -0.3
            ],
              0.1
            ],
            "expectedReturn": [
              [
              0.645656,
              0.38936
            ],
              0.56075
            ],
            "tolerance": 0.001
          }
          ],
          "hints": [
            "output = neuron(hidden, w_out, b_out)",
            "Retorne hidden, output como tupla"
          ]
        }
        ]
      },
      "en-us": {
        "title": "Exercise: Neural Network Pro",
        "description": "Implement Forward Pass, Activation Derivative, and Output Gradient.",
        "runButtonLabel": "Run",
        "checkButtonLabel": "Check",
        "successMessage": "Amazing! You've implemented the critical components of AI training!",
        "errorMessage": "The math doesn't add up. Review the derivative or the delta calculation.",
        "hintLabel": "Hint",
        "outputLabel": "Console Output",
        "exercises": [
          {
          "id": "1. Fix the Bug: Sigmoid Derivative inverted?",
          "instructions": "Someone implemented the sigmoid derivative — but the result is **negative** for some values!\n\nThe correct derivative is `s * (1 - s)`, which for s ∈ (0,1) is always positive.\n\nRun the code, observe the strange behavior, find and fix the bug.",
          "snippetId": "neural-network-exercise-6-en-us",
          "validators": [
            {
            "type": "assertFunctionReturn",
            "functionName": "sigmoid_derivative",
            "args": [
              0.5
            ],
            "expectedReturn": 0.25,
            "tolerance": 0.001
          },
            {
            "type": "assertFunctionReturn",
            "functionName": "sigmoid_derivative",
            "args": [
              0.8
            ],
            "expectedReturn": 0.16,
            "tolerance": 0.001
          }
          ],
          "hints": [
            "Change `(1 + s)` to `(1 - s)`",
            "The sigmoid derivative is always positive for s between 0 and 1, because s*(1-s) forms a parabola with max at 0.25."
          ]
        },
          {
          "id": "2. Layer Forward Pass",
          "instructions": "Instead of a single neuron, let's calculate an entire layer. \n\nImplement `layer_forward(inputs, weight_matrix, biases)` where:\n- `inputs` is a list of inputs.\n- `weight_matrix` is a list of lists (weights for each neuron).\n- `biases` is a list of biases.\n\nReturn the final activations.",
          "snippetId": "neural-network-exercise-7-en-us",
          "validators": [
            {
            "type": "assertFunctionReturn",
            "functionName": "layer_forward",
            "args": [
              [
              1,
              0.5
            ],
              [
              [
              0.2,
              0.8
            ],
              [
              -0.5,
              0.1
            ]
            ],
              [
              0,
              0
            ]
            ],
            "expectedReturn": [
              0.645656,
              0.38936
            ],
            "tolerance": 0.001
          }
          ],
          "hints": [
            "For each neuron, apply sigmoid(z) and use activations.append()."
          ]
        },
          {
          "id": "3. Error and Output Delta",
          "instructions": "In backpropagation, the output neuron's 'delta' is: \n`delta = (prediction - target) * activation_derivative(prediction)`.\n\nImplement the `calculate_output_delta(pred, target)` function.",
          "snippetId": "neural-network-exercise-8-en-us",
          "validators": [
            {
            "type": "assertFunctionReturn",
            "functionName": "calculate_output_delta",
            "args": [
              0.6,
              0
            ],
            "expectedReturn": 0.144,
            "tolerance": 0.001
          }
          ],
          "hints": [
            "Delta is the error multiplied by the derivative.",
            "error = pred - target"
          ]
        },
          {
          "id": "4. Compare: Sigmoid vs ReLU",
          "instructions": "Two popular activation functions behave **very differently**.\n\n**Before running:** for each value below, think mentally:\n- `sigmoid(-2)` is close to 0 or 1?\n- `relu(-2)` is 0 or negative?\n- Which function 'kills' negative signals?\n\nThen run and compare!",
          "snippetId": "neural-network-exercise-9-en-us",
          "validators": [
            {
            "type": "assertFunctionReturn",
            "functionName": "relu",
            "args": [
              -2
            ],
            "expectedReturn": 0,
            "tolerance": 0.001
          },
            {
            "type": "assertFunctionReturn",
            "functionName": "relu",
            "args": [
              0.5
            ],
            "expectedReturn": 0.5,
            "tolerance": 0.001
          },
            {
            "type": "assertFunctionReturn",
            "functionName": "relu",
            "args": [
              2
            ],
            "expectedReturn": 2,
            "tolerance": 0.001
          },
            {
            "type": "assertOutput",
            "expected": "     x | sigmoid(x) | relu(x)\n------------------------------\n  -5.0 |     0.0067 |   0.0000\n  -2.0 |     0.1192 |   0.0000\n  -0.5 |     0.3775 |   0.0000\n   0.0 |     0.5000 |   0.0000\n   0.5 |     0.6225 |   0.5000\n   2.0 |     0.8808 |   2.0000\n   5.0 |     0.9933 |   5.0000\n\nObserve:\n- sigmoid: always between 0 and 1 (smooth)\n- relu: 0 for negatives, identity for positives"
          }
          ],
          "hints": [
            "sigmoid(-5) ≈ 0.007 (almost zero), relu(-5) = 0",
            "relu kills negatives and passes positives through. Sigmoid compresses everything to (0,1)."
          ]
        },
          {
          "id": "5. 2-Layer Forward Pass",
          "instructions": "Put it all together! Implement a 2-layer network:\n- Hidden layer: 2 inputs → 2 neurons (sigmoid)\n- Output layer: 2 inputs → 1 neuron (sigmoid)\n\nUse the `neuron` function as your building block.",
          "snippetId": "neural-network-exercise-10-en-us",
          "validators": [
            {
            "type": "assertFunctionReturn",
            "functionName": "forward_2layer",
            "args": [
              [
              1,
              0.5
            ],
              [
              [
              0.2,
              0.8
            ],
              [
              -0.5,
              0.1
            ]
            ],
              [
              0,
              0
            ],
              [
              0.5,
              -0.3
            ],
              0.1
            ],
            "expectedReturn": [
              [
              0.645656,
              0.38936
            ],
              0.56075
            ],
            "tolerance": 0.001
          }
          ],
          "hints": [
            "output = neuron(hidden, w_out, b_out)",
            "Return hidden, output as a tuple"
          ]
        }
        ]
      }
    },
  },
});
