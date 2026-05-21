import { defineSlide } from './_factory';

export const pythonPrereqOopDunderCall = defineSlide({
  id: 'python-prereq-oop-dunder-call',
  type: 'two-column',
  options: {
    columnRatios: [0.95, 1.05],
  },
  content: {
    'pt-br': {
      title: 'Python OOP: o método especial __call__',
      body: `**\`__call__\`** é o dunder method que torna um objeto "chamável" (callable) — ou seja, você pode usar \`objeto()\` como se fosse uma função.

1. **\`__init__\`** inicializa o objeto (roda na criação).
2. **\`__call__\`** executa quando você coloca \`()\` depois do objeto.

> O PyTorch usa \`__call__\` extensivamente: \`modelo(x)\` chama o \`forward\` automaticamente. Toda camada (\`nn.Linear\`, \`nn.Embedding\`) é um objeto callable.

Isso é diferente de uma função comum:
- uma **função** só faz uma coisa;
- um objeto **callable** carrega estado interno (configuração, pesos, parâmetros) que persiste entre chamadas.

O padrão é chamado de **functor** ou **objeto-função**: um objeto que se comporta como função, mas guarda estado.`,
    },
    'en-us': {
      title: 'Python OOP: the __call__ special method',
      body: `**\`__call__\`** is the dunder method that makes an object "callable" — you can use \`object()\` as if it were a function.

1. **\`__init__\`** initializes the object (runs on creation).
2. **\`__call__\`** runs when you put \`()\` after the object.

> PyTorch uses \`__call__\` extensively: \`model(x)\` calls \`forward\` automatically. Every layer (\`nn.Linear\`, \`nn.Embedding\`) is a callable object.

This differs from a plain function:
- a **function** only does one thing;
- a **callable object** carries internal state (configuration, weights, parameters) that persists between calls.

This pattern is called a **functor** or **function object**: an object that behaves like a function but holds state.`,
    },
  },
  visual: {
    id: 'python-prereq-tabs',
    copy: {
      'pt-br': {
        tabs: [{ label: 'Código' }, { label: 'Diagrama UML' }],
        codePanel: {
          title: 'Código: __call__',
          description: 'Classe MultiplicadorChamavel com __init__ e __call__. O objeto guarda estado e depois é usado como função.',
          source: { snippetId: 'python-prereq-oop-dunder-call', language: 'python' },
          codeExplanations: [
            { lineRange: [1, 1], content: 'Define a classe MultiplicadorChamavel.' },
            { lineRange: [2, 2], content: '__init__ recebe o multiplicador e guarda como estado.' },
            { lineRange: [3, 3], content: 'Atribui self.multiplicador — o estado do objeto.' },
            { lineRange: [4, 4], content: 'Print confirma que o objeto foi criado.' },
            { lineRange: [6, 6], content: '__call__ define o que acontece quando usamos ().' },
            { lineRange: [7, 7], content: 'Multiplica o valor de entrada pelo estado guardado.' },
            { lineRange: [10, 10], content: 'Instancia o objeto: chama __init__ com multiplicador=10.' },
            { lineRange: [11, 11], content: 'Usa o objeto como função: chama __call__ com 5.' },
            { lineRange: [12, 12], content: 'Printa o resultado: 10 * 5 = 50.' },
          ],
        },
        graphPanel: {
          type: 'uml-class',
          title: 'Diagrama UML: __call__',
          description: 'Classe MultiplicadorChamavel com __init__ e __call__. O método __call__ é o que torna o objeto "chamável".',
          mermaidSource: `classDiagram
    class MultiplicadorChamavel {
        +multiplicador: float
        +__init__(multiplicador: float) None
        +__call__(valor: float) float
    }`,
          footer: '__call__ permite que objetos com estado interno sejam usados como se fossem funções.',
        },
      },
      'en-us': {
        tabs: [{ label: 'Code' }, { label: 'UML Diagram' }],
        codePanel: {
          title: 'Code: __call__',
          description: 'CallableMultiplier class with __init__ and __call__. The object stores state and then is used like a function.',
          source: { snippetId: 'python-prereq-oop-dunder-call', language: 'python' },
          codeExplanations: [
            { lineRange: [1, 1], content: 'Defines CallableMultiplier class.' },
            { lineRange: [2, 2], content: '__init__ receives multiplier, stores it as state.' },
            { lineRange: [3, 3], content: 'Assigns self.multiplier — the object state.' },
            { lineRange: [4, 4], content: 'Print confirms object creation.' },
            { lineRange: [6, 6], content: '__call__ defines what happens when we use ().' },
            { lineRange: [7, 7], content: 'Multiplies input by stored state.' },
            { lineRange: [10, 10], content: 'Instantiates object: calls __init__ with multiplier=10.' },
            { lineRange: [11, 11], content: 'Uses object as a function: calls __call__ with 5.' },
            { lineRange: [12, 12], content: 'Prints result: 10 * 5 = 50.' },
          ],
        },
        graphPanel: {
          type: 'uml-class',
          title: 'UML diagram: __call__',
          description: 'CallableMultiplier class with __init__ and __call__. The __call__ method makes the object "callable".',
          mermaidSource: `classDiagram
    class CallableMultiplier {
        +multiplier: float
        +__init__(multiplier: float) None
        +__call__(value: float) float
    }`,
          footer: '__call__ lets stateful objects be used as if they were plain functions.',
        },
      },
    },
  },
});
