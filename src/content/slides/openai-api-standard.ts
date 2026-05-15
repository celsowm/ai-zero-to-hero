import { defineSlide } from './_factory';

export const openaiApiStandard = defineSlide({
  id: 'openai-api-standard',
  type: 'two-column',
  options: { columnRatios: [0.5, 0.5] },
  content: {
    'pt-br': {
      title: 'O Padrão OpenAI API',
      body: `**\`/v1/chat/completions\`** é o "HTTP dos LLMs". Todo motor de inferência implementa essa API — vLLM, sglang, ONNX, Ollama, Transformers Server.

### Request padrão

\`\`\`python
snippet:openai-api/request
\`\`\`

### Response padrão

\`\`\`python
snippet:openai-api/response
\`\`\`

### Campos do request

| Campo | Tipo | Descrição |
|---|---|---|
| \`model\` | string | Nome do modelo |
| \`messages\` | array | \`[{role, content}]\` — system/user/assistant |
| \`temperature\` | float | 0.0 (determinístico) a 2.0 (criativo) |
| \`max_tokens\` | int | Limite de tokens na resposta |
| \`stream\` | bool | \`true\` para **SSE (Server-Sent Events)** token-by-token |
| \`tools\` | array | Funções que o LLM pode chamar |
| \`response_format\` | object | \`{type: "json_schema"}\` para output estruturado |

> Saber essa API significa que você pode trocar de motor (vLLM → sglang) **sem mudar uma linha de código client**.`,
    },
    'en-us': {
      title: 'The OpenAI API Standard',
      body: `**\`/v1/chat/completions\`** is the "HTTP of LLMs". Every inference engine implements this API — vLLM, sglang, ONNX, Ollama, Transformers Server.

### Standard request

\`\`\`python
snippet:openai-api/request
\`\`\`

### Standard response

\`\`\`python
snippet:openai-api/response
\`\`\`

### Request fields

| Field | Type | Description |
|---|---|---|
| \`model\` | string | Model name |
| \`messages\` | array | \`[{role, content}]\` — system/user/assistant |
| \`temperature\` | float | 0.0 (deterministic) to 2.0 (creative) |
| \`max_tokens\` | int | Token limit in response |
| \`stream\` | bool | \`true\` for **SSE (Server-Sent Events)** token-by-token |
| \`tools\` | array | Functions the LLM can call |
| \`response_format\` | object | \`{type: "json_schema"}\` for structured output |

> Knowing this API means you can swap engines (vLLM → sglang) **without changing a single line of client code**.`,
    },
  },
  visual: {
    id: 'openai-api-standard-visual',
    copy: {
      'pt-br': {
        title: 'OpenAI API — O Protocolo Universal dos LLMs',
        requestLabel: 'Request',
        responseLabel: 'Response',
        modelField: 'model',
        messagesField: 'messages',
        temperatureField: 'temperature',
        maxTokensField: 'max_tokens',
        streamField: 'stream',
        toolsField: 'tools',
        responseFormatField: 'response_format',
        choicesField: 'choices',
        contentField: 'content',
        usageField: 'usage',
        promptTokensLabel: 'prompt_tokens',
        completionTokensLabel: 'completion_tokens',
        totalTokensLabel: 'total_tokens',
      },
      'en-us': {
        title: 'OpenAI API — The Universal LLM Protocol',
        requestLabel: 'Request',
        responseLabel: 'Response',
        modelField: 'model',
        messagesField: 'messages',
        temperatureField: 'temperature',
        maxTokensField: 'max_tokens',
        streamField: 'stream',
        toolsField: 'tools',
        responseFormatField: 'response_format',
        choicesField: 'choices',
        contentField: 'content',
        usageField: 'usage',
        promptTokensLabel: 'prompt_tokens',
        completionTokensLabel: 'completion_tokens',
        totalTokensLabel: 'total_tokens',
      },
    },
  },
});
