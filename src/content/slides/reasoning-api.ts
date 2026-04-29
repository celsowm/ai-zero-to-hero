import { defineSlide } from './_factory';

export const reasoningApi = defineSlide({
  id: 'reasoning-api',
  type: 'two-column',
  options: { columnRatios: [0.55, 0.45] },
  content: {
    'pt-br': {
      title: 'Reasoning na API',
      body: `Como habilitar e controlar reasoning através das APIs de diferentes providers.

### OpenAI API

\`\`\`python
snippet:reasoning/api-openai
\`\`\`

### Anthropic API (Claude)

\`\`\`python
snippet:reasoning/api-anthropic
\`\`\`

### Parâmetros Principais

| Parâmetro | Provider | Valores | Efeito |
|-----------|----------|---------|--------|
| \`reasoning_effort\` | OpenAI | \`low\`, \`medium\`, \`high\` | Controla profundidade do thinking |
| \`thinking\` | Anthropic | \`enabled\`, \`disabled\` | Liga/desliga thinking |
| \`max_completion_tokens\` | Ambos | int | Limita tokens totais (incluindo thinking) |

### Parsing de Thinking Blocks

\`\`\`python
snippet:reasoning/parsing-thinking
\`\`\`

> Cada provider tem sua forma de expor reasoning — mas o conceito é o mesmo: thinking blocks separados da resposta.`,
    },
    'en-us': {
      title: 'Reasoning in the API',
      body: `How to enable and control reasoning through different provider APIs.

### OpenAI API

\`\`\`python
snippet:reasoning/api-openai
\`\`\`

### Anthropic API (Claude)

\`\`\`python
snippet:reasoning/api-anthropic
\`\`\`

### Main Parameters

| Parameter | Provider | Values | Effect |
|-----------|----------|--------|--------|
| \`reasoning_effort\` | OpenAI | \`low\`, \`medium\`, \`high\` | Controls thinking depth |
| \`thinking\` | Anthropic | \`enabled\`, \`disabled\` | Enables/disables thinking |
| \`max_completion_tokens\` | Both | int | Limits total tokens (including thinking) |

### Parsing Thinking Blocks

\`\`\`python
snippet:reasoning/parsing-thinking
\`\`\`

> Each provider has its way of exposing reasoning — but the concept is the same: thinking blocks separate from the answer.`,
    },
  },
  visual: {
    id: 'reasoning-api-visual',
    copy: {
      'pt-br': {
        title: 'APIs de Reasoning',
        openaiLabel: 'OpenAI: reasoning_effort',
        anthropicLabel: 'Anthropic: thinking param',
        parseLabel: 'Parse thinking blocks',
        responseLabel: 'Response com thinking + answer',
      },
      'en-us': {
        title: 'Reasoning APIs',
        openaiLabel: 'OpenAI: reasoning_effort',
        anthropicLabel: 'Anthropic: thinking param',
        parseLabel: 'Parse thinking blocks',
        responseLabel: 'Response with thinking + answer',
      },
    },
  },
});
