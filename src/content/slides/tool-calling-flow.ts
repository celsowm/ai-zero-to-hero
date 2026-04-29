import { defineSlide } from './_factory';

export const toolCallingFlow = defineSlide({
  id: 'tool-calling-flow',
  type: 'two-column',
  options: { columnRatios: [0.55, 0.45] },
  content: {
    'pt-br': {
      title: 'O Fluxo Completo de Execução',
      body: `Vamos ver o ciclo completo na prática, com a API da OpenAI.

### Passo 1: Envio com tools

\`\`\`python
snippet:tool-calling/flow-step1
\`\`\`

### Passo 2: O modelo responde com tool_call

\`\`\`python
snippet:tool-calling/flow-step2
\`\`\`

### Passo 3: Executamos a ferramenta e enviamos o resultado

\`\`\`python
snippet:tool-calling/flow-step3
\`\`\`

> O **role: "tool"** é especial — ele conecta o resultado da ferramenta à mensagem original do modelo.`,
    },
    'en-us': {
      title: 'The Full Execution Flow',
      body: `Let's see the complete cycle in practice, using the OpenAI API.

### Step 1: Send with tools

\`\`\`python
snippet:tool-calling/flow-step1
\`\`\`

### Step 2: Model responds with tool_call

\`\`\`python
snippet:tool-calling/flow-step2
\`\`\`

### Step 3: We execute the tool and send the result

\`\`\`python
snippet:tool-calling/flow-step3
\`\`\`

> The **role: "tool"** is special — it connects the tool result back to the model's original message.`,
    },
  },
  visual: {
    id: 'tool-calling-flow-visual',
    copy: {
      'pt-br': {
        titleLabel: 'Fluxo de Tool Calling',
        userLabel: 'Usuário',
        modelLabel: 'LLM',
        toolLabel: 'Ferramenta',
        resultLabel: 'Resultado',
        finalAnswerLabel: 'Resposta Final',
        questionLabel: '"Qual a temperatura em SP?"',
        toolChoiceLabel: 'tool_choice: get_weather',
        toolCallLabel: 'tool_call(id="call_1", args={"city":"SP"})',
        toolResultLabel: 'Resultado: 23°C, ensolarado',
      },
      'en-us': {
        titleLabel: 'Tool Calling Flow',
        userLabel: 'User',
        modelLabel: 'LLM',
        toolLabel: 'Tool',
        resultLabel: 'Result',
        finalAnswerLabel: 'Final Answer',
        questionLabel: '"What\'s the temperature in SP?"',
        toolChoiceLabel: 'tool_choice: get_weather',
        toolCallLabel: 'tool_call(id="call_1", args={"city":"SP"})',
        toolResultLabel: 'Result: 23°C, sunny',
      },
    },
  },
});
