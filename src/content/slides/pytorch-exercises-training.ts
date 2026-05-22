import { defineSlide } from './_factory';

export const pytorchExercisesTraining = defineSlide({
  id: 'pytorch-exercises-training',
  type: 'exercise',
  content: {
    'pt-br': {
      title: 'Exercícios: Ciclo de Treino e Otimização',
      body: 'O treino não é apenas chamar .backward(). Vamos implementar componentes críticos de regularização, acúmulo e clipping de gradientes.',
    },
    'en-us': {
      title: 'Exercises: Training Cycle and Optimization',
      body: 'Training is not just calling .backward(). We will implement critical components of regularization, accumulation, and gradient clipping.',
    },
  },
  visual: {
    id: 'python-exercise',
    copy: {
      'pt-br': {
        title: 'Bateria 2: Treino e Otimização',
        description: 'Pratique a mecânica interna de otimizadores e funções de custo.',
        runButtonLabel: 'Executar',
        checkButtonLabel: 'Verificar',
        successMessage: 'Parabéns! Você entende a mecânica fina do treinamento no PyTorch.',
        errorMessage: 'O gradiente explodiu ou a loss divergiu. Verifique os cálculos de regularização e clipping.',
        hintLabel: 'Dica',
        outputLabel: 'Saída do Console',
        exercises: [
          {
            id: '1. Projeção e Softmax',
            instructions: 'O script fornece `x`, `w` e `b`. Calcule a projeção `logits = x @ w.t() + b` e depois salve em `probs` o resultado de `torch.softmax` no último eixo.',
            snippetId: 'pytorch-exercises-training-1',
            validators: [
              {
                type: 'assertVariable',
                variableName: 'probs',
                expectedValue: [0.9241, 0.0759],
                tolerance: 0.001,
              },
            ],
            hints: ['Use `torch.softmax(logits, dim=-1)`.'],
          },
          {
            id: '2. MSE com Regularização L2',
            instructions: 'Dados `pred`, `target`, `weights` e `lambd`, calcule a loss total em `loss`. A fórmula é `MSE + lambd * sum(weights^2)`.',
            snippetId: 'pytorch-exercises-training-2',
            validators: [
              {
                type: 'assertVariable',
                variableName: 'loss',
                expectedValue: 0.170,
                tolerance: 0.001,
              },
            ],
            hints: ['MSE é `torch.mean((pred - target)**2)`.'],
          },
          {
            id: '3. Acúmulo de Gradientes',
            instructions: 'O script define `w`. Para cada valor em `values`, calcule `loss = w * 1.0` e chame `.backward()`. O validador checará o valor final de `w.grad`.',
            snippetId: 'pytorch-exercises-training-3',
            validators: [
              {
                type: 'assertVariable',
                variableName: 'final_grad',
                expectedValue: 3.0,
                tolerance: 0.001,
              },
            ],
            hints: ['Não zere o gradiente dentro do loop.'],
          },
          {
            id: '4. Clipping de Gradiente Manual',
            instructions: 'Dado o tensor `grad` e `max_norm`, se `torch.norm(grad) > max_norm`, reescale `grad` em `clipped_grad`. Caso contrário, `clipped_grad` é o próprio `grad`.',
            snippetId: 'pytorch-exercises-training-4',
            validators: [
              {
                type: 'assertVariable',
                variableName: 'clipped_grad',
                expectedValue: [1.2, 1.6],
                tolerance: 0.001,
              },
            ],
            hints: ['A fórmula é `grad * (max_norm / current_norm)`.'],
          },
        ],
      },
      'en-us': {
        title: 'Battery 2: Training and Optimization',
        description: 'Practice the internal mechanics of optimizers and cost functions.',
        runButtonLabel: 'Run',
        checkButtonLabel: 'Check',
        successMessage: 'Congratulations! You understand the fine mechanics of PyTorch training.',
        errorMessage: 'Gradients exploded or loss diverged. Check your regularization and clipping calculations.',
        hintLabel: 'Hint',
        outputLabel: 'Console Output',
        exercises: [
          {
            id: '1. Projection and Softmax',
            instructions: 'The script provides `x`, `w`, and `b`. Compute `logits = x @ w.t() + b` and then save the result of `torch.softmax` on the last axis into `probs`.',
            snippetId: 'pytorch-exercises-training-5',
            validators: [
              {
                type: 'assertVariable',
                variableName: 'probs',
                expectedValue: [0.9241, 0.0759],
                tolerance: 0.001,
              },
            ],
            hints: ['Use `torch.softmax(logits, dim=-1)`.'],
          },
          {
            id: '2. MSE with L2 Regularization',
            instructions: 'Given `pred`, `target`, `weights`, and `lambd`, calculate the total loss in `loss`. The formula is `MSE + lambd * sum(weights^2)`.',
            snippetId: 'pytorch-exercises-training-6',
            validators: [
              {
                type: 'assertVariable',
                variableName: 'loss',
                expectedValue: 0.170,
                tolerance: 0.001,
              },
            ],
            hints: ['MSE is `torch.mean((pred - target)**2)`.'],
          },
          {
            id: '3. Gradient Accumulation',
            instructions: 'The script defines `w`. For each value in `values`, compute `loss = w * 1.0` and call `.backward()`. The validator checks `w.grad`.',
            snippetId: 'pytorch-exercises-training-7',
            validators: [
              {
                type: 'assertVariable',
                variableName: 'final_grad',
                expectedValue: 3.0,
                tolerance: 0.001,
              },
            ],
            hints: ['Do not zero out the gradient inside the loop.'],
          },
          {
            id: '4. Manual Gradient Clipping',
            instructions: 'Given tensor `grad` and `max_norm`, if `torch.norm(grad) > max_norm`, rescale `grad` into `clipped_grad`. Otherwise, `clipped_grad` is `grad`.',
            snippetId: 'pytorch-exercises-training-8',
            validators: [
              {
                type: 'assertVariable',
                variableName: 'clipped_grad',
                expectedValue: [1.2, 1.6],
                tolerance: 0.001,
              },
            ],
            hints: ['The formula is `grad * (max_norm / current_norm)`.'],
          },
        ],
      },
    },
  },
});
