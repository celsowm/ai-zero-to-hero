import { defineSlide } from './_factory';

export const sftGenerate = defineSlide({
  id: 'sft-generate',
  type: 'two-column',
  content: {
    'pt-br': {
      title: `Testando o Assistente`,
      body: `Após o treinamento, o modelo não apenas prevê texto aleatório, ele continua a conversa a partir do padrão que aprendeu.

Nós enviamos o \`system\` e o \`user\` formatados, e adicionamos \`add_generation_prompt=True\` para o tokenizador inserir o início do assistente (\`

O modelo então gera a resposta desejada, finalizando a nossa criação de um assistente de IA!

---

\`\`\`python
snippet:sft-generate
\`\`\`

> A geração é simplesmente continuar a previsão do próximo token a partir de um prompt formatado.`,
    },
    'en-us': {
      title: `Testing the Assistant`,
      body: `After training, the model doesn't just predict random text — it continues the conversation following the pattern it learned.

We send formatted \`system\` and \`user\` messages, and add \`add_generation_prompt=True\` so the tokenizer inserts the assistant's start marker.

The model then generates the desired response, completing our AI assistant creation!

---

\`\`\`python
snippet:sft-generate
\`\`\`

> Generation is simply continuing next-token prediction from a formatted prompt.`,
    },
  },
});
