import { defineSlide } from './_factory';

export const pytorchEcosystemOverview = defineSlide({
  id: 'pytorch-ecosystem-overview',
  type: 'two-column',
  options: { columnRatios: [0.58, 0.42] },
  content: {
    'pt-br': {
      title: 'Mapa mental do ecossistema PyTorch',
      body: `O objetivo aqui é estrutural: enxergar o ecossistema antes de aprofundar em camadas e treino.

- \`torch\` é o núcleo numérico.
- os módulos ao redor especializam responsabilidades.
- essa separação evita debug aleatório quando algo falha.

Leia o diagrama como um mapa de responsabilidades, não como sequência temporal.`,
    },
    'en-us': {
      title: 'PyTorch ecosystem mental map',
      body: `The goal here is structural: see the ecosystem before diving into layers and training.

- \`torch\` is the numeric core.
- surrounding modules specialize responsibilities.
- this split prevents random debugging when something breaks.

Read the diagram as a responsibility map, not as a time sequence.`,
    },
  },
  visual: {
    id: 'pytorch-ecosystem-mermaid',
    copy: {
      'pt-br': {
        title: 'Arquitetura de módulos do ecossistema PyTorch',
        subtitle: 'Núcleo `torch` no centro e módulos especializados ao redor.',
        mermaidSource: `flowchart LR
  T["torch\\n(core tensor + ops)"]
  NN["torch.nn\\nmodelagem de camadas"]
  OPT["torch.optim\\natualização de parâmetros"]
  DATA["torch.utils.data\\ndataset + batching"]
  CUDA["torch.cuda\\nexecução em GPU"]

  T --> NN
  T --> OPT
  T --> DATA
  T --> CUDA`,
        legendTitle: 'Legenda operacional',
        legend: [
          { module: 'torch', role: 'Tensor, dtype, shape e device. Base de operações numéricas.' },
          { module: 'torch.nn', role: 'Definição de arquitetura: módulos, camadas, parâmetros e forward.' },
          { module: 'torch.optim', role: 'Aplicação de update nos parâmetros a partir dos gradientes.' },
          { module: 'torch.utils.data', role: 'Construção de pipeline de dados: dataset, sampler, dataloader, batch.' },
          { module: 'torch.cuda', role: 'Movimentação e execução de tensores/modelos em acelerador NVIDIA.' },
        ],
        footer: 'Próxima etapa do curso: sair do mapa estrutural e entrar no contrato de tensores e shapes.',
      },
      'en-us': {
        title: 'PyTorch ecosystem module architecture',
        subtitle: 'Core `torch` in the center with specialized modules around it.',
        mermaidSource: `flowchart LR
  T["torch\\n(core tensor + ops)"]
  NN["torch.nn\\nlayer modeling"]
  OPT["torch.optim\\nparameter updates"]
  DATA["torch.utils.data\\ndataset + batching"]
  CUDA["torch.cuda\\nGPU execution"]

  T --> NN
  T --> OPT
  T --> DATA
  T --> CUDA`,
        legendTitle: 'Operational legend',
        legend: [
          { module: 'torch', role: 'Tensor, dtype, shape, and device. Numeric operation foundation.' },
          { module: 'torch.nn', role: 'Architecture definition: modules, layers, parameters, and forward logic.' },
          { module: 'torch.optim', role: 'Parameter updates driven by computed gradients.' },
          { module: 'torch.utils.data', role: 'Data pipeline construction: dataset, sampler, dataloader, batch.' },
          { module: 'torch.cuda', role: 'Tensor/model movement and execution on NVIDIA accelerator.' },
        ],
        footer: 'Next step in the course: move from structural map into tensor and shape contracts.',
      },
    },
  },
});
