import { defineSlide } from './_factory';

export const repoGpt2TinyOverfit = defineSlide({
  id: 'repo-gpt2-tiny-overfit',
  type: 'two-column',
  options: { columnRatios: [0.5, 0.5] },
  content: {
    'pt-br': {
      title: 'Prática: tiny overfit',
      body: `Segundo sanity check: antes de treinar “de verdade”, o modelo precisa conseguir memorizar um corpus minúsculo.

\`\`\`bash
python scripts/overfit_tiny_text.py --steps 200 --prompt "ana"
\`\`\`

Sinais esperados:

- loss cai rápido
- perplexidade cai junto
- a geração final repete padrões do corpus

Se isso não acontecer, geralmente é um destes pontos:
- LR (learning rate) muito baixa/alta
- batch/contexto não batendo com o tamanho do corpus
- bug no shift de targets (\`x[:, :-1]\` vs \`x[:, 1:]\`)`,
      rightBody: `\`\`\`python
snippet:gpt2_manual/tiny-overfit
\`\`\``,
      codeExplanations: [
        { lineRange: [1, 3], content: 'O script usa um tokenizer simples e converte o corpus minúsculo para IDs.' },
        { lineRange: [5, 11], content: 'O loop é curto, mas já contém o treino real: batch, loss, backward, clip e step.' },
      ],
    },
    'en-us': {
      title: 'Practice: tiny overfit',
      body: `Second sanity check: before “real” training, the model must be able to memorize a tiny corpus.

\`\`\`bash
python scripts/overfit_tiny_text.py --steps 200 --prompt "ana"
\`\`\`

Expected signs:

- loss falls quickly
- perplexity falls with it
- the final sample repeats corpus patterns

If that does not happen, the usual causes are:
- LR (learning rate) too low/high
- batch or context not matching corpus size
- target-shift bug (\`x[:, :-1]\` vs \`x[:, 1:]\`)`,
      rightBody: `\`\`\`python
snippet:gpt2_manual/tiny-overfit
\`\`\``,
      codeExplanations: [
        { lineRange: [1, 3], content: 'The script uses a simple tokenizer and converts the tiny corpus into IDs.' },
        { lineRange: [5, 11], content: 'The loop is short, but it already contains the real training skeleton: batch, loss, backward, clipping, and step.' },
      ],
    },
  },
});

