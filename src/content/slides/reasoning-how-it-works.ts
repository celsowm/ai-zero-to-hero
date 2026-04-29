import { defineSlide } from './_factory';

export const reasoningHowItWorks = defineSlide({
  id: 'reasoning-how-it-works',
  type: 'two-column',
  options: { columnRatios: [0.55, 0.45] },
  content: {
    'pt-br': {
      title: 'Como Funciona Internamente',
      body: `Reasoning models geram **tokens de pensamento** antes da resposta final. Esses tokens são visíveis para o usuário mas **separados** da resposta.

### Estrutura de Thinking Blocks

\`\`\`python
snippet:reasoning/thinking-blocks
\`\`\`

### O ciclo de Reasoning

1. **Input**: Usuário envia pergunta
2. **Thinking**: Modelo gera \`<thought>\` tokens internos
3. **Verification**: Modelo verifica consistência do pensamento
4. **Answer**: Modelo gera resposta final baseada no pensamento
5. **Output**: Thinking blocks + resposta são retornados

### Thinking tokens são ocultos?

Depende da API. Na OpenAI, os thinking blocks vêm no response mas podem ser **ocultados** no UI. O custo é cobrado normalmente.

> O modelo "pensa em voz alta" — mas você pode escolher não mostrar ao usuário final.`,
    },
    'en-us': {
      title: 'How It Works Internally',
      body: `Reasoning models generate **thinking tokens** before the final answer. These tokens are visible to the user but **separated** from the answer.

### Thinking Blocks Structure

\`\`\`python
snippet:reasoning/thinking-blocks
\`\`\`

### The Reasoning Cycle

1. **Input**: User sends question
2. **Thinking**: Model generates \`<thought>\` internal tokens
3. **Verification**: Model checks thought consistency
4. **Answer**: Model generates final answer based on thinking
5. **Output**: Thinking blocks + answer are returned

### Are thinking tokens hidden?

Depends on the API. In OpenAI, thinking blocks come in the response but can be **hidden** in the UI. Cost is charged normally.

> The model "thinks out loud" — but you can choose not to show it to the end user.`,
    },
  },
  visual: {
    id: 'reasoning-how-it-works-visual',
    copy: {
      'pt-br': {
        title: 'Ciclo de Reasoning',
        inputLabel: 'Input do usuário',
        thinkingLabel: 'Gerando pensamento...',
        verificationLabel: 'Verificando...',
        answerLabel: 'Gerando resposta...',
        outputLabel: 'Output final',
      },
      'en-us': {
        title: 'Reasoning Cycle',
        inputLabel: 'User input',
        thinkingLabel: 'Generating thought...',
        verificationLabel: 'Verifying...',
        answerLabel: 'Generating answer...',
        outputLabel: 'Final output',
      },
    },
  },
});
