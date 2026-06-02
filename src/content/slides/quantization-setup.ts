import { defineSlide } from './_factory';

export const quantizationSetup = defineSlide({
  id: 'quantization-setup',
  type: 'two-column',
  options: { columnRatios: [0.5, 0.5] },
  content: {
    'pt-br': {
      title: 'Setup: o que você precisa instalar',
      body: `Para quantizar modelos em INT8 e NF4, precisamos de **três bibliotecas** além do PyTorch base.

1. **transformers** (≥ 4.40): carrega o modelo e expõe \`BitsAndBytesConfig\`. É o ponto de entrada — você nunca chama bitsandbytes diretamente.

2. **bitsandbytes** (≥ 0.43): contém os kernels CUDA de quantização. Não é um wrapper — ela implementa operações de baixa precisão na GPU. Sem ela, INT8 e NF4 não rodam.

3. **accelerate** (≥ 0.27): gerencia \`device_map="auto"\`, que distribui as camadas do modelo entre GPU e CPU automaticamente. Necessário para qualquer modelo que não caiba completamente na GPU.

\`\`\`bash
pip install transformers>=4.40 bitsandbytes>=0.43 accelerate>=0.27
\`\`\`

> Verifique sempre: \`torch.cuda.is_available()\` e \`bnb.__version__\` antes de rodar quantização. Se o bitsandbytes não encontrar CUDA, ele cai em modo CPU silenciosamente.`,
    },
    'en-us': {
      title: 'Setup: what you need to install',
      body: `To quantize models in INT8 and NF4, we need **three libraries** on top of base PyTorch.

1. **transformers** (≥ 4.40): loads the model and exposes \`BitsAndBytesConfig\`. It's the entry point — you never call bitsandbytes directly.

2. **bitsandbytes** (≥ 0.43): contains the CUDA kernels for quantization. It's not a wrapper — it implements low-precision GPU operations. Without it, INT8 and NF4 won't run.

3. **accelerate** (≥ 0.27): manages \`device_map="auto"\`, which distributes model layers between GPU and CPU automatically. Required for any model that doesn't fully fit on the GPU.

\`\`\`bash
pip install transformers>=4.40 bitsandbytes>=0.43 accelerate>=0.27
\`\`\`

> Always verify: \`torch.cuda.is_available()\` and \`bnb.__version__\` before running quantization. If bitsandbytes can't find CUDA, it silently falls back to CPU mode.`,
    },
  },
  visual: {
    id: 'quantization-setup',
    copy: {
      'pt-br': {
        title: 'Requisitos por formato',
        subtitle: 'O que cada formato precisa para rodar',
        formats: [
          {
            name: 'FP32',
            bytes: 4,
            vram7b: 28,
            requires: ['PyTorch', 'transformers'],
            note: 'Padrão — sem instalação extra',
          },
          {
            name: 'FP16',
            bytes: 2,
            vram7b: 14,
            requires: ['PyTorch', 'transformers'],
            note: 'torch_dtype=torch.float16',
          },
          {
            name: 'INT8',
            bytes: 1,
            vram7b: 7,
            requires: ['transformers', 'bitsandbytes', 'accelerate'],
            note: 'load_in_8bit=True',
          },
          {
            name: 'NF4',
            bytes: 0.5,
            vram7b: 4,
            requires: ['transformers', 'bitsandbytes', 'accelerate'],
            note: 'load_in_4bit=True + nf4',
          },
        ],
        bytesLabel: 'bytes/peso',
        vramLabel: 'VRAM (7B)',
        requiresLabel: 'Requer',
        gbUnit: 'GB',
        checklistTitle: 'Checklist de instalação',
        checks: [
          { label: 'torch.cuda.is_available()', ok: 'GPU detectada' },
          { label: 'import bitsandbytes as bnb', ok: 'kernels CUDA carregados' },
          { label: 'import accelerate', ok: 'device_map disponível' },
        ],
        tabs: [{ label: 'Visual' }, { label: 'Código' }],
        codePanel: {
          title: 'Verificar o ambiente de quantização',
          description: 'Confirma GPU, VRAM, versão do bitsandbytes e carrega um modelo baseline em FP32.',
          source: { snippetId: 'transformers/quantization-setup', language: 'python' },
          codeExplanations: [
            {
              lineRange: [1, 3],
              content: 'Os três pacotes essenciais: `transformers`, `bitsandbytes` e `accelerate`. Versões mínimas garantem compatibilidade com NF4.',
            },
            {
              lineRange: [4, 6],
              content: 'Importamos `torch` e `AutoModelForCausalLM` do `transformers`, a classe usada para carregar qualquer modelo causal.',
            },
            {
              lineRange: [7, 10],
              content: '`torch.cuda.is_available()` confirma GPU disponível. `total_memory` mostra a VRAM disponível para o modelo.',
            },
            {
              lineRange: [13, 16],
              content: 'Carregamos o modelo em FP32 para ter o baseline de memória. `get_memory_footprint()` retorna o consumo total em bytes.',
            },
            {
              lineRange: [18, 20],
              content: 'Importamos `bitsandbytes` e exibimos sua versão. Se este import falhar, INT8 e NF4 não vão funcionar — ponto de falha mais comum.',
            },
          ],
        },
      },
      'en-us': {
        title: 'Requirements per format',
        subtitle: 'What each format needs to run',
        formats: [
          {
            name: 'FP32',
            bytes: 4,
            vram7b: 28,
            requires: ['PyTorch', 'transformers'],
            note: 'Default — no extra install',
          },
          {
            name: 'FP16',
            bytes: 2,
            vram7b: 14,
            requires: ['PyTorch', 'transformers'],
            note: 'torch_dtype=torch.float16',
          },
          {
            name: 'INT8',
            bytes: 1,
            vram7b: 7,
            requires: ['transformers', 'bitsandbytes', 'accelerate'],
            note: 'load_in_8bit=True',
          },
          {
            name: 'NF4',
            bytes: 0.5,
            vram7b: 4,
            requires: ['transformers', 'bitsandbytes', 'accelerate'],
            note: 'load_in_4bit=True + nf4',
          },
        ],
        bytesLabel: 'bytes/weight',
        vramLabel: 'VRAM (7B)',
        requiresLabel: 'Requires',
        gbUnit: 'GB',
        checklistTitle: 'Install checklist',
        checks: [
          { label: 'torch.cuda.is_available()', ok: 'GPU detected' },
          { label: 'import bitsandbytes as bnb', ok: 'CUDA kernels loaded' },
          { label: 'import accelerate', ok: 'device_map available' },
        ],
        tabs: [{ label: 'Visual' }, { label: 'Code' }],
        codePanel: {
          title: 'Verify quantization environment',
          description: 'Confirms GPU, VRAM, bitsandbytes version, and loads a baseline FP32 model.',
          source: { snippetId: 'transformers/quantization-setup', language: 'python' },
          codeExplanations: [
            {
              lineRange: [1, 3],
              content: 'The three essential packages: `transformers`, `bitsandbytes`, and `accelerate`. Minimum versions ensure NF4 compatibility.',
            },
            {
              lineRange: [4, 6],
              content: 'We import `torch` and `AutoModelForCausalLM` from `transformers`, the class used to load any causal model.',
            },
            {
              lineRange: [7, 10],
              content: '`torch.cuda.is_available()` confirms GPU is available. `total_memory` shows the VRAM available for the model.',
            },
            {
              lineRange: [13, 16],
              content: 'We load the model in FP32 to get the memory baseline. `get_memory_footprint()` returns the total memory consumption in bytes.',
            },
            {
              lineRange: [18, 20],
              content: 'We import `bitsandbytes` and print its version. If this import fails, INT8 and NF4 will not work — the most common failure point.',
            },
          ],
        },
      },
    },
  },
});
