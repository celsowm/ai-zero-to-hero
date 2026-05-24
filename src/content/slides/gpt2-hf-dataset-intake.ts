import { defineSlide } from './_factory';

export const gpt2HfDatasetIntake = defineSlide({
  id: 'gpt2-hf-dataset-intake',
  type: 'two-column',
  options: { columnRatios: [0.48, 0.52] },
  content: {
    'pt-br': {
      title: 'Dataset do Hugging Face: primeiro inspecione',
      body: `Agora que o GPT pequeno funciona, podemos trocar a origem dos dados.

Mas dataset do Hugging Face não é padronizado o bastante para assumir que sempre existe uma coluna \`text\`.

Antes de tokenizar, inspecione:

- configs/subsets disponíveis
- splits disponíveis
- \`features\`
- \`column_names\`
- uma amostra real

Contrato deste slide:
- entrada: \`repo_id\` do Hub
- operação: carregar configs, dataset e split
- saída: split escolhido + schema visível
- erro comum: chamar \`dataset["text"]\` sem saber se essa coluna existe
- teste: imprimir \`features\`, \`columns\` e \`sample\``,
      rightBody: `\`\`\`python
snippet:gpt2_manual/hf-dataset-inspect
\`\`\``,
      codeExplanations: [
        { lineRange: [1, 10], content: 'Carregamos configs/subsets do Hub e usamos uma config explícita quando o dataset tem variações.' },
        { lineRange: [12, 16], content: 'O código não assume que existe `train`: escolhe `train` se houver ou cai no primeiro split disponível.' },
        { lineRange: [18, 21], content: 'A inspeção final mostra schema, nomes de colunas e uma amostra real antes de qualquer tokenização.' },
      ],
    },
    'en-us': {
      title: 'Hugging Face dataset: inspect first',
      body: `Now that the small GPT works, we can replace the data source.

But Hugging Face datasets are not standardized enough to assume there is always a \`text\` column.

Before tokenizing, inspect:

- available configs/subsets
- available splits
- \`features\`
- \`column_names\`
- one real sample

Contract for this slide:
- input: Hub \`repo_id\`
- operation: load configs, dataset, and split
- output: selected split + visible schema
- common error: calling \`dataset["text"]\` without knowing whether that column exists
- test: print \`features\`, \`columns\`, and \`sample\``,
      rightBody: `\`\`\`python
snippet:gpt2_manual/hf-dataset-inspect
\`\`\``,
      codeExplanations: [
        { lineRange: [1, 10], content: 'We load configs/subsets from the Hub and use an explicit config when the dataset has variants.' },
        { lineRange: [12, 16], content: 'The code does not assume `train` exists: it chooses `train` if present or falls back to the first available split.' },
        { lineRange: [18, 21], content: 'The final inspection shows schema, column names, and one real sample before tokenization.' },
      ],
    },
  },
});
