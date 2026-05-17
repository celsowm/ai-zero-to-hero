import { defineSlide } from './_factory';

export const pythonPrereqOopDataclass = defineSlide({
  id: 'python-prereq-oop-dataclass',
  type: 'two-column',
  options: {
    columnRatios: [0.95, 1.05],
  },
  content: {
    'pt-br': {
      title: 'Python OOP: dataclasses (3.7+)',
      body: `**\`@dataclass\`** gera automaticamente \`__init__\`, \`__repr__\`, \`__eq__\` e mais — sem escrever boilerplate.

1. **Declarativa:** basta listar os campos com type hints.
2. **Valores padrão:** suporta defaults (\`model_name: str = "gpt2"\`).
3. **\`frozen=True\`:** torna a instância imutável (como um valor, não um objeto mutável).
4. **Métodos normais:** você ainda pode adicionar métodos como \`distancia()\`.

> Dataclasses são a forma moderna e idiomática de criar classes de dados em Python 3.12+. O PyTorch usa \`@dataclass\` em várias config classes (ex: \`TrainingArguments\`).

- Menos código que uma classe manual com \`__init__\` + \`__repr__\` + \`__eq__\`
- \`frozen\` prevê mutação acidental — útil para configurações`,
    },
    'en-us': {
      title: 'Python OOP: dataclasses (3.7+)',
      body: `**\`@dataclass\`** automatically generates \`__init__\`, \`__repr__\`, \`__eq__\`, and more — no boilerplate needed.

1. **Declarative:** just list fields with type hints.
2. **Default values:** supports defaults (\`model_name: str = "gpt2"\`).
3. **\`frozen=True\`:** makes the instance immutable (like a value object).
4. **Regular methods:** you can still add methods like \`distancia()\`.

> Dataclasses are the modern, idiomatic way to create data classes in Python 3.12+. PyTorch uses \`@dataclass\` in several config classes (e.g., \`TrainingArguments\`).

- Less code than a manual class with \`__init__\` + \`__repr__\` + \`__eq__\`
- \`frozen\` prevents accidental mutation — great for configurations`,
    },
  },
  visual: {
    id: 'python-prereq-tabs',
    copy: {
      'pt-br': {
        tabs: [{ label: 'Código' }, { label: 'Diagrama UML' }],
        codePanel: {
          title: 'Código: dataclasses em Python',
          description: '@dataclass com valores padrão e frozen=True.',
          source: { snippetId: 'python-prereq-oop-dataclass', language: 'python' },
          codeExplanations: [
            { lineRange: [1, 1], content: 'Importa o decorador dataclass.' },
            { lineRange: [4, 4], content: '@dataclass gera __init__, __repr__, __eq__.' },
            { lineRange: [5, 5], content: 'Classe Config.' },
            { lineRange: [6, 6], content: 'Campo model_name com default.' },
            { lineRange: [7, 7], content: 'Campo temperature com default.' },
            { lineRange: [8, 8], content: 'Campo max_tokens com default.' },
            { lineRange: [11, 11], content: '@dataclass(frozen=True): imutável.' },
            { lineRange: [12, 12], content: 'Classe Ponto.' },
            { lineRange: [13, 13], content: 'Campo x.' },
            { lineRange: [14, 14], content: 'Campo y.' },
            { lineRange: [15, 15], content: 'Linha em branco.' },
            { lineRange: [16, 16], content: 'Método distancia.' },
            { lineRange: [17, 17], content: 'Cálculo de distância.' },
            { lineRange: [20, 20], content: 'Cria Config.' },
            { lineRange: [21, 21], content: 'Print da dataclass.' },
            { lineRange: [23, 23], content: 'Cria p1.' },
            { lineRange: [24, 24], content: 'Cria p2.' },
            { lineRange: [25, 25], content: 'Chama distancia().' },
          ],
        },
        graphPanel: {
          type: 'uml-class',
          title: 'Diagrama UML: dataclasses',
          description: 'Duas dataclasses: Config (mutável, valores padrão) e Ponto (frozen, imutável). [dataclass] é estereótipo UML.',
          mermaidSource: `classDiagram
    class Config {
        +model_name: str
        +temperature: float
        +max_tokens: int
    }
    class Ponto {
        +x: float
        +y: float
        +distancia(outro: Ponto) float
    }`,
          footer: '@dataclass gera __init__, __repr__, __eq__ automaticamente. frozen=True torna imutável.',
        },
      },
      'en-us': {
        tabs: [{ label: 'Code' }, { label: 'UML Diagram' }],
        codePanel: {
          title: 'Code: dataclasses in Python',
          description: '@dataclass with default values and frozen=True.',
          source: { snippetId: 'python-prereq-oop-dataclass', language: 'python' },
          codeExplanations: [
            { lineRange: [1, 1], content: 'Imports the dataclass decorator.' },
            { lineRange: [4, 4], content: '@dataclass generates __init__, __repr__, __eq__.' },
            { lineRange: [5, 5], content: 'Config class.' },
            { lineRange: [6, 6], content: 'model_name with default.' },
            { lineRange: [7, 7], content: 'temperature with default.' },
            { lineRange: [8, 8], content: 'max_tokens with default.' },
            { lineRange: [11, 11], content: '@dataclass(frozen=True): immutable.' },
            { lineRange: [12, 12], content: 'Point class (was Ponto).' },
            { lineRange: [13, 13], content: 'Field x.' },
            { lineRange: [14, 14], content: 'Field y.' },
            { lineRange: [15, 15], content: 'Blank line.' },
            { lineRange: [16, 16], content: 'distance method (was distancia).' },
            { lineRange: [17, 17], content: 'Distance calculation.' },
            { lineRange: [20, 20], content: 'Creates Config.' },
            { lineRange: [21, 21], content: 'Prints dataclass.' },
            { lineRange: [23, 23], content: 'Creates p1.' },
            { lineRange: [24, 24], content: 'Creates p2.' },
            { lineRange: [25, 25], content: 'Calls distance().' },
          ],
        },
        graphPanel: {
          type: 'uml-class',
          title: 'UML diagram: dataclasses',
          description: 'Two dataclasses: Config (mutable, default values) and Point (frozen, immutable). [dataclass] is a UML stereotype.',
          mermaidSource: `classDiagram
    class Config {
        <<dataclass>>
        +model_name: str
        +temperature: float
        +max_tokens: int
    }
    class Point {
        <<dataclass>>
        +x: float
        +y: float
        +distance(other: Point) float
    }
    note for Point "frozen=True makes it immutable"`,
          footer: '@dataclass generates __init__, __repr__, __eq__ automatically. frozen=True makes it immutable.',
        },
      },
    },
  },
});
