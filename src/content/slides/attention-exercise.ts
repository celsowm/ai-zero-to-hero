import { defineSlide } from './_factory';

export const attentionExercise = defineSlide({
  id: 'attention-exercise',
  type: 'exercise',
  content: {
    'pt-br': {
      title: `Exercício: O Mecanismo de Atenção`,
      body: `A atenção é o que torna os Transformers tão poderosos. Vamos implementar o cálculo simplificado de como um token 'olha' para os outros.`,
    },
    'en-us': {
      title: `Exercise: The Attention Mechanism`,
      body: `Attention is what makes Transformers so powerful. Let's implement the simplified calculation of how one token 'looks' at others.`,
    },
  },
  visual: {
    id: 'python-exercise',
    copy: {
      "pt-br": {
        "title": "Exercício: Mecanismo de Atenção",
        "description": "Implemente o cálculo de pontuação (score) entre uma Consulta (Query) e uma Chave (Key).",
        "runButtonLabel": "Executar",
        "checkButtonLabel": "Verificar",
        "successMessage": "Fantástico! Você capturou a essência da atenção!",
        "errorMessage": "O cálculo do score ou a aplicação da raiz quadrada falhou.",
        "hintLabel": "Dica",
        "outputLabel": "Saída do Console",
        "exercises": [
          {
          "id": "1. Fix the Bug: Esqueceram o sqrt!",
          "instructions": "O attention score usa **scaled** dot product — o 'S' em 'Scaled Dot-Product Attention'.\n\nMas alguém esqueceu a escala! O código divide por `dk` em vez de `sqrt(dk)`.\n\nCom vetores grandes, scores sem sqrt ficam **minúsculos**, o que achata o softmax e destrói a atenção.\n\nCorrija a fórmula e veja a diferença.",
          "snippetId": "attention-exercise-1-en-us",
          "validators": [
            {
            "type": "assertFunctionReturn",
            "functionName": "attention_score",
            "args": [
              [
              1,
              0,
              1
            ],
              [
              1,
              2,
              0
            ]
            ],
            "expectedReturn": 0.57735,
            "tolerance": 0.001
          }
          ],
          "hints": [
            "Troque `dot_product / dk` por `dot_product / math.sqrt(dk)`",
            "Para dk=3: sqrt(3) ≈ 1.732, então o score correto é maior que o buggy (1/3 ≈ 0.333 vs 1/1.732 ≈ 0.577)."
          ]
        },
          {
          "id": "2. Softmax nos Scores",
          "instructions": "Implemente a função softmax que transforma scores brutos em pesos de atenção.\n\n`softmax(x_i) = exp(x_i) / sum(exp(x))`\n\nOs pesos devem somar 1.0.",
          "snippetId": "attention-exercise-2-en-us",
          "validators": [
            {
            "type": "assertFunctionReturn",
            "functionName": "softmax",
            "args": [
              [
              0.5,
              0.2,
              1.8
            ]
            ],
            "expectedReturn": [
              0.1343,
              0.0996,
              0.766
            ],
            "tolerance": 0.001
          },
            {
            "type": "assertFunctionReturn",
            "functionName": "softmax",
            "args": [
              [
              1,
              1,
              1
            ]
            ],
            "expectedReturn": [
              0.3333,
              0.3333,
              0.3333
            ],
            "tolerance": 0.001
          }
          ],
          "hints": [
            "sum_exps = sum(exps)",
            "return [e / sum_exps for e in exps]"
          ]
        },
          {
          "id": "3. Weighted Sum dos Values",
          "instructions": "Com os pesos de atenção (softmax), calcule a soma ponderada dos vetores Value.\n\n`output = sum(weight_i * value_i)` para cada token i.\n\nIsso produz o vetor de contexto final.",
          "snippetId": "attention-exercise-3-en-us",
          "validators": [
            {
            "type": "assertFunctionReturn",
            "functionName": "weighted_sum",
            "args": [
              [
              [
              0.1,
              0.3,
              0.6
            ],
              [
              [
              1,
              0
            ],
              [
              0.5,
              1
            ],
              [
              0,
              2
            ]
            ]
            ]
            ],
            "expectedReturn": [
              0.25,
              1.5
            ],
            "tolerance": 0.001
          }
          ],
          "hints": [
            "output[j] += weights[i] * values[i][j]"
          ]
        }
        ]
      },
      "en-us": {
        "title": "Exercise: Attention Mechanism",
        "description": "Implement the score calculation between a Query and a Key.",
        "runButtonLabel": "Run",
        "checkButtonLabel": "Check",
        "successMessage": "Fantastic! You've captured the essence of attention!",
        "errorMessage": "The score calculation or square root application failed.",
        "hintLabel": "Hint",
        "outputLabel": "Console Output",
        "exercises": [
          {
          "id": "1. Fix the Bug: They forgot the sqrt!",
          "instructions": "The attention score uses **scaled** dot product — the 'S' in 'Scaled Dot-Product Attention'.\n\nBut someone forgot the scaling! The code divides by `dk` instead of `sqrt(dk)`.\n\nWith large vectors, unscaled scores become **tiny**, which flattens the softmax and destroys attention.\n\nFix the formula and see the difference.",
          "snippetId": "attention-exercise-4-en-us",
          "validators": [
            {
            "type": "assertFunctionReturn",
            "functionName": "attention_score",
            "args": [
              [
              1,
              0,
              1
            ],
              [
              1,
              2,
              0
            ]
            ],
            "expectedReturn": 0.57735,
            "tolerance": 0.001
          }
          ],
          "hints": [
            "Change `dot_product / dk` to `dot_product / math.sqrt(dk)`",
            "For dk=3: sqrt(3) ≈ 1.732, so the correct score is larger than buggy (1/3 ≈ 0.333 vs 1/1.732 ≈ 0.577)."
          ]
        },
          {
          "id": "2. Softmax on Scores",
          "instructions": "Implement the softmax function that transforms raw scores into attention weights.\n\n`softmax(x_i) = exp(x_i) / sum(exp(x))`\n\nWeights should sum to 1.0.",
          "snippetId": "attention-exercise-5-en-us",
          "validators": [
            {
            "type": "assertFunctionReturn",
            "functionName": "softmax",
            "args": [
              [
              0.5,
              0.2,
              1.8
            ]
            ],
            "expectedReturn": [
              0.1343,
              0.0996,
              0.766
            ],
            "tolerance": 0.001
          },
            {
            "type": "assertFunctionReturn",
            "functionName": "softmax",
            "args": [
              [
              1,
              1,
              1
            ]
            ],
            "expectedReturn": [
              0.3333,
              0.3333,
              0.3333
            ],
            "tolerance": 0.001
          }
          ],
          "hints": [
            "sum_exps = sum(exps)",
            "return [e / sum_exps for e in exps]"
          ]
        },
          {
          "id": "3. Weighted Sum of Values",
          "instructions": "With the attention weights (softmax), compute the weighted sum of Value vectors.\n\n`output = sum(weight_i * value_i)` for each token i.\n\nThis produces the final context vector.",
          "snippetId": "attention-exercise-6-en-us",
          "validators": [
            {
            "type": "assertFunctionReturn",
            "functionName": "weighted_sum",
            "args": [
              [
              [
              0.1,
              0.3,
              0.6
            ],
              [
              [
              1,
              0
            ],
              [
              0.5,
              1
            ],
              [
              0,
              2
            ]
            ]
            ]
            ],
            "expectedReturn": [
              0.25,
              1.5
            ],
            "tolerance": 0.001
          }
          ],
          "hints": [
            "output[j] += weights[i] * values[i][j]"
          ]
        }
        ]
      }
    },
  },
});
