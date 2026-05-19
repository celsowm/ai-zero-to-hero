import { defineSlide } from './_factory';

export const gpt2WeThePeopleInput = defineSlide({
  id: 'gpt2-we-the-people-input',
  type: 'two-column',
  options: { columnRatios: [0.54, 0.46] },
  content: {
    'pt-br': {
      title: '`"We the people"` como tensor',
      body: `Antes de entrar no GPT, o texto precisa virar exatamente o tipo de input que o forward espera: uma matriz \`(B, T)\` de IDs.

Para o modelo, isso significa:

1. uma linha por exemplo do batch
2. uma coluna por posição
3. nenhum “significado” ainda, só índices`,
      rightBody: `\`\`\`python
snippet:repo-gpt2/text-to-tokens
\`\`\``,
      codeExplanations: [
        { lineRange: [1, 4], content: 'Representamos o prompt como IDs inteiros antes de qualquer embedding.' },
        { lineRange: [6, 7], content: 'Os `print`s deixam visíveis tanto o conteúdo quanto o shape de entrada.' },
      ],
    },
    'en-us': {
      title: '`"We the people"` as a tensor',
      body: `Before entering GPT, the text must become exactly the kind of input the forward pass expects: a \`(B, T)\` matrix of IDs.

For the model, that means:

1. one row per batch example
2. one column per position
3. no “meaning” yet, only indices`,
      rightBody: `\`\`\`python
snippet:repo-gpt2/text-to-tokens
\`\`\``,
      codeExplanations: [
        { lineRange: [1, 4], content: 'We represent the prompt as integer IDs before any embedding happens.' },
        { lineRange: [6, 7], content: 'The `print`s make both the content and the input shape explicit.' },
      ],
    },
  },
});
