import { defineSlide } from './_factory';

export const pytorchExercisesFundamentals = defineSlide({
  id: 'pytorch-exercises-fundamentals',
  type: 'exercise',
  content: {
    'pt-br': {
      title: 'Exercícios: Fundamentos Operacionais do PyTorch',
      body: 'Consolide o bloco inicial de PyTorch: dtype, leitura de shape tabular, batch de linguagem, shift x/y, flatten para loss e autograd. Use apenas os contratos vistos até aqui.',
    },
    'en-us': {
      title: 'Exercises: PyTorch Operational Fundamentals',
      body: 'Consolidate the initial PyTorch block: dtype, tabular shape reading, language batches, x/y shift, loss flattening, and autograd. Use only the contracts covered so far.',
    },
  },
  visual: {
    id: 'python-exercise',
    copy: {
      'pt-br': {
        title: 'Bateria 1: Fundamentos Operacionais',
        description: 'Pratique os contratos de shape, dtype e gradiente que sustentam os próximos slides de arquitetura e treino.',
        runButtonLabel: 'Executar',
        checkButtonLabel: 'Verificar',
        successMessage: 'Excelente! Você domina a base operacional do PyTorch.',
        errorMessage: 'O validador encontrou inconsistências. Verifique shapes, dtypes, fatiamento e gradientes.',
        hintLabel: 'Dica',
        outputLabel: 'Saída do Console',
        exercises: [
          {
            id: '1. IDs e dtype long',
            instructions: 'O script fornece a lista `data` com IDs de tokens. Converta para um tensor `long` chamado `ids` e salve `str(ids.dtype)` em `ids_dtype`.',
            snippetId: 'pytorch-exercises-fundamentals-1',
            validators: [
              {
                type: 'assertVariable',
                variableName: 'ids',
                expectedValue: [10, 20, 30],
                tolerance: 0.001,
              },
              {
                type: 'assertVariable',
                variableName: 'ids_dtype',
                expectedValue: 'torch.int64',
              },
            ],
            hints: ['Use `torch.tensor(data, dtype=torch.long)`.', '`torch.long` aparece como `torch.int64`.'],
          },
          {
            id: '2. Shape tabular B/F',
            instructions: 'O tensor `X` representa pacientes em formato tabular. Leia `X.shape` e salve o batch em `B` e o número de features em `F` como inteiros Python.',
            snippetId: 'pytorch-exercises-fundamentals-2',
            validators: [
              {
                type: 'assertVariable',
                variableName: 'B',
                expectedValue: 6,
              },
              {
                type: 'assertVariable',
                variableName: 'F',
                expectedValue: 4,
              },
            ],
            hints: ['Use `B, F = X.shape` ou `B = X.shape[0]` e `F = X.shape[1]`.'],
          },
          {
            id: '3. Shift x/y para próximo token',
            instructions: 'Dado `tokens` com shape `(B, T)`, crie `x` removendo a última posição de cada linha e `y` removendo a primeira. Esse é o par entrada/alvo do treino de próximo token.',
            snippetId: 'pytorch-exercises-fundamentals-3',
            validators: [
              {
                type: 'assertVariable',
                variableName: 'x',
                expectedValue: [[10, 11, 12, 13], [20, 21, 22, 23]],
                tolerance: 0.001,
              },
              {
                type: 'assertVariable',
                variableName: 'y',
                expectedValue: [[11, 12, 13, 14], [21, 22, 23, 24]],
                tolerance: 0.001,
              },
            ],
            hints: ['Use `tokens[:, :-1]` para `x`.', 'Use `tokens[:, 1:]` para `y`.'],
          },
          {
            id: '4. Flatten para loss',
            instructions: '`logits` tem shape `(B, T, V)` e `targets` tem shape `(B, T)`. Achate para `flat_logits` em `(B*T, V)` e `flat_targets` em `(B*T)`.',
            snippetId: 'pytorch-exercises-fundamentals-4',
            validators: [
              {
                type: 'assertVariable',
                variableName: 'flat_logits',
                expectedValue: [[1.0, 0.1], [0.2, 0.8], [0.5, 0.5], [0.9, 0.1]],
                tolerance: 0.001,
              },
              {
                type: 'assertVariable',
                variableName: 'flat_targets',
                expectedValue: [0, 1, 1, 0],
                tolerance: 0.001,
              },
            ],
            hints: ['Use `flat_logits = logits.view(B * T, V)`.', 'Use `flat_targets = targets.view(B * T)`.'],
          },
          {
            id: '5. Mesma posição: C e V',
            instructions: 'Acesse a posição `[0, 1]` em `hidden_states` e `output_scores`. Salve os shapes em `hidden_vec_shape` e `score_vec_shape` usando listas Python.',
            snippetId: 'pytorch-exercises-fundamentals-9',
            validators: [
              {
                type: 'assertVariable',
                variableName: 'hidden_vec_shape',
                expectedValue: [8],
              },
              {
                type: 'assertVariable',
                variableName: 'score_vec_shape',
                expectedValue: [50],
              },
            ],
            hints: ['`hidden_states[0, 1]` tem largura C.', '`output_scores[0, 1]` tem largura V.', 'Use `list(tensor.shape)`.'],
          },
          {
            id: '6. Autograd mínimo',
            instructions: 'Com `x = 3.0` e `requires_grad=True`, calcule `y = x**2`, chame `backward()` e salve o valor numérico de `x.grad` em `grad_val`.',
            snippetId: 'pytorch-exercises-fundamentals-10',
            validators: [
              {
                type: 'assertVariable',
                variableName: 'grad_val',
                expectedValue: 6.0,
                tolerance: 0.001,
              },
            ],
            hints: ['Depois de criar `y`, use `y.backward()`.', 'Acesse o escalar com `x.grad.item()`.'],
          },
        ],
      },
      'en-us': {
        title: 'Battery 1: Operational Fundamentals',
        description: 'Practice the shape, dtype, and gradient contracts that support the next architecture and training slides.',
        runButtonLabel: 'Run',
        checkButtonLabel: 'Check',
        successMessage: 'Excellent! You mastered the PyTorch operational core.',
        errorMessage: 'Validator found inconsistencies. Check shapes, dtypes, slicing, and gradients.',
        hintLabel: 'Hint',
        outputLabel: 'Console Output',
        exercises: [
          {
            id: '1. IDs and long dtype',
            instructions: 'The script provides list `data` with token IDs. Convert it to a `long` tensor called `ids` and save `str(ids.dtype)` in `ids_dtype`.',
            snippetId: 'pytorch-exercises-fundamentals-5',
            validators: [
              {
                type: 'assertVariable',
                variableName: 'ids',
                expectedValue: [10, 20, 30],
                tolerance: 0.001,
              },
              {
                type: 'assertVariable',
                variableName: 'ids_dtype',
                expectedValue: 'torch.int64',
              },
            ],
            hints: ['Use `torch.tensor(data, dtype=torch.long)`.', '`torch.long` appears as `torch.int64`.'],
          },
          {
            id: '2. Tabular B/F shape',
            instructions: 'Tensor `X` represents patients in tabular format. Read `X.shape` and save the batch in `B` and the number of features in `F` as Python integers.',
            snippetId: 'pytorch-exercises-fundamentals-6',
            validators: [
              {
                type: 'assertVariable',
                variableName: 'B',
                expectedValue: 6,
              },
              {
                type: 'assertVariable',
                variableName: 'F',
                expectedValue: 4,
              },
            ],
            hints: ['Use `B, F = X.shape` or `B = X.shape[0]` and `F = X.shape[1]`.'],
          },
          {
            id: '3. x/y shift for next token',
            instructions: 'Given `tokens` with shape `(B, T)`, create `x` by removing the last position from each row and `y` by removing the first. This is the input/target pair for next-token training.',
            snippetId: 'pytorch-exercises-fundamentals-7',
            validators: [
              {
                type: 'assertVariable',
                variableName: 'x',
                expectedValue: [[10, 11, 12, 13], [20, 21, 22, 23]],
                tolerance: 0.001,
              },
              {
                type: 'assertVariable',
                variableName: 'y',
                expectedValue: [[11, 12, 13, 14], [21, 22, 23, 24]],
                tolerance: 0.001,
              },
            ],
            hints: ['Use `tokens[:, :-1]` for `x`.', 'Use `tokens[:, 1:]` for `y`.'],
          },
          {
            id: '4. Flatten for loss',
            instructions: '`logits` has shape `(B, T, V)` and `targets` has shape `(B, T)`. Flatten into `flat_logits` with `(B*T, V)` and `flat_targets` with `(B*T)`.',
            snippetId: 'pytorch-exercises-fundamentals-8',
            validators: [
              {
                type: 'assertVariable',
                variableName: 'flat_logits',
                expectedValue: [[1.0, 0.1], [0.2, 0.8], [0.5, 0.5], [0.9, 0.1]],
                tolerance: 0.001,
              },
              {
                type: 'assertVariable',
                variableName: 'flat_targets',
                expectedValue: [0, 1, 1, 0],
                tolerance: 0.001,
              },
            ],
            hints: ['Use `flat_logits = logits.view(B * T, V)`.', 'Use `flat_targets = targets.view(B * T)`.'],
          },
          {
            id: '5. Same position: C and V',
            instructions: 'Access position `[0, 1]` in `hidden_states` and `output_scores`. Save their shapes in `hidden_vec_shape` and `score_vec_shape` using Python lists.',
            snippetId: 'pytorch-exercises-fundamentals-11',
            validators: [
              {
                type: 'assertVariable',
                variableName: 'hidden_vec_shape',
                expectedValue: [8],
              },
              {
                type: 'assertVariable',
                variableName: 'score_vec_shape',
                expectedValue: [50],
              },
            ],
            hints: ['`hidden_states[0, 1]` has width C.', '`output_scores[0, 1]` has width V.', 'Use `list(tensor.shape)`.'],
          },
          {
            id: '6. Minimal autograd',
            instructions: 'With `x = 3.0` and `requires_grad=True`, compute `y = x**2`, call `backward()`, and save the numeric value of `x.grad` in `grad_val`.',
            snippetId: 'pytorch-exercises-fundamentals-12',
            validators: [
              {
                type: 'assertVariable',
                variableName: 'grad_val',
                expectedValue: 6.0,
                tolerance: 0.001,
              },
            ],
            hints: ['After creating `y`, use `y.backward()`.', 'Access the scalar with `x.grad.item()`.'],
          },
        ],
      },
    },
  },
});
