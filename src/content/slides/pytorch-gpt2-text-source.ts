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
        { lineRange: [1, 206], content: '`text_source.py`: `normalize_paragraphs()` com regex, `TextSource` (Protocol), `LocalTextSource`, `HFTextSource` (streaming), `build_text_source()` factory.' },
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
        { lineRange: [1, 206], content: '`text_source.py`: `normalize_paragraphs()` with regex, `TextSource` (Protocol), `LocalTextSource`, `HFTextSource` (streaming), `build_text_source()` factory.' },
      ],
    },
  },
});

