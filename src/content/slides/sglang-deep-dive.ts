import { defineSlide } from './_factory';

export const sglangDeepDive = defineSlide({
  id: 'sglang-deep-dive',
  type: 'two-column',
  options: { columnRatios: [0.55, 0.45] },
  content: {
    'pt-br': {
      title: 'Structured Generation + Constrained Decoding',
      body: `O diferencial do sglang é a **geração estruturada nativa** — o output do LLM é garantidamente válido, sem parsing pós-hoc.

### Geração com JSON Schema

\`\`\`python
snippet:sglang/json-constrained
\`\`\`

### Geração com Regex

\`\`\`python
snippet:sglang/regex-constrained
\`\`\`

### Como funciona (por dentro)

A cada token gerado, o **validator** checa se o token é compatível com a constraint:

1. LLM propõe próximo token (logits normais)
2. Validator mascara tokens inválidos (que quebrariam regex/schema)
3. LLM sampleia apenas dos tokens válidos
4. Output **sempre válido** — sem retry, sem parsing

### Por que importa

- **Function calling**: garante JSON válido para tool calls
- **Agentes**: output estruturado para parsing de ações
- **Extração de dados**: schema enforcement sem validação manual

> sglang é a melhor escolha quando você precisa de **output estruturado confiável** em produção.`,
    },
    'en-us': {
      title: 'Structured Generation + Constrained Decoding',
      body: `sglang's differentiator is **native structured generation** — LLM output is guaranteed valid, no post-hoc parsing needed.

### JSON Schema generation

\`\`\`python
snippet:sglang/json-constrained
\`\`\`

### Regex generation

\`\`\`python
snippet:sglang/regex-constrained
\`\`\`

### How it works (under the hood)

At each generated token, the **validator** checks if the token is compatible with the constraint:

1. LLM proposes next token (normal logits)
2. Validator masks invalid tokens (that would break regex/schema)
3. LLM samples only from valid tokens
4. Output **always valid** — no retry, no parsing

### Why it matters

- **Function calling**: guarantees valid JSON for tool calls
- **Agents**: structured output for action parsing
- **Data extraction**: schema enforcement without manual validation

> sglang is the best choice when you need **reliable structured output** in production.`,
    },
  },
  visual: {
    id: 'sglang-deep-dive-visual',
    copy: {
      'pt-br': {
        title: 'Constrained Decoding Step-by-Step',
        generateLabel: 'Generate',
        validateLabel: 'Validate',
        acceptLabel: 'Accept',
        rejectLabel: 'Reject',
        tokenLabel: 'Token',
        regexLabel: 'Regex',
        schemaLabel: 'JSON Schema',
        outputLabel: 'Output válido',
      },
      'en-us': {
        title: 'Constrained Decoding Step-by-Step',
        generateLabel: 'Generate',
        validateLabel: 'Validate',
        acceptLabel: 'Accept',
        rejectLabel: 'Reject',
        tokenLabel: 'Token',
        regexLabel: 'Regex',
        schemaLabel: 'JSON Schema',
        outputLabel: 'Valid output',
      },
    },
  },
});
