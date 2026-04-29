import { defineSlide } from './_factory';

export const reasoningDatasets = defineSlide({
  id: 'reasoning-datasets',
  type: 'two-column',
  options: { columnRatios: [0.55, 0.45] },
  content: {
    'pt-br': {
      title: 'Datasets para Reasoning',
      body: `Reasoning models precisam ser treinados com datasets que contenham **raciocínio passo a passo**, não apenas input/output.

### Principais Datasets

| Dataset | Domínio | Exemplos | Descrição |
|---------|---------|----------|-----------|
| **Orca-Math** | Matemática | 200K | Problemas + soluções detalhadas com passos |
| **NuminaMath** | Matemática | 860K | Dataset chinês de problemas olímpicos |
| **PRM800K** | Verificação | 800K | Labels de qualidade por step (good/bad) |
| **GSM8K** | Matemática | 8.5K | Elementary school math problems |
| **AIME** | Competição | 300 | American Invitational Math Exam |
| **Codeforces** | Code | 10K+ | Problems de competitive programming |

### O que torna um dataset de reasoning?

1. **Input**: Problema complexo
2. **Reasoning trace**: Passo a passo detalhado
3. **Output**: Resposta final verificável
4. **Process labels** (opcional): Qualidade de cada step

### Exemplo de data point

\`\`\`python
snippet:reasoning/dataset-example
\`\`\`

> Sem datasets de reasoning, não há como treinar modelos a pensar — apenas a imitar respostas.`,
    },
    'en-us': {
      title: 'Reasoning Datasets',
      body: `Reasoning models need to be trained with datasets containing **step-by-step reasoning**, not just input/output.

### Main Datasets

| Dataset | Domain | Examples | Description |
|---------|--------|----------|-------------|
| **Orca-Math** | Math | 200K | Problems + detailed solutions with steps |
| **NuminaMath** | Math | 860K | Chinese dataset of olympiad problems |
| **PRM800K** | Verification | 800K | Per-step quality labels (good/bad) |
| **GSM8K** | Math | 8.5K | Elementary school math problems |
| **AIME** | Competition | 300 | American Invitational Math Exam |
| **Codeforces** | Code | 10K+ | Competitive programming problems |

### What makes a reasoning dataset?

1. **Input**: Complex problem
2. **Reasoning trace**: Detailed step by step
3. **Output**: Verifiable final answer
4. **Process labels** (optional): Quality of each step

### Data point example

\`\`\`python
snippet:reasoning/dataset-example
\`\`\`

> Without reasoning datasets, there's no way to train models to think — only to mimic answers.`,
    },
  },
  visual: {
    id: 'reasoning-datasets-visual',
    copy: {
      'pt-br': {
        title: 'Comparação de Datasets',
        datasetLabel: 'Dataset',
        domainLabel: 'Domínio',
        sizeLabel: 'Tamanho',
        qualityLabel: 'Qualidade dos steps',
        mathLabel: 'Orca-Math: passos detalhados',
        numinaLabel: 'NuminaMath: problemas olímpicos',
        prmLabel: 'PRM800K: labels por step',
        gsmLabel: 'GSM8K: grade-school math',
      },
      'en-us': {
        title: 'Dataset Comparison',
        datasetLabel: 'Dataset',
        domainLabel: 'Domain',
        sizeLabel: 'Size',
        qualityLabel: 'Step quality',
        mathLabel: 'Orca-Math: detailed steps',
        numinaLabel: 'NuminaMath: olympiad problems',
        prmLabel: 'PRM800K: per-step labels',
        gsmLabel: 'GSM8K: grade-school math',
      },
    },
  },
});
