import { defineSlide } from './_factory';

export const gpt2FromScratchRepoMap = defineSlide({
  id: 'gpt2-from-scratch-repo-map',
  type: 'two-column',
  options: { columnRatios: [0.52, 0.48] },
  content: {
    'pt-br': {
      title: 'Mapa do repo `pytorch-gpt2-from-scratch`',
      body: `A prática agora passa a seguir um repo concreto.

Leitura mental do projeto:

1. **\`src/pytorch_gpt2/model\`**: arquitetura do GPT
2. **\`src/pytorch_gpt2/train\`**: trainer, optimizer, checkpoint
3. **\`src/pytorch_gpt2/infer\`**: geração e carregamento
4. **\`scripts/\`**: smoke tests, overfit e treino real
5. **\`configs/\`**: tamanhos do modelo e opções de treino

O objetivo do bloco nao e decorar a arvore inteira. E saber **onde olhar** quando o fluxo sair do slide e virar codigo real.

Roteiro de leitura recomendado:
1. rode \`scripts/smoke_forward.py\`
2. abra implementacao do modelo em \`src/pytorch_gpt2/model\`
3. abra treino em \`src/pytorch_gpt2/train\`
4. feche o ciclo em \`scripts/generate.py\``,
      rightBody: '```txt\nconfigs/\n  model/\n    gpt2-debug.yaml\n  train/\n    debug.yaml\nscripts/\n  smoke_forward.py\n  overfit_tiny_text.py\n  train.py\n  generate.py\nsrc/pytorch_gpt2/\n  model/\n  train/\n  infer/\n```',
    },
    'en-us': {
      title: 'Map of the `pytorch-gpt2-from-scratch` repo',
      body: `The practical part now follows one concrete repo.

Mental map of the project:

1. **\`src/pytorch_gpt2/model\`**: GPT architecture
2. **\`src/pytorch_gpt2/train\`**: trainer, optimizer, checkpoint
3. **\`src/pytorch_gpt2/infer\`**: generation and loading
4. **\`scripts/\`**: smoke tests, overfit, and real training
5. **\`configs/\`**: model sizes and training options

The point of this slide is not to memorize the whole tree. It is to know **where to look** once the flow leaves the slide and becomes real code.

Recommended reading order:
1. run \`scripts/smoke_forward.py\`
2. open model implementation in \`src/pytorch_gpt2/model\`
3. open training flow in \`src/pytorch_gpt2/train\`
4. close the loop in \`scripts/generate.py\``,
      rightBody: '```txt\nconfigs/\n  model/\n    gpt2-debug.yaml\n  train/\n    debug.yaml\nscripts/\n  smoke_forward.py\n  overfit_tiny_text.py\n  train.py\n  generate.py\nsrc/pytorch_gpt2/\n  model/\n  train/\n  infer/\n```',
    },
  },
});
