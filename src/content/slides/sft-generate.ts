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
      codeExplanations: [
        {
          lineRange: [2, 5],
          content: 'Definimos a conversa com os papéis de sistema e usuário.',
        },
        {
          lineRange: [9, 13],
          content: 'Aplicamos o template ChatML e adicionamos o prompt de geração para o assistente.',
        },
        {
          lineRange: [15, 15],
          content: 'Preparamos os inputs para o modelo.',
        },
        {
          lineRange: [18, 23],
          content: 'O modelo gera os novos tokens seguindo a instrução recebida.',
        },
        {
          lineRange: [25, 29],
          content: 'Decodificamos e exibimos a resposta final do assistente.',
        },
      ],
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
      codeExplanations: [
        {
          lineRange: [2, 5],
          content: 'We define the conversation with system and user roles.',
        },
        {
          lineRange: [9, 13],
          content: 'Apply the ChatML template and add the generation prompt for the assistant.',
        },
        {
          lineRange: [15, 15],
          content: 'Prepare the inputs for the model.',
        },
        {
          lineRange: [18, 23],
          content: 'The model generates new tokens following the received instruction.',
        },
        {
          lineRange: [25, 29],
          content: 'Decode and display the final assistant response.',
        },
      ],
    },
  },
});
