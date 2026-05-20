import { defineSlide } from './_factory';

export const pytorchEcosystemOverview = defineSlide({
  id: 'pytorch-ecosystem-overview',
  type: 'two-column',
  options: { columnRatios: [0.58, 0.42] },
  content: {
    'pt-br': {
      title: 'Mapa mental do ecossistema PyTorch',
      body: `Antes de cair em \`nn.Linear\`, vale enxergar o mapa geral para não parecer que cada recurso surge do nada.

\`torch\` é o núcleo de tensores e operações numéricas. Em cima dele, os módulos mais usados neste bloco são:

1. \`torch\`: cria tensores, controla \`dtype\`, \`shape\` e \`device\`.
2. \`torch.nn\`: declara camadas e modelos (\`Linear\`, \`Embedding\`, ativações).
3. \`torch.optim\`: atualiza parâmetros com gradiente (\`SGD\`, \`AdamW\`).
4. \`torch.utils.data\`: organiza dataset e batch para treino.
5. \`torch.cuda\`: move computação para GPU quando disponível.

Por que isso importa no curso:
- você vai ler código por contratos (shape, loss, gradiente, update), não por mágica;
- o \`pt\` de \`return_tensors="pt"\` aponta para esse ecossistema inteiro;
- quando aparecer bug, você sabe em qual módulo depurar primeiro.`,
      rightBody: `### Fluxo operacional
\`texto -> token IDs -> torch.Tensor -> nn.Module -> loss.backward() -> optimizer.step()\`

### Regra de orientação
- **shape/dtype/device**: comece em \`torch\`
- **arquitetura**: olhe \`torch.nn\`
- **treino**: valide \`autograd + torch.optim\`
- **entrada de dados**: confirme \`torch.utils.data\`

### Ponte para os próximos slides
Agora vamos entrar no contrato de tensores e shapes que sustenta todo esse fluxo.`,
    },
    'en-us': {
      title: 'PyTorch ecosystem mental map',
      body: `Before diving into \`nn.Linear\`, it helps to see the full map so each feature does not feel random.

\`torch\` is the tensor and numeric core. On top of it, the main modules in this block are:

1. \`torch\`: creates tensors and controls \`dtype\`, \`shape\`, and \`device\`.
2. \`torch.nn\`: declares layers and models (\`Linear\`, \`Embedding\`, activations).
3. \`torch.optim\`: updates parameters from gradients (\`SGD\`, \`AdamW\`).
4. \`torch.utils.data\`: organizes dataset and batching for training.
5. \`torch.cuda\`: moves compute to GPU when available.

Why this matters in the course:
- you will read code through contracts (shape, loss, gradient, update), not magic;
- the \`pt\` in \`return_tensors="pt"\` points to this full ecosystem;
- when bugs appear, you know which module to inspect first.`,
      rightBody: `### Operational flow
\`text -> token IDs -> torch.Tensor -> nn.Module -> loss.backward() -> optimizer.step()\`

### Navigation rule
- **shape/dtype/device**: start in \`torch\`
- **architecture**: inspect \`torch.nn\`
- **training**: validate \`autograd + torch.optim\`
- **data input**: verify \`torch.utils.data\`

### Bridge to the next slides
Now we enter the tensor and shape contracts that support this whole flow.`,
    },
  },
});

