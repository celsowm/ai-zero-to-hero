import { defineSlide } from './_factory';

export const sftTrain = defineSlide({
  id: 'sft-train',
  type: 'two-column',
  content: {
    'pt-br': {
      title: `Treinamento Supervisionado (SFT)`,
      body: `Agora que temos os dados formatados, usamos a classe \`Trainer\` da Hugging Face para o ajuste fino (fine-tuning).

Durante o SFT, o modelo tenta prever a próxima palavra, mas agora o texto tem a estrutura exata de uma conversa (pergunta e resposta).

Neste exemplo simples, treinamos um modelo pequeno (\`gpt2\`) por várias épocas (epochs) para ele decorar o formato e a resposta.

---

\`\`\`python
snippet:sft-train
\`\`\`

> O SFT reutiliza o mesmo mecanismo de loss do pré-treinamento, agora sobre dados com estrutura de diálogo.`,
    },
    'en-us': {
      title: `Supervised Fine-Tuning (SFT)`,
      body: `Now that we have formatted the data, we use Hugging Face's \`Trainer\` class for fine-tuning.

During SFT, the model tries to predict the next word, but now the text has the exact structure of a conversation (question and answer).

In this simple example, we train a small model (\`gpt2\`) for several epochs so it memorizes the format and the answer.

---

\`\`\`python
snippet:sft-train
\`\`\`

> SFT reuses the same loss mechanism from pre-training, now over dialogue-structured data.`,
    },
  },
});
