import { defineSlide } from './_factory';

export const vllmIntro = defineSlide({
  id: 'vllm-intro',
  type: 'two-column',
  options: { columnRatios: [0.55, 0.45] },
  content: {
    'pt-br': {
      title: 'vLLM: PagedAttention',
      body: `**vLLM** é o motor de inferência mais popular para GPUs. O segredo é o **PagedAttention** — inspirado na paginação de memória de **sistemas operacionais (OS)**.

### O problema: KV cache contíguo

No Transformers tradicional, o KV cache precisa de **memória contígua**. Se você tem 6 blocos livres mas fragmentados, não cabe um request de 7 blocos → **waste de 60%**.

### A solução: PagedAttention

O KV cache é dividido em **blocos não-contíguos** (pages). Uma page table mapeia blocos lógicos → físicos. Waste cai para **~5%**.

### Uso

\`\`\`bash
vllm serve meta-llama/Llama-3.1-8B-Instruct \\
  --gpu-memory-utilization 0.92 \\
  --max-num-seqs 256 \\
  --max-model-len 4096
\`\`\`

### Resultados

- **24x throughput** vs HuggingFace Transformers
- Suporte a **200+ arquiteturas** (Llama, Qwen, Gemma, Mixtral, DeepSeek)
- Multimodal (LLaVA, Qwen-VL, Pixtral)
- MoE (Mixtral, DeepSeek-V3, Qwen-MoE)`,
    },
    'en-us': {
      title: 'vLLM: PagedAttention',
      body: `**vLLM** is the most popular inference engine for GPUs. The secret is **PagedAttention** — inspired by **Operating System (OS)** memory paging.

### The problem: contiguous KV cache

In traditional Transformers, KV cache needs **contiguous memory**. If you have 6 free blocks but fragmented, a 7-block request won't fit → **60% waste**.

### The solution: PagedAttention

KV cache is split into **non-contiguous blocks** (pages). A page table maps logical → physical blocks. Waste drops to **~5%**.

### Usage

\`\`\`bash
vllm serve meta-llama/Llama-3.1-8B-Instruct \\
  --gpu-memory-utilization 0.92 \\
  --max-num-seqs 256 \\
  --max-model-len 4096
\`\`\`

### Results

- **24x throughput** vs HuggingFace Transformers
- Support for **200+ architectures** (Llama, Qwen, Gemma, Mixtral, DeepSeek)
- Multimodal (LLaVA, Qwen-VL, Pixtral)
- MoE (Mixtral, DeepSeek-V3, Qwen-MoE)`,
    },
  },
  visual: {
    id: 'vllm-intro-visual',
    copy: {
      'pt-br': {
        title: 'KV Cache: Contíguo vs Paged',
        contiguousLabel: 'Contíguo',
        pagedLabel: 'Paged',
        contiguousDesc: 'Blocos sequenciais — fragmentação gera waste',
        pagedDesc: 'Blocos não-contíguos — page table mapeia lógica → física',
        wasteLabel: 'Memory waste',
        efficiencyLabel: 'Eficiência',
      },
      'en-us': {
        title: 'KV Cache: Contiguous vs Paged',
        contiguousLabel: 'Contiguous',
        pagedLabel: 'Paged',
        contiguousDesc: 'Sequential blocks — fragmentation causes waste',
        pagedDesc: 'Non-contiguous blocks — page table maps logical → physical',
        wasteLabel: 'Memory waste',
        efficiencyLabel: 'Efficiency',
      },
    },
  },
});
