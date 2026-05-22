import { defineSlide } from './_factory';

export const repoGpt2SmokeForward = defineSlide({
  id: 'repo-gpt2-smoke-forward',
  type: 'two-column',
  options: { columnRatios: [0.5, 0.5] },
  content: {
    'pt-br': {
      title: 'Prática: smoke forward',
      body: `Primeiro sanity check: o modelo constrói, roda forward e devolve shapes coerentes.

\`\`\`bash
python scripts/smoke_forward.py
\`\`\`

O que queremos ver:

- logits com shape \`(B, T, V)\`
- uma loss numérica
- contagem plausível de parâmetros

Diagnostico rapido:
- se shape falhar, o erro costuma estar em embedding/projeção
- se loss vier \`nan\`, revisar inicialização, dtype e targets
- se parametros estiverem absurdos, revisar config \`n_layer/n_head/n_embd\``,
      rightBody: `\`\`\`python
snippet:repo-gpt2/smoke-forward
\`\`\``,
      codeExplanations: [
        { lineRange: [1, 3], content: 'O script começa com uma configuração debug pequena para rodar rápido.' },
        { lineRange: [4, 4], content: 'O batch sintético já nasce com o shape esperado pelo forward.' },
        { lineRange: [5, 8], content: 'Se logits, loss e número de parâmetros saem coerentes, a montagem básica está viva.' },
      ],
    },
    'en-us': {
      title: 'Practice: smoke forward',
      body: `First sanity check: the model builds, runs a forward pass, and returns coherent shapes.

\`\`\`bash
python scripts/smoke_forward.py
\`\`\`

What we want to see:

- logits shaped \`(B, T, V)\`
- a numeric loss
- a plausible parameter count

Quick diagnostics:
- if shapes fail, the bug is usually in embedding/projection wiring
- if loss is \`nan\`, check init, dtype, and targets
- if parameter count is absurd, check \`n_layer/n_head/n_embd\` config`,
      rightBody: `\`\`\`python
snippet:repo-gpt2/smoke-forward
\`\`\``,
      codeExplanations: [
        { lineRange: [1, 3], content: 'The script starts with a tiny debug config so the check stays fast.' },
        { lineRange: [4, 4], content: 'The synthetic batch already matches the shape expected by the forward pass.' },
        { lineRange: [5, 8], content: 'If logits, loss, and parameter count look coherent, the basic assembly is alive.' },
      ],
    },
  },
});
