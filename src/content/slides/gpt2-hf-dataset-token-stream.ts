import { defineSlide } from './_factory';

export const gpt2HfDatasetTokenStream = defineSlide({
  id: 'gpt2-hf-dataset-token-stream',
  type: 'two-column',
  options: { columnRatios: [0.48, 0.52] },
  content: {
    'pt-br': {
      title: 'HF dataset -> texto normalizado -> token stream',
      body: `Depois de inspecionar o schema, transformamos o dataset em token stream.

Não assuma que a coluna é sempre \`text\`. Em datasets reais, o texto pode estar em:

- \`text\`
- \`content\`
- \`prompt\`
- \`completion\`
- \`body\`
- listas de mensagens
- dicionários com campos aninhados

Contrato:
- entrada: split do dataset
- operação: escolher coluna, normalizar valor, concatenar corpus
- saída: \`data (N,)\` com dtype \`torch.long\`
- erro comum: tokenizar uma lista/dict direto e quebrar o tokenizer
- teste: \`dtype long\`, \`max < vocab_size\`, \`len(data) > block_size\`

Depois disso, nada muda no modelo: o mesmo \`get_batch()\` continua funcionando.`,
      rightBody: `\`\`\`python
snippet:gpt2_manual/hf-dataset-token-stream
\`\`\``,
      codeExplanations: [
        { lineRange: [1, 12], content: 'Definimos candidatas de coluna textual e falhamos explicitamente mostrando as colunas disponíveis.' },
        { lineRange: [15, 24], content: '`normalize_text` transforma `None`, string, lista, dict e outros valores em texto plano.' },
        { lineRange: [27, 32], content: 'O split vira corpus, depois tokens, depois tensor `torch.long`.' },
        { lineRange: [33, 36], content: 'Os asserts garantem que o token stream serve para embedding, vocab_size e janelas de treino.' },
      ],
    },
    'en-us': {
      title: 'HF dataset -> normalized text -> token stream',
      body: `After inspecting schema, we turn the dataset into a token stream.

Do not assume the column is always \`text\`. In real datasets, text may live in:

- \`text\`
- \`content\`
- \`prompt\`
- \`completion\`
- \`body\`
- message lists
- nested dictionaries

Contract:
- input: dataset split
- operation: choose column, normalize value, concatenate corpus
- output: \`data (N,)\` with \`torch.long\` dtype
- common error: tokenizing a list/dict directly and breaking the tokenizer
- test: \`dtype long\`, \`max < vocab_size\`, \`len(data) > block_size\`

After this, nothing changes in the model: the same \`get_batch()\` keeps working.`,
      rightBody: `\`\`\`python
snippet:gpt2_manual/hf-dataset-token-stream
\`\`\``,
      codeExplanations: [
        { lineRange: [1, 12], content: 'We define candidate text columns and fail explicitly with the available columns.' },
        { lineRange: [15, 24], content: '`normalize_text` turns `None`, string, list, dict, and other values into plain text.' },
        { lineRange: [27, 32], content: 'The split becomes a corpus, then tokens, then a `torch.long` tensor.' },
        { lineRange: [33, 36], content: 'Asserts ensure the token stream works for embedding, vocab_size, and training windows.' },
      ],
    },
  },
});
