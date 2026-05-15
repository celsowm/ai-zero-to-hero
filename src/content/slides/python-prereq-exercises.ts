import { defineSlide } from './_factory';

export const pythonPrereqExercises = defineSlide({
  id: 'python-prereq-exercises',
  type: 'exercise',
  content: {
    'pt-br': {
      title: `Python Essencial: Exercícios práticos`,
      body: `Reforce os conceitos fundamentais de Python com exercícios interativos. Complete o código e verifique sua resposta.`,
    },
    'en-us': {
      title: `Python Essentials: Hands-on exercises`,
      body: `Reinforce fundamental Python concepts with interactive exercises. Complete the code and check your answer.`,
    },
  },
  visual: {
    id: 'python-exercise',
    copy: {
      "pt-br": {
        "title": "Exercícios práticos de Python",
        "description": "Complete os trechos de código e execute para verificar se está correto.",
        "runButtonLabel": "Executar",
        "checkButtonLabel": "Verificar",
        "successMessage": "Parabéns! Todos os testes passaram.",
        "errorMessage": "Alguns testes falharam. Revise seu código.",
        "hintLabel": "Dica",
        "outputLabel": "Saída",
        "exercises": [
          {
          "id": "1. Variáveis",
          "instructions": "Crie as variáveis `altura` e `peso` com os valores que quiser e calcule o `imc` usando a fórmula: peso / (altura/100)².\n\nDepois imprima o resultado.",
          "snippetId": "python-prereq-exercises-1",
          "validators": [
            {
            "type": "assertDerivedVariable",
            "formulaId": "bmi",
            "variableName": "imc",
            "inputs": {
              "altura": "altura",
              "peso": "peso"
            },
            "tolerance": 0.001
          },
            {
            "type": "assertOutputMatchesVariable",
            "variableName": "imc"
          }
          ],
          "hints": [
            "Você pode escolher qualquer altura e peso positivos.",
            "A fórmula é: peso / ((altura/100) ** 2)"
          ]
        },
          {
          "id": "2. Listas",
          "instructions": "Acesse o terceiro elemento da lista `alturas` e armazene em `terceira_altura`.\n\nUse a função `len()` para calcular `total_pessoas`.",
          "snippetId": "python-prereq-exercises-2",
          "validators": [
            {
            "type": "assertVariable",
            "variableName": "terceira_altura",
            "expectedValue": 170
          },
            {
            "type": "assertVariable",
            "variableName": "total_pessoas",
            "expectedValue": 5
          },
            {
            "type": "assertOutput",
            "expected": "170 5"
          }
          ],
          "hints": [
            "Em Python, índices começam em 0: o terceiro elemento está no índice 2",
            "Use len(alturas) para obter o total"
          ]
        },
          {
          "id": "3. Funções",
          "instructions": "Complete a função `predicao_peso` que recebe `altura` e `idade` e retorna a predição usando a fórmula:\n\n`beta0 + beta1 * altura + beta2 * idade`",
          "snippetId": "python-prereq-exercises-3",
          "validators": [
            {
            "type": "assertFunctionReturn",
            "functionName": "predicao_peso",
            "args": [
              160,
              20
            ],
            "expectedReturn": 55,
            "tolerance": 0.001
          },
            {
            "type": "assertFunctionReturn",
            "functionName": "predicao_peso",
            "args": [
              170,
              28
            ],
            "expectedReturn": 64.2,
            "tolerance": 0.001
          },
            {
            "type": "assertOutput",
            "expected": "55"
          }
          ],
          "hints": [
            "A fórmula é: beta0 + beta1 * altura + beta2 * idade"
          ]
        },
          {
          "id": "4. Condicionais",
          "instructions": "Classifique o peso como 'Leve', 'Médio' ou 'Pesado' usando condicionais.\n\n- até 55 kg → 'Leve'\n- até 65 kg → 'Médio'\n- acima de 65 kg → 'Pesado'",
          "snippetId": "python-prereq-exercises-4",
          "validators": [
            {
            "type": "assertVariable",
            "variableName": "classificacao",
            "expectedValue": "Pesado"
          },
            {
            "type": "assertOutput",
            "expected": "Pesado"
          }
          ],
          "hints": [
            "O segundo caso (elif) deve ser 'Médio'",
            "O else deve ser 'Pesado'"
          ]
        },
          {
          "id": "5. Loop com range",
          "instructions": "Use um `for` com `range()` para calcular a soma dos números de 1 a 10 (inclusive).\n\nArmazene o resultado em `soma_total`.",
          "snippetId": "python-prereq-exercises-5",
          "validators": [
            {
            "type": "assertVariable",
            "variableName": "soma_total",
            "expectedValue": 55
          },
            {
            "type": "assertOutput",
            "expected": "55"
          }
          ],
          "hints": [
            "range(1, 11) gera números de 1 até 10",
            "Dentro do loop: soma_total += i"
          ]
        },
          {
          "id": "6. Loop + acumulador",
          "instructions": "Complete o loop para calcular a soma total dos pesos no dataset usando desempacotamento de tuplas.",
          "snippetId": "python-prereq-exercises-6",
          "validators": [
            {
            "type": "assertVariable",
            "variableName": "soma_pesos",
            "expectedValue": 178
          },
            {
            "type": "assertOutput",
            "expected": "178"
          }
          ],
          "hints": [
            "Dentro do loop, adicione o peso ao acumulador: soma_pesos += peso"
          ]
        },
          {
          "id": "7. List comprehension",
          "instructions": "Use uma **list comprehension** para criar a lista `idades` a partir da segunda coluna de `dados`.\n\nA saída esperada é `[20, 24, 28]`.",
          "snippetId": "python-prereq-exercises-7",
          "validators": [
            {
            "type": "assertVariable",
            "variableName": "idades",
            "expectedValue": [
              20,
              24,
              28
            ]
          },
            {
            "type": "assertOutput",
            "expected": "[20, 24, 28]"
          }
          ],
          "hints": [
            "A forma geral é: [expressao for ... in colecao]",
            "Você pode desempacotar as tuplas como `altura, idade, peso`",
            "A expressão que entra na lista é `idade`"
          ]
        },
          {
          "id": "8. Sum com generator",
          "instructions": "Use `sum(...)` com uma **generator expression** para calcular a variável `soma_idades` a partir da segunda coluna de `dados`.\n\nA saída esperada é `72`.",
          "snippetId": "python-prereq-exercises-8",
          "validators": [
            {
            "type": "assertVariable",
            "variableName": "soma_idades",
            "expectedValue": 72
          },
            {
            "type": "assertOutput",
            "expected": "72"
          }
          ],
          "hints": [
            "A estrutura é: sum(expressao for ... in colecao)",
            "A expressão a ser somada é `idade`",
            "Você pode desempacotar as tuplas como `altura, idade, peso`"
          ]
        }
        ]
      },
      "en-us": {
        "title": "Hands-on Python exercises",
        "description": "Complete the code snippets and run them to check if they are correct.",
        "runButtonLabel": "Run",
        "checkButtonLabel": "Check",
        "successMessage": "Congratulations! All tests passed.",
        "errorMessage": "Some tests failed. Please review your code.",
        "hintLabel": "Hint",
        "outputLabel": "Output",
        "exercises": [
          {
          "id": "1. Variables",
          "instructions": "Create the variables `height` and `weight` with any values you want and calculate `bmi` using the formula: weight / (height/100)².\n\nThen print the result.",
          "snippetId": "python-prereq-exercises-9",
          "validators": [
            {
            "type": "assertDerivedVariable",
            "formulaId": "bmi_en",
            "variableName": "bmi",
            "inputs": {
              "height": "height",
              "weight": "weight"
            },
            "tolerance": 0.001
          },
            {
            "type": "assertOutputMatchesVariable",
            "variableName": "bmi"
          }
          ],
          "hints": [
            "You can choose any positive height and weight.",
            "The formula is: weight / ((height/100) ** 2)"
          ]
        },
          {
          "id": "2. Lists",
          "instructions": "Access the third element of the `heights` list and store it in `third_height`.\n\nUse the `len()` function to calculate `total_people`.",
          "snippetId": "python-prereq-exercises-10",
          "validators": [
            {
            "type": "assertVariable",
            "variableName": "third_height",
            "expectedValue": 170
          },
            {
            "type": "assertVariable",
            "variableName": "total_people",
            "expectedValue": 5
          },
            {
            "type": "assertOutput",
            "expected": "170 5"
          }
          ],
          "hints": [
            "In Python, indices start at 0: the third element is at index 2",
            "Use len(heights) to get the total"
          ]
        },
          {
          "id": "3. Functions",
          "instructions": "Complete the `predict_weight` function that receives `height` and `age` and returns the prediction using the formula:\n\n`beta0 + beta1 * height + beta2 * age`",
          "snippetId": "python-prereq-exercises-11",
          "validators": [
            {
            "type": "assertFunctionReturn",
            "functionName": "predict_weight",
            "args": [
              160,
              20
            ],
            "expectedReturn": 55,
            "tolerance": 0.001
          },
            {
            "type": "assertFunctionReturn",
            "functionName": "predict_weight",
            "args": [
              170,
              28
            ],
            "expectedReturn": 64.2,
            "tolerance": 0.001
          },
            {
            "type": "assertOutput",
            "expected": "55"
          }
          ],
          "hints": [
            "The formula is: beta0 + beta1 * height + beta2 * age"
          ]
        },
          {
          "id": "4. Conditionals",
          "instructions": "Classify the weight as 'Light', 'Medium' or 'Heavy' using conditionals.\n\n- up to 55 kg → 'Light'\n- up to 65 kg → 'Medium'\n- above 65 kg → 'Heavy'",
          "snippetId": "python-prereq-exercises-12",
          "validators": [
            {
            "type": "assertVariable",
            "variableName": "classification",
            "expectedValue": "Heavy"
          },
            {
            "type": "assertOutput",
            "expected": "Heavy"
          }
          ],
          "hints": [
            "The second case (elif) should be 'Medium'",
            "The else should be 'Heavy'"
          ]
        },
          {
          "id": "5. Loop with range",
          "instructions": "Use a `for` loop with `range()` to calculate the sum of numbers from 1 to 10 (inclusive).\n\nStore the result in `total_sum`.",
          "snippetId": "python-prereq-exercises-13",
          "validators": [
            {
            "type": "assertVariable",
            "variableName": "total_sum",
            "expectedValue": 55
          },
            {
            "type": "assertOutput",
            "expected": "55"
          }
          ],
          "hints": [
            "range(1, 11) generates numbers from 1 to 10",
            "Inside the loop: total_sum += i"
          ]
        },
          {
          "id": "6. Loop + accumulator",
          "instructions": "Complete the loop to calculate the total sum of weights in the dataset using tuple unpacking.",
          "snippetId": "python-prereq-exercises-14",
          "validators": [
            {
            "type": "assertVariable",
            "variableName": "total_weight",
            "expectedValue": 178
          },
            {
            "type": "assertOutput",
            "expected": "178"
          }
          ],
          "hints": [
            "Inside the loop, add the weight to the accumulator: total_weight += weight"
          ]
        },
          {
          "id": "7. List comprehension",
          "instructions": "Use a **list comprehension** to build the `ages` list from the second column of `data`.\n\nThe expected output is `[20, 24, 28]`.",
          "snippetId": "python-prereq-exercises-15",
          "validators": [
            {
            "type": "assertVariable",
            "variableName": "ages",
            "expectedValue": [
              20,
              24,
              28
            ]
          },
            {
            "type": "assertOutput",
            "expected": "[20, 24, 28]"
          }
          ],
          "hints": [
            "The general form is: [expression for ... in collection]",
            "You can unpack tuples as `height, age, weight`",
            "The expression that should go into the new list is `age`"
          ]
        },
          {
          "id": "8. Sum with generator",
          "instructions": "Use `sum(...)` with a **generator expression** to compute the variable `sum_ages` from the second column of `data`.\n\nThe expected output is `72`.",
          "snippetId": "python-prereq-exercises-16",
          "validators": [
            {
            "type": "assertVariable",
            "variableName": "sum_ages",
            "expectedValue": 72
          },
            {
            "type": "assertOutput",
            "expected": "72"
          }
          ],
          "hints": [
            "The structure is: sum(expression for ... in collection)",
            "The expression to be added is `age`",
            "You can unpack tuples as `height, age, weight`"
          ]
        }
        ]
      }
    },
  },
});
