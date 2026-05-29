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
        { lineRange: [1, 10], content: 'Imports: ABC para classe abstrata, Path, Iterator, e DataConfig. O `ABC` do Python define interfaces obrigatórias.' },
        { lineRange: [12, 30], content: '`normalize_paragraphs()`: recebe texto bruto e junta linhas quebradas em parágrafos. Linhas vazias separam parágrafos. Isso normaliza textos do Gutenberg que têm quebras de linha artificiais.' },
        { lineRange: [33, 36], content: '`TextSource` é uma ABC com um método abstrato `iter_texts()` — qualquer fonte de texto precisa implementar isso.' },
        { lineRange: [39, 46], content: '`LocalTextSource`: itera arquivos `.txt` ordenados de um diretório local, lê cada um e normaliza. Útil para datasets baixados manualmente.' },
        { lineRange: [49, 66], content: '`HFTextSource`: carrega dataset do HuggingFace com `load_dataset` (suporta streaming para datasets grandes), extrai a coluna textual e normaliza. O streaming evita baixar tudo para a RAM.' },
        { lineRange: [69, 76], content: '`build_text_source()`: factory que escolhe entre `HFTextSource` ou `LocalTextSource` baseado no `config.source`, ou levanta erro se for inválido.' },
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
        { lineRange: [1, 10], content: 'Imports: ABC for abstract base class, Path, Iterator, and DataConfig. Python ABCs define required interfaces.' },
        { lineRange: [12, 30], content: '`normalize_paragraphs()`: takes raw text and joins broken lines into paragraphs. Empty lines separate paragraphs. This normalizes Gutenberg texts that have artificial line breaks.' },
        { lineRange: [33, 36], content: '`TextSource` is an ABC with a single abstract method `iter_texts()` — every text source must implement this.' },
        { lineRange: [39, 46], content: '`LocalTextSource`: iterates sorted `.txt` files from a local directory, reads each one, and normalizes.' },
        { lineRange: [49, 66], content: '`HFTextSource`: loads a HuggingFace dataset with `load_dataset` (supports streaming for large datasets), extracts the text column, and normalizes.' },
        { lineRange: [69, 76], content: '`build_text_source()`: factory that picks `HFTextSource` or `LocalTextSource` based on `config.source`, or raises an error for invalid values.' },
      ],
    },
  },
});
