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
        { lineRange: [1, 222], content: '`tokenizer.py`: `Tokenizer` (Protocol), `ByteTokenizer`, `BPETokenizer` com merges heap-based, pretokenização com regex por idioma, `save()`/`load()`, `_apply_merges_fast()`.' },
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
        { lineRange: [1, 222], content: '`tokenizer.py`: `Tokenizer` (Protocol), `ByteTokenizer`, `BPETokenizer` with heap-based merges, language-specific pretokenization regex, `save()`/`load()`, `_apply_merges_fast()`.' },
      ],
    },
  },
});

