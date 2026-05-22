import { defineSlide } from './_factory';

export const gpt2EmbeddingsPlusPosition = defineSlide({
  id: 'gpt2-embeddings-plus-position',
  type: 'two-column',
  options: { columnRatios: [0.52, 0.48] },
  content: {
    'pt-br': {
      title: 'Token embedding + position embedding',
      body: `No repo novo, a entrada do GPT nasce exatamente desta soma:

- \`token_embedding(idx)\`
- \`position_embedding(positions)\`

Sem posição, tokens iguais em lugares diferentes pareceriam o mesmo evento.`,
      rightBody: `\`\`\`python
snippet:gpt2_manual/embedding-sum
\`\`\``,
      codeExplanations: [
        { lineRange: [1, 5], content: 'Os IDs entram como sequência e as posições são geradas a partir do comprimento dela.' },
        { lineRange: [7, 8], content: 'As duas embeddings têm papéis diferentes e são treinadas separadamente.' },
        { lineRange: [10, 11], content: 'A soma final gera o residual stream inicial do modelo.' },
      ],
    },
    'en-us': {
      title: 'Token embedding + position embedding',
      body: `In the new repo, GPT input is born from exactly this sum:

- \`token_embedding(idx)\`
- \`position_embedding(positions)\`

Without position, identical tokens in different places would look like the same event.`,
      rightBody: `\`\`\`python
snippet:gpt2_manual/embedding-sum
\`\`\``,
      codeExplanations: [
        { lineRange: [1, 5], content: 'IDs enter as a sequence and positions are generated from its length.' },
        { lineRange: [7, 8], content: 'The two embeddings play different roles and are trained separately.' },
        { lineRange: [10, 11], content: 'The final sum becomes the model’s initial residual stream.' },
      ],
    },
  },
});

