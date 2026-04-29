import { defineSlide } from './_factory';

export const toolCallingStructuredOutput = defineSlide({
  id: 'tool-calling-structured-output',
  type: 'two-column',
  options: { columnRatios: [0.55, 0.45] },
  content: {
    'pt-br': {
      title: 'Tool Calling + Structured Output',
      body: `Tool Calling e Structured Output são **primos**: ambos usam JSON Schema para forçar o modelo a output estruturado.

### A conexão

| Feature | Objetivo | Quem consome? |
|---|---|---|---|
| **Tool Calling** | Extrair dados / executar ação | Runtime executa |
| **Structured Output** | Format de resposta | Aplicação parseia |

### Tool Calling como "extraction"

\`\`\`python
snippet:tool-calling/structured-output
\`\`\`

> Muitos sistemas usam Tool Calling **apenas para extrair dados** — a "ferramenta" é um parser validado pelo schema.`,
    },
    'en-us': {
      title: 'Tool Calling + Structured Output',
      body: `Tool Calling and Structured Output are **cousins**: both use JSON Schema to force the model into structured output.

### The connection

| Feature | Goal | Who consumes? |
|---|---|---|
| **Tool Calling** | Extract data / execute action | Runtime executes |
| **Structured Output** | Response format | Application parses |

### Tool Calling as "extraction"

\`\`\`python
snippet:tool-calling/structured-output
\`\`\`

> Many systems use Tool Calling **only for data extraction** — the "tool" is a parser validated by the schema.`,
    },
  },
  visual: {
    id: 'tool-declaration-visual',
    copy: {
      'pt-br': {
        titleLabel: 'Tool Calling vs Structured Output',
        nameField: 'name: "extract_entities"',
        descField: 'description: "Extrai entidades do texto"',
        paramsField: 'parameters: { entities: [...], dates: [...] }',
        typeField: 'Ambos usam JSON Schema',
        propertiesField: 'properties: mapa nome→tipo',
        requiredField: 'required: ["entities"]',
        exampleLabel: 'Resultado: { entities: ["SP", "23°C"] }',
        jsonSchemaLabel: 'JSON Schema',
      },
      'en-us': {
        titleLabel: 'Tool Calling vs Structured Output',
        nameField: 'name: "extract_entities"',
        descField: 'description: "Extracts entities from text"',
        paramsField: 'parameters: { entities: [...], dates: [...] }',
        typeField: 'Both use JSON Schema',
        propertiesField: 'properties: name→type map',
        requiredField: 'required: ["entities"]',
        exampleLabel: 'Result: { entities: ["SP", "23°C"] }',
        jsonSchemaLabel: 'JSON Schema',
      },
    },
  },
});
