import { defineSlide } from './_factory';

export const gpt2PytorchConfigLoading = defineSlide({
  id: 'gpt2-pytorch-config-loading',
  type: 'two-column',
  options: { columnRatios: [0.5, 0.5] },
  content: {
    'pt-br': {
      title: 'Configuração do GPT no repo',
      body: `No fluxo novo, “abrir o GPT-2” começa pela configuração, não por checkpoints externos.

Os números que definem o modelo são:

- \`vocab_size\`
- \`block_size\`
- \`n_layer\`
- \`n_head\`
- \`n_embd\``,
      rightBody: `\`\`\`python
snippet:repo-gpt2/config
\`\`\``,
      codeExplanations: [
        { lineRange: [1, 3], content: 'A configuração nasce como dataclass porque essas dimensões são contrato de arquitetura.' },
        { lineRange: [4, 10], content: 'Cada campo controla uma parte concreta do modelo: vocabulário, contexto, profundidade, heads e largura.' },
        { lineRange: [11, 11], content: 'O peso das embeddings e do LM head pode ser compartilhado desde a configuração.' },
      ],
    },
    'en-us': {
      title: 'GPT config in the repo',
      body: `In the new flow, “opening GPT-2” starts from configuration, not from external checkpoints.

The numbers that define the model are:

- \`vocab_size\`
- \`block_size\`
- \`n_layer\`
- \`n_head\`
- \`n_embd\``,
      rightBody: `\`\`\`python
snippet:repo-gpt2/config
\`\`\``,
      codeExplanations: [
        { lineRange: [1, 3], content: 'The config starts as a dataclass because these dimensions are an architectural contract.' },
        { lineRange: [4, 10], content: 'Each field controls one concrete model choice: vocabulary, context, depth, heads, and width.' },
        { lineRange: [11, 11], content: 'Embedding and LM head weight tying can already be decided at config level.' },
      ],
    },
  },
});
