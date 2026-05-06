import { defineSlide } from './_factory';

export const tokenizerTrainingHf = defineSlide({
  id: 'tokenizer-training-hf',
  type: 'two-column',
  options: {
    columnRatios: [0.5, 0.5],
  },
  content: {
    'pt-br': {
      title: `Treinando seu próprio Tokenizer`,
      body: `Nem sempre o tokenizer pré-treinado é ideal para seu domínio. A biblioteca **\`tokenizers\`** permite treinar um do zero.

1. **Por que treinar:** vocabulário de domínio específico (médico, jurídico, código) tem termos que tokenizers genéricos fragmentam demais.

2. **ByteLevel BPE:** o algoritmo padrão da maioria dos tokenizers modernos. Opera em bytes, não caracteres — funciona para qualquer idioma.

3. **O treino:** você passa um corpus de texto, define vocab_size e min_frequency. O algoritmo encontra os merges mais frequentes.

4. **Integração:** o tokenizer treinado salva como JSON e carrega com \`PreTrainedTokenizerFast\` — compatível com qualquer modelo.

> Treinar um tokenizer é como ensinar o modelo o alfabeto do seu domínio antes de aprender a ler.

---

\`\`\`python
snippet:transformers/tokenizer-training-hf
\`\`\``,
      codeExplanations: [
        {
          lineRange: [1, 2],
          content: 'Importamos a biblioteca `tokenizers` para BPE puro e `transformers` para wrapping.',
        },
        {
          lineRange: [5, 6],
          content: 'Criamos um tokenizer BPE com ByteLevel pre-tokenizer — funciona para qualquer idioma.',
        },
        {
          lineRange: [9, 16],
          content: 'O trainer define corpus, vocab_size, frequência mínima e tokens especiais.',
        },
        {
          lineRange: [18, 19],
          content: 'Iniciamos o treinamento e salvamos o estado do tokenizer em um arquivo JSON.',
        },
        {
          lineRange: [22, 24],
          content: 'Carregamos como `PreTrainedTokenizerFast` para integração total com o ecossistema.',
        },
      ],

    },
    'en-us': {
      title: `Training your own Tokenizer`,
      body: `The pre-trained tokenizer isn't always ideal for your domain. The **\`tokenizers\`** library lets you train one from scratch.

1. **Why train:** domain-specific vocabulary (medical, legal, code) has terms that generic tokenizers over-split.

2. **ByteLevel BPE:** the standard algorithm for most modern tokenizers. Operates on bytes, not characters — works for any language.

3. **Training:** you pass a text corpus, define vocab_size and min_frequency. The algorithm finds the most frequent merges.

4. **Integration:** the trained tokenizer saves as JSON and loads with \`PreTrainedTokenizerFast\` — compatible with any model.

> Training a tokenizer is like teaching the model your domain's alphabet before it learns to read.

---

\`\`\`python
snippet:transformers/tokenizer-training-hf
\`\`\``,
      codeExplanations: [
        {
          lineRange: [1, 2],
          content: 'We import the `tokenizers` library for raw BPE and `transformers` for wrapping.',
        },
        {
          lineRange: [5, 6],
          content: 'We create a BPE tokenizer with ByteLevel pre-tokenizer — works for any language.',
        },
        {
          lineRange: [9, 16],
          content: 'The trainer defines corpus, vocab_size, minimum frequency, and special tokens.',
        },
        {
          lineRange: [18, 19],
          content: 'Start training and save the tokenizer state to a JSON file.',
        },
        {
          lineRange: [22, 24],
          content: 'Load as `PreTrainedTokenizerFast` for full integration with the ecosystem.',
        },
      ],
    },
  },
});
