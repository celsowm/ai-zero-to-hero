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
    },
    'en-us': {
      title: 'Environment and reproducibility',
      body: `Before training, the project needs to know where it will run and how to reduce variation between runs.

\`device.py\` centralizes hardware selection: CUDA, MPS, or CPU. The rest of the code does not repeat this decision.

\`seed.py\` fixes randomness seeds. This does not make every training run perfectly deterministic on any GPU, but it makes experiments comparable.`,
    },
  },
  visual: {
    id: 'pytorch-dual-code',
    copy: {
      'pt-br': {
        tabs: [
          { label: 'device.py' },
          { label: 'seed.py' },
        ],
        codePanels: [
          {
            title: 'get_device / autocast_dtype',
            description: 'Detecta hardware disponível e define o dtype para mixed precision.',
            source: { snippetId: 'pytorch_gpt2/env-device', language: 'python' },
            codeExplanations: [
              { lineRange: [1, 28], content: '`device.py`: `get_device()` detecta CUDA/MPS/CPU. `autocast_dtype()` converte string de mixed precision para dtype PyTorch.' },
            ],
          },
          {
            title: 'seed_everything',
            description: 'Fixa sementes para reprodutibilidade em três geradores.',
            source: { snippetId: 'pytorch_gpt2/env-seed', language: 'python' },
            codeExplanations: [
              { lineRange: [1, 8], content: 'Importa `random` (stdlib), `numpy` e `torch` — três geradores de números aleatórios que precisam de sementes sincronizadas.' },
              { lineRange: [11, 15], content: '`seed_everything()` fixa semente nos três geradores: `random.seed`, `np.random.seed`, `torch.manual_seed`. `torch.cuda.manual_seed_all` garante GPUs com mesma semente.' },
            ],
          },
        ],
      },
      'en-us': {
        tabs: [
          { label: 'device.py' },
          { label: 'seed.py' },
        ],
        codePanels: [
          {
            title: 'get_device / autocast_dtype',
            description: 'Detects available hardware and sets dtype for mixed precision.',
            source: { snippetId: 'pytorch_gpt2/env-device', language: 'python' },
            codeExplanations: [
              { lineRange: [1, 28], content: '`device.py`: `get_device()` detects CUDA/MPS/CPU. `autocast_dtype()` converts mixed precision string to PyTorch dtype.' },
            ],
          },
          {
            title: 'seed_everything',
            description: 'Fixes seeds for reproducibility across three generators.',
            source: { snippetId: 'pytorch_gpt2/env-seed', language: 'python' },
            codeExplanations: [
              { lineRange: [1, 8], content: 'Imports `random` (stdlib), `numpy`, and `torch` — three PRNGs that need synchronized seeds.' },
              { lineRange: [11, 15], content: '`seed_everything()` fixes the seed on all three: `random.seed`, `np.random.seed`, `torch.manual_seed`. `torch.cuda.manual_seed_all` ensures GPUs share the same seed.' },
            ],
          },
        ],
      },
    },
  },
});

