import { defineSlide } from './_factory';

export const pytorchExercisesTraining = defineSlide({
  id: 'pytorch-exercises-training',
  type: 'exercise',
  content: {
    'pt-br': {
      title: 'Exercícios: PyTorch Módulos e Treino',
      body: 'Agora treinamos de ponta a ponta: forward linear, loss, gradiente e atualização de parâmetros.',
    },
    'en-us': {
      title: 'Exercises: PyTorch Modules and Training',
      body: 'Now train end-to-end: linear forward, loss, gradients, and parameter update.',
    },
  },
  visual: {
    id: 'python-exercise',
    copy: {
      'pt-br': {
        title: 'Bateria 2: Módulos e Treino',
        description: 'Pratique a mecânica central de treinamento.',
        runButtonLabel: 'Executar',
        checkButtonLabel: 'Verificar',
        successMessage: 'Excelente! Você concluiu a base do loop de treino.',
        errorMessage: 'Ainda faltam correções para passar nos testes.',
        hintLabel: 'Dica',
        outputLabel: 'Saída do Console',
        exercises: [
          {
            id: '1. Forward de camada linear',
            instructions: 'Implemente `linear_forward(x, w, b)` para produzir saída por neurônio.',
            snippetId: 'pytorch-exercises-training-1',
            validators: [
              {
                type: 'assertFunctionReturn',
                functionName: 'linear_forward',
                args: [[2.0, 1.0], [[0.5, -1.0], [1.0, 2.0]], [0.1, -0.2]],
                expectedReturn: [0.1, 3.8],
                tolerance: 0.001,
              },
            ],
            hints: ['Para cada neurônio: `sum(x_i*w_i) + b`.'],
          },
          {
            id: '2. MSE',
            instructions: 'Implemente `mse(pred, target)` como média do erro quadrático.',
            snippetId: 'pytorch-exercises-training-2',
            validators: [
              {
                type: 'assertFunctionReturn',
                functionName: 'mse',
                args: [[0.0, 2.0], [1.0, 0.0]],
                expectedReturn: 2.5,
                tolerance: 0.001,
              },
            ],
            hints: ['Some `(p - t)^2` e divida por `len(pred)`.'],
          },
          {
            id: '3. Um passo de treino',
            instructions: 'Complete `train_step(w,b,x,y,lr)` retornando `(new_w, new_b)`.',
            snippetId: 'pytorch-exercises-training-3',
            validators: [
              {
                type: 'assertFunctionReturn',
                functionName: 'train_step',
                args: [1.0, 0.0, 2.0, 5.0, 0.1],
                expectedReturn: [2.2, 0.6],
                tolerance: 0.001,
              },
            ],
            hints: ['Use `error = (w*x+b) - y`, depois gradientes e atualização com learning rate.'],
          },
          {
            id: '4. Bug fix: zero_grad',
            instructions: 'Corrija `zero_grad(grads)` para zerar todos os valores do dicionário.',
            snippetId: 'pytorch-exercises-training-4',
            validators: [
              {
                type: 'assertFunctionReturn',
                functionName: 'zero_grad',
                args: [{ w: 1.5, b: -0.3 }],
                expectedReturn: { w: 0, b: 0 },
                tolerance: 0.001,
              },
            ],
            hints: ['Para cada chave, atribua `0.0`.'],
          },
        ],
      },
      'en-us': {
        title: 'Battery 2: Modules and Training',
        description: 'Practice the core training mechanics.',
        runButtonLabel: 'Run',
        checkButtonLabel: 'Check',
        successMessage: 'Excellent. You completed the core training loop.',
        errorMessage: 'Some fixes are still needed to pass all tests.',
        hintLabel: 'Hint',
        outputLabel: 'Console Output',
        exercises: [
          {
            id: '1. Linear layer forward',
            instructions: 'Implement `linear_forward(x, w, b)` to produce one output per neuron.',
            snippetId: 'pytorch-exercises-training-5',
            validators: [
              {
                type: 'assertFunctionReturn',
                functionName: 'linear_forward',
                args: [[2.0, 1.0], [[0.5, -1.0], [1.0, 2.0]], [0.1, -0.2]],
                expectedReturn: [0.1, 3.8],
                tolerance: 0.001,
              },
            ],
            hints: ['For each neuron: `sum(x_i*w_i) + b`.'],
          },
          {
            id: '2. MSE',
            instructions: 'Implement `mse(pred, target)` as mean squared error.',
            snippetId: 'pytorch-exercises-training-6',
            validators: [
              {
                type: 'assertFunctionReturn',
                functionName: 'mse',
                args: [[0.0, 2.0], [1.0, 0.0]],
                expectedReturn: 2.5,
                tolerance: 0.001,
              },
            ],
            hints: ['Sum `(p - t)^2` and divide by `len(pred)`.'],
          },
          {
            id: '3. One train step',
            instructions: 'Complete `train_step(w,b,x,y,lr)` and return `(new_w, new_b)`.',
            snippetId: 'pytorch-exercises-training-7',
            validators: [
              {
                type: 'assertFunctionReturn',
                functionName: 'train_step',
                args: [1.0, 0.0, 2.0, 5.0, 0.1],
                expectedReturn: [2.2, 0.6],
                tolerance: 0.001,
              },
            ],
            hints: ['Use `error = (w*x+b) - y`, then gradients and learning-rate update.'],
          },
          {
            id: '4. Bug fix: zero_grad',
            instructions: 'Fix `zero_grad(grads)` so every value in the dict becomes zero.',
            snippetId: 'pytorch-exercises-training-8',
            validators: [
              {
                type: 'assertFunctionReturn',
                functionName: 'zero_grad',
                args: [{ w: 1.5, b: -0.3 }],
                expectedReturn: { w: 0, b: 0 },
                tolerance: 0.001,
              },
            ],
            hints: ['Assign `0.0` to each key.'],
          },
        ],
      },
    },
  },
});

