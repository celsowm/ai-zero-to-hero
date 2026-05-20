import { defineSlide } from './_factory';

export const buildGpt2DatasetGutenberg = defineSlide({
  id: 'build-gpt2-dataset-gutenberg',
  type: 'two-column',
  options: {
    "columnRatios": [
      0.45,
      0.55
    ]
  },
  content: {
    'pt-br': {
      title: `Passo 1.5: O Jeito Moderno (Hugging Face Datasets)`,
      body: `Mas IAs modernas não treinam só com texto local. A prática profissional é usar datasets versionados e reproduzíveis.

### A biblioteca \`datasets\` do HuggingFace

No mundo real de Machine Learning, nós raramente baixamos \`.txt\` manualmente. Usamos bibliotecas especializadas que cuidam de:

1.  **Stream**: Baixar o dataset em pedaços e não estourar a memória RAM.
2.  **Parquet**: Formato colunar super veloz (diferente de um arquivo texto normal).
3.  **Filtros**: Pegar conjuntos limpos e curados (como o **project-gutenberg-clean**).

Com isso, em poucas linhas você tem livros limpos prontos para alimentar sua classe \`GPT2Dataset\`.
`,
      rightBody: `
\`\`\`python
snippet:build_gpt2/build-gpt2-dataset-gutenberg
\`\`\``,
      codeExplanations: [
    {
    "lineRange": [
      2,
      3
    ],
    "content": "Importamos a biblioteca de ouro da indústria: HuggingFace `datasets`."
  },
    {
    "lineRange": [
      6,
      14
    ],
    "content": "O `load_dataset` sabe se comunicar com o portal do HuggingFace. Aqui pegamos `celsowm/project-gutenberg-clean` com subset `default`. Para treino real, removeríamos a limitação `[:1000]`."
  },
    {
    "lineRange": [
      15,
      21
    ],
    "content": "A saída é tabular, igual a planilhas ou banco de dados. Extraímos apenas a coluna `text` para o nosso tokenizador."
  }
  ],
    },
    'en-us': {
      title: `Step 1.5: The Modern Way (Hugging Face Datasets)`,
      body: `Modern AIs do not train only on local text. In practice, teams use versioned and reproducible datasets.

### The HuggingFace \`datasets\` library

In the real Machine Learning world, we rarely download \`.txt\` manually. We use specialized libraries that handle:

1.  **Streaming**: Downloading the dataset in chunks so we don't blow up our RAM.
2.  **Parquet**: A super-fast columnar format (unlike a normal text file).
3.  **Filters**: Grabbing clean, curated sets (like **project-gutenberg-clean**).

With this, in a few lines you have cleaned books ready to feed your \`GPT2Dataset\` class.
`,
      rightBody: `
\`\`\`python
snippet:build_gpt2/build-gpt2-dataset-gutenberg
\`\`\``,
      codeExplanations: [
    {
    "lineRange": [
      2,
      3
    ],
    "content": "We import the industry's golden library: HuggingFace `datasets`."
  },
    {
    "lineRange": [
      6,
      14
    ],
    "content": "The `load_dataset` talks directly to the HuggingFace hub. Here we use `celsowm/project-gutenberg-clean` with subset `default`. For real training, we would remove `[:1000]`."
  },
    {
    "lineRange": [
      15,
      21
    ],
    "content": "The output is tabular, just like spreadsheets or a database. We extract only the `text` column for our tokenizer."
  }
  ],
    },
  },
});
