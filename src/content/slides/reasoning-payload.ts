import { defineSlide } from './_factory';

export const reasoningPayload = defineSlide({
  id: 'reasoning-payload',
  type: 'two-column',
  options: { columnRatios: [0.55, 0.45] },
  content: {
    'pt-br': {
      title: 'Payload com Reasoning',
      body: `O payload de uma chamada com reasoning é diferente do padrão. Veja como a estrutura muda:

### Request

\`\`\`python
snippet:reasoning/payload-request
\`\`\`

### Response Structure

\`\`\`python
snippet:reasoning/payload-response
\`\`\`

### Diferenças vs payload normal

| Campo | Normal | Reasoning |
|-------|--------|-----------|
| \`reasoning_effort\` | Não existe | \`low\`, \`medium\`, \`high\` |
| \`thinking_blocks\` | Não existe | Array de objetos com \`thinking\` |
| Token count | Apenas output | thinking + output |
| Latência | Padrida | 2-10x maior |

### Importante

- Thinking blocks vêm como **parte do message content**, não como campo separado
- O \`role\` continua \`assistant\`, mas com estrutura de conteúdo enriquecida
- Você precisa **parsear** o content para separar pensamento de resposta

> O payload reasoning é "mais gordo" — mais tokens, mais tempo, mais informação.`,
    },
    'en-us': {
      title: 'Payload with Reasoning',
      body: `The payload for a reasoning call is different from the standard. Here's how the structure changes:

### Request

\`\`\`python
snippet:reasoning/payload-request
\`\`\`

### Response Structure

\`\`\`python
snippet:reasoning/payload-response
\`\`\`

### Differences vs normal payload

| Field | Normal | Reasoning |
|-------|--------|-----------|
| \`reasoning_effort\` | Doesn't exist | \`low\`, \`medium\`, \`high\` |
| \`thinking_blocks\` | Doesn't exist | Array of objects with \`thinking\` |
| Token count | Output only | thinking + output |
| Latency | Standard | 2-10x higher |

### Important

- Thinking blocks come as **part of message content**, not as a separate field
- The \`role\` stays \`assistant\`, but with enriched content structure
- You need to **parse** the content to separate thought from answer

> The reasoning payload is "heavier" — more tokens, more time, more information.`,
    },
  },
  visual: {
    id: 'reasoning-payload-visual',
    copy: {
      'pt-br': {
        title: 'Payload Normal vs Reasoning',
        normalLabel: 'Payload Normal',
        reasoningLabel: 'Payload Reasoning',
        normalRequest: 'model + messages',
        reasoningRequest: 'model + messages + reasoning_effort',
        normalResponse: 'content: string',
        reasoningResponse: 'content: thinking + answer',
        normalTokens: '~500 tokens',
        reasoningTokens: '~2000+ tokens',
      },
      'en-us': {
        title: 'Normal vs Reasoning Payload',
        normalLabel: 'Normal Payload',
        reasoningLabel: 'Reasoning Payload',
        normalRequest: 'model + messages',
        reasoningRequest: 'model + messages + reasoning_effort',
        normalResponse: 'content: string',
        reasoningResponse: 'content: thinking + answer',
        normalTokens: '~500 tokens',
        reasoningTokens: '~2000+ tokens',
      },
    },
  },
});
