import { defineSlide } from './_factory';

export const pythonPrereqOopClasses = defineSlide({
  id: 'python-prereq-oop-classes',
  type: 'two-column',
  options: {
    columnRatios: [0.95, 1.05],
  },
  content: {
    'pt-br': {
      title: 'Python OOP: classes, atributos e métodos',
      body: `Uma **classe** é o molde para criar objetos. O \`__init__\` é o construtor que roda quando você instancia a classe.

1. **Atributos de classe:** compartilhados por todas as instâncias (ex: \`especie\`).
2. **Atributos de instância:** criados com \`self\` dentro de \`__init__\` — cada objeto tem os seus.
3. **Métodos de instância:** recebem \`self\` e acessam dados do objeto.
4. **\`@classmethod\`:** recebe \`cls\` em vez de \`self\` — opera na classe.
5. **\`@staticmethod\`:** não recebe \`self\` nem \`cls\` — função utilitária dentro da classe.

> Convenção: atributos "privados" usam \`_\` no início (\`self._segredos\`). Em Python 3.12+ isso é apenas uma convenção, não enforced.

\`\`\`python
snippet:python-prereq-oop-classes
\`\`\`

- \`class Pessoa:\` define a classe
- \`self.nome = nome\` guarda um atributo na instância
- \`p1.saudacao()\` chama um método de instância`,
      codeExplanations: [
        { lineRange: [1, 1], content: 'Define a classe Pessoa — o molde para criar objetos pessoa.' },
        { lineRange: [2, 2], content: 'Atributo de classe: compartilhado por todas as instâncias.' },
        { lineRange: [4, 4], content: '__init__ é o construtor. self é a própria instância.' },
        { lineRange: [5, 5], content: 'Primeiro atributo de instância: self.nome.' },
        { lineRange: [6, 6], content: 'Segundo atributo de instância: self.idade.' },
        { lineRange: [7, 7], content: 'Atributo "privado" com _ na frente: convenção.' },
        { lineRange: [8, 8], content: 'Linha em branco separando métodos.' },
        { lineRange: [9, 9], content: 'Assinatura do método de instância: recebe self.' },
        { lineRange: [10, 10], content: 'Corpo do método: acessa self.nome.' },
        { lineRange: [11, 11], content: 'Linha em branco.' },
        { lineRange: [12, 12], content: '@classmethod decorator.' },
        { lineRange: [13, 13], content: 'Método de classe: recebe cls, cria instância sem dados.' },
        { lineRange: [14, 14], content: 'Retorna nova instância via cls().' },
        { lineRange: [15, 15], content: 'Linha em branco.' },
        { lineRange: [16, 16], content: '@staticmethod decorator.' },
        { lineRange: [17, 17], content: 'Método estático: não recebe self nem cls.' },
        { lineRange: [18, 18], content: 'Retorna comparação booleana.' },
        { lineRange: [21, 21], content: 'Instancia a classe: chama __init__ com "Alice" e 30.' },
        { lineRange: [22, 22], content: 'Chama método de instância via objeto.' },
        { lineRange: [24, 24], content: 'Chama classmethod diretamente da classe.' },
        { lineRange: [25, 25], content: 'Chama staticmethod — não precisa de instância.' },
      ],
    },
    'en-us': {
      title: 'Python OOP: classes, attributes, and methods',
      body: `A **class** is the blueprint for creating objects. \`__init__\` is the constructor that runs when you instantiate the class.

1. **Class attributes:** shared across all instances (e.g., \`especie\`).
2. **Instance attributes:** created with \`self\` inside \`__init__\` — each object has its own.
3. **Instance methods:** receive \`self\` and access the object's data.
4. **\`@classmethod\`:** receives \`cls\` instead of \`self\` — operates on the class.
5. **\`@staticmethod\`:** receives neither \`self\` nor \`cls\` — a utility function inside the class.

> Convention: "private" attributes use a leading \`_\` (\`self._segredos\`). In Python 3.12+ this is a convention only, not enforced.

\`\`\`python
snippet:python-prereq-oop-classes
\`\`\`

- \`class Pessoa:\` defines the class
- \`self.nome = nome\` stores an attribute on the instance
- \`p1.saudacao()\` calls an instance method`,
      codeExplanations: [
        { lineRange: [1, 1], content: 'Defines the Pessoa class — the blueprint for person objects.' },
        { lineRange: [2, 2], content: 'Class attribute: shared across all instances.' },
        { lineRange: [4, 4], content: '__init__ is the constructor. self is the instance itself.' },
        { lineRange: [5, 5], content: 'First instance attribute: self.nome.' },
        { lineRange: [6, 6], content: 'Second instance attribute: self.idade.' },
        { lineRange: [7, 7], content: '"Private" attribute with _ prefix: convention only.' },
        { lineRange: [8, 8], content: 'Blank line separating methods.' },
        { lineRange: [9, 9], content: 'Assinatura do método de instância: recebe self.' },
        { lineRange: [10, 10], content: 'Corpo do método: acessa self.nome.' },
        { lineRange: [11, 11], content: 'Blank line.' },
        { lineRange: [12, 12], content: '@classmethod decorator.' },
        { lineRange: [13, 13], content: 'Class method: receives cls, creates instance without data.' },
        { lineRange: [14, 14], content: 'Returns a new instance via cls().' },
        { lineRange: [15, 15], content: 'Blank line.' },
        { lineRange: [16, 16], content: '@staticmethod decorator.' },
        { lineRange: [17, 17], content: 'Static method: receives neither self nor cls.' },
        { lineRange: [18, 18], content: 'Returns boolean comparison.' },
        { lineRange: [21, 21], content: 'Instantiates the class: calls __init__ with "Alice" and 30.' },
        { lineRange: [22, 22], content: 'Calls instance method via object.' },
        { lineRange: [24, 24], content: 'Calls classmethod directly from the class.' },
        { lineRange: [25, 25], content: 'Calls staticmethod — no instance needed.' },
      ],
    },
  },
  visual: {
    id: 'python-prereq-tabs',
    copy: {
      'pt-br': {
        tabs: [{ label: 'Código' }, { label: 'Diagrama UML' }],
        codePanel: {
          title: 'Código: classe Pessoa',
          description: 'Classe com atributos de classe e instância, métodos, classmethod e staticmethod.',
          source: { snippetId: 'python-prereq-oop-classes', language: 'python' },
          codeExplanations: [
            { lineRange: [1, 1], content: 'Define a classe Pessoa — o molde para criar objetos pessoa.' },
            { lineRange: [2, 2], content: 'Atributo de classe: compartilhado por todas as instâncias.' },
            { lineRange: [4, 4], content: '__init__ é o construtor. self é a própria instância.' },
            { lineRange: [5, 5], content: 'Primeiro atributo de instância: self.nome.' },
            { lineRange: [6, 6], content: 'Segundo atributo de instância: self.idade.' },
            { lineRange: [7, 7], content: 'Atributo "privado" com _ na frente: convenção.' },
            { lineRange: [8, 8], content: 'Linha em branco.' },
            { lineRange: [9, 9], content: 'Assinatura do método de instância.' },
            { lineRange: [10, 10], content: 'Corpo do método: acessa self.nome.' },
            { lineRange: [11, 11], content: 'Linha em branco.' },
            { lineRange: [12, 12], content: '@classmethod decorator.' },
            { lineRange: [13, 13], content: 'Método de classe: recebe cls.' },
            { lineRange: [14, 14], content: 'Retorna nova instância via cls().' },
            { lineRange: [15, 15], content: 'Linha em branco.' },
            { lineRange: [16, 16], content: '@staticmethod decorator.' },
            { lineRange: [17, 17], content: 'Método estático: não recebe self nem cls.' },
            { lineRange: [18, 18], content: 'Retorna comparação booleana.' },
            { lineRange: [21, 21], content: 'Instancia a classe: chama __init__ com "Alice" e 30.' },
            { lineRange: [22, 22], content: 'Chama método de instância via objeto.' },
            { lineRange: [24, 24], content: 'Chama classmethod diretamente da classe.' },
            { lineRange: [25, 25], content: 'Chama staticmethod — não precisa de instância.' },
          ],
        },
        graphPanel: {
          type: 'uml-class',
          title: 'Diagrama UML da classe Pessoa',
          description: 'Três compartimentos: nome da classe, atributos, métodos. + denota público, - denota "privado".',
          mermaidSource: `classDiagram
    class Pessoa {
        +especie: str
        +nome: str
        +idade: int
        -_segredos: list[str]
        +__init__(nome: str, idade: int) None
        +saudacao() str
        +criar_anonimo() Pessoa
        +maior_idade(idade: int) bool
    }`,
          footer: 'Atributos de classe vs instância. Métodos: instância, classe (@classmethod), estático (@staticmethod).',
        },
      },
      'en-us': {
        tabs: [{ label: 'Code' }, { label: 'UML Diagram' }],
        codePanel: {
          title: 'Code: Pessoa class',
          description: 'Class with class and instance attributes, methods, classmethod, and staticmethod.',
          source: { snippetId: 'python-prereq-oop-classes', language: 'python' },
          codeExplanations: [
            { lineRange: [1, 1], content: 'Defines the Pessoa class — the blueprint for person objects.' },
            { lineRange: [2, 2], content: 'Class attribute: shared across all instances.' },
            { lineRange: [4, 4], content: '__init__ is the constructor. self is the instance itself.' },
            { lineRange: [5, 5], content: 'First instance attribute: self.nome.' },
            { lineRange: [6, 6], content: 'Second instance attribute: self.idade.' },
            { lineRange: [7, 7], content: '"Private" attribute with _ prefix: convention only.' },
            { lineRange: [8, 8], content: 'Blank line.' },
            { lineRange: [9, 9], content: 'Instance method signature.' },
            { lineRange: [10, 10], content: 'Method body: accesses self.nome.' },
            { lineRange: [11, 11], content: 'Blank line.' },
            { lineRange: [12, 12], content: '@classmethod decorator.' },
            { lineRange: [13, 13], content: 'Class method: receives cls.' },
            { lineRange: [14, 14], content: 'Returns new instance via cls().' },
            { lineRange: [15, 15], content: 'Blank line.' },
            { lineRange: [16, 16], content: '@staticmethod decorator.' },
            { lineRange: [17, 17], content: 'Static method: no self or cls.' },
            { lineRange: [18, 18], content: 'Returns boolean comparison.' },
            { lineRange: [21, 21], content: 'Instantiates the class.' },
            { lineRange: [22, 22], content: 'Calls instance method via object.' },
            { lineRange: [24, 24], content: 'Calls classmethod from the class.' },
            { lineRange: [25, 25], content: 'Calls staticmethod — no instance needed.' },
          ],
        },
        graphPanel: {
          type: 'uml-class',
          title: 'UML class diagram for Pessoa',
          description: 'Three compartments: class name, attributes, methods. + denotes public, - denotes "private".',
          mermaidSource: `classDiagram
    class Pessoa {
        +especie: str
        +nome: str
        +idade: int
        -_segredos: list[str]
        +__init__(nome: str, idade: int) None
        +saudacao() str
        +criar_anonimo() Pessoa
        +maior_idade(idade: int) bool
    }`,
          footer: 'Class vs instance attributes. Methods: instance, class (@classmethod), static (@staticmethod).',
        },
      },
    },
  },
});
