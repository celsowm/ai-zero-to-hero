import { defineSlide } from './_factory';

export const hfDatasetsDeepDive = defineSlide({
  id: 'hf-datasets-deep-dive',
  type: 'two-column',
  options: {
    columnRatios: [0.5, 0.5],
  },
  content: {
    'pt-br': {
      title: `Datasets: carregando e pré-processando`,
      body: `O treinamento depende de dados. A biblioteca **\`datasets\`** torna o acesso e processamento eficiente — mesmo para corpora de TBs.

1. **\`load_dataset()\`:** carrega qualquer dataset do Hub com uma linha. Suporta splits, subconjuntos e versões.

2. **Streaming:** para datasets grandes (ex: Common Crawl), use \`streaming=True\`. Itera sem baixar tudo — memória constante.

3. **\`.map()\`:** aplica transformações em batch. Tokenização, filtragem, feature engineering — com processamento paralelo.

4. **\`.train_test_split()\`:** divide em treino/avaliação com seed reproducível. Stratified split para classificação.

5. **Formato Arrow:** os dados ficam em memória mapeada (Apache Arrow). Acesso aleatório sem carregar tudo para RAM.

> Datasets = pandas do mundo ML: uma API para carregar, transformar e iterar sobre dados.
`,
      rightBody: `
\`\`\`python
snippet:transformers/datasets-deep-dive
\`\`\``,
      codeExplanations: [
        {
          lineRange: [1, 1],
          content: 'Importamos `load_dataset` — a função central da biblioteca.',
        },
        {
          lineRange: [4, 4],
          content: 'Carrega uma fatia do Wikipedia em português (1000 linhas).',
        },
        {
          lineRange: [7, 8],
          content: 'Streaming: itera sobre o dataset sem baixar — `next(iter())` pega uma amostra.',
        },
        {
          lineRange: [11, 15],
          content: '`.map()` aplica uma função em batch — aqui, calculando o comprimento do texto.',
        },
        {
          lineRange: [17, 20],
          content: 'Split reproducível com seed fixa e inspeção das colunas finais.',
        },
      ],
    },
    'en-us': {
      title: `Datasets: loading and preprocessing`,
      body: `Training depends on data. The **\`datasets\`** library makes access and processing efficient — even for TB-scale corpora.

1. **\`load_dataset()\`:** loads any dataset from the Hub in one line. Supports splits, subsets, and versions.

2. **Streaming:** for large datasets (e.g., Common Crawl), use \`streaming=True\`. Iterates without downloading everything — constant memory.

3. **\`.map()\`:** applies transformations in batch. Tokenization, filtering, feature engineering — with parallel processing.

4. **\`.train_test_split()\`:** splits into train/eval with a reproducible seed. Stratified split for classification.

5. **Arrow format:** data lives in memory-mapped files (Apache Arrow). Random access without loading everything into RAM.

> Datasets = the pandas of the ML world: one API to load, transform, and iterate over data.
`,
      rightBody: `
\`\`\`python
snippet:transformers/datasets-deep-dive
\`\`\``,
      codeExplanations: [
        {
          lineRange: [1, 1],
          content: 'We import `load_dataset` — the central function of the library.',
        },
        {
          lineRange: [4, 4],
          content: 'Loads a slice of English Wikipedia (1000 rows).',
        },
        {
          lineRange: [7, 8],
          content: 'Streaming: iterates over the dataset without downloading — `next(iter())` grabs a sample.',
        },
        {
          lineRange: [11, 15],
          content: '`.map()` applies a function in batch — here, computing text length.',
        },
        {
          lineRange: [17, 20],
          content: 'Reproducible split with fixed seed and final columns inspection.',
        },
      ],
    },
  },
});
