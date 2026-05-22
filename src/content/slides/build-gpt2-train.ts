import { defineSlide } from './_factory';

export const buildGpt2Train = defineSlide({
  id: 'build-gpt2-train',
  type: 'two-column',
  options: {
    columnRatios: [0.45, 0.55],
  },
  content: {
    'pt-br': {
      title: 'Passo 2: Loop de treino',
      body: `Com arquitetura pronta, treinamos um GPT pequeno em corpus curto para validar o ciclo inteiro.

Fluxo de cada passo:

1. montar batch \`x, y\` com deslocamento de 1 token
2. rodar \`model(x, y)\`
3. zerar gradiente
4. \`backward\` + clip de gradiente
5. \`optimizer.step()\`

Sinais esperados:
- loss caindo ao longo dos passos
- perplexidade acompanhando a queda
- modelo memorizando padrões do corpus`,
      rightBody: `
\`\`\`python
snippet:build_gpt2/build-gpt2-train
\`\`\``,
      codeExplanations: [
        {
          lineRange: [1, 9],
          content: 'Inicializamos os imports, o ByteTokenizer e o corpus curto convertido para IDs.',
        },
        {
          lineRange: [11, 19],
          content: 'Definimos `ModelConfig` e instanciamos GPT + AdamW, igual ao fluxo usado no projeto real.',
        },
        {
          lineRange: [20, 31],
          content: 'O loop aplica `forward -> loss -> zero_grad -> backward -> clip -> step` e imprime loss/perplexidade.',
        },
      ],
    },
    'en-us': {
      title: 'Step 2: Training loop',
      body: `With architecture ready, we train a small GPT on a short corpus to validate the full cycle.

Per-step flow:

1. build shifted \`x, y\` batch
2. run \`model(x, y)\`
3. zero gradients
4. \`backward\` + gradient clipping
5. \`optimizer.step()\`

Expected signs:
- loss trending down across steps
- perplexity following the drop
- model memorizing corpus patterns`,
      rightBody: `
\`\`\`python
snippet:build_gpt2/build-gpt2-train
\`\`\``,
      codeExplanations: [
        {
          lineRange: [1, 9],
          content: 'We initialize imports, ByteTokenizer, and the short corpus converted into token IDs.',
        },
        {
          lineRange: [11, 19],
          content: 'We define `ModelConfig` and instantiate GPT + AdamW, matching the real project flow.',
        },
        {
          lineRange: [20, 31],
          content: 'Loop applies `forward -> loss -> zero_grad -> backward -> clip -> step` and prints loss/perplexity.',
        },
      ],
    },
  },
});

