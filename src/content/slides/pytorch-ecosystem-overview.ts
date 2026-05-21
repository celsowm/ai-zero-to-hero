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
          { module: 'torch', role: 'Núcleo de tensores, shapes, dtypes e device. Operações como torch.add, torch.matmul e torch.randn moram aqui. Quando o bug é "shape mismatch" ou "expected float, got long", a causa está neste módulo.' },
          { module: 'torch.nn', role: 'Construção de arquiteturas: Linear, Embedding, Transformer, losses (CrossEntropyLoss). Quando você vê model = nn.Sequential(...) ou class MyModel(nn.Module), está usando este módulo.' },
          { module: 'nn.Module', role: 'Classe base que todo modelo herda. Agrupa parâmetros (nn.Parameter), submódulos e define a interface forward(). Quando você chama model(parameters()) para o optimizer, está consumindo esse contrato.' },
          { module: 'torch.optim', role: 'Otimizadores (SGD, Adam) e estratégias de atualização de parâmetros. Só existe depois do backward() e é configurado com model.parameters(). Quando o loss não desce, o problema está aqui ou no learning rate.' },
          { module: 'torch.utils.data', role: 'Pipeline de ingestão: Dataset (acesso indexado), DataLoader (iteração com batch), Sampler (ordem de iteração). Separa dados do treino — se o dataset está vazio ou o batch está errado, o bug aparece aqui.' },
          { module: 'torch.cuda', role: 'Gerenciamento de GPU: .to("cuda"), .cuda(), torch.cuda.is_available(). Erro clássico: "expected tensor on cuda, got cuda:1" — todos os tensores precisam estar no mesmo device antes de operar.' },
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
          { module: 'torch', role: 'Core tensor engine: shapes, dtypes, device placement. Operations like torch.add, torch.matmul, and torch.randn live here. When the bug is "shape mismatch" or "expected float, got long", the root cause is this module.' },
          { module: 'torch.nn', role: 'Architecture building blocks: Linear, Embedding, Transformer, losses (CrossEntropyLoss). When you see model = nn.Sequential(...) or class MyModel(nn.Module), you are using this module.' },
          { module: 'nn.Module', role: 'Base class every model inherits from. Groups parameters (nn.Parameter), submodules, and defines the forward() interface. When you pass model.parameters() to the optimizer, this is the contract you depend on.' },
          { module: 'torch.optim', role: 'Optimizers (SGD, Adam) and parameter update strategies. Only exists after backward() and is configured with model.parameters(). When the loss does not decrease, the problem is here or in the learning rate.' },
          { module: 'torch.utils.data', role: 'Input pipeline: Dataset (indexed access), DataLoader (batched iteration), Sampler (iteration order). Keeps data separate from training — if the dataset is empty or the batch is wrong, the bug surfaces here.' },
          { module: 'torch.cuda', role: 'GPU management: .to("cuda"), .cuda(), torch.cuda.is_available(). Classic error: "expected tensor on cuda, got cuda:1" — all tensors must be on the same device before any operation.' },
        ],
        footer: 'Next step: before reading ranks and shapes, fix what "tensor" means in PyTorch.',
      },
    },
  },
});
