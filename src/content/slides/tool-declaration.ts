import { defineSlide } from './_factory';

export const toolDeclaration = defineSlide({
  id: 'tool-declaration',
  type: 'two-column',
  options: { columnRatios: [0.55, 0.45] },
  content: {
    'pt-br': {
      title: 'Como Declarar Ferramentas',
      body: `Ferramentas são declaradas como **JSON Schema** que descreve nome, descrição e parâmetros.

### Estrutura de uma ferramenta

\`\`\`python
snippet:tool-calling/tool-declaration
\`\`\`

### Pontos-chave

- **name** — identificador único (snake_case)
- **description** — explica o que a ferramenta faz (o LLM usa para decidir)
- **parameters** — JSON Schema dos argumentos aceitos
- **required** — lista de parâmetros obrigatórios

> A descrição é **crítica**: se for vaga, o LLM pode não usar a ferramenta corretamente ou usá-la quando não deve.`,
    },
    'en-us': {
      title: 'How to Declare Tools',
      body: `Tools are declared as **JSON Schema** describing name, description, and parameters.

### Structure of a tool

\`\`\`python
snippet:tool-calling/tool-declaration
\`\`\`

### Key points

- **name** — unique identifier (snake_case)
- **description** — explains what the tool does (the LLM uses this to decide)
- **parameters** — JSON Schema of accepted arguments
- **required** — list of mandatory parameters

> The description is **critical**: if vague, the LLM may not use the tool correctly or use it when it shouldn't.`,
    },
  },
  visual: {
    id: 'tool-declaration-visual',
    copy: {
      'pt-br': {
        titleLabel: 'Anatomia de uma Tool',
        nameField: 'name: "get_weather"',
        descField: 'description: "Obtém clima atual..."',
        paramsField: 'parameters: { type: "object", ... }',
        typeField: 'type: cada parâmetro tem seu tipo',
        propertiesField: 'properties: mapa nome→schema',
        requiredField: 'required: ["city"]',
        exampleLabel: 'Exemplo de uso',
        jsonSchemaLabel: 'JSON Schema',
      },
      'en-us': {
        titleLabel: 'Anatomy of a Tool',
        nameField: 'name: "get_weather"',
        descField: 'description: "Gets current weather..."',
        paramsField: 'parameters: { type: "object", ... }',
        typeField: 'type: each parameter has its type',
        propertiesField: 'properties: name→schema map',
        requiredField: 'required: ["city"]',
        exampleLabel: 'Usage example',
        jsonSchemaLabel: 'JSON Schema',
      },
    },
  },
});
