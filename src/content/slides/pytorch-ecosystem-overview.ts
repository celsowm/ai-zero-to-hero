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
        legendTitle: 'Inspector de responsabilidades',
        legend: [
          { module: 'torch', role: 'Responsabilidade: Base numérica do runtime: tensor, dtype, shape, stride e operações vetoriais.\nLimite: Não define arquitetura de modelo nem política de treino; entrega primitivas para os outros módulos.\nAPIs: torch.tensor(...), torch.matmul(...).' },
          { module: 'torch.nn', role: 'Responsabilidade: Camada declarativa para montar blocos de rede, camadas e funções de perda.\nLimite: Não executa passo de otimização; descreve estrutura e computação do forward.\nAPIs: nn.Linear(...), nn.CrossEntropyLoss(...).' },
          { module: 'nn.Module', role: 'Responsabilidade: Contrato estrutural de um modelo: parâmetros registrados, submódulos e método forward().\nLimite: Não escolhe algoritmo de update nem origem dos dados; organiza estado e composição.\nAPIs: class MyModel(nn.Module), model.parameters().' },
          { module: 'torch.optim', role: 'Responsabilidade: Aplicar regra de atualização sobre gradientes para mover parâmetros no espaço de solução.\nLimite: Não calcula gradiente por conta própria e não define arquitetura.\nAPIs: torch.optim.AdamW(...), optimizer.step().' },
          { module: 'torch.utils.data', role: 'Responsabilidade: Pipeline de leitura e batching com fronteira clara entre armazenamento e iteração.\nLimite: Não treina modelo nem define regra de gradiente; apenas entrega lotes consistentes.\nAPIs: Dataset, DataLoader(...).' },
          { module: 'torch.cuda', role: 'Responsabilidade: Superfície de execução em GPU, alocação de device e operações associadas ao backend CUDA.\nLimite: Não substitui design de modelo ou loop de treino; apenas controla contexto de hardware.\nAPIs: torch.cuda.is_available(), tensor.to(\"cuda\").' },
        ],
        footer: 'Próxima etapa: antes de ler ranks e shapes, fixar o que "tensor" significa no PyTorch.',
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
        legendTitle: 'Responsibility inspector',
        legend: [
          { module: 'torch', role: 'Responsibility: Numerical runtime foundation for tensors, dtypes, shapes, strides, and vectorized math.\nBoundary: Does not define model architecture or training policy; provides primitives for higher-level modules.\nAPI Anchors: torch.tensor(...), torch.matmul(...).' },
          { module: 'torch.nn', role: 'Responsibility: Declarative layer to compose network blocks, layers, and loss functions.\nBoundary: Does not perform optimizer updates; it defines structure and forward computation.\nAPI Anchors: nn.Linear(...), nn.CrossEntropyLoss(...).' },
          { module: 'nn.Module', role: 'Responsibility: Structural contract of a model: registered parameters, submodules, and forward().\nBoundary: Does not choose update algorithms or data sources; it organizes model state and composition.\nAPI Anchors: class MyModel(nn.Module), model.parameters().' },
          { module: 'torch.optim', role: 'Responsibility: Applies update rules over gradients to move parameters through solution space.\nBoundary: Does not compute gradients by itself and does not define architecture.\nAPI Anchors: torch.optim.AdamW(...), optimizer.step().' },
          { module: 'torch.utils.data', role: 'Responsibility: Data access and batching pipeline with a clean boundary between storage and iteration.\nBoundary: Does not train the model or define gradient rules; it delivers consistent batches.\nAPI Anchors: Dataset, DataLoader(...).' },
          { module: 'torch.cuda', role: 'Responsibility: GPU execution surface, device placement, and CUDA runtime access.\nBoundary: Does not replace model design or training-loop logic; it controls hardware context.\nAPI Anchors: torch.cuda.is_available(), tensor.to(\"cuda\").' },
        ],
        footer: 'Next step: before reading ranks and shapes, fix what "tensor" means in PyTorch.',
      },
    },
  },
});
