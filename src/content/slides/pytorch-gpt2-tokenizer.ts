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
        { lineRange: [1, 12], content: 'Imports: `json` para serializar o tokenizer treinado, `dataclasses` para estrutura imutável, `pathlib` para caminhos. `BPETokenizer`: `@dataclass(frozen=True)` com `merges` e `name`.' },
        { lineRange: [14, 20], content: 'Propriedades: `vocab_size` = 257 (256 bytes + 1 EOT) + número de merges. `eot_id` = 256.' },
        { lineRange: [22, 31], content: '`encode()`: começa com bytes puros (0-255), aplica cada merge em ordem substituindo pares por novos IDs. Se `add_eot=True`, adiciona token de fim de texto.' },
        { lineRange: [33, 44], content: '`decode()`: constrói tabela que mapeia cada merge ID de volta para seus bytes, junta tudo e decodifica UTF-8.' },
        { lineRange: [46, 55], content: '`save()`: serializa como JSON com tipo, eot_id e lista de merges. Arquivo pequeno (~1MB para vocab 32000).' },
        { lineRange: [58, 70], content: '`_replace_pair()`: varre a lista de IDs em O(n) procurando um par específico. Quando encontra, substitui os dois por um novo ID.' },
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
        { lineRange: [1, 12], content: 'Imports: `json` for serializing the trained tokenizer, `dataclasses` for immutable data structures, `pathlib` for paths. `BPETokenizer`: `@dataclass(frozen=True)` with `merges` and `name`.' },
        { lineRange: [14, 20], content: 'Properties: `vocab_size` = 257 (256 bytes + 1 EOT) + merge count. `eot_id` = 256.' },
        { lineRange: [22, 31], content: '`encode()`: starts with raw bytes (0-255), applies each merge in order replacing pairs with new IDs. If `add_eot=True`, appends end-of-text token.' },
        { lineRange: [33, 44], content: '`decode()`: builds a lookup table mapping merge IDs back to their original bytes, concatenates them, and decodes UTF-8.' },
        { lineRange: [46, 55], content: '`save()`: serializes as JSON with type, eot_id, and merge list. Small file (~1MB for vocab 32000).' },
        { lineRange: [58, 70], content: '`_replace_pair()`: scans the ID list in O(n) looking for a specific pair. When found, replaces both with a single new ID.' },
      ],
    },
  },
});

