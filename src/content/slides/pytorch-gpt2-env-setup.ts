import { defineSlide } from './_factory';

export const pytorchGpt2EnvSetup = defineSlide({
  id: 'pytorch-gpt2-env-setup',
  type: 'two-column',
  options: { columnRatios: [0.48, 0.52] },
  content: {
    'pt-br': {
      title: 'Ambiente e reprodutibilidade',
      body: `Antes do treino, o projeto precisa saber onde vai rodar e como reduzir variação entre execuções.

O \`device.py\` concentra a escolha de hardware: CUDA, MPS ou CPU. Assim o restante do código não precisa repetir essa decisão.

O \`seed.py\` fixa as sementes de aleatoriedade. Isso não torna todo treino perfeitamente determinístico em qualquer GPU, mas deixa os experimentos comparáveis.`,
      rightBody: `\`\`\`python
snippet:pytorch_gpt2/env-device
\`\`\`

\`\`\`python
snippet:pytorch_gpt2/env-seed
\`\`\``,
      codeExplanations: [],
    },
    'en-us': {
      title: 'Environment and reproducibility',
      body: `Before training, the project needs to know where it will run and how to reduce variation between runs.

\`device.py\` centralizes hardware selection: CUDA, MPS, or CPU. The rest of the code does not repeat this decision.

\`seed.py\` fixes randomness seeds. This does not make every training run perfectly deterministic on any GPU, but it makes experiments comparable.`,
      rightBody: `\`\`\`python
snippet:pytorch_gpt2/env-device
\`\`\`

\`\`\`python
snippet:pytorch_gpt2/env-seed
\`\`\``,
      codeExplanations: [],
    },
  },
});
