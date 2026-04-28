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
    },
  },
});
