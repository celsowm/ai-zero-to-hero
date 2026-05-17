import { defineSlide } from './_factory';

export const pythonPrereqOopInheritance = defineSlide({
  id: 'python-prereq-oop-inheritance',
  type: 'two-column',
  options: {
    columnRatios: [0.95, 1.05],
  },
  content: {
    'pt-br': {
      title: 'Python OOP: herança e super()',
      body: `**Herança** permite que uma classe filha reutilize e especialize o comportamento da classe pai.

1. **\`class Aluno(Pessoa):\`** — Aluno herda tudo de Pessoa.
2. **\`super().__init__(nome, idade)\`** — chama o construtor da classe pai.
3. **\`isinstance(a, Pessoa)\`** — verifica se \`a\` é instância de Pessoa (ou subclasse).
4. **Sobrescrita de método:** \`Aluno.saudacao()\` substitui o de \`Pessoa\`.

> No PyTorch, \`super().__init__()\` é usado em TODOS os modelos que herdam \`nn.Module\`. Isso registra os sub-módulos automaticamente.

- \`super().__init__()\` é obrigatório se a classe pai tiver \`__init__\`
- \`Aluno\` adiciona \`matricula\` sem repetir \`nome\`/\`idade\``,
    },
    'en-us': {
      title: 'Python OOP: inheritance and super()',
      body: `**Inheritance** lets a child class reuse and specialize behavior from its parent class.

1. **\`class Aluno(Pessoa):\`** — Aluno inherits everything from Pessoa.
2. **\`super().__init__(nome, idade)\`** — calls the parent's constructor.
3. **\`isinstance(a, Pessoa)\`** — checks if \`a\` is an instance of Pessoa (or subclass).
4. **Method override:** \`Aluno.saudacao()\` replaces the one from \`Pessoa\`.

> In PyTorch, \`super().__init__()\` is used in EVERY model that subclasses \`nn.Module\`. It automatically registers child modules.

- \`super().__init__()\` is mandatory if the parent has an \`__init__\`
- \`Aluno\` adds \`matricula\` without repeating \`nome\`/\`idade\``,
    },
  },
  visual: {
    id: 'python-prereq-tabs',
    copy: {
      'pt-br': {
        tabs: [{ label: 'Código' }, { label: 'Diagrama UML' }],
        codePanel: {
          title: 'Código: herança em Python',
          description: 'Aluno estende Pessoa com super().__init__() e sobrescrita de método.',
          source: { snippetId: 'python-prereq-oop-inheritance', language: 'python' },
          codeExplanations: [
            { lineRange: [1, 1], content: 'Define a classe pai Pessoa.' },
            { lineRange: [2, 2], content: '__init__ de Pessoa: recebe nome e idade.' },
            { lineRange: [3, 3], content: 'Atributo self.nome.' },
            { lineRange: [4, 4], content: 'Atributo self.idade.' },
            { lineRange: [5, 5], content: 'Linha em branco.' },
            { lineRange: [6, 6], content: 'Método saudacao de Pessoa.' },
            { lineRange: [7, 7], content: 'Retorna saudação.' },
            { lineRange: [10, 10], content: 'Aluno(Pessoa): herda de Pessoa.' },
            { lineRange: [11, 11], content: '__init__ de Aluno.' },
            { lineRange: [12, 12], content: 'super().__init__ chama construtor pai.' },
            { lineRange: [13, 13], content: 'Novo atributo: matricula.' },
            { lineRange: [14, 14], content: 'Linha em branco.' },
            { lineRange: [15, 15], content: 'Sobrescrita de saudacao().' },
            { lineRange: [16, 16], content: 'Corpo do método sobrescrito.' },
            { lineRange: [19, 19], content: 'Instancia Aluno.' },
            { lineRange: [20, 20], content: 'Chama método sobrescrito.' },
            { lineRange: [21, 21], content: 'isinstance confirma herança.' },
          ],
        },
        graphPanel: {
          type: 'uml-class',
          title: 'Diagrama UML: herança',
          description: 'Seta vazia (△) indica herança: Aluno herda de Pessoa. Métodos sobrescritos aparecem nas duas classes.',
          mermaidSource: `classDiagram
    class Pessoa {
        +nome: str
        +idade: int
        +__init__(nome: str, idade: int) None
        +saudacao() str
    }
    class Aluno {
        +matricula: str
        +__init__(nome: str, idade: int, matricula: str) None
        +saudacao() str
    }
    Pessoa <|-- Aluno`,
          footer: 'super().__init__() é necessário para inicializar atributos da classe pai.',
        },
      },
      'en-us': {
        tabs: [{ label: 'Code' }, { label: 'UML Diagram' }],
        codePanel: {
          title: 'Code: inheritance in Python',
          description: 'Aluno extends Pessoa with super().__init__() and method override.',
          source: { snippetId: 'python-prereq-oop-inheritance', language: 'python' },
          codeExplanations: [
            { lineRange: [1, 1], content: 'Defines parent class Pessoa.' },
            { lineRange: [2, 2], content: '__init__ of Pessoa.' },
            { lineRange: [3, 3], content: 'Attribute self.nome.' },
            { lineRange: [4, 4], content: 'Attribute self.idade.' },
            { lineRange: [5, 5], content: 'Blank line.' },
            { lineRange: [6, 6], content: 'saudacao method.' },
            { lineRange: [7, 7], content: 'Returns greeting.' },
            { lineRange: [10, 10], content: 'Aluno(Pessoa): inherits from Pessoa.' },
            { lineRange: [11, 11], content: '__init__ of Aluno.' },
            { lineRange: [12, 12], content: 'super().__init__ calls parent constructor.' },
            { lineRange: [13, 13], content: 'New attribute: matricula.' },
            { lineRange: [14, 14], content: 'Blank line.' },
            { lineRange: [15, 15], content: 'Override saudacao().' },
            { lineRange: [16, 16], content: 'Overridden method body.' },
            { lineRange: [19, 19], content: 'Instantiates Aluno.' },
            { lineRange: [20, 20], content: 'Calls overridden method.' },
            { lineRange: [21, 21], content: 'isinstance confirms inheritance.' },
          ],
        },
        graphPanel: {
          type: 'uml-class',
          title: 'UML diagram: inheritance',
          description: 'Empty arrow (△) indicates inheritance: Aluno extends Pessoa. Overridden methods appear in both classes.',
          mermaidSource: `classDiagram
    class Pessoa {
        +nome: str
        +idade: int
        +__init__(nome: str, idade: int) None
        +saudacao() str
    }
    class Aluno {
        +matricula: str
        +__init__(nome: str, idade: int, matricula: str) None
        +saudacao() str
    }
    Pessoa <|-- Aluno`,
          footer: 'super().__init__() is required to initialize parent class attributes.',
        },
      },
    },
  },
});
