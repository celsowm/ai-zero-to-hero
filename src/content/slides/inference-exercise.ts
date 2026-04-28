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
            starterCode: '# Simulação de configuração vLLM\n# Em produção: vllm serve model --gpu-memory-utilization 0.99 --max-num-seqs 2048\n\nimport sys\n\n# BUG: estes valores causam OOM!\ngpu_memory_utilization = 0.99  # muito alto — reserve memória para overhead\nmax_num_seqs = 2048  # muitas sequências simultâneas\nmax_model_len = 4096\n\ndef check_config(util, num_seqs, model_len):\n    """Verifica se a configuração é segura para uma GPU de 24GB.\"\"\"\n    available_mem = 24 * 1024  # 24GB em MB\n    needed_mem = model_len * num_seqs * 0.001 * 2  # estimativa KV cache\n    overhead = available_mem * (1 - util)\n    \n    if overhead < 500:  # precisa de pelo menos 500MB de overhead\n        print(f"OOM: overhead insuficiente ({overhead:.0f}MB < 500MB)")\n        return False\n    if num_seqs > 512:\n        print(f"OOM: max_num_seqs {num_seqs} é muito alto")\n        return False\n    if util > 0.95:\n        print(f"OOM: gpu_memory_utilization {util} deixa margem insuficiente")\n        return False\n    print(f"OK: config segura (overhead={overhead:.0f}MB, seqs={num_seqs})")\n    return True\n\ncheck_config(gpu_memory_utilization, max_num_seqs, max_model_len)',
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
            starterCode: '# Simulating vLLM config\n# In production: vllm serve model --gpu-memory-utilization 0.99 --max-num-seqs 2048\n\nimport sys\n\n# BUG: these values cause OOM!\ngpu_memory_utilization = 0.99  # too high — reserve memory for overhead\nmax_num_seqs = 2048  # too many concurrent sequences\nmax_model_len = 4096\n\ndef check_config(util, num_seqs, model_len):\n    """Checks if config is safe for a 24GB GPU.\"\"\"\n    available_mem = 24 * 1024  # 24GB in MB\n    needed_mem = model_len * num_seqs * 0.001 * 2  # KV cache estimate\n    overhead = available_mem * (1 - util)\n    \n    if overhead < 500:  # needs at least 500MB overhead\n        print(f"OOM: insufficient overhead ({overhead:.0f}MB < 500MB)")\n        return False\n    if num_seqs > 512:\n        print(f"OOM: max_num_seqs {num_seqs} is too high")\n        return False\n    if util > 0.95:\n        print(f"OOM: gpu_memory_utilization {util} leaves insufficient margin")\n        return False\n    print(f"OK: safe config (overhead={overhead:.0f}MB, seqs={num_seqs})")\n    return True\n\ncheck_config(gpu_memory_utilization, max_num_seqs, max_model_len)',
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
