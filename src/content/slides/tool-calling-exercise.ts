import { defineSlide } from './_factory';

export const toolCallingExercise = defineSlide({
  id: 'tool-calling-exercise',
  type: 'exercise',
  content: {
    'pt-br': {
      title: 'Exercício: Fix the Bug — Tool Calling Loop',
      body: `O loop de Tool Calling abaixo tem **dois bugs**: o resultado não é vinculado corretamente e os argumentos não são parseados. Encontre e corrija.`,
    },
    'en-us': {
      title: 'Exercise: Fix the Bug — Tool Calling Loop',
      body: `The Tool Calling loop below has **two bugs**: the result is not properly linked and the arguments are not parsed. Find and fix them.`,
    },
  },
  visual: {
    id: 'python-exercise',
    copy: {
      'pt-br': {
        title: 'Exercício: Fix the Bug — Tool Calling Loop',
        description: 'Encontre e corrija os bugs no loop de Tool Calling.',
        runButtonLabel: 'Executar',
        checkButtonLabel: 'Verificar',
        successMessage: 'Parabéns! Tool Calling Loop corrigido com sucesso!',
        errorMessage: 'Alguns testes falharam. Revise o código.',
        hintLabel: 'Dica',
        outputLabel: 'Saída',
        exercises: [
          {
            id: '1. tool_call_id missing e arguments não parseados',
            instructions: 'O loop de Tool Calling tem dois bugs: (1) a mensagem de resultado usa `id` ao invés de `tool_call_id`, quebrando o vínculo. (2) `tool_call["function"]["arguments"]` é uma string JSON mas é usada como dict. Corrija: use `tool_call_id=tool_call["id"]` e `json.loads(args_str)`.',
            snippetId: 'tool-calling-exercise',
            validators: [
              {
                type: 'assertOutput',
                expected: 'tool_call_id',
              },
            ],
            hints: [
              'args = tc["function"]["arguments"] retorna uma string, não dict.',
              'Use json.loads(tc["function"]["arguments"]) para parsear.',
              'A chave correta é tool_call_id, não id.',
            ],
          },
        ],
      },
      'en-us': {
        title: 'Exercise: Fix the Bug — Tool Calling Loop',
        description: 'Find and fix the bugs in the Tool Calling loop.',
        runButtonLabel: 'Run',
        checkButtonLabel: 'Check',
        successMessage: 'Congratulations! Tool Calling Loop fixed successfully!',
        errorMessage: 'Some tests failed. Please review the code.',
        hintLabel: 'Hint',
        outputLabel: 'Output',
        exercises: [
          {
            id: '1. tool_call_id missing and arguments not parsed',
            instructions: 'The Tool Calling loop has two bugs: (1) the result message uses `id` instead of `tool_call_id`, breaking the link. (2) `tool_call["function"]["arguments"]` is a JSON string but is used as a dict. Fix: use `tool_call_id=tool_call["id"]` and `json.loads(args_str)`.',
            snippetId: 'tool-calling-exercise',
            validators: [
              {
                type: 'assertOutput',
                expected: 'tool_call_id',
              },
            ],
            hints: [
              'args = tc["function"]["arguments"] returns a string, not a dict.',
              'Use json.loads(tc["function"]["arguments"]) to parse.',
              'The correct key is tool_call_id, not id.',
            ],
          },
        ],
      },
    },
  },
});
