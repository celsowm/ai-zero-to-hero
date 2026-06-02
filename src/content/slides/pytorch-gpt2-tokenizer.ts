import { defineSlide } from './_factory';

export const pytorchGpt2Tokenizer = defineSlide({
  id: 'pytorch-gpt2-tokenizer',
  type: 'two-column',
  options: { columnRatios: [0.48, 0.52] },
  content: {
    'pt-br': {
      title: 'Tokenizer BPE',
      body: `Este arquivo transforma texto em IDs.

O GPT não recebe string. Ele recebe inteiros. O tokenizer faz essa ponte.

A base byte-level garante que qualquer texto UTF-8 pode ser representado. O BPE aprende merges frequentes para encurtar sequências.`,
      rightBody: `\`\`\`python
snippet:pytorch_gpt2/tokenizer
\`\`\``,
      codeExplanations: [
        { lineRange: [1, 582], content: '`tokenizer.py`: implementação completa do tokenizer BPE com pré-tokenização por regex, `ByteTokenizer`, `BPETokenizer` com encode/decode/save/load, treinamento BPE incremental com heap e cache LRU, e `build_tokenizer` factory.' },
      ],
    },
    'en-us': {
      title: 'BPE Tokenizer',
      body: `This file turns text into IDs.

GPT does not receive strings. It receives integers. The tokenizer bridges this gap.

The byte-level base ensures any UTF-8 text can be represented. BPE learns frequent merges to shorten sequences.`,
      rightBody: `\`\`\`python
snippet:pytorch_gpt2/tokenizer
\`\`\``,
      codeExplanations: [
        { lineRange: [1, 582], content: '`tokenizer.py`: complete BPE tokenizer implementation with regex pretokenization, `ByteTokenizer`, `BPETokenizer` with encode/decode/save/load, incremental BPE training with heap and LRU cache, and `build_tokenizer` factory.' },
      ],
    },
  },
});

