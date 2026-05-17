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
      body: `**Associação** ("tem-um") é quando uma classe contém uma referência a outra. Três variações comuns:

1. **Associação simples (→):** \`Carro\` recebe \`Motor\` por parâmetro e delega a ele. Ciclos de vida independentes.
2. **Agregação (◇→):** \`Departamento\` tem \`Funcionario[]\` — os funcionários existem fora do departamento.
3. **Composição (◆→):** \`Pedido\` cria \`ItemPedido\` internamente — itens morrem com o pedido.

> No PyTorch, associação aparece em todo lugar: um \`nn.Module\` contém \`nn.Linear\`, \`nn.Dropout\`, etc. — o forward delega a cada sub-módulo.

- Associação simples: objetos independentes, referência passada de fora
- Agregação: o todo contém partes que existem sem ele
- Composição: o todo é dono das partes — sem o todo, as partes não fazem sentido`,
    },
    'en-us': {
      title: 'Python OOP: class association',
      body: `**Association** ("has-a") is when one class holds a reference to another. Three common variations:

1. **Simple association (→):** \`Carro\` receives \`Motor\` as a parameter and delegates to it. Independent lifecycles.
2. **Aggregation (◇→):** \`Departamento\` has \`Funcionario[]\` — the employees exist outside the department.
3. **Composition (◆→):** \`Pedido\` creates \`ItemPedido\` internally — items die with the order.

> In PyTorch, association is everywhere: an \`nn.Module\` contains \`nn.Linear\`, \`nn.Dropout\`, etc. — the forward method delegates to each submodule.

- Simple association: independent objects, reference passed from outside
- Aggregation: the whole contains parts that exist without it
- Composition: the whole owns the parts — without the whole, parts are meaningless`,
    },
  },
  visual: {
    id: 'python-prereq-tabs',
    copy: {
      'pt-br': {
        tabs: [{ label: 'Código' }, { label: 'Diagrama UML' }],
        codePanel: {
          title: 'Código: associação entre classes',
          description: 'Três formas de associação: simples (→), agregação (◇), composição (◆).',
          source: { snippetId: 'python-prereq-oop-association', language: 'python' },
          codeExplanations: [
            { lineRange: [1, 1], content: 'Define a classe Motor.' },
            { lineRange: [2, 2], content: '__init__ de Motor.' },
            { lineRange: [3, 3], content: 'Atribui cavalos.' },
            { lineRange: [5, 5], content: 'Método ligar de Motor.' },
            { lineRange: [6, 6], content: 'Retorna string.' },
            { lineRange: [9, 9], content: 'Define a classe Carro.' },
            { lineRange: [10, 10], content: '__init__: recebe Motor.' },
            { lineRange: [11, 11], content: 'Atribui modelo.' },
            { lineRange: [12, 12], content: 'Assoc. simples: guarda ref. ao Motor.' },
            { lineRange: [14, 14], content: 'Método ligar de Carro.' },
            { lineRange: [15, 15], content: 'Delega para Motor.ligar().' },
            { lineRange: [18, 18], content: 'Define Funcionario.' },
            { lineRange: [19, 19], content: '__init__ só nome.' },
            { lineRange: [20, 20], content: 'Atributo nome.' },
            { lineRange: [23, 23], content: 'Define Departamento (agregação).' },
            { lineRange: [24, 24], content: '__init__: recebe nome.' },
            { lineRange: [25, 25], content: 'Atribui nome do dept.' },
            { lineRange: [26, 26], content: 'Lista vazia — agregação.' },
            { lineRange: [28, 28], content: 'Método contratar.' },
            { lineRange: [29, 29], content: 'Append na lista.' },
            { lineRange: [31, 31], content: 'Método listar.' },
            { lineRange: [32, 32], content: 'Junta nomes.' },
            { lineRange: [35, 35], content: 'Define ItemPedido.' },
            { lineRange: [36, 36], content: '__init__: descrição e preço.' },
            { lineRange: [37, 37], content: 'Atribui descricao.' },
            { lineRange: [38, 38], content: 'Atribui preco.' },
            { lineRange: [41, 41], content: 'Define Pedido (composição).' },
            { lineRange: [42, 42], content: '__init__: recebe cliente.' },
            { lineRange: [43, 43], content: 'Atribui cliente.' },
            { lineRange: [44, 44], content: 'Lista vazia — composição.' },
            { lineRange: [46, 46], content: 'Método adicionar_item.' },
            { lineRange: [47, 47], content: 'Cria ItemPedido internamente (composição).' },
            { lineRange: [49, 49], content: 'Método total.' },
            { lineRange: [50, 50], content: 'Soma com generator.' },
            { lineRange: [53, 53], content: '# Comentário: associação simples.' },
            { lineRange: [54, 54], content: 'Cria Motor independente.' },
            { lineRange: [55, 55], content: 'Passa Motor para Carro.' },
            { lineRange: [56, 56], content: 'Print aciona delegação.' },
            { lineRange: [58, 58], content: '# Comentário: agregação.' },
            { lineRange: [59, 59], content: 'Funcionario criado fora.' },
            { lineRange: [60, 60], content: 'Segundo funcionário.' },
            { lineRange: [61, 61], content: 'Departamento existe.' },
            { lineRange: [62, 62], content: 'Contrata externo.' },
            { lineRange: [63, 63], content: 'Contrata outro.' },
            { lineRange: [64, 64], content: 'Lista funcionários.' },
            { lineRange: [66, 66], content: '# Comentário: composição.' },
            { lineRange: [67, 67], content: 'Cria Pedido.' },
            { lineRange: [68, 68], content: 'Adiciona item (cria dentro).' },
            { lineRange: [69, 69], content: 'Adiciona outro.' },
            { lineRange: [70, 70], content: 'Exibe total.' },
          ],
        },
        graphPanel: {
          type: 'uml-class',
          title: 'Diagrama UML: 3 tipos de associação',
          description: 'Seta simples (→) = associação; diamante branco (◇) = agregação; diamante preto (◆) = composição.',
          mermaidSource: `classDiagram
    class Motor {
        +cavalos: int
        +ligar() str
    }
    class Carro {
        +modelo: str
        +ligar() str
    }
    class Funcionario {
        +nome: str
    }
    class Departamento {
        +nome: str
        +contratar(Funcionario) None
        +listar() str
    }
    class ItemPedido {
        +descricao: str
        +preco: float
    }
    class Pedido {
        +cliente: str
        +adicionar_item(str, float) None
        +total() float
    }
    Carro --> Motor : associação simples
    Departamento o--> Funcionario : agregação
    Pedido *--> ItemPedido : composição`,
          footer: 'Associação simples (→): objetos independentes. Agregação (◇→): parte existe sem o todo. Composição (◆→): parte morre com o todo.',
        },
      },
      'en-us': {
        tabs: [{ label: 'Code' }, { label: 'UML Diagram' }],
        codePanel: {
          title: 'Code: class association',
          description: 'Three forms of association: simple (→), aggregation (◇), composition (◆).',
          source: { snippetId: 'python-prereq-oop-association', language: 'python' },
          codeExplanations: [
            { lineRange: [1, 1], content: 'Defines Motor class.' },
            { lineRange: [2, 2], content: '__init__ of Motor.' },
            { lineRange: [3, 3], content: 'Assigns cavalos.' },
            { lineRange: [5, 5], content: 'Motor.ligar method.' },
            { lineRange: [6, 6], content: 'Returns string.' },
            { lineRange: [9, 9], content: 'Defines Carro class.' },
            { lineRange: [10, 10], content: '__init__: receives Motor.' },
            { lineRange: [11, 11], content: 'Assigns modelo.' },
            { lineRange: [12, 12], content: 'Simple assoc: stores Motor ref.' },
            { lineRange: [14, 14], content: 'Carro.ligar method.' },
            { lineRange: [15, 15], content: 'Delegates to Motor.ligar().' },
            { lineRange: [18, 18], content: 'Defines Funcionario.' },
            { lineRange: [19, 19], content: '__init__: only name.' },
            { lineRange: [20, 20], content: 'Name attribute.' },
            { lineRange: [23, 23], content: 'Defines Departamento (aggregation).' },
            { lineRange: [24, 24], content: '__init__: receives name.' },
            { lineRange: [25, 25], content: 'Assigns dept name.' },
            { lineRange: [26, 26], content: 'Empty list — aggregation.' },
            { lineRange: [28, 28], content: 'contratar method.' },
            { lineRange: [29, 29], content: 'Appends to list.' },
            { lineRange: [31, 31], content: 'listar method.' },
            { lineRange: [32, 32], content: 'Joins names.' },
            { lineRange: [35, 35], content: 'Defines ItemPedido.' },
            { lineRange: [36, 36], content: '__init__: description and price.' },
            { lineRange: [37, 37], content: 'Assigns descricao.' },
            { lineRange: [38, 38], content: 'Assigns preco.' },
            { lineRange: [41, 41], content: 'Defines Pedido (composition).' },
            { lineRange: [42, 42], content: '__init__: receives client.' },
            { lineRange: [43, 43], content: 'Assigns cliente.' },
            { lineRange: [44, 44], content: 'Empty list — composition.' },
            { lineRange: [46, 46], content: 'adicionar_item method.' },
            { lineRange: [47, 47], content: 'Creates ItemPedido internally (composition).' },
            { lineRange: [49, 49], content: 'total method.' },
            { lineRange: [50, 50], content: 'Sum via generator.' },
            { lineRange: [53, 53], content: '# Comment: simple association.' },
            { lineRange: [54, 54], content: 'Creates independent Motor.' },
            { lineRange: [55, 55], content: 'Passes Motor to Carro.' },
            { lineRange: [56, 56], content: 'Print triggers delegation.' },
            { lineRange: [58, 58], content: '# Comment: aggregation.' },
            { lineRange: [59, 59], content: 'Funcionario created outside.' },
            { lineRange: [60, 60], content: 'Second employee.' },
            { lineRange: [61, 61], content: 'Departamento exists.' },
            { lineRange: [62, 62], content: 'Hires external.' },
            { lineRange: [63, 63], content: 'Hires another.' },
            { lineRange: [64, 64], content: 'Lists employees.' },
            { lineRange: [66, 66], content: '# Comment: composition.' },
            { lineRange: [67, 67], content: 'Creates Pedido.' },
            { lineRange: [68, 68], content: 'Adds item (creates inside).' },
            { lineRange: [69, 69], content: 'Adds another.' },
            { lineRange: [70, 70], content: 'Prints total.' },
          ],
        },
        graphPanel: {
          type: 'uml-class',
          title: 'UML diagram: 3 types of association',
          description: 'Simple arrow (→) = association; white diamond (◇) = aggregation; black diamond (◆) = composition.',
          mermaidSource: `classDiagram
    class Motor {
        +cavalos: int
        +ligar() str
    }
    class Carro {
        +modelo: str
        +ligar() str
    }
    class Funcionario {
        +nome: str
    }
    class Departamento {
        +nome: str
        +contratar(Funcionario) None
        +listar() str
    }
    class ItemPedido {
        +descricao: str
        +preco: float
    }
    class Pedido {
        +cliente: str
        +adicionar_item(str, float) None
        +total() float
    }
    Carro --> Motor : simple association
    Departamento o--> Funcionario : aggregation
    Pedido *--> ItemPedido : composition`,
          footer: 'Simple association (→): independent objects. Aggregation (◇→): part exists without whole. Composition (◆→): part dies with whole.',
        },
      },
    },
  },
});
