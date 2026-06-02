import { defineSlide } from './_factory';

export const pytorchGpt2PrepareShards = defineSlide({
  id: 'pytorch-gpt2-prepare-shards',
  type: 'two-column',
  options: { columnRatios: [0.48, 0.52] },
  content: {
    'pt-br': {
      title: 'Preparação dos shards',
      body: `Depois que existe tokenizer, o dataset inteiro pode virar tokens.

O \`prepare.py\` lê textos, aplica \`tokenizer.encode\`, separa treino e validação, grava \`.bin\` e cria \`metadata.json\`.

Esse passo prepara o treino para ser rápido: o \`Trainer\` não vai tokenizar texto a cada batch.`,
      rightBody: `\`\`\`python
snippet:pytorch_gpt2/prepare-shards
\`\`\``,
      codeExplanations: [
        { lineRange: [1, 197], content: '`prepare.py`: tokeniza dataset, separa treino/val, salva shards `.bin` com flush incremental, gera `metadata.json`.' },
      ],
    },
    'en-us': {
      title: 'Shard preparation',
      body: `Once a tokenizer exists, the entire dataset can become tokens.

\`prepare.py\` reads texts, applies \`tokenizer.encode\`, separates training and validation, writes \`.bin\` files, and creates \`metadata.json\`.

This step prepares training to be fast: the \`Trainer\` will not tokenize text every batch.`,
      rightBody: `\`\`\`python
snippet:pytorch_gpt2/prepare-shards
\`\`\``,
      codeExplanations: [
        { lineRange: [1, 197], content: '`prepare.py`: tokenizes dataset, splits train/val, saves `.bin` shards with incremental flush, generates `metadata.json`.' },
      ],
    },
  },
});

