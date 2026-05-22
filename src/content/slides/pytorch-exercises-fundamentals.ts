import { defineSlide } from './_factory';

export const pytorchExercisesFundamentals = defineSlide({
  id: 'pytorch-exercises-fundamentals',
  type: 'exercise',
  content: {
    'pt-br': {
      title: 'Exercícios: Operações de Tensores',
      body: 'Consolide o que vimos: dtypes, shapes (B, T), fatiamento e o ciclo de autograd. Use apenas o que foi ensinado nos slides anteriores.',
    },
    'en-us': {
      title: 'Exercises: Tensor Operations',
      body: 'Consolidate what we covered: dtypes, shapes (B, T), slicing, and the autograd cycle. Use only what was taught in previous slides.',
    },
  },
  visual: {
    id: 'python-exercise',
    copy: {
      'pt-br': {
        title: 'Bateria 1: Fundamentos Operacionais',
        description: 'Implemente as transformações de dados usando os contratos de Shape e Dtype.',
        runButtonLabel: 'Executar',
        checkButtonLabel: 'Verificar',
        successMessage: 'Excelente! Você domina a base operacional do PyTorch.',
        errorMessage: 'O validador encontrou inconsistências. Verifique os shapes e dtypes.',
        hintLabel: 'Dica',
        outputLabel: 'Saída do Console',
        exercises: [
          {
            id: '1. Criação e Dtypes (Contrato de IDs)',
            instructions: 'O script fornece a lista `data`. Converta para um tensor `long` chamado `ids`. O validador checará se o `dtype` é `int64`.',
            snippetId: 'pytorch-exercises-fundamentals-1',
            validators: [
              {
                type: 'assertVariable',
                variableName: 'ids',
                expectedValue: [10, 20, 30],
                tolerance: 0.001,
              },
            ],
            hints: ['Use `torch.tensor(data, dtype=torch.long)`.'],
          },
          {
            id: '2. Fatiamento (x/y Shift)',
            instructions: 'Dado o tensor `tokens` de shape `(B, T)`, crie a entrada `x` contendo todas as posições exceto a última. O validador checará `x`.',
            snippetId: 'pytorch-exercises-fundamentals-2',
            validators: [
              {
                type: 'assertVariable',
                variableName: 'x',
                expectedValue: [[1, 2, 3], [5, 6, 7]],
                tolerance: 0.001,
              },
            ],
            hints: ['Lembre-se do slide de Batch Shift: `tokens[:, :-1]`.'],
          },
          {
            id: '3. Flatten para Cross-Entropy',
            instructions: 'O tensor `logits` tem shape `(B, T, V)`. Use `.view()` para achatar os dois primeiros eixos em um só, resultando em um shape `(B*T, V)`. Salve em `flat_logits`.',
            snippetId: 'pytorch-exercises-fundamentals-3',
            validators: [
              {
                type: 'assertVariable',
                variableName: 'flat_logits',
                expectedValue: [[1.0, 0.1], [0.2, 0.8], [0.5, 0.5], [0.9, 0.1]],
                tolerance: 0.001,
              },
            ],
            hints: ['Use `.view(-1, V)` ou calcule B*T manualmente.'],
          },
          {
            id: '4. Autograd (Sensibilidade de x)',
            instructions: 'Com `x=3.0` e `requires_grad=True`, calcule `y = x**2`. Chame o backward e salve o valor numérico (scalar) do gradiente de x em `grad_val`.',
            snippetId: 'pytorch-exercises-fundamentals-4',
            validators: [
              {
                type: 'assertVariable',
                variableName: 'grad_val',
                expectedValue: 6.0,
                tolerance: 0.001,
              },
            ],
            hints: ['Use `y.backward()` e acesse `x.grad.item()`.'],
          },
        ],
      },
      'en-us': {
        title: 'Battery 1: Operational Fundamentals',
        description: 'Implement data transformations using Shape and Dtype contracts.',
        runButtonLabel: 'Run',
        checkButtonLabel: 'Check',
        successMessage: 'Excellent! You mastered the PyTorch operational core.',
        errorMessage: 'Validator found inconsistencies. Check shapes and dtypes.',
        hintLabel: 'Hint',
        outputLabel: 'Console Output',
        exercises: [
          {
            id: '1. Creation and Dtypes (ID Contract)',
            instructions: 'The script provides list `data`. Convert to a `long` tensor called `ids`. The validator checks if `dtype` is `int64`.',
            snippetId: 'pytorch-exercises-fundamentals-5',
            validators: [
              {
                type: 'assertVariable',
                variableName: 'ids',
                expectedValue: [10, 20, 30],
                tolerance: 0.001,
              },
            ],
            hints: ['Use `torch.tensor(data, dtype=torch.long)`.'],
          },
          {
            id: '2. Slicing (x/y Shift)',
            instructions: 'Given tensor `tokens` with shape `(B, T)`, create input `x` containing all positions except the last one. Validator checks `x`.',
            snippetId: 'pytorch-exercises-fundamentals-6',
            validators: [
              {
                type: 'assertVariable',
                variableName: 'x',
                expectedValue: [[1, 2, 3], [5, 6, 7]],
                tolerance: 0.001,
              },
            ],
            hints: ['Remember the Batch Shift slide: `tokens[:, :-1]`.'],
          },
          {
            id: '3. Flatten for Cross-Entropy',
            instructions: 'The `logits` tensor has shape `(B, T, V)`. Use `.view()` to flatten the first two axes into one, resulting in shape `(B*T, V)`. Save in `flat_logits`.',
            snippetId: 'pytorch-exercises-fundamentals-7',
            validators: [
              {
                type: 'assertVariable',
                variableName: 'flat_logits',
                expectedValue: [[1.0, 0.1], [0.2, 0.8], [0.5, 0.5], [0.9, 0.1]],
                tolerance: 0.001,
              },
            ],
            hints: ['Use `.view(-1, V)` or calculate B*T manually.'],
          },
          {
            id: '4. Autograd (x Sensitivity)',
            instructions: 'With `x=3.0` and `requires_grad=True`, compute `y = x**2`. Call backward and save the numeric gradient value (scalar) of x in `grad_val`.',
            snippetId: 'pytorch-exercises-fundamentals-8',
            validators: [
              {
                type: 'assertVariable',
                variableName: 'grad_val',
                expectedValue: 6.0,
                tolerance: 0.001,
              },
            ],
            hints: ['Use `y.backward()` and access `x.grad.item()`.'],
          },
        ],
      },
    },
  },
});
