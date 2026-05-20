import { defineSlide } from './_factory';

export const pytorchExercisesLanguageModeling = defineSlide({
  id: 'pytorch-exercises-language-modeling',
  type: 'exercise',
  content: {
    'pt-br': {
      title: 'Exercícios: Language Modeling em PyTorch',
      body: 'Fechamos com os blocos centrais de LM: shift x/y, shape de logits, cross-entropy e decode.',
    },
    'en-us': {
      title: 'Exercises: Language Modeling in PyTorch',
      body: 'Finish with core LM blocks: x/y shift, logits shape, cross-entropy, and decoding.',
    },
  },
  visual: {
    id: 'python-exercise',
    copy: {
      'pt-br': {
        title: 'Bateria 3: Language Modeling',
        description: 'Consolide os passos fundamentais para next-token prediction.',
        runButtonLabel: 'Executar',
        checkButtonLabel: 'Verificar',
        successMessage: 'Perfeito! Base de LM concluída.',
        errorMessage: 'Ainda há testes falhando. Revise os conceitos de LM.',
        hintLabel: 'Dica',
        outputLabel: 'Saída do Console',
        exercises: [
          {
            id: '1. Shift x/y',
            instructions: 'Implemente `make_xy(tokens)` com `x=tokens[:-1]` e `y=tokens[1:]`.',
            snippetId: 'pytorch-exercises-language-modeling-1',
            validators: [
              {
                type: 'assertFunctionReturn',
                functionName: 'make_xy',
                args: [[10, 11, 12, 13]],
                expectedReturn: [[10, 11, 12], [11, 12, 13]],
                tolerance: 0.001,
              },
            ],
            hints: ['A entrada prevê o próximo token, então y é deslocado em +1.'],
          },
          {
            id: '2. Shape dos logits',
            instructions: 'Implemente `logits_shape(batch_size, seq_len, vocab_size)`.',
            snippetId: 'pytorch-exercises-language-modeling-2',
            validators: [
              {
                type: 'assertFunctionReturn',
                functionName: 'logits_shape',
                args: [2, 4, 1000],
                expectedReturn: [2, 4, 1000],
                tolerance: 0.001,
              },
            ],
            hints: ['No LM causal: [B, T, V].'],
          },
          {
            id: '3. Bug fix: cross-entropy',
            instructions: 'Corrija `token_cross_entropy(probs, target_idx)`. A CE correta usa `-log(p_target)`.',
            snippetId: 'pytorch-exercises-language-modeling-3',
            validators: [
              {
                type: 'assertFunctionReturn',
                functionName: 'token_cross_entropy',
                args: [[0.1, 0.7, 0.2], 1],
                expectedReturn: 0.356675,
                tolerance: 0.001,
              },
            ],
            hints: ['A loss deve ser positiva quando p<1, então falta o sinal negativo.'],
          },
          {
            id: '4. Decode por argmax',
            instructions: 'Implemente `next_token(logits)` retornando o índice do maior logit.',
            snippetId: 'pytorch-exercises-language-modeling-4',
            validators: [
              {
                type: 'assertFunctionReturn',
                functionName: 'next_token',
                args: [[1.0, 2.5, 0.7, 2.2]],
                expectedReturn: 1,
                tolerance: 0.001,
              },
            ],
            hints: ['Argmax é o índice do maior valor.'],
          },
        ],
      },
      'en-us': {
        title: 'Battery 3: Language Modeling',
        description: 'Consolidate the core steps for next-token prediction.',
        runButtonLabel: 'Run',
        checkButtonLabel: 'Check',
        successMessage: 'Great. LM foundations completed.',
        errorMessage: 'Some tests still fail. Review LM concepts.',
        hintLabel: 'Hint',
        outputLabel: 'Console Output',
        exercises: [
          {
            id: '1. Shift x/y',
            instructions: 'Implement `make_xy(tokens)` with `x=tokens[:-1]` and `y=tokens[1:]`.',
            snippetId: 'pytorch-exercises-language-modeling-5',
            validators: [
              {
                type: 'assertFunctionReturn',
                functionName: 'make_xy',
                args: [[10, 11, 12, 13]],
                expectedReturn: [[10, 11, 12], [11, 12, 13]],
                tolerance: 0.001,
              },
            ],
            hints: ['Input predicts the next token, so y is shifted by +1.'],
          },
          {
            id: '2. Logits shape',
            instructions: 'Implement `logits_shape(batch_size, seq_len, vocab_size)`.',
            snippetId: 'pytorch-exercises-language-modeling-6',
            validators: [
              {
                type: 'assertFunctionReturn',
                functionName: 'logits_shape',
                args: [2, 4, 1000],
                expectedReturn: [2, 4, 1000],
                tolerance: 0.001,
              },
            ],
            hints: ['For causal LM: [B, T, V].'],
          },
          {
            id: '3. Bug fix: cross-entropy',
            instructions: 'Fix `token_cross_entropy(probs, target_idx)`. Correct CE is `-log(p_target)`.',
            snippetId: 'pytorch-exercises-language-modeling-7',
            validators: [
              {
                type: 'assertFunctionReturn',
                functionName: 'token_cross_entropy',
                args: [[0.1, 0.7, 0.2], 1],
                expectedReturn: 0.356675,
                tolerance: 0.001,
              },
            ],
            hints: ['Loss should be positive when p<1, so negative sign is required.'],
          },
          {
            id: '4. Argmax decode',
            instructions: 'Implement `next_token(logits)` returning the index of the largest logit.',
            snippetId: 'pytorch-exercises-language-modeling-8',
            validators: [
              {
                type: 'assertFunctionReturn',
                functionName: 'next_token',
                args: [[1.0, 2.5, 0.7, 2.2]],
                expectedReturn: 1,
                tolerance: 0.001,
              },
            ],
            hints: ['Argmax = index of the maximum value.'],
          },
        ],
      },
    },
  },
});

