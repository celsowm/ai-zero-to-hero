import { defineSlide } from './_factory';

export const gpt2WeThePeopleInput = defineSlide({
  id: 'gpt2-we-the-people-input',
  type: 'two-column',
  options: { columnRatios: [0.54, 0.46] },
  content: {
    'pt-br': {
      title: 'Prompt como tensor `(B, T)`',
      body: `Antes do forward, todo texto precisa virar IDs inteiros.

Aqui usamos prompts curtos bilíngues para preparar a prática:

1. \`Era uma vez\`
2. \`Once upon a time\`

Para o modelo, isso vira:

- uma linha por exemplo do batch
- uma coluna por posição
- nenhum “significado” ainda, só índices`,
      rightBody: `\`\`\`python
snippet:gpt2_manual/text-to-tokens
\`\`\``,
      codeExplanations: [
        { lineRange: [1, 4], content: 'Inicializamos o ByteTokenizer para converter texto cru em IDs.' },
        { lineRange: [5, 10], content: 'Codificamos os prompts PT/EN e alinhamos o tamanho para formar um batch único.' },
        { lineRange: [12, 13], content: 'O `idx` final tem shape `(B, T)` pronto para entrar no GPT.' },
      ],
    },
    'en-us': {
      title: 'Prompt as `(B, T)` tensor',
      body: `Before forward, all text must become integer IDs.

Here we use short bilingual prompts to set up the hands-on section:

1. \`Era uma vez\`
2. \`Once upon a time\`

For the model, that becomes:

- one row per batch example
- one column per position
- no “meaning” yet, only indices`,
      rightBody: `\`\`\`python
snippet:gpt2_manual/text-to-tokens
\`\`\``,
      codeExplanations: [
        { lineRange: [1, 4], content: 'We initialize ByteTokenizer to convert raw text into IDs.' },
        { lineRange: [5, 10], content: 'We encode PT/EN prompts and align lengths to form one batch.' },
        { lineRange: [12, 13], content: 'Final `idx` has `(B, T)` shape ready for GPT input.' },
      ],
    },
  },
});

