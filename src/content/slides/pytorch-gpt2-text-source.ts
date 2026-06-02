import { defineSlide } from './_factory';

export const pytorchGpt2TextSource = defineSlide({
  id: 'pytorch-gpt2-text-source',
  type: 'two-column',
  options: { columnRatios: [0.48, 0.52] },
  content: {
    'pt-br': {
      title: 'Fonte de texto',
      body: `Agora começa o pipeline de dados.

O \`text_source.py\` entrega textos para o resto do projeto sem obrigar o tokenizer a saber se eles vieram de arquivos locais ou do Hugging Face.

A interface importante é \`iter_texts()\`: o resto do pipeline só precisa receber strings.`,
      rightBody: `\`\`\`python
snippet:pytorch_gpt2/text-source
\`\`\``,
      codeExplanations: [
        { lineRange: [1, 9], content: 'Docstring e imports: `re`, `pathlib`, `Iterator`/`Protocol`, `DataConfig`.' },
        { lineRange: [12, 33], content: 'Regex e `normalize_paragraphs()`: remove quebras de linha, números de página, normaliza espaços, retorna parágrafos separados por `\\n\\n`.' },
        { lineRange: [36, 41], content: '`TextSource` (Protocol): interface com `iter_texts()` e `count_documents()`.' },
        { lineRange: [44, 65], content: '`LocalTextSource`: lê de arquivo ou diretório `.txt`, normaliza parágrafos, conta documentos.' },
        { lineRange: [68, 101], content: '`HFTextSource.__init__`: recebe `DataConfig`, normaliza tag de idioma. `_row_matches_language`: filtra linhas por idioma.' },
        { lineRange: [103, 131], content: '`_iter_from_partitioned_parquet`: carrega apenas parquet do idioma alvo (otimização para datasets particionados).' },
        { lineRange: [132, 187], content: '`iter_texts`: tenta partitioned parquet, fallback para `load_dataset`, fallback para parquet por arquivo em erro de cast.' },
        { lineRange: [189, 196], content: '`count_documents`: usa `load_dataset_builder` para estimar total de exemplos.' },
        { lineRange: [199, 206], content: '`build_text_source`: factory que seleciona `LocalTextSource` ou `HFTextSource` baseado em `config.source`.' },
      ],
    },
    'en-us': {
      title: 'Text source',
      body: `The data pipeline starts here.

\`text_source.py\` delivers texts to the rest of the project without forcing the tokenizer to know whether they came from local files or Hugging Face.

The key interface is \`iter_texts()\`: the rest of the pipeline only needs to receive strings.`,
      rightBody: `\`\`\`python
snippet:pytorch_gpt2/text-source
\`\`\``,
      codeExplanations: [
        { lineRange: [1, 9], content: 'Docstring and imports: `re`, `pathlib`, `Iterator`/`Protocol`, `DataConfig`.' },
        { lineRange: [12, 33], content: 'Regexes and `normalize_paragraphs()`: removes line breaks, page numbers, normalizes whitespace, returns `\\n\\n`-separated paragraphs.' },
        { lineRange: [36, 41], content: '`TextSource` (Protocol): interface with `iter_texts()` and `count_documents()`.' },
        { lineRange: [44, 65], content: '`LocalTextSource`: reads from file or `.txt` directory, normalizes paragraphs, counts documents.' },
        { lineRange: [68, 101], content: '`HFTextSource.__init__`: receives `DataConfig`, normalizes language tag. `_row_matches_language`: filters rows by language.' },
        { lineRange: [103, 131], content: '`_iter_from_partitioned_parquet`: loads only parquet for target language (optimization for partitioned datasets).' },
        { lineRange: [132, 187], content: '`iter_texts`: tries partitioned parquet, falls back to `load_dataset`, falls back to per-file parquet on cast error.' },
        { lineRange: [189, 196], content: '`count_documents`: uses `load_dataset_builder` to estimate total examples.' },
        { lineRange: [199, 206], content: '`build_text_source`: factory that selects `LocalTextSource` or `HFTextSource` based on `config.source`.' },
      ],
    },
  },
});

