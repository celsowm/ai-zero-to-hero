import { defineSlide } from './_factory';

export const dataCollatorExplorer = defineSlide({
  id: 'data-collator-explorer',
  type: 'two-column',
  options: {
    columnRatios: [0.5, 0.5],
  },
  content: {
    'pt-br': {
      title: `Data Collators: o que o modelo vê`,
      body: `O Data Collator é o **preparador de batches**. Ele pega amostras individuais e as monta em tensores que o modelo entende.

1. **Padding dinâmico vs estático:** o collator adiciona padding apenas até a sequência mais longa do batch (dinâmico), não um tamanho fixo (estático). Isso economiza computação.

2. **\`DataCollatorForLanguageModeling\`:** para pré-treinamento causal (GPT) ou MLM (BERT). Cria \`labels\` para a loss.

3. **\`DataCollatorWithPadding\`:** apenas padding — usa \`tokenizer.pad_token_id\`. Para classificação e fine-tuning.

4. **Attention mask:** o collator gera automaticamente a máscara que diz ao modelo quais tokens são reais vs padding.

> O collator é o tradutor entre o dataset (listas de dicts) e o modelo (tensores batched).

---

\`\`\`python
snippet:transformers/data-collator-demo
\`\`\``,
      codeExplanations: [
        {
          lineRange: [1, 5],
          content: 'Importamos os collators e carregamos o tokenizador, definindo o token de padding.',
        },
        {
          lineRange: [8, 13],
          content: 'Carregamos um dataset e tokenizamos as sequências para processamento.',
        },
        {
          lineRange: [16, 19],
          content: 'MLM collator: `mlm=False` para GPT (causal), `True` para BERT (masked).',
        },
        {
          lineRange: [22, 22],
          content: 'Padding collator: apenas adiciona padding — sem masking.',
        },
        {
          lineRange: [24, 27],
          content: 'O collator produz `input_ids` e `attention_mask` com shapes consistentes.',
        },
      ],
    },
    'en-us': {
      title: `Data Collators: what the model sees`,
      body: `The Data Collator is the **batch preparer**. It takes individual samples and assembles them into tensors the model understands.

1. **Dynamic vs static padding:** the collator adds padding only up to the longest sequence in the batch (dynamic), not a fixed size (static). This saves computation.

2. **\`DataCollatorForLanguageModeling\`:** for causal pre-training (GPT) or MLM (BERT). Creates \`labels\` for the loss.

3. **\`DataCollatorWithPadding\`:** padding only — uses \`tokenizer.pad_token_id\`. For classification and fine-tuning.

4. **Attention mask:** the collator automatically generates the mask that tells the model which tokens are real vs padding.

> The collator is the translator between the dataset (lists of dicts) and the model (batched tensors).

---

\`\`\`python
snippet:transformers/data-collator-demo
\`\`\``,
      codeExplanations: [
        {
          lineRange: [1, 5],
          content: 'We import the collators and load the tokenizer, defining the pad token.',
        },
        {
          lineRange: [8, 13],
          content: 'We load a dataset and tokenize the sequences for processing.',
        },
        {
          lineRange: [16, 19],
          content: 'MLM collator: `mlm=False` for GPT (causal), `True` for BERT (masked).',
        },
        {
          lineRange: [22, 22],
          content: 'Padding collator: just adds padding — no masking.',
        },
        {
          lineRange: [24, 27],
          content: 'The collator produces `input_ids` and `attention_mask` with consistent shapes.',
        },
      ],
    },
  },
  visual: {
    id: 'data-collator-visualizer',
    copy: {
      'pt-br': {
        title: 'Data Collator: Padding Dinâmico',
        batchLabel: 'Batch preparado',
        sequenceLabel: 'Sequências originais',
        paddedLabel: 'Sequências com padding',
        maxLenLabel: 'Max length',
        dynamicPadding: 'Dinâmico',
        staticPadding: 'Estático',
        padToken: '<PAD>',
      },
      'en-us': {
        title: 'Data Collator: Dynamic Padding',
        batchLabel: 'Prepared batch',
        sequenceLabel: 'Original sequences',
        paddedLabel: 'Padded sequences',
        maxLenLabel: 'Max length',
        dynamicPadding: 'Dynamic',
        staticPadding: 'Static',
        padToken: '<PAD>',
      },
    },
  },
});
