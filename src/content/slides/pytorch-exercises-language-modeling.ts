import { defineSlide } from './_factory';

export const pytorchExercisesLanguageModeling = defineSlide({
  id: 'pytorch-exercises-language-modeling',
  type: 'exercise',
  content: {
    'pt-br': {
      title: 'Exercícios: Mecânica de Modelagem de Linguagem',
      body: 'Consolide o fluxo de um Decoder Transformer: máscaras causais, filtragem de logits e métricas de avaliação.',
    },
    'en-us': {
      title: 'Exercises: Language Modeling Mechanics',
      body: 'Consolidate the Transformer Decoder flow: causal masks, logits filtering, and evaluation metrics.',
    },
  },
  visual: {
    id: 'python-exercise',
    copy: {
      'pt-br': {
        title: 'Bateria 3: Mecânica de LM',
        description: 'Implemente os componentes que transformam um tensor em uma decisão de próximo token.',
        runButtonLabel: 'Executar',
        checkButtonLabel: 'Verificar',
        successMessage: 'Perfeito! Você entende como um Decoder processa e escolhe tokens.',
        errorMessage: 'A lógica de máscara ou amostragem falhou. Verifique as dimensões e o suporte (triu/tril).',
        hintLabel: 'Dica',
        outputLabel: 'Saída do Console',
        exercises: [
          {
            id: '1. Máscara Causal (Look-Ahead)',
            instructions: 'O script fornece `size`. Gere uma matriz quadrada triangular inferior de `1s` e `0s` chamada `mask`. Use `torch.tril` e `torch.ones`.',
            snippetId: 'pytorch-exercises-language-modeling-1',
            validators: [
              {
                type: 'assertVariable',
                variableName: 'mask',
                expectedValue: [[1, 0, 0], [1, 1, 0], [1, 1, 1]],
                tolerance: 0.001,
              },
            ],
            hints: ['Use `torch.tril(torch.ones(size, size))`.'],
          },
          {
            id: '2. Top-K Logits Filtering',
            instructions: 'Dados `logits` e `k`, mantenha em `filtered` apenas os `k` maiores valores. Substitua os outros por `-inf`. Use `torch.topk` para achar o corte.',
            snippetId: 'pytorch-exercises-language-modeling-2',
            validators: [
              {
                type: 'assertVariable',
                variableName: 'filtered',
                expectedValue: [null, 4.5, null, null, 3.8],
                tolerance: 0.001,
              },
            ],
            hints: ['`cutoff = torch.topk(logits, k).values[-1]`.'],
          },
          {
            id: '3. Perplexidade (PPL)',
            instructions: 'O script fornece `loss_val`. Calcule a perplexidade em `ppl` usando a fórmula `exp(loss)`. Use `torch.exp`.',
            snippetId: 'pytorch-exercises-language-modeling-3',
            validators: [
              {
                type: 'assertVariable',
                variableName: 'ppl',
                expectedValue: 10.0,
                tolerance: 0.001,
              },
            ],
            hints: ['PPL é a exponencial da cross-entropy.'],
          },
          {
            id: '4. Amostragem Multinomial',
            instructions: 'Dadas as probabilidades `probs`, sorteie o índice de UM token em `sampled_idx`. Use `torch.multinomial(probs, num_samples=1)`.',
            snippetId: 'pytorch-exercises-language-modeling-4',
            validators: [
              {
                type: 'assertVariable',
                variableName: 'sampled_idx',
                expectedValue: 1,
                tolerance: 0.001,
              },
            ],
            hints: ['Retorne apenas o valor numérico usando `.item()`.'],
          },
        ],
      },
      'en-us': {
        title: 'Battery 3: LM Mechanics',
        description: 'Implement the components that transform a tensor into a next-token decision.',
        runButtonLabel: 'Run',
        checkButtonLabel: 'Check',
        successMessage: 'Perfect! You understand how a Decoder processes and chooses tokens.',
        errorMessage: 'Masking or sampling logic failed. Check dimensions and triangle support (triu/tril).',
        hintLabel: 'Hint',
        outputLabel: 'Console Output',
        exercises: [
          {
            id: '1. Causal Mask (Look-Ahead)',
            instructions: 'The script provides `size`. Generate a square lower triangular matrix of `1s` and `0s` called `mask`. Use `torch.tril` and `torch.ones`.',
            snippetId: 'pytorch-exercises-language-modeling-5',
            validators: [
              {
                type: 'assertVariable',
                variableName: 'mask',
                expectedValue: [[1, 0, 0], [1, 1, 0], [1, 1, 1]],
                tolerance: 0.001,
              },
            ],
            hints: ['Use `torch.tril(torch.ones(size, size))`.'],
          },
          {
            id: '2. Top-K Logits Filtering',
            instructions: 'Given `logits` and `k`, keep only the top `k` values in `filtered`. Replace others with `-inf`. Use `torch.topk` to find the cutoff.',
            snippetId: 'pytorch-exercises-language-modeling-6',
            validators: [
              {
                type: 'assertVariable',
                variableName: 'filtered',
                expectedValue: [null, 4.5, null, null, 3.8],
                tolerance: 0.001,
              },
            ],
            hints: ['`cutoff = torch.topk(logits, k).values[-1]`.'],
          },
          {
            id: '3. Perplexity (PPL)',
            instructions: 'The script provides `loss_val`. Calculate perplexity in `ppl` using `exp(loss)`. Use `torch.exp`.',
            snippetId: 'pytorch-exercises-language-modeling-7',
            validators: [
              {
                type: 'assertVariable',
                variableName: 'ppl',
                expectedValue: 10.0,
                tolerance: 0.001,
              },
            ],
            hints: ['PPL is the exponential of cross-entropy.'],
          },
          {
            id: '4. Multinomial Sampling',
            instructions: 'Given `probs`, sample ONE token index into `sampled_idx`. Use `torch.multinomial(probs, num_samples=1)`.',
            snippetId: 'pytorch-exercises-language-modeling-8',
            validators: [
              {
                type: 'assertVariable',
                variableName: 'sampled_idx',
                expectedValue: 1,
                tolerance: 0.001,
              },
            ],
            hints: ['Return only the numeric value using `.item()`.'],
          },
        ],
      },
    },
  },
});
