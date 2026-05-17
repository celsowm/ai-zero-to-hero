import { defineSlide } from './_factory';

export const pythonPrereqOopDunder = defineSlide({
  id: 'python-prereq-oop-dunder',
  type: 'two-column',
  options: {
    columnRatios: [0.95, 1.05],
  },
  content: {
    'pt-br': {
      title: 'Python OOP: métodos especiais (dunder)',
      body: `**Dunder methods** (double underscore) permitem que objetos Python se comportem como tipos nativos.

1. **\`__repr__\`:** representação legível do objeto (útil para debugging).
2. **\`__add__\`:** define o comportamento do operador \`+\`.
3. **\`__eq__\`:** define o comportamento de \`==\`.
4. **\`__len__\`:** define o comportamento de \`len()\`.

> O PyTorch usa dunder methods extensivamente: \`__call__\` (para modelos serem chamáveis), \`__getitem__\` (para datasets), \`__len__\` (para DataLoader).

\`\`\`python
snippet:python-prereq-oop-dunder
\`\`\`

- \`v1 + v2\` funciona graças a \`__add__\`
- \`len(v1)\` funciona graças a \`__len__\`
- \`v1 == Vetor(3, 4)\` funciona graças a \`__eq__\``,
      codeExplanations: [
        { lineRange: [1, 1], content: 'Define a classe Vetor.' },
        { lineRange: [2, 2], content: '__init__ com type hints: recebe x e y como float.' },
        { lineRange: [3, 3], content: 'Atribui x à instância.' },
        { lineRange: [4, 4], content: 'Atribui y à instância.' },
        { lineRange: [5, 5], content: 'Linha em branco.' },
        { lineRange: [6, 6], content: '__repr__: representação legível do objeto.' },
        { lineRange: [7, 7], content: 'Retorna string formatada com x e y.' },
        { lineRange: [8, 8], content: 'Linha em branco.' },
        { lineRange: [9, 9], content: '__add__: define operador +.' },
        { lineRange: [10, 10], content: 'Retorna novo Vetor com componentes somados.' },
        { lineRange: [11, 11], content: 'Linha em branco.' },
        { lineRange: [12, 12], content: '__eq__: define operador ==.' },
        { lineRange: [13, 13], content: 'Verifica se outro é Vetor com isinstance.' },
        { lineRange: [14, 14], content: 'Retorna NotImplemented se tipo inválido.' },
        { lineRange: [15, 15], content: 'Compara x e y para decidir igualdade.' },
        { lineRange: [16, 16], content: 'Linha em branco.' },
        { lineRange: [17, 17], content: '__len__: define len().' },
        { lineRange: [18, 18], content: 'Sempre retorna 2 (Vetor 2D).' },
        { lineRange: [21, 21], content: 'Cria v1 = Vetor(3.0, 4.0).' },
        { lineRange: [22, 22], content: 'Cria v2 = Vetor(1.0, 2.0).' },
        { lineRange: [23, 23], content: 'v1 + v2 usa __add__.' },
        { lineRange: [24, 24], content: 'len(v1) usa __len__.' },
        { lineRange: [25, 25], content: 'v1 == Vetor(3.0, 4.0) usa __eq__.' },
      ],
    },
    'en-us': {
      title: 'Python OOP: special methods (dunder)',
      body: `**Dunder methods** (double underscore) let Python objects behave like built-in types.

1. **\`__repr__\`:** readable representation (great for debugging).
2. **\`__add__\`:** defines behavior for the \`+\` operator.
3. **\`__eq__\`:** defines behavior for \`==\`.
4. **\`__len__\`:** defines behavior for \`len()\`.

> PyTorch uses dunder methods extensively: \`__call__\` (so models are callable), \`__getitem__\` (for datasets), \`__len__\` (for DataLoader).

\`\`\`python
snippet:python-prereq-oop-dunder
\`\`\`

- \`v1 + v2\` works thanks to \`__add__\`
- \`len(v1)\` works thanks to \`__len__\`
- \`v1 == Vetor(3, 4)\` works thanks to \`__eq__\``,
      codeExplanations: [
        { lineRange: [1, 1], content: 'Defines Vetor class.' },
        { lineRange: [2, 2], content: '__init__ with type hints.' },
        { lineRange: [3, 3], content: 'Assigns x to instance.' },
        { lineRange: [4, 4], content: 'Assigns y to instance.' },
        { lineRange: [5, 5], content: 'Blank line.' },
        { lineRange: [6, 6], content: '__repr__: readable representation.' },
        { lineRange: [7, 7], content: 'Returns formatted string.' },
        { lineRange: [8, 8], content: 'Blank line.' },
        { lineRange: [9, 9], content: '__add__: defines + operator.' },
        { lineRange: [10, 10], content: 'Returns new Vetor with summed components.' },
        { lineRange: [11, 11], content: 'Blank line.' },
        { lineRange: [12, 12], content: '__eq__: defines == operator.' },
        { lineRange: [13, 13], content: 'Checks type with isinstance.' },
        { lineRange: [14, 14], content: 'Returns NotImplemented for wrong type.' },
        { lineRange: [15, 15], content: 'Compares x and y.' },
        { lineRange: [16, 16], content: 'Blank line.' },
        { lineRange: [17, 17], content: '__len__: defines len().' },
        { lineRange: [18, 18], content: 'Always returns 2.' },
        { lineRange: [21, 21], content: 'Creates v1.' },
        { lineRange: [22, 22], content: 'Creates v2.' },
        { lineRange: [23, 23], content: 'v1 + v2 uses __add__.' },
        { lineRange: [24, 24], content: 'len(v1) uses __len__.' },
        { lineRange: [25, 25], content: 'v1 == ... uses __eq__.' },
      ],
    },
  },
  visual: {
    id: 'python-prereq-tabs',
    copy: {
      'pt-br': {
        tabs: [{ label: 'Código' }, { label: 'Diagrama UML' }],
        codePanel: {
          title: 'Código: métodos dunder',
          description: 'Classe Vetor com __repr__, __add__, __eq__ e __len__.',
          source: { snippetId: 'python-prereq-oop-dunder', language: 'python' },
          codeExplanations: [
            { lineRange: [1, 1], content: 'Define a classe Vetor.' },
            { lineRange: [2, 2], content: '__init__ com type hints.' },
            { lineRange: [3, 3], content: 'Atribui x.' },
            { lineRange: [4, 4], content: 'Atribui y.' },
            { lineRange: [6, 6], content: '__repr__: representação legível.' },
            { lineRange: [7, 7], content: 'Retorna string.' },
            { lineRange: [9, 9], content: '__add__: define +.' },
            { lineRange: [10, 10], content: 'Retorna novo Vetor.' },
            { lineRange: [12, 12], content: '__eq__: define ==.' },
            { lineRange: [13, 13], content: 'Type check.' },
            { lineRange: [14, 14], content: 'NotImplemented.' },
            { lineRange: [15, 15], content: 'Compara valores.' },
            { lineRange: [17, 17], content: '__len__: define len().' },
            { lineRange: [18, 18], content: 'Retorna 2.' },
            { lineRange: [21, 21], content: 'Cria v1.' },
            { lineRange: [22, 22], content: 'Cria v2.' },
            { lineRange: [23, 23], content: 'v1 + v2 usa __add__.' },
            { lineRange: [24, 24], content: 'len(v1) usa __len__.' },
            { lineRange: [25, 25], content: '== usa __eq__.' },
          ],
        },
        graphPanel: {
          type: 'uml-class',
          title: 'Diagrama UML: dunder methods',
          description: 'Classe Vetor com métodos especiais (dunder): __repr__, __add__, __eq__, __len__. Cada um sobrescreve operador/built-in.',
          mermaidSource: `classDiagram
    class Vetor {
        +x: float
        +y: float
        +__init__(x: float, y: float) None
        +__repr__() str
        +__add__(outro: Vetor) Vetor
        +__eq__(outro: object) bool
        +__len__() int
    }`,
          footer: 'Dunder methods permitem que objetos Python se comportem como built-ins (+, ==, len(), print()).',
        },
      },
      'en-us': {
        tabs: [{ label: 'Code' }, { label: 'UML Diagram' }],
        codePanel: {
          title: 'Code: dunder methods',
          description: 'Vetor class with __repr__, __add__, __eq__, and __len__.',
          source: { snippetId: 'python-prereq-oop-dunder', language: 'python' },
          codeExplanations: [
            { lineRange: [1, 3], content: 'Vetor class with standard __init__: receives x and y.' },
            { lineRange: [5, 6], content: '__repr__: returns a readable string. Called by print() and repr().' },
            { lineRange: [8, 9], content: '__add__: defines the + operator. Creates a new Vetor with summed components.' },
            { lineRange: [11, 14], content: '__eq__: defines ==. First checks type with isinstance, then compares values.' },
            { lineRange: [16, 17], content: '__len__: defines len(). Always returns 2 (Vetor has 2 components).' },
            { lineRange: [20, 20], content: 'Creates v1 = Vetor(3.0, 4.0).' },
            { lineRange: [22, 22], content: 'v1 + v2 uses __add__ under the hood.' },
            { lineRange: [23, 23], content: 'len(v1) uses __len__.' },
            { lineRange: [24, 24], content: 'v1 == Vetor(3.0, 4.0) uses __eq__.' },
          ],
        },
        graphPanel: {
          type: 'uml-class',
          title: 'UML diagram: Vetor',
          description: 'Dunder methods (__repr__, __add__, __eq__, __len__) in the third compartment.',
          mermaidSource: `classDiagram
    class Vetor {
        +x: float
        +y: float
        +__init__(x: float, y: float) None
        +__repr__() str
        +__add__(outro: Vetor) Vetor
        +__eq__(outro: object) bool
        +__len__() int
    }`,
          footer: 'Dunder methods are called automatically by native operators (+, ==, len(), print).',
        },
      },
    },
  },
});
