import { defineSlide } from './_factory';

export const bitsandbytesIntro = defineSlide({
  id: 'bitsandbytes-intro',
  type: 'two-column',
  options: { columnRatios: [0.5, 0.5] },
  content: {
    'pt-br': {
      title: 'bitsandbytes: os kernels por baixo da quantização',
      body: `Você já sabe que INT8 e NF4 precisam de bitsandbytes. Mas o que ela realmente faz?

1. **O problema:** multiplicar matrizes em INT8 ou 4 bits requer operações diferentes das FP32/FP16 padrão do PyTorch. A GPU tem unidades de hardware específicas para isso, mas PyTorch não as expõe diretamente.

2. **A solução:** bitsandbytes escreve kernels CUDA customizados que falam diretamente com as unidades INT8 da NVIDIA. Ela não é um wrapper — ela reimplementa a operação de multiplicação de matrizes (\`matmul\`) para baixa precisão.

3. **O que você usa:** você nunca importa bitsandbytes diretamente no código de inferência. Você configura via \`BitsAndBytesConfig\` do transformers e ela cuida do resto.

4. **O que ela oferece além da quantização:**
   - Otimizadores 8-bit (Adam, SGD) — reduz a memória dos estados do otimizador durante o treino.
   - Paginado (paged Adam) — evita OOM ao treinar com gradientes grandes.

> O contrato: você passa \`quantization_config\` pro \`from_pretrained\` e a bitsandbytes é invocada transparentemente pelo transformers.`,
    },
    'en-us': {
      title: 'bitsandbytes: the kernels beneath quantization',
      body: `You already know INT8 and NF4 need bitsandbytes. But what does it actually do?

1. **The problem:** multiplying matrices in INT8 or 4 bits requires different operations than PyTorch's standard FP32/FP16. The GPU has specific hardware units for this, but PyTorch doesn't expose them directly.

2. **The solution:** bitsandbytes writes custom CUDA kernels that talk directly to NVIDIA's INT8 units. It's not a wrapper — it reimplements the matrix multiplication (\`matmul\`) operation for low precision.

3. **What you use:** you never import bitsandbytes directly in inference code. You configure it via \`BitsAndBytesConfig\` from transformers and it handles the rest.

4. **What it offers beyond quantization:**
   - 8-bit optimizers (Adam, SGD) — reduces optimizer state memory during training.
   - Paged (paged Adam) — avoids OOM when training with large gradients.

> The contract: you pass \`quantization_config\` to \`from_pretrained\` and bitsandbytes is invoked transparently by transformers.`,
    },
  },
  visual: {
    id: 'bitsandbytes-intro',
    copy: {
      'pt-br': {
        title: 'Como as peças se encaixam',
        subtitle: 'Do seu código até os kernels CUDA',
        layers: [
          {
            label: 'Seu código',
            detail: 'from_pretrained(..., quantization_config=cfg)',
            color: 'cyan',
          },
          {
            label: 'transformers',
            detail: 'BitsAndBytesConfig → detecta INT8 ou NF4',
            color: 'cyan',
          },
          {
            label: 'bitsandbytes',
            detail: 'bnb.nn.Linear8bitLt / Linear4bit — matmul de baixa precisão',
            color: 'pink',
          },
          {
            label: 'Kernels CUDA',
            detail: 'Unidades INT8/INT4 da GPU NVIDIA',
            color: 'pink',
          },
        ],
        featuresTitle: 'O que bitsandbytes oferece',
        features: [
          {
            icon: '⚡',
            label: 'Inferência INT8',
            detail: 'llm.int8() — matmul 8-bit com detecção de outliers (próximo slide)',
          },
          {
            icon: '🎯',
            label: 'Inferência NF4',
            detail: 'QLoRA — 4 bits com níveis nos quantis de N(0,1)',
          },
          {
            icon: '🏋️',
            label: 'Otimizadores 8-bit',
            detail: 'Adam e SGD com estados do otimizador comprimidos',
          },
        ],
        contractTitle: 'O contrato da API',
        contractNote: 'Você configura — bitsandbytes executa. Zero boilerplate.',
        tabs: [{ label: 'Visual' }, { label: 'Código' }],
        codePanel: {
          title: 'Verificar e configurar bitsandbytes',
          description: 'Importa a lib, confirma versão e CUDA, e cria as configs INT8 e NF4.',
          source: { snippetId: 'transformers/bitsandbytes-intro', language: 'python' },
          codeExplanations: [
            {
              lineRange: [1, 2],
              content: 'Importamos `torch` e `bitsandbytes` para verificar se os kernels CUDA foram instalados corretamente.',
            },
            {
              lineRange: [4, 6],
              content: 'Verificamos a versão e a disponibilidade de CUDA. Se CUDA não estiver disponível, bitsandbytes roda em modo CPU (lento).',
            },
            {
              lineRange: [8, 12],
              content: 'As três capacidades da bitsandbytes: kernels INT8, kernels NF4 e otimizadores 8-bit para treino.',
            },
            {
              lineRange: [14, 15],
              content: '`BitsAndBytesConfig` é importada do `transformers`, não do `bnb`. Essa é a interface pública que você usa.',
            },
            {
              lineRange: [17, 25],
              content: 'As duas configs: INT8 para llm.int8() e NF4 para inferência eficiente. Ambas passadas via `quantization_config` ao `from_pretrained`.',
            },
            {
              lineRange: [27, 27],
              content: 'Confirmamos que as configs foram criadas sem erro. O modelo ainda não foi carregado — isso acontece no próximo passo.',
            },
          ],
        },
      },
      'en-us': {
        title: 'How the pieces fit together',
        subtitle: 'From your code to CUDA kernels',
        layers: [
          {
            label: 'Your code',
            detail: 'from_pretrained(..., quantization_config=cfg)',
            color: 'cyan',
          },
          {
            label: 'transformers',
            detail: 'BitsAndBytesConfig → detects INT8 or NF4',
            color: 'cyan',
          },
          {
            label: 'bitsandbytes',
            detail: 'bnb.nn.Linear8bitLt / Linear4bit — low-precision matmul',
            color: 'pink',
          },
          {
            label: 'CUDA kernels',
            detail: 'NVIDIA GPU INT8/INT4 units',
            color: 'pink',
          },
        ],
        featuresTitle: 'What bitsandbytes offers',
        features: [
          {
            icon: '⚡',
            label: 'INT8 inference',
            detail: 'llm.int8() — 8-bit matmul with outlier detection (next slide)',
          },
          {
            icon: '🎯',
            label: 'NF4 inference',
            detail: 'QLoRA — 4 bits with levels at N(0,1) quantiles',
          },
          {
            icon: '🏋️',
            label: '8-bit optimizers',
            detail: 'Adam and SGD with compressed optimizer states',
          },
        ],
        contractTitle: 'The API contract',
        contractNote: 'You configure — bitsandbytes executes. Zero boilerplate.',
        tabs: [{ label: 'Visual' }, { label: 'Code' }],
        codePanel: {
          title: 'Verify and configure bitsandbytes',
          description: 'Import the lib, confirm version and CUDA, and create INT8 and NF4 configs.',
          source: { snippetId: 'transformers/bitsandbytes-intro', language: 'python' },
          codeExplanations: [
            {
              lineRange: [1, 2],
              content: 'We import `torch` and `bitsandbytes` to verify CUDA kernels were installed correctly.',
            },
            {
              lineRange: [4, 6],
              content: 'We check the version and CUDA availability. If CUDA is not available, bitsandbytes runs in CPU mode (slow).',
            },
            {
              lineRange: [8, 12],
              content: "bitsandbytes' three capabilities: INT8 kernels, NF4 kernels, and 8-bit optimizers for training.",
            },
            {
              lineRange: [14, 15],
              content: '`BitsAndBytesConfig` is imported from `transformers`, not from `bnb`. That is the public interface you use.',
            },
            {
              lineRange: [17, 25],
              content: 'The two configs: INT8 for llm.int8() and NF4 for efficient inference. Both passed via `quantization_config` to `from_pretrained`.',
            },
            {
              lineRange: [27, 27],
              content: 'We confirm the configs were created without errors. The model has not been loaded yet — that happens in the next step.',
            },
          ],
        },
      },
    },
  },
});
