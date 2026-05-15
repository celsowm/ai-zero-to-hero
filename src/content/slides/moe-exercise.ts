import { defineSlide } from './_factory';

export const moeExercise = defineSlide({
  id: 'moe-exercise',
  type: 'exercise',
  content: {
    'pt-br': {
      title: `Exercício: Criando um Mini-Roteador MoE`,
      body: `Vamos implementar a lógica básica de um roteador MoE: calcular scores, selecionar o Top-1 e normalizar a saída.`,
    },
    'en-us': {
      title: `Exercise: Creating a Mini MoE Router`,
      body: `Let's implement the basic logic of an MoE router: calculate scores, select Top-1, and normalize the output.`,
    },
  },
  visual: {
    id: 'python-exercise',
    copy: {
      "pt-br": {
        "title": "Exercício: Roteamento MoE",
        "description": "Implemente a seleção do especialista e o cálculo da saída ponderada.",
        "runButtonLabel": "Executar",
        "checkButtonLabel": "Verificar",
        "successMessage": "Excelente! Você roteou o token com sucesso!",
        "errorMessage": "O roteamento ou a ponderação da saída estão incorretos.",
        "hintLabel": "Dica",
        "outputLabel": "Saída do Console",
        "exercises": [
          {
          "id": "1. Seleção Top-1",
          "instructions": "O roteador calculou scores para 4 especialistas. Identifique o índice do especialista com o maior score.\n\nDica: use `scores.index(max(scores))`",
          "snippetId": "moe-exercise-1",
          "validators": [
            {
            "type": "assertFunctionReturn",
            "functionName": "get_top_expert",
            "args": [[0.1, 0.8, 0.05, 0.05]],
            "expectedReturn": 1
          }
          ],
          "hints": [
            "O maior valor em [0.1, 0.8, 0.05, 0.05] é 0.8, que está no índice 1."
          ]
        },
          {
          "id": "2. Saída Ponderada (Gated Output)",
          "instructions": "No MoE, a saída final é a saída do especialista multiplicada pelo peso dado pelo roteador.\n\n`final_output = weight * expert_output`",
          "snippetId": "moe-exercise-2",
          "validators": [
            {
            "type": "assertFunctionReturn",
            "functionName": "calculate_moe_output",
            "args": [0.5, [2.0, 4.0, 0.0]],
            "expectedReturn": [1.0, 2.0, 0.0]
          }
          ],
          "hints": [
            "Basta multiplicar `val * weight` dentro de uma list comprehension."
          ]
        }
        ]
      },
      "en-us": {
        "title": "Exercise: MoE Routing",
        "description": "Implement expert selection and weighted output calculation.",
        "runButtonLabel": "Run",
        "checkButtonLabel": "Check",
        "successMessage": "Excellent! You routed the token successfully!",
        "errorMessage": "The routing or output weighting is incorrect.",
        "hintLabel": "Hint",
        "outputLabel": "Console Output",
        "exercises": [
          {
          "id": "1. Top-1 Selection",
          "instructions": "The router calculated scores for 4 experts. Identify the index of the expert with the highest score.\n\nHint: use `scores.index(max(scores))`",
          "snippetId": "moe-exercise-3",
          "validators": [
            {
            "type": "assertFunctionReturn",
            "functionName": "get_top_expert",
            "args": [[0.1, 0.8, 0.05, 0.05]],
            "expectedReturn": 1
          }
          ],
          "hints": [
            "The largest value in [0.1, 0.8, 0.05, 0.05] is 0.8, which is at index 1."
          ]
        },
          {
          "id": "2. Gated Output",
          "instructions": "In MoE, the final output is the expert's output multiplied by the weight given by the router.\n\n`final_output = weight * expert_output`",
          "snippetId": "moe-exercise-4",
          "validators": [
            {
            "type": "assertFunctionReturn",
            "functionName": "calculate_moe_output",
            "args": [0.5, [2.0, 4.0, 0.0]],
            "expectedReturn": [1.0, 2.0, 0.0]
          }
          ],
          "hints": [
            "Just multiply `val * weight` inside a list comprehension."
          ]
        }
        ]
      }
    },
  },
});
