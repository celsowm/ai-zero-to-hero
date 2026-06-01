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
        { lineRange: [1, 8], content: 'Imports: `json` para serializar o tokenizer treinado, `dataclasses` para estrutura de dados imutável, `pathlib` para caminhos.' },
        { lineRange: [10, 18], content: '`Tokenizer` é uma classe base (ABC informal — usa `raise NotImplementedError`). Define o contrato: `vocab_size`, `eot_id`, `encode()` e `decode()`.' },
        { lineRange: [21, 35], content: '`ByteTokenizer`: o tokenizador mais simples possível. `vocab_size=257` (256 bytes + 1 token EOT). `encode` converte string para bytes UTF-8, `decode` faz o caminho inverso. Adiciona `eot` se solicitado.' },
        { lineRange: [38, 45], content: '`BPETokenizer`: usa `@dataclass(frozen=True)`. Guarda uma lista de merges aprendidos (pares de IDs que viram um novo ID). O `vocab_size` é dinâmico: 257 + número de merges.' },
        { lineRange: [47, 56], content: '`BPETokenizer.encode()`: começa com bytes puros (0-255), depois aplica cada merge em ordem, substituindo pares por novos IDs. `_replace_pair` faz a substituição real.' },
        { lineRange: [58, 69], content: '`BPETokenizer.decode()`: reconstrói a string invertendo o processo. Constrói uma tabela que mapeia cada merge ID de volta para seus bytes originais, depois junta tudo e decodifica UTF-8.' },
        { lineRange: [71, 81], content: '`BPETokenizer.save()`: serializa o tokenizer como JSON com tipo, eot_id e lista de merges. Arquivo pequeno (~1MB para vocab 32000).' },
        { lineRange: [84, 100], content: '`_replace_pair()`: função auxiliar que varre a lista de IDs procurando um par específico. Quando encontra, substitui os dois por um novo ID. Otimizada para O(n) com uma única passada.' },
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
        { lineRange: [1, 8], content: 'Imports: `json` for saving the trained tokenizer, `dataclasses` for immutable data structures, `pathlib` for paths.' },
        { lineRange: [10, 18], content: '`Tokenizer` is a base class (informal ABC — uses `raise NotImplementedError`). Defines the contract: `vocab_size`, `eot_id`, `encode()` and `decode()`.' },
        { lineRange: [21, 35], content: '`ByteTokenizer`: the simplest possible tokenizer. `vocab_size=257` (256 bytes + 1 EOT token). `encode` converts string to UTF-8 bytes, `decode` reverses it.' },
        { lineRange: [38, 45], content: '`BPETokenizer`: uses `@dataclass(frozen=True)`. Stores a list of learned merges (pairs of IDs that become a single ID). `vocab_size` is dynamic: 257 + merge count.' },
        { lineRange: [47, 56], content: '`BPETokenizer.encode()`: starts with raw bytes (0-255), then applies each merge in order, replacing pairs with new IDs. `_replace_pair` performs the actual replacement.' },
        { lineRange: [58, 69], content: '`BPETokenizer.decode()`: reverses encoding by building a lookup table mapping merge IDs back to their original bytes, concatenating them, and decoding UTF-8.' },
        { lineRange: [71, 81], content: '`BPETokenizer.save()`: serializes as JSON with type, eot_id, and merge list. Small file (~1MB for vocab 32000).' },
        { lineRange: [84, 100], content: '`_replace_pair()`: helper that scans the ID list looking for a specific pair. When found, replaces both with a new ID. Optimized O(n) with a single pass.' },
      ],
    },
  },
});

