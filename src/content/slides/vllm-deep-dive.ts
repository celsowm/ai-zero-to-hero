import { defineSlide } from './_factory';

export const vllmDeepDive = defineSlide({
  id: 'vllm-deep-dive',
  type: 'two-column',
  options: { columnRatios: [0.55, 0.45] },
  content: {
    'pt-br': {
      title: 'Continuous Batching + Configuração Avançada',
      body: `O **continuous batching** do vLLM é o que diferencia de um servidor comum: requests entram e saem do batch **dinamicamente**.

### Static vs Continuous batching

**Static**: todos os requests do batch esperam o mais longo terminar. GPU ociosa.

**Continuous**: quando um request termina, o próximo entra imediatamente. GPU sempre cheia.

### Configurações-chave

\`\`\`bash
vllm serve meta-llama/Llama-3.1-8B \\
  --gpu-memory-utilization 0.92 \\
  --max-num-seqs 256 \\
  --max-model-len 4096 \\
  --enable-prefix-caching \\
  --tensor-parallel-size 2 \\
  --quantization awq
\`\`\`

| Flag | Descrição | Default |
|---|---|---|
| \`--gpu-memory-utilization\` | Fração da VRAM alocada | 0.92 |
| \`--max-num-seqs\` | Máx sequências por iteração | - |
| \`--max-model-len\` | Contexto (prompt+output) | auto |
| \`--enable-prefix-caching\` | Reusa KV cache de prefixos | off |
| \`-tp\` | Tensor parallelism (GPUs) | 1 |
| \`--quantization\` | awq, gptq, fp8, squeezellm | none |

> **Regra prática**: se der OOM, reduza \`--gpu-memory-utilization\` para 0.85 e \`--max-num-seqs\` para 128.`,
    },
    'en-us': {
      title: 'Continuous Batching + Advanced Config',
      body: `vLLM's **continuous batching** is what sets it apart from a regular server: requests enter and leave the batch **dynamically**.

### Static vs Continuous batching

**Static**: all requests in the batch wait for the longest one to finish. GPU idle.

**Continuous**: when a request finishes, the next enters immediately. GPU always full.

### Key configurations

\`\`\`bash
vllm serve meta-llama/Llama-3.1-8B \\
  --gpu-memory-utilization 0.92 \\
  --max-num-seqs 256 \\
  --max-model-len 4096 \\
  --enable-prefix-caching \\
  --tensor-parallel-size 2 \\
  --quantization awq
\`\`\`

| Flag | Description | Default |
|---|---|---|
| \`--gpu-memory-utilization\` | VRAM fraction allocated | 0.92 |
| \`--max-num-seqs\` | Max sequences per iteration | - |
| \`--max-model-len\` | Context (prompt+output) | auto |
| \`--enable-prefix-caching\` | Reuse KV cache from prefixes | off |
| \`-tp\` | Tensor parallelism (GPUs) | 1 |
| \`--quantization\` | awq, gptq, fp8, squeezellm | none |

> **Rule of thumb**: if OOM, reduce \`--gpu-memory-utilization\` to 0.85 and \`--max-num-seqs\` to 128.`,
    },
  },
  visual: {
    id: 'vllm-deep-dive-visual',
    copy: {
      'pt-br': {
        title: 'Static vs Continuous Batching',
        staticLabel: 'Static Batching',
        continuousLabel: 'Continuous Batching',
        staticDesc: 'Todos esperam o mais longo — GPU ociosa entre batches',
        continuousDesc: 'Requests entram/saem dinamicamente — GPU sempre cheia',
        requestLabel: 'Request',
        waitingLabel: '⏳ Aguardando',
        processingLabel: '🔄 Processando',
        doneLabel: '✅ Completo',
        timelineLabel: 'Timeline',
      },
      'en-us': {
        title: 'Static vs Continuous Batching',
        staticLabel: 'Static Batching',
        continuousLabel: 'Continuous Batching',
        staticDesc: 'All wait for the longest — GPU idle between batches',
        continuousDesc: 'Requests enter/leave dynamically — GPU always full',
        requestLabel: 'Request',
        waitingLabel: '⏳ Waiting',
        processingLabel: '🔄 Processing',
        doneLabel: '✅ Complete',
        timelineLabel: 'Timeline',
      },
    },
  },
});
