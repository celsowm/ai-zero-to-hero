import { defineSlide } from './_factory';

export const buildGpt2Generate = defineSlide({
  id: 'build-gpt2-generate',
  type: 'two-column',
  options: {
    columnRatios: [0.45, 0.55],
  },
  content: {
    'pt-br': {
      title: 'Passo 3: Geração final (PT + EN)',
      body: `Depois do treino, fechamos o ciclo com geração autoregressiva.

Prompts de fechamento desta trilha:
- \`Era uma vez\`
- \`Once upon a time\`

Loop de geração:
1. rodar forward no contexto atual
2. pegar \`logits[:, -1, :]\`
3. aplicar temperatura/top-k
4. sortear próximo token
5. concatenar e repetir

Objetivo didático: você ver a mesma mecânica funcionar nos dois idiomas com o mesmo modelo base.`,
      rightBody: `
\`\`\`python
snippet:build_gpt2/build-gpt2-generate
\`\`\``,
      codeExplanations: [
        {
          lineRange: [1, 7],
          content: 'Criamos os prompts PT/EN e convertemos para IDs com o mesmo ByteTokenizer.',
        },
        {
          lineRange: [8, 23],
          content: 'Cada iteração usa logits da última posição, aplica temperatura/top-k e amostra o próximo token.',
        },
        {
          lineRange: [24, 28],
          content: 'Decodificamos e imprimimos as saídas para comparar o comportamento bilíngue.',
        },
      ],
    },
    'en-us': {
      title: 'Step 3: Final generation (PT + EN)',
      body: `After training, we close the loop with autoregressive generation.

Closing prompts for this track:
- \`Era uma vez\`
- \`Once upon a time\`

Generation loop:
1. run forward on current context
2. take \`logits[:, -1, :]\`
3. apply temperature/top-k
4. sample next token
5. concatenate and repeat

Didactic goal: you see the same mechanics working in both languages with the same base model.`,
      rightBody: `
\`\`\`python
snippet:build_gpt2/build-gpt2-generate
\`\`\``,
      codeExplanations: [
        {
          lineRange: [1, 7],
          content: 'We create PT/EN prompts and convert them to IDs with the same ByteTokenizer.',
        },
        {
          lineRange: [8, 23],
          content: 'Each iteration uses last-position logits, applies temperature/top-k, and samples the next token.',
        },
        {
          lineRange: [24, 28],
          content: 'We decode and print outputs to compare bilingual behavior.',
        },
      ],
    },
  },
});

