import { defineSlide } from './_factory';

export const pythonPrereqOopAssociation = defineSlide({
  id: 'python-prereq-oop-association',
  type: 'two-column',
  options: {
    columnRatios: [0.95, 1.05],
  },
  content: {
    'pt-br': {
      title: 'Python OOP: associação entre classes',
      body: `**Associação** ("tem-um") é quando uma classe contém uma referência a outra. Diferente de herança ("é-um").

1. **Composição:** \`Carro\` recebe uma instância de \`Motor\` no construtor.
2. **Delegação:** \`Carro.ligar()\` chama \`self.motor.ligar()\` internamente.
3. **Reutilização:** \`Motor\` pode ser usado em qualquer classe que precise de um motor.

> No PyTorch, associação aparece em todo lugar: um \`nn.Module\` contém \`nn.Linear\`, \`nn.Dropout\`, etc. — o forward delega a cada sub-módulo.

\`\`\`python
snippet:python-prereq-oop-association
\`\`\`

- \`Carro\` não herda de \`Motor\` — ele **tem** um motor
- A associação permite trocar o \`Motor\` sem mexer no \`Carro\``,
      codeExplanations: [
        { lineRange: [1, 1], content: 'Define a classe Motor.' },
        { lineRange: [2, 2], content: '__init__ de Motor: recebe cavalos.' },
        { lineRange: [3, 3], content: 'Atribui self.cavalos.' },
        { lineRange: [4, 4], content: 'Linha em branco.' },
        { lineRange: [5, 5], content: 'Método ligar de Motor.' },
        { lineRange: [6, 6], content: 'Retorna string com cavalos.' },
        { lineRange: [8, 8], content: 'Linha em branco.' },
        { lineRange: [9, 9], content: 'Define a classe Carro.' },
        { lineRange: [10, 10], content: '__init__ de Carro: recebe modelo e motor.' },
        { lineRange: [11, 11], content: 'Atribui self.modelo.' },
        { lineRange: [12, 12], content: 'Associação: guarda a referência ao Motor.' },
        { lineRange: [13, 13], content: 'Linha em branco.' },
        { lineRange: [14, 14], content: 'Método ligar de Carro (mesmo nome de Motor).' },
        { lineRange: [15, 15], content: 'Delegação: Carro chama Motor.ligar().' },
        { lineRange: [18, 18], content: 'Cria instância de Motor com 450 CV.' },
        { lineRange: [19, 19], content: 'Passa motor_v8 como parâmetro ao construtor de Carro.' },
        { lineRange: [20, 20], content: 'Print aciona a cadeia de delegação.' },
      ],
    },
    'en-us': {
      title: 'Python OOP: class association',
      body: `**Association** ("has-a") is when one class holds a reference to another. Different from inheritance ("is-a").

1. **Composition:** \`Carro\` receives a \`Motor\` instance in the constructor.
2. **Delegation:** \`Carro.ligar()\` calls \`self.motor.ligar()\` internally.
3. **Reusability:** \`Motor\` can be used by any class that needs an engine.

> In PyTorch, association is everywhere: an \`nn.Module\` contains \`nn.Linear\`, \`nn.Dropout\`, etc. — the forward method delegates to each submodule.

\`\`\`python
snippet:python-prereq-oop-association
\`\`\`

- \`Carro\` does not inherit from \`Motor\` — it **has** a motor
- Association lets you swap the \`Motor\` without changing \`Carro\``,
      codeExplanations: [
        { lineRange: [1, 1], content: 'Defines Motor class.' },
        { lineRange: [2, 2], content: '__init__ of Motor: receives cavalos.' },
        { lineRange: [3, 3], content: 'Assigns self.cavalos.' },
        { lineRange: [4, 4], content: 'Blank line.' },
        { lineRange: [5, 5], content: 'Motor.ligar method.' },
        { lineRange: [6, 6], content: 'Returns string with cavalos.' },
        { lineRange: [8, 8], content: 'Blank line.' },
        { lineRange: [9, 9], content: 'Defines Carro class.' },
        { lineRange: [10, 10], content: '__init__ of Carro: receives modelo and motor.' },
        { lineRange: [11, 11], content: 'Assigns self.modelo.' },
        { lineRange: [12, 12], content: 'Association: stores reference to Motor.' },
        { lineRange: [13, 13], content: 'Blank line.' },
        { lineRange: [14, 14], content: 'Carro.ligar method (same name as Motor).' },
        { lineRange: [15, 15], content: 'Delegation: Carro calls Motor.ligar().' },
        { lineRange: [18, 18], content: 'Creates Motor instance with 450 HP.' },
        { lineRange: [19, 19], content: 'Passes motor_v8 to Carro constructor.' },
        { lineRange: [20, 20], content: 'Print triggers the delegation chain.' },
      ],
    },
  },
  visual: {
    id: 'python-prereq-tabs',
    copy: {
      'pt-br': {
        tabs: [{ label: 'Código' }, { label: 'Diagrama UML' }],
        codePanel: {
          title: 'Código: associação entre classes',
          description: 'Carro tem-um Motor: composição via construtor + delegação.',
          source: { snippetId: 'python-prereq-oop-association', language: 'python' },
          codeExplanations: [
            { lineRange: [1, 1], content: 'Define a classe Motor.' },
            { lineRange: [2, 2], content: '__init__ de Motor.' },
            { lineRange: [3, 3], content: 'Atribui cavalos.' },
            { lineRange: [5, 5], content: 'Método ligar de Motor.' },
            { lineRange: [6, 6], content: 'Retorna string.' },
            { lineRange: [9, 9], content: 'Define a classe Carro.' },
            { lineRange: [10, 10], content: '__init__ de Carro.' },
            { lineRange: [11, 11], content: 'Atribui modelo.' },
            { lineRange: [12, 12], content: 'Associação: guarda referência ao Motor.' },
            { lineRange: [14, 14], content: 'Método ligar de Carro.' },
            { lineRange: [15, 15], content: 'Delega para Motor.ligar().' },
            { lineRange: [18, 18], content: 'Cria Motor.' },
            { lineRange: [19, 19], content: 'Passa motor_v8 para Carro.' },
            { lineRange: [20, 20], content: 'Print aciona delegação.' },
          ],
        },
        graphPanel: {
          type: 'uml-class',
          title: 'Diagrama UML: associação',
          description: 'Seta simples (→) indica associação: Carro tem-um Motor. A seta aponta de Carro para Motor.',
          mermaidSource: `classDiagram
    class Motor {
        +cavalos: int
        +ligar() str
    }
    class Carro {
        +modelo: str
        +ligar() str
    }
    Carro --> Motor : tem um`,
          footer: 'Associação ("tem-um") vs herança ("é-um"): Carro não herda de Motor, ele o contém.',
        },
      },
      'en-us': {
        tabs: [{ label: 'Code' }, { label: 'UML Diagram' }],
        codePanel: {
          title: 'Code: class association',
          description: 'Carro has-a Motor: composition via constructor + delegation.',
          source: { snippetId: 'python-prereq-oop-association', language: 'python' },
          codeExplanations: [
            { lineRange: [1, 1], content: 'Defines Motor class.' },
            { lineRange: [2, 2], content: '__init__ of Motor.' },
            { lineRange: [3, 3], content: 'Assigns cavalos.' },
            { lineRange: [5, 5], content: 'Motor.ligar method.' },
            { lineRange: [6, 6], content: 'Returns string.' },
            { lineRange: [9, 9], content: 'Defines Carro class.' },
            { lineRange: [10, 10], content: '__init__ of Carro.' },
            { lineRange: [11, 11], content: 'Assigns modelo.' },
            { lineRange: [12, 12], content: 'Association: stores Motor ref.' },
            { lineRange: [14, 14], content: 'Carro.ligar method.' },
            { lineRange: [15, 15], content: 'Delegates to Motor.ligar().' },
            { lineRange: [18, 18], content: 'Creates Motor.' },
            { lineRange: [19, 19], content: 'Passes motor_v8 to Carro.' },
            { lineRange: [20, 20], content: 'Print triggers delegation.' },
          ],
        },
        graphPanel: {
          type: 'uml-class',
          title: 'UML diagram: association',
          description: 'Simple arrow (→) indicates association: Carro has-a Motor. The arrow points from Carro to Motor.',
          mermaidSource: `classDiagram
    class Motor {
        +cavalos: int
        +ligar() str
    }
    class Carro {
        +modelo: str
        +ligar() str
    }
    Carro --> Motor : has a`,
          footer: 'Association ("has-a") vs inheritance ("is-a"): Carro does not inherit from Motor, it contains it.',
        },
      },
    },
  },
});
