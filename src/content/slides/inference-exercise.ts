import { defineSlide } from './_factory';

export const inferenceExercise = defineSlide({
  id: 'inference-exercise',
  type: 'exercise',
  content: {
    'pt-br': {
      title: 'Exercício: Fix the Bug — vLLM OOM',
      body: `A configuração do vLLM abaixo causa OOM (Out Of Memory). Execute, observe o erro, e encontre o problema.`,
    },
    'en-us': {
      title: 'Exercise: Fix the Bug — vLLM OOM',
      body: `The vLLM configuration below causes OOM (Out Of Memory). Run it, observe the error, and find the problem.`,
    },
  },
  visual: {
    id: 'python-exercise',
    copy: {
      'pt-br': {
        title: 'Exercício: Fix the Bug — vLLM Config',
        description: 'Encontre e corrija a configuração que causa OOM no vLLM.',
        runButtonLabel: 'Executar',
        checkButtonLabel: 'Verificar',
        successMessage: 'Parabéns! Configuração corrigida com sucesso!',
        errorMessage: 'Alguns testes falharam. Revise a configuração.',
        hintLabel: 'Dica',
        outputLabel: 'Saída',
        exercises: [
          {
            id: '1. gpu_memory_utilization e max_num_seqs muito altos',
            instructions: 'O vLLM está configurado com `--gpu-memory-utilization 0.99` e `--max-num-seqs 2048`, o que causa OOM. Corrija para valores seguros: `--gpu-memory-utilization 0.92` e `--max-num-seqs 256`. Verifique que o servidor inicia sem erro.',
            snippetId: 'inference-exercise',
            validators: [
              {
                type: 'assertOutput',
                expected: 'OK:',
              },
            ],
            hints: [
              'gpu_memory_utilization 0.99 deixa apenas 1% de overhead.',
              'max_num_seqs 2048 é excessivo — o padrão é 256.',
              'Tente: gpu_memory_utilization = 0.92, max_num_seqs = 256',
            ],
          },
        ],
      },
      'en-us': {
        title: 'Exercise: Fix the Bug — vLLM Config',
        description: 'Find and fix the configuration that causes OOM in vLLM.',
        runButtonLabel: 'Run',
        checkButtonLabel: 'Check',
        successMessage: 'Congratulations! Configuration fixed successfully!',
        errorMessage: 'Some tests failed. Please review the configuration.',
        hintLabel: 'Hint',
        outputLabel: 'Output',
        exercises: [
          {
            id: '1. gpu_memory_utilization and max_num_seqs too high',
            instructions: 'vLLM is configured with `--gpu-memory-utilization 0.99` and `--max-num-seqs 2048`, which causes OOM. Fix to safe values: `--gpu-memory-utilization 0.92` and `--max-num-seqs 256`. Verify the server starts without errors.',
            snippetId: 'inference-exercise',
            validators: [
              {
                type: 'assertOutput',
                expected: 'OK:',
              },
            ],
            hints: [
              'gpu_memory_utilization 0.99 leaves only 1% overhead.',
              'max_num_seqs 2048 is excessive — default is 256.',
              'Try: gpu_memory_utilization = 0.92, max_num_seqs = 256',
            ],
          },
        ],
      },
    },
  },
});
