import { defineSlide } from './_factory';

export const repoGpt2GenerateCheckpoint = defineSlide({
  id: 'repo-gpt2-generate-checkpoint',
  type: 'two-column',
  options: { columnRatios: [0.5, 0.5] },
  content: {
    'pt-br': {
      title: 'Prática: gerar com checkpoint',
      body: `Fechamos o fluxo usando um checkpoint treinado para gerar texto.

\`\`\`bash
python scripts/generate.py --model examples/tiny-overfit --prompt "ana viu"
\`\`\`

É aqui que o pipeline todo se fecha:

- tokenizer
- modelo
- checkpoint
- loop autoregressivo
- texto final

Interpretacao do resultado:
- se o texto ignora o prompt, revisar tokenizer/checkpoint compativeis
- se degrada muito rapido, revisar temperatura/top-k e qualidade do treino
- se o loop quebra por contexto, revisar \`block_size\` e truncamento`,
      rightBody: `\`\`\`python
snippet:gpt2_manual/generate-checkpoint
\`\`\``,
      codeExplanations: [
        { lineRange: [1, 5], content: 'O carregamento encapsula pesos, tokenizer e device em uma interface de inferência.' },
        { lineRange: [7, 12], content: 'A chamada `generate` aplica os parâmetros de sampling e devolve texto pronto.' },
      ],
    },
    'en-us': {
      title: 'Practice: generate from a checkpoint',
      body: `We close the flow by using a trained checkpoint to generate text.

\`\`\`bash
python scripts/generate.py --model examples/tiny-overfit --prompt "Once upon a time"
\`\`\`

This is where the whole pipeline closes:

- tokenizer
- model
- checkpoint
- autoregressive loop
- final text

How to read the result:
- if output ignores the prompt, verify tokenizer/checkpoint compatibility
- if quality degrades too fast, tune temperature/top-k and training quality
- if the loop breaks on context size, review \`block_size\` and truncation`,
      rightBody: `\`\`\`python
snippet:gpt2_manual/generate-checkpoint
\`\`\``,
      codeExplanations: [
        { lineRange: [1, 5], content: 'Loading wraps weights, tokenizer, and device inside one inference interface.' },
        { lineRange: [7, 12], content: 'The `generate` call applies sampling parameters and returns ready-made text.' },
      ],
    },
  },
});

