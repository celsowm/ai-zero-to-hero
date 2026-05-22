import { defineSlide } from './_factory';

export const pytorchExercisesArchitecture = defineSlide({
  id: 'pytorch-exercises-architecture',
  type: 'exercise',
  content: {
    'pt-br': {
      title: 'Exercícios: Arquitetura e nn.Module',
      body: 'Hora de organizar os tensores em estruturas reutilizáveis. Vamos montar classes de modelos e entender o fluxo de dados em módulos de alto nível.',
    },
    'en-us': {
      title: 'Exercises: Architecture and nn.Module',
      body: 'Time to organize tensors into reusable structures. We will build model classes and understand data flow in high-level modules.',
    },
  },
  visual: {
    id: 'python-exercise',
    copy: {
      'pt-br': {
        title: 'Bateria 2: Módulos e Camadas',
        description: 'Construa e valide arquiteturas neurais usando a interface declarativa do PyTorch.',
        runButtonLabel: 'Executar',
        checkButtonLabel: 'Verificar',
        successMessage: 'Excelente! Você agora sabe como projetar arquiteturas no PyTorch.',
        errorMessage: 'A arquitetura falhou. Verifique a herança de nn.Module e os shapes das camadas lineares.',
        hintLabel: 'Dica',
        outputLabel: 'Saída do Console',
        exercises: [
          {
            id: '1. O Módulo Mínimo',
            instructions: 'Defina uma classe `SimpleMLP` que herda de `nn.Module`. Ela deve ter uma camada `nn.Linear(10, 5)` no `__init__`. O script deve instanciar o modelo em `model`.',
            snippetId: 'pytorch-exercises-architecture-1',
            validators: [
              {
                type: 'assertVariable',
                variableName: 'is_module',
                expectedValue: true,
                tolerance: 0.0,
              },
              {
                type: 'assertVariable',
                variableName: 'in_features',
                expectedValue: 10,
                tolerance: 0.0,
              },
            ],
            hints: ['Lembre-se de chamar `super().__init__()`.'],
          },
          {
            id: '2. Cadeia de Ativações',
            instructions: 'Use `nn.Sequential` para criar um modelo chamado `net` com: Linear(4, 8), ReLU e Linear(8, 1). O validador checará o número de parâmetros.',
            snippetId: 'pytorch-exercises-architecture-2',
            validators: [
              {
                type: 'assertVariable',
                variableName: 'param_count',
                expectedValue: 49,
                tolerance: 0.0,
              },
            ],
            hints: ['A ReLU não possui parâmetros treináveis.'],
          },
          {
            id: '3. Forward Customizado',
            instructions: 'No `forward` do seu modelo, aplique `torch.relu` na saída da primeira camada e retorne o resultado. O validador passará um tensor de teste e checará se não há valores negativos em `output`.',
            snippetId: 'pytorch-exercises-architecture-3',
            validators: [
              {
                type: 'assertVariable',
                variableName: 'has_negatives',
                expectedValue: false,
                tolerance: 0.0,
              },
            ],
            hints: ['`x = self.layer1(x)`, então `x = torch.relu(x)`.'],
          },
          {
            id: '4. Softmax e Probabilidades',
            instructions: 'Crie uma rede que termina com `nn.Softmax(dim=-1)`. Salve a saída de um teste em `probs`. O validador verificará se a soma de `probs` é aproximadamente 1.0.',
            snippetId: 'pytorch-exercises-architecture-4',
            validators: [
              {
                type: 'assertVariable',
                variableName: 'sums_to_one',
                expectedValue: true,
                tolerance: 0.0,
              },
            ],
            hints: ['Softmax transforma logits em uma distribuição de probabilidade.'],
          },
        ],
      },
      'en-us': {
        title: 'Battery 2: Modules and Layers',
        description: 'Build and validate neural architectures using PyTorch\'s declarative interface.',
        runButtonLabel: 'Run',
        checkButtonLabel: 'Check',
        successMessage: 'Excellent! You now know how to design architectures in PyTorch.',
        errorMessage: 'Architecture failed. Check nn.Module inheritance and linear layer shapes.',
        hintLabel: 'Hint',
        outputLabel: 'Console Output',
        exercises: [
          {
            id: '1. The Minimum Module',
            instructions: 'Define a class `SimpleMLP` inheriting from `nn.Module`. It must have an `nn.Linear(10, 5)` layer in `__init__`. Instantiate the model in `model`.',
            snippetId: 'pytorch-exercises-architecture-5',
            validators: [
              {
                type: 'assertVariable',
                variableName: 'is_module',
                expectedValue: true,
                tolerance: 0.0,
              },
              {
                type: 'assertVariable',
                variableName: 'in_features',
                expectedValue: 10,
                tolerance: 0.0,
              },
            ],
            hints: ['Remember to call `super().__init__()`.'],
          },
          {
            id: '2. Activation Chain',
            instructions: 'Use `nn.Sequential` to create a model called `net` with: Linear(4, 8), ReLU, and Linear(8, 1). The validator checks the parameter count.',
            snippetId: 'pytorch-exercises-architecture-6',
            validators: [
              {
                type: 'assertVariable',
                variableName: 'param_count',
                expectedValue: 49,
                tolerance: 0.0,
              },
            ],
            hints: ['ReLU does not have trainable parameters.'],
          },
          {
            id: '3. Custom Forward',
            instructions: 'In your model\'s `forward`, apply `torch.relu` to the first layer\'s output and return it. The validator will check for negative values in `output`.',
            snippetId: 'pytorch-exercises-architecture-7',
            validators: [
              {
                type: 'assertVariable',
                variableName: 'has_negatives',
                expectedValue: false,
                tolerance: 0.0,
              },
            ],
            hints: ['`x = self.layer1(x)`, then `x = torch.relu(x)`.'],
          },
          {
            id: '4. Softmax and Probabilities',
            instructions: 'Build a network that ends with `nn.Softmax(dim=-1)`. Save a test output into `probs`. The validator checks if `probs` sums to 1.0.',
            snippetId: 'pytorch-exercises-architecture-8',
            validators: [
              {
                type: 'assertVariable',
                variableName: 'sums_to_one',
                expectedValue: true,
                tolerance: 0.0,
              },
            ],
            hints: ['Softmax turns logits into a probability distribution.'],
          },
        ],
      },
    },
  },
});
