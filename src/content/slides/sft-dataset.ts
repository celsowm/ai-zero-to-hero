import { defineSlide } from './_factory';

export const sftDataset = defineSlide({
  id: 'sft-dataset',
  type: 'two-column',
  content: {
    'pt-br': {
      title: `Preparando o Dataset de Diálogo`,
      body: `Para ensinar o modelo a conversar, precisamos de um conjunto de dados de diálogos organizados. Na indústria, usamos a biblioteca \`datasets\` da Hugging Face.

Criaremos um dataset com exemplos em Português, contendo papéis de \`system\`, \`user\` e \`assistant\`.

O \`tokenizer.apply_chat_template\` se encarrega de injetar os tokens ChatML corretos automaticamente no nosso texto.

---

\`\`\`python
snippet:sft-dataset
\`\`\`

> O fluxo é: carregar tokenizador → definir template → criar dados → tokenizar. O \`Trainer\` cuida do resto.`,
      codeExplanations: [
        {
          lineRange: [1, 5],
          content: 'Importamos as bibliotecas e carregamos o tokenizador base.',
        },
        {
          lineRange: [7, 15],
          content: 'Definimos o template ChatML que estrutura o diálogo entre sistema, usuário e assistente.',
        },
        {
          lineRange: [16, 17],
          content: 'Configuramos o template e adicionamos tokens especiais necessários.',
        },
        {
          lineRange: [20, 31],
          content: 'Criamos exemplos de diálogos estruturados com diferentes papéis.',
        },
        {
          lineRange: [34, 38],
          content: 'Uma função aplica o template ChatML e converte o texto final em IDs de tokens.',
        },
        {
          lineRange: [40, 41],
          content: 'Criamos o objeto Dataset e aplicamos a formatação em todo o conjunto.',
        },
      ],
    },
    'en-us': {
      title: `Preparing the Dialogue Dataset`,
      body: `To teach the model to converse, we need an organized dialogue dataset. In the industry, we use Hugging Face's \`datasets\` library.

We'll create a dataset in Portuguese containing \`system\`, \`user\`, and \`assistant\` roles.

The \`tokenizer.apply_chat_template\` takes care of injecting the correct ChatML tokens automatically.

---

\`\`\`python
snippet:sft-dataset
\`\`\`

> The flow is: load tokenizer → define template → create data → tokenize. The \`Trainer\` handles the rest.`,
      codeExplanations: [
        {
          lineRange: [1, 5],
          content: 'We import libraries and load the base tokenizer.',
        },
        {
          lineRange: [7, 15],
          content: 'We define the ChatML template that structures the dialogue between system, user, and assistant.',
        },
        {
          lineRange: [16, 17],
          content: 'Configure the template and add necessary special tokens.',
        },
        {
          lineRange: [20, 31],
          content: 'Create structured dialogue examples with different roles.',
        },
        {
          lineRange: [34, 38],
          content: 'A function applies the ChatML template and converts the final text into token IDs.',
        },
        {
          lineRange: [40, 41],
          content: 'Create the Dataset object and apply formatting across the entire set.',
        },
      ],
    },
  },
});
