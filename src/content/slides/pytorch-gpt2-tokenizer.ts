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
        { lineRange: [1, 17], content: 'Docstring e imports: `json`, `heapq`, `re`, `time`, `Counter`, `OrderedDict`, `dataclasses`, `pathlib`, `Iterable`/`Protocol`. Expressões regulares de pré-tokenização para EN, PT e fallback.' },
        { lineRange: [19, 44], content: 'Regex de pré-tokenização: `_SPLIT_REGEX_EN`, `_SPLIT_REGEX_PT`, `_SPLIT_REGEX_DEFAULT`. Mapa por idioma e constante de cache.' },
        { lineRange: [46, 68], content: '`_normalize_language`, `_resolve_split_regex`, `_pretokenize_to_byte_chunks`: normaliza tag de idioma, seleciona regex, converte texto em chunks de bytes.' },
        { lineRange: [70, 86], content: '`Tokenizer` (Protocol): interface com `vocab_size`, `eot_id`, `encode`, `decode`.' },
        { lineRange: [88, 108], content: '`ByteTokenizer`: `@dataclass(frozen=True)`, vocab_size=257, eot_id=256. `encode`: bytes puros + EOT opcional. `decode`: filtra bytes 0-255, decodifica UTF-8.' },
        { lineRange: [111, 125], content: '`_merge_pair`: função auxiliar que substitui todas as ocorrências de um par em uma lista de IDs pelo novo ID.' },
        { lineRange: [128, 144], content: '`BPETokenizer.__post_init__`: constrói `_merge_lookup` (par→ID), `_merge_rank` (par→rank), `_chunk_cache` (LRU).' },
        { lineRange: [146, 175], content: '`encode` e `decode`: `encode` usa `_encode_chunked_ids` com cache LRU; `decode` expande vocabulário, remove EOTs, decodifica UTF-8.' },
        { lineRange: [177, 209], content: '`save()`: serializa como JSON. `load()`: método de classe que valida tipo, eot_id, vocab_size e reconstrói BPETokenizer.' },
        { lineRange: [211, 218], content: '`_expanded_vocab()`: reconstrói tabela bytes→bytes para cada merge ID a partir dos merges armazenados.' },
        { lineRange: [221, 244], content: '`_pair_counts` e `_best_pair_from_counter`: conta frequência de pares e escolhe o melhor merge.' },
        { lineRange: [247, 317], content: '`_merge_tuple` e `_apply_merges_fast`: aplica merges usando heap com rank — O(n log n) por chunk.' },
        { lineRange: [320, 344], content: '`_encode_chunked_ids`: pré-tokeniza em chunks, aplica merges com cache LRU.' },
        { lineRange: [347, 466], content: '`_train_bpe_incremental`: treino BPE iterativo — encontra melhor par, funde, atualiza splits e pair_freq.' },
        { lineRange: [469, 572], content: '`train_bpe_tokenizer`: função pública que coleta chunks, treina BPE com progress bars, retorna `BPETokenizer`.' },
        { lineRange: [575, 582], content: '`build_tokenizer`: factory que retorna `ByteTokenizer` ou carrega `BPETokenizer` de arquivo.' },
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
        { lineRange: [1, 17], content: 'Docstring and imports: `json`, `heapq`, `re`, `time`, `Counter`, `OrderedDict`, `dataclasses`, `pathlib`, `Iterable`/`Protocol`. Pretokenization regex patterns for EN, PT, and fallback.' },
        { lineRange: [19, 44], content: 'Pretokenization regexes: `_SPLIT_REGEX_EN`, `_SPLIT_REGEX_PT`, `_SPLIT_REGEX_DEFAULT`. Language map and cache constant.' },
        { lineRange: [46, 68], content: '`_normalize_language`, `_resolve_split_regex`, `_pretokenize_to_byte_chunks`: normalizes language tag, selects regex, converts text to byte chunks.' },
        { lineRange: [70, 86], content: '`Tokenizer` (Protocol): interface with `vocab_size`, `eot_id`, `encode`, `decode`.' },
        { lineRange: [88, 108], content: '`ByteTokenizer`: `@dataclass(frozen=True)`, vocab_size=257, eot_id=256. `encode`: raw bytes + optional EOT. `decode`: filters bytes 0-255, decodes UTF-8.' },
        { lineRange: [111, 125], content: '`_merge_pair`: helper that replaces all occurrences of a pair in an ID list with the new ID.' },
        { lineRange: [128, 144], content: '`BPETokenizer.__post_init__`: builds `_merge_lookup`, `_merge_rank`, `_chunk_cache` (LRU).' },
        { lineRange: [146, 175], content: '`encode` and `decode`: `encode` uses `_encode_chunked_ids` with LRU cache; `decode` expands vocabulary, removes EOTs, decodes UTF-8.' },
        { lineRange: [177, 209], content: '`save()`: serializes as JSON. `load()`: class method that validates type, eot_id, vocab_size, reconstructs BPETokenizer.' },
        { lineRange: [211, 218], content: '`_expanded_vocab()`: reconstructs byte table for each merge ID from stored merges.' },
        { lineRange: [221, 244], content: '`_pair_counts` and `_best_pair_from_counter`: counts pair frequency, selects best merge.' },
        { lineRange: [247, 317], content: '`_merge_tuple` and `_apply_merges_fast`: applies merges using a rank heap — O(n log n) per chunk.' },
        { lineRange: [320, 344], content: '`_encode_chunked_ids`: pretokenizes into chunks, applies merges with LRU cache.' },
        { lineRange: [347, 466], content: '`_train_bpe_incremental`: iterative BPE training — finds best pair, merges, updates splits and pair_freq.' },
        { lineRange: [469, 572], content: '`train_bpe_tokenizer`: public function that collects chunks, trains BPE with progress bars, returns `BPETokenizer`.' },
        { lineRange: [575, 582], content: '`build_tokenizer`: factory that returns `ByteTokenizer` or loads `BPETokenizer` from file.' },
      ],
    },
  },
});

