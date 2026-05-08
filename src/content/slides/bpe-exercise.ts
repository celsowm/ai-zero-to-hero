import { defineSlide } from './_factory';

export const bpeExercise = defineSlide({
  id: 'bpe-exercise',
  type: 'exercise',
  content: {
    'pt-br': {
      title: `Exercício: Seu próprio tokenizador`,
      body: `Agora é sua vez! Complete o código BPE e veja como o tokenizador funciona na prática.`,
    },
    'en-us': {
      title: `Exercise: Your own tokenizer`,
      body: `Now it's your turn! Complete the BPE code and see how the tokenizer works in practice.`,
    },
  },
  visual: {
    id: 'python-exercise',
    copy: {
      "pt-br": {
        "title": "Exercício: Tokenizador BPE",
        "description": "Complete as funções BPE e execute para tokenizar seu próprio texto.",
        "runButtonLabel": "Executar",
        "checkButtonLabel": "Verificar",
        "successMessage": "Parabéns! Tokenização correta!",
        "errorMessage": "Alguns testes falharam. Revise seu código.",
        "hintLabel": "Dica",
        "outputLabel": "Tokens gerados",
        "exercises": [
          {
          "id": "1. Contar pares",
          "instructions": "Complete a função `get_stats(corpus)` que recebe uma lista de palavras (cada uma como tupla de símbolos) e retorna um dicionário com a contagem de todos os pares adjacentes.\n\nExemplo: `('l','o','w')` → pares `('l','o')` e `('o','w')`.",
          "snippetId": "bpe-exercise-1-en-us",
          "validators": [
            {
            "type": "assertFunctionReturn",
            "functionName": "get_stats",
            "args": [
              [
              [
              "l",
              "o",
              "w"
            ],
              [
              "l",
              "o",
              "w",
              "e",
              "r"
            ]
            ]
            ],
            "expectedReturn": {
              "('l', 'o')": 2,
              "('o', 'w')": 2,
              "('w', 'e')": 1,
              "('e', 'r')": 1
            },
            "tolerance": 0.001
          }
          ],
          "hints": [
            "O par é: pair = (word[i], word[i+1])",
            "Incremento: stats[pair] = stats.get(pair, 0) + 1"
          ]
        },
          {
          "id": "2. Fundir par",
          "instructions": "Complete a função `merge_pair(pair, corpus)` que recebe um par de símbolos e um corpus, e retorna o corpus com todas as ocorrências desse par fundidas em um único símbolo.\n\nExemplo: merge `('e','r')` em `'n e w e r'` → `'n e w er'`.",
          "snippetId": "bpe-exercise-2-en-us",
          "validators": [
            {
            "type": "assertFunctionReturn",
            "functionName": "merge_pair",
            "args": [
              [
              "o",
              "w"
            ],
              [
              [
              "l",
              "o",
              "w"
            ],
              [
              "l",
              "o",
              "w",
              "e",
              "r"
            ]
            ]
            ],
            "expectedReturn": [
              [
              "l",
              "ow"
            ],
              [
              "l",
              "ow",
              "e",
              "r"
            ]
            ],
            "tolerance": 0.001
          }
          ],
          "hints": [
            "Fusão: new_word.append(word[i] + word[i+1])",
            "Avance 2 posições: i += 2"
          ]
        },
          {
          "id": "3. BPE completo",
          "instructions": "Junte tudo! Execute BPE no corpus de exemplo por 10 merges e veja o vocabulário final.\n\nO código já está completo — apenas execute para ver o resultado.",
          "snippetId": "bpe-exercise-3-en-us",
          "validators": [
            {
            "type": "assertOutput",
            "expected": "Merge 1: ('e', 'r')\nMerge 2: ('n', 'ew')\nMerge 3: ('low', 'er')\nMerge 4: ('low', 'est')\nVocabulario final: 9 simbolos\n  Merge 1: er\n  Merge 2: new\n  Merge 3: lower\n  Merge 4: lowest"
          }
          ],
          "hints": [
            "Este exercício já está completo. Execute para ver o resultado!"
          ]
        }
        ]
      },
      "en-us": {
        "title": "Exercise: BPE Tokenizer",
        "description": "Complete the BPE functions and run them to tokenize your own text.",
        "runButtonLabel": "Run",
        "checkButtonLabel": "Check",
        "successMessage": "Congratulations! Correct tokenization!",
        "errorMessage": "Some tests failed. Please review your code.",
        "hintLabel": "Hint",
        "outputLabel": "Generated tokens",
        "exercises": [
          {
          "id": "1. Count pairs",
          "instructions": "Complete the `get_stats(corpus)` function that receives a list of words (each as a tuple of symbols) and returns a dictionary with the count of all adjacent pairs.\n\nExample: `('l','o','w')` → pairs `('l','o')` and `('o','w')`.",
          "snippetId": "bpe-exercise-4-en-us",
          "validators": [
            {
            "type": "assertFunctionReturn",
            "functionName": "get_stats",
            "args": [
              [
              [
              "l",
              "o",
              "w"
            ],
              [
              "l",
              "o",
              "w",
              "e",
              "r"
            ]
            ]
            ],
            "expectedReturn": {
              "('l', 'o')": 2,
              "('o', 'w')": 2,
              "('w', 'e')": 1,
              "('e', 'r')": 1
            },
            "tolerance": 0.001
          }
          ],
          "hints": [
            "The pair is: pair = (word[i], word[i+1])",
            "Increment: stats[pair] = stats.get(pair, 0) + 1"
          ]
        },
          {
          "id": "2. Merge pair",
          "instructions": "Complete the `merge_pair(pair, corpus)` function that receives a pair of symbols and a corpus, and returns the corpus with all occurrences of that pair merged into a single symbol.\n\nExample: merge `('e','r')` in `'n e w e r'` → `'n e w er'`.",
          "snippetId": "bpe-exercise-5-en-us",
          "validators": [
            {
            "type": "assertFunctionReturn",
            "functionName": "merge_pair",
            "args": [
              [
              "o",
              "w"
            ],
              [
              [
              "l",
              "o",
              "w"
            ],
              [
              "l",
              "o",
              "w",
              "e",
              "r"
            ]
            ]
            ],
            "expectedReturn": [
              [
              "l",
              "ow"
            ],
              [
              "l",
              "ow",
              "e",
              "r"
            ]
            ],
            "tolerance": 0.001
          }
          ],
          "hints": [
            "Merge: new_word.append(word[i] + word[i+1])",
            "Advance 2 positions: i += 2"
          ]
        },
          {
          "id": "3. Full BPE",
          "instructions": "Put it all together! Run BPE on the example corpus for 10 merges and see the final vocabulary.\n\nThe code is already complete — just run it to see the result.",
          "snippetId": "bpe-exercise-6-en-us",
          "validators": [
            {
            "type": "assertOutput",
            "expected": "Merge 1: ('e', 'r')\nMerge 2: ('n', 'ew')\nMerge 3: ('low', 'er')\nMerge 4: ('low', 'est')\nFinal vocabulary: 9 symbols\n  Merge 1: er\n  Merge 2: new\n  Merge 3: lower\n  Merge 4: lowest"
          }
          ],
          "hints": [
            "This exercise is already complete. Run it to see the result!"
          ]
        }
        ]
      }
    },
  },
});
