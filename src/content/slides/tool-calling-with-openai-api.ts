import { defineSlide } from './_factory';

export const toolCallingWithOpenaiApi = defineSlide({
  id: 'tool-calling-with-openai-api',
  type: 'two-column',
  options: { columnRatios: [0.55, 0.45] },
  content: {
    'pt-br': {
      title: 'Tool Calling na Prática — OpenAI API',
      body: `Vamos implementar o ciclo completo usando a API da OpenAI diretamente.

### Implementação do loop

\`\`\`python
snippet:tool-calling/openai-implementation
\`\`\`

### Detalhes importantes

- **tool_call.id** — identificador único que conecta chamada ↔ resultado
- **function.arguments** — vem como **string JSON**, precisa de \`json.loads()\`
- **role: "tool"** — requer \`tool_call_id\` para vincular ao call original
- **finish_reason: "tool_calls"** — indica que o modelo quer usar ferramentas

> Este é o padrão **universal**: qualquer motor compatível com OpenAI API (vLLM, sglang, ollama) usa o mesmo formato.`,
    },
    'en-us': {
      title: 'Tool Calling in Practice — OpenAI API',
      body: `Let's implement the complete cycle using the OpenAI API directly.

### Implementation of the loop

\`\`\`python
snippet:tool-calling/openai-implementation
\`\`\`

### Important details

- **tool_call.id** — unique identifier connecting call ↔ result
- **function.arguments** — comes as a **JSON string**, needs \`json.loads()\`
- **role: "tool"** — requires \`tool_call_id\` to link to the original call
- **finish_reason: "tool_calls"** — indicates the model wants to use tools

> This is the **universal** pattern: any OpenAI API-compatible engine (vLLM, sglang, ollama) uses the same format.`,
    },
  },
  visual: {
    id: 'tool-calling-flow-visual',
    copy: {
      'pt-br': {
        titleLabel: 'OpenAI API: Tool Calling',
        userLabel: 'Usuário',
        modelLabel: 'gpt-4o',
        toolLabel: 'get_weather()',
        resultLabel: '23°C',
        finalAnswerLabel: '"Está 23°C em SP"',
        questionLabel: '"Qual o clima em SP?"',
        toolChoiceLabel: 'finish_reason: "tool_calls"',
        toolCallLabel: 'tool_call(id="call_abc", name="get_weather")',
        toolResultLabel: 'role: "tool", content: "23°C"',
      },
      'en-us': {
        titleLabel: 'OpenAI API: Tool Calling',
        userLabel: 'User',
        modelLabel: 'gpt-4o',
        toolLabel: 'get_weather()',
        resultLabel: '23°C',
        finalAnswerLabel: '"It\'s 23°C in SP"',
        questionLabel: '"What\'s the weather in SP?"',
        toolChoiceLabel: 'finish_reason: "tool_calls"',
        toolCallLabel: 'tool_call(id="call_abc", name="get_weather")',
        toolResultLabel: 'role: "tool", content: "23°C"',
      },
    },
  },
});
