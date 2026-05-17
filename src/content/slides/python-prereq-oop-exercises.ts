import { defineSlide } from './_factory';

export const pythonPrereqOopExercises = defineSlide({
  id: 'python-prereq-oop-exercises',
  type: 'exercise',
  content: {
    'pt-br': {
      title: 'Python OOP: Exercícios práticos',
      body: 'Reforce os conceitos de POO com Python completando os trechos de código.',
    },
    'en-us': {
      title: 'Python OOP: Hands-on exercises',
      body: 'Reinforce OOP concepts with Python by completing the code snippets.',
    },
  },
  visual: {
    id: 'python-exercise',
    copy: {
      'pt-br': {
        title: 'Exercícios de POO em Python',
        description: 'Complete os trechos de código e execute para verificar.',
        runButtonLabel: 'Executar',
        checkButtonLabel: 'Verificar',
        successMessage: 'Parabéns! Todos os testes passaram.',
        errorMessage: 'Alguns testes falharam. Revise seu código.',
        hintLabel: 'Dica',
        outputLabel: 'Saída',
        exercises: [
          {
            id: '1. Classe Produto',
            instructions: 'Implemente os métodos:\n\n- `valor_total()`: retorna `preco * quantidade`\n- `produto_padrao(nome)`: classmethod que cria Produto com preco=10.0, quantidade=1\n- `calcular_desconto(preco, percentual)`: staticmethod que retorna preço com desconto',
            snippetId: 'python-prereq-oop-exercise-1',
            validators: [
              { type: 'assertFunctionReturn', functionName: 'valor_total', args: [], expectedReturn: 500.0, tolerance: 0.001 },
              {
                type: 'assertFunctionReturn',
                functionName: 'produto_padrao',
                args: ['Caneta'],
                expectedReturn: { nome: 'Caneta', preco: 10.0, quantidade: 1 },
              },
              { type: 'assertFunctionReturn', functionName: 'calcular_desconto', args: [100.0, 10.0], expectedReturn: 90.0, tolerance: 0.001 },
            ],
            hints: [
              'valor_total: return self.preco * self.quantidade',
              'produto_padrao: return cls(nome, 10.0, 1)',
              'calcular_desconto: return preco * (1 - percentual / 100)',
            ],
          },
          {
            id: '2. Herança com dataclass',
            instructions: 'Complete a classe Funcionario:\n\n- `Funcionario` herda de `Pessoa`\n- `aumentar_salario(percentual)`: aumenta `self.salario` pelo percentual',
            snippetId: 'python-prereq-oop-exercise-2',
            validators: [
              { type: 'assertOutput', expected: 'Alice: R$ 5500.00' },
            ],
            hints: [
              'aumentar_salario: self.salario *= (1 + percentual / 100)',
            ],
          },
          {
            id: '3. Dunder methods',
            instructions: 'Implemente os métodos dunder:\n\n- `__add__`: retorna novo Ponto2D com x+y somados\n- `__eq__`: compara x e y (use isinstance primeiro)',
            snippetId: 'python-prereq-oop-exercise-3',
            validators: [
              { type: 'assertOutput', expected: 'Ponto2D(4.0, 6.0)' },
              { type: 'assertVariable', variableName: '_test_eq', expectedValue: false },
            ],
            hints: [
              '__add__: return Ponto2D(self.x + outro.x, self.y + outro.y)',
              '__eq__: if not isinstance(outro, Ponto2D): return NotImplemented; return self.x == outro.x and self.y == outro.y',
            ],
          },
        ],
      },
      'en-us': {
        title: 'OOP Exercises in Python',
        description: 'Complete the code snippets and run them to check.',
        runButtonLabel: 'Run',
        checkButtonLabel: 'Check',
        successMessage: 'Congratulations! All tests passed.',
        errorMessage: 'Some tests failed. Review your code.',
        hintLabel: 'Hint',
        outputLabel: 'Output',
        exercises: [
          {
            id: '1. Product class',
            instructions: 'Implement the methods:\n\n- `valor_total()`: returns `preco * quantidade`\n- `produto_padrao(nome)`: classmethod that creates Product with preco=10.0, quantidade=1\n- `calcular_desconto(preco, percentual)`: staticmethod that returns the discounted price',
            snippetId: 'python-prereq-oop-exercise-1',
            validators: [
              { type: 'assertFunctionReturn', functionName: 'valor_total', args: [], expectedReturn: 500.0, tolerance: 0.001 },
              {
                type: 'assertFunctionReturn',
                functionName: 'produto_padrao',
                args: ['Caneta'],
                expectedReturn: { nome: 'Caneta', preco: 10.0, quantidade: 1 },
              },
              { type: 'assertFunctionReturn', functionName: 'calcular_desconto', args: [100.0, 10.0], expectedReturn: 90.0, tolerance: 0.001 },
            ],
            hints: [
              'valor_total: return self.preco * self.quantidade',
              'produto_padrao: return cls(nome, 10.0, 1)',
              'calcular_desconto: return preco * (1 - percentual / 100)',
            ],
          },
          {
            id: '2. Inheritance with dataclass',
            instructions: 'Complete the Funcionario class:\n\n- `Funcionario` inherits from `Pessoa`\n- `aumentar_salario(percentual)`: increases `self.salario` by the percentage',
            snippetId: 'python-prereq-oop-exercise-2',
            validators: [
              { type: 'assertOutput', expected: 'Alice: R$ 5500.00' },
            ],
            hints: [
              'aumentar_salario: self.salario *= (1 + percentual / 100)',
            ],
          },
          {
            id: '3. Dunder methods',
            instructions: 'Implement the dunder methods:\n\n- `__add__`: returns a new Ponto2D with summed x+y\n- `__eq__`: compares x and y (use isinstance first)',
            snippetId: 'python-prereq-oop-exercise-3',
            validators: [
              { type: 'assertOutput', expected: 'Ponto2D(4.0, 6.0)' },
              { type: 'assertVariable', variableName: '_test_eq', expectedValue: false },
            ],
            hints: [
              '__add__: return Ponto2D(self.x + outro.x, self.y + outro.y)',
              '__eq__: if not isinstance(outro, Ponto2D): return NotImplemented; return self.x == outro.x and self.y == outro.y',
            ],
          },
        ],
      },
    },
  },
});
