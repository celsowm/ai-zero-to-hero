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
            source: { snippetId: 'pytorch_gpt2/env-device' },
            codeExplanations: [
              { lineRange: [1, 7], content: 'Import da `torch` e comentário do arquivo. O `from __future__ import annotations` permite usar sintaxe de tipos moderna sem imports de `typing`.' },
              { lineRange: [8, 15], content: '`get_device()` verifica hardware: CUDA (NVIDIA), MPS (Apple Silicon), CPU como fallback. Centraliza a descoberta de device.' },
              { lineRange: [18, 28], content: '`autocast_dtype()` traduz strings (`"bf16"`, `"fp16"`, `"no"`) para dtype PyTorch. BF16 tem maior range dinâmico que FP16, evitando overflow em gradientes grandes.' },
            ],
          },
          {
            title: 'seed_everything',
            description: 'Fixa sementes para reprodutibilidade em três geradores.',
            source: { snippetId: 'pytorch_gpt2/env-seed' },
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
            source: { snippetId: 'pytorch_gpt2/env-device' },
            codeExplanations: [
              { lineRange: [1, 7], content: 'Imports `torch` and the file path comment. `from __future__ import annotations` enables modern type syntax without `typing` imports.' },
              { lineRange: [8, 15], content: '`get_device()` checks hardware: CUDA (NVIDIA), MPS (Apple Silicon), CPU as fallback. Centralizes device discovery.' },
              { lineRange: [18, 28], content: '`autocast_dtype()` translates strings (`"bf16"`, `"fp16"`, `"no"`) to PyTorch dtype. BF16 has larger dynamic range than FP16.' },
            ],
          },
          {
            title: 'seed_everything',
            description: 'Fixes seeds for reproducibility across three generators.',
            source: { snippetId: 'pytorch_gpt2/env-seed' },
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
