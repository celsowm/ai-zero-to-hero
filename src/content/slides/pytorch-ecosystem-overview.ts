import { defineSlide } from './_factory';

export const pytorchEcosystemOverview = defineSlide({
  id: 'pytorch-ecosystem-overview',
  type: 'two-column',
  options: { columnRatios: [0.38, 0.62] },
  content: {
    'pt-br': {
      title: 'Mapa mental do ecossistema PyTorch',
      body: `O objetivo aqui é estrutural: enxergar o ecossistema antes de aprofundar em camadas e treino.

1. **\`torch\` é o núcleo numérico.** Ele concentra tensores, shapes, dtypes, device e operações matemáticas.
2. **\`torch.nn\` monta a arquitetura.** Aqui entram \`Module\`, \`Linear\`, \`Sequential\`, perdas e blocos reutilizáveis.
3. **\`torch.optim\` atualiza parâmetros.** Ele não inventa a rede: só aplica o passo de otimização depois do \`backward()\`.
4. **\`torch.utils.data\` organiza a entrada.** Dataset, sampler, dataloader e batch ficam separados do loop de treino.
5. **\`torch.cuda\` decide onde roda.** O mesmo tensor pode estar na CPU ou na GPU, mas tudo precisa concordar no mesmo device.

> Leia o diagrama como um mapa de responsabilidades. Se o bug é de shape/device, comece no núcleo. Se é de arquitetura, vá para \`torch.nn\`. O próximo passo é fechar o significado de "tensor" nesse contexto.`,
    },
    'en-us': {
      title: 'PyTorch ecosystem mental map',
      body: `The goal here is structural: see the ecosystem before diving into layers and training.

1. **\`torch\` is the numeric core.** It owns tensors, shapes, dtypes, device placement, and math operations.
2. **\`torch.nn\` builds the architecture.** This is where \`Module\`, \`Linear\`, \`Sequential\`, losses, and reusable blocks live.
3. **\`torch.optim\` updates parameters.** It does not invent the network: it only applies the optimization step after \`backward()\`.
4. **\`torch.utils.data\` organizes input.** Dataset, sampler, dataloader, and batching stay separate from the training loop.
5. **\`torch.cuda\` decides where it runs.** The same tensor can live on CPU or GPU, but every part must agree on the same device.

> Read the diagram as a responsibility map. If the bug is shape/device related, start at the core. If it is architecture related, move to \`torch.nn\`. The next step is to define what "tensor" means in this context.`,
    },
  },
  visual: {
    id: 'pytorch-ecosystem-mermaid',
    copy: {
      'pt-br': {
        title: 'Arquitetura de módulos do ecossistema PyTorch',
        subtitle: 'Núcleo `torch` no centro e módulos especializados ao redor. Cada bloco responde por um tipo de problema.',
        mermaidSource: `flowchart LR
  T["torch\\n(core tensor + ops)"]
  NN["torch.nn\\nmodelagem de camadas"]
  NNM["nn.Module\\nbloco reutilizável"]
  OPT["torch.optim\\natualização de parâmetros"]
  DATA["torch.utils.data\\ndataset + batching"]
  CUDA["torch.cuda\\nexecução em GPU"]

  T --> NN
  NN --> NNM
  T --> OPT
  T --> DATA
  T --> CUDA`,
        legendTitle: 'Legenda operacional',
        legend: [
          { module: 'torch', role: 'Tensor, dtype, shape e device; a base que todo o resto pressupõe.' },
          { module: 'torch.nn', role: 'Arquitetura de modelos: módulos, camadas, parâmetros e forward.' },
          { module: 'nn.Module', role: 'Bloco composável que agrupa pesos, submódulos e a lógica do forward.' },
          { module: 'torch.optim', role: 'Atualização dos parâmetros depois do gradiente; não sabe nada sobre dados.' },
          { module: 'torch.utils.data', role: 'Dataset, sampler, dataloader e batch; separa ingestão de dados do treino.' },
          { module: 'torch.cuda', role: 'Execução em GPU e movimentação de tensores; device mismatch aqui vira erro.' },
        ],
        footer: 'Proxima etapa: antes de ler ranks e shapes, fixar o que "tensor" significa no PyTorch.',
      },
      'en-us': {
        title: 'PyTorch ecosystem module architecture',
        subtitle: 'Core `torch` in the center with specialized modules around it. Each block owns a different class of problem.',
        mermaidSource: `flowchart LR
  T["torch\\n(core tensor + ops)"]
  NN["torch.nn\\nlayer modeling"]
  NNM["nn.Module\\nreusable block"]
  OPT["torch.optim\\nparameter updates"]
  DATA["torch.utils.data\\ndataset + batching"]
  CUDA["torch.cuda\\nGPU execution"]

  T --> NN
  NN --> NNM
  T --> OPT
  T --> DATA
  T --> CUDA`,
        legendTitle: 'Operational legend',
        legend: [
          { module: 'torch', role: 'Tensor, dtype, shape, and device; the base every other piece assumes.' },
          { module: 'torch.nn', role: 'Model architecture: modules, layers, parameters, and forward logic.' },
          { module: 'nn.Module', role: 'Composable block that groups weights, submodules, and forward behavior.' },
          { module: 'torch.optim', role: 'Parameter updates after gradients; it does not know about your data pipeline.' },
          { module: 'torch.utils.data', role: 'Dataset, sampler, dataloader, and batching; keeps input separate from training.' },
          { module: 'torch.cuda', role: 'GPU execution and tensor movement; device mismatches show up here fast.' },
        ],
        footer: 'Next step: before reading ranks and shapes, fix what "tensor" means in PyTorch.',
      },
    },
  },
});
