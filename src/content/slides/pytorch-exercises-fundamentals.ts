import { defineSlide } from './_factory';

export const pytorchExercisesFundamentals = defineSlide({
  id: 'pytorch-exercises-fundamentals',
  type: 'exercise',
  content: {
    'pt-br': {
      title: 'Exercícios: PyTorch Fundamentos',
      body: 'Vamos praticar os fundamentos que aparecem no dia a dia: shape/rank, slicing, broadcast e gradiente básico.',
    },
    'en-us': {
      title: 'Exercises: PyTorch Fundamentals',
      body: 'Let\'s practice everyday fundamentals: shape/rank, slicing, broadcasting, and basic gradients.',
    },
  },
  visual: {
    id: 'python-exercise',
    copy: {
      'pt-br': {
        title: 'Bateria 1: Fundamentos',
        description: 'Complete os passos e valide seus resultados.',
        runButtonLabel: 'Executar',
        checkButtonLabel: 'Verificar',
        successMessage: 'Boa! Você fechou os fundamentos de tensores.',
        errorMessage: 'Ainda não passou em todos os testes. Revise os passos.',
        hintLabel: 'Dica',
        outputLabel: 'Saída do Console',
        exercises: [
          {
            id: '1. Shape e rank',
            instructions: 'Corrija `get_shape(matrix)` para retornar `(linhas, colunas)`.',
            snippetId: 'pytorch-exercises-fundamentals-1',
            validators: [
              {
                type: 'assertFunctionReturn',
                functionName: 'get_shape',
                args: [[[1, 2, 3], [4, 5, 6]]],
                expectedReturn: [2, 3],
                tolerance: 0.001,
              },
            ],
            hints: ['Conte primeiro linhas (len da matriz), depois colunas (len da primeira linha).'],
          },
          {
            id: '2. Indexing/slicing',
            instructions: 'Implemente `get_column(matrix, col_idx)` retornando a coluna solicitada.',
            snippetId: 'pytorch-exercises-fundamentals-2',
            validators: [
              {
                type: 'assertFunctionReturn',
                functionName: 'get_column',
                args: [[[1, 2, 3], [4, 5, 6], [7, 8, 9]], 1],
                expectedReturn: [2, 5, 8],
                tolerance: 0.001,
              },
            ],
            hints: ['Percorra cada linha e pegue `row[col_idx]`.'],
          },
          {
            id: '3. Broadcast de bias',
            instructions: 'Complete `add_bias(matrix, bias)` somando o vetor `bias` em cada linha.',
            snippetId: 'pytorch-exercises-fundamentals-3',
            validators: [
              {
                type: 'assertFunctionReturn',
                functionName: 'add_bias',
                args: [[[1, 2], [3, 4]], [10, 20]],
                expectedReturn: [[11, 22], [13, 24]],
                tolerance: 0.001,
              },
            ],
            hints: ['Use `enumerate(row)` para alinhar cada elemento com `bias[j]`.'],
          },
          {
            id: '4. Bug fix: gradiente',
            instructions: 'A função `grad_square(x)` está errada. Para y=x^2, o gradiente é 2x.',
            snippetId: 'pytorch-exercises-fundamentals-4',
            validators: [
              {
                type: 'assertFunctionReturn',
                functionName: 'grad_square',
                args: [3.0],
                expectedReturn: 6.0,
                tolerance: 0.001,
              },
            ],
            hints: ['Derivada de x^2 é 2*x.'],
          },
        ],
      },
      'en-us': {
        title: 'Battery 1: Fundamentals',
        description: 'Complete each step and validate your results.',
        runButtonLabel: 'Run',
        checkButtonLabel: 'Check',
        successMessage: 'Great. You completed tensor fundamentals.',
        errorMessage: 'Some tests are still failing. Review each step.',
        hintLabel: 'Hint',
        outputLabel: 'Console Output',
        exercises: [
          {
            id: '1. Shape and rank',
            instructions: 'Fix `get_shape(matrix)` to return `(rows, cols)`.',
            snippetId: 'pytorch-exercises-fundamentals-5',
            validators: [
              {
                type: 'assertFunctionReturn',
                functionName: 'get_shape',
                args: [[[1, 2, 3], [4, 5, 6]]],
                expectedReturn: [2, 3],
                tolerance: 0.001,
              },
            ],
            hints: ['Count rows first, then columns from the first row.'],
          },
          {
            id: '2. Indexing/slicing',
            instructions: 'Implement `get_column(matrix, col_idx)` and return the target column.',
            snippetId: 'pytorch-exercises-fundamentals-6',
            validators: [
              {
                type: 'assertFunctionReturn',
                functionName: 'get_column',
                args: [[[1, 2, 3], [4, 5, 6], [7, 8, 9]], 1],
                expectedReturn: [2, 5, 8],
                tolerance: 0.001,
              },
            ],
            hints: ['Iterate over rows and append `row[col_idx]`.'],
          },
          {
            id: '3. Bias broadcasting',
            instructions: 'Complete `add_bias(matrix, bias)` by adding the bias vector to each row.',
            snippetId: 'pytorch-exercises-fundamentals-7',
            validators: [
              {
                type: 'assertFunctionReturn',
                functionName: 'add_bias',
                args: [[[1, 2], [3, 4]], [10, 20]],
                expectedReturn: [[11, 22], [13, 24]],
                tolerance: 0.001,
              },
            ],
            hints: ['Use `enumerate(row)` and add `bias[j]` to each value.'],
          },
          {
            id: '4. Bug fix: gradient',
            instructions: 'Function `grad_square(x)` is wrong. For y=x^2, gradient is 2x.',
            snippetId: 'pytorch-exercises-fundamentals-8',
            validators: [
              {
                type: 'assertFunctionReturn',
                functionName: 'grad_square',
                args: [3.0],
                expectedReturn: 6.0,
                tolerance: 0.001,
              },
            ],
            hints: ['Derivative of x^2 is 2*x.'],
          },
        ],
      },
    },
  },
});

