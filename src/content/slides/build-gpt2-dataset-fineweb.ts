import { defineSlide } from './_factory';

export const buildGpt2DatasetFineweb = defineSlide({
  id: 'build-gpt2-dataset-fineweb',
  type: 'two-column',
  options: {
    "columnRatios": [
      0.45,
      0.55
    ]
  },
  content: {
    'pt-br': {
      title: `Passo 1.5: O Jeito Moderno (Fineweb)`,
      body: `Mas IAs modernas não treinam apenas com livros de 1900. O GPT-3, GPT-4 e afins consumiram terabytes de **internet crua**.

### A biblioteca \`datasets\` do HuggingFace

No mundo real de Machine Learning, nós raramente baixamos \`.txt\` manualmente. Usamos bibliotecas especializadas que cuidam de:

1.  **Stream**: Baixar o dataset em pedaços e não estourar a memória RAM.
2.  **Parquet**: Formato colunar super veloz (diferente de um arquivo texto normal).
3.  **Filtros**: Pegar conjuntos limpos (como o **Fineweb**, mantido pelo HuggingFace, que remove spam da web).

Com isso, em 3 linhas você tem gigabytes de conversas em português prontas para serem alimentadas na sua classe \`GPT2Dataset\`!

---

\`\`\`python
snippet:build_gpt2/build-gpt2-dataset-fineweb
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
    "content": "O `load_dataset` sabe se comunicar com o portal do HuggingFace. Aqui pegamos o `Fineweb` (Amostra de 10 Bilhões de Tokens). Se fosse para rodar sério, removeríamos a limitação `[:1000]`."
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
      title: `Step 1.5: The Modern Way (Fineweb)`,
      body: `But modern AIs don't train only with books from 1900. GPT-3, GPT-4, and the like consumed terabytes of **raw internet**.

### The HuggingFace \`datasets\` library

In the real Machine Learning world, we rarely download \`.txt\` manually. We use specialized libraries that handle:

1.  **Streaming**: Downloading the dataset in chunks so we don't blow up our RAM.
2.  **Parquet**: A super-fast columnar format (unlike a normal text file).
3.  **Filters**: Grabbing clean sets (like **Fineweb**, maintained by HuggingFace, which strips spam from the web).

With this, in 3 lines you have gigabytes of conversations ready to be fed into your \`GPT2Dataset\` class!

---

\`\`\`python
snippet:build_gpt2/build-gpt2-dataset-fineweb
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
    "content": "The `load_dataset` knows how to talk to the HuggingFace hub. Here we get `Fineweb` (10 Billion Tokens Sample). If we were to run this for real, we would remove the `[:1000]` limitation."
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
