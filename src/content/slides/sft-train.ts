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
      codeExplanations: [
        {
          lineRange: [1, 5],
          content: 'Importamos as classes de treinamento e carregamos o modelo base.',
        },
        {
          lineRange: [9, 9],
          content: 'Ajustamos o vocabulário do modelo para incluir os novos tokens do ChatML.',
        },
        {
          lineRange: [12, 20],
          content: 'Configuramos os hiperparâmetros: número de épocas, taxa de aprendizado e diretórios.',
        },
        {
          lineRange: [23, 27],
          content: 'Instanciamos o Trainer com o modelo, argumentos e o dataset tokenizado.',
        },
        {
          lineRange: [29, 30],
          content: 'Iniciamos o loop de treinamento supervisionado.',
        },
      ],
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
      codeExplanations: [
        {
          lineRange: [1, 5],
          content: 'Import training classes and load the base model.',
        },
        {
          lineRange: [9, 9],
          content: 'Adjust model vocabulary to include new ChatML tokens.',
        },
        {
          lineRange: [12, 20],
          content: 'Configure hyperparameters: number of epochs, learning rate, and directories.',
        },
        {
          lineRange: [23, 27],
          content: 'Instantiate the Trainer with the model, arguments, and tokenized dataset.',
        },
        {
          lineRange: [29, 30],
          content: 'Start the supervised fine-tuning loop.',
        },
      ],
    },
  },
});
