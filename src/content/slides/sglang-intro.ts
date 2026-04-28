import { defineSlide } from './_factory';

export const sglangIntro = defineSlide({
  id: 'sglang-intro',
  type: 'two-column',
  options: { columnRatios: [0.55, 0.45] },
  content: {
    'pt-br': {
      title: 'sglang: RadixAttention + Prefix Caching',
      body: `**sglang** (Structured Generation Language), mantido pela **LMSYS** (criadores do Chatbot Arena), leva o caching a outro nível com **RadixAttention**.

### RadixAttention

Em vez de apenas cache de prefixo simples, sglang mantém uma **radix tree** de KV cache. Requests com prefixos compartilhados **reusam computação automaticamente**.

### Exemplo

\`\`\`
Conversation 1: "User: o que é RAG?" → gera resposta
Conversation 2: "User: o que é RAG? E como funciona?" → reusa cache do C1
Conversation 3: "User: o que é RAG? E vLLM?" → reusa cache do C1
\`\`\`

Resultado: **5x speedup** em conversas multi-turn.

### Server

\`\`\`bash
python -m sglang.launch_server \\
  --model-path meta-llama/Llama-3.1-8B-Instruct \\
  --host 0.0.0.0 \\
  --port 30000 \\
  --mem-fraction-static 0.9 \\
  --max-running-requests 256
\`\`\`

### Suporte de hardware

NVIDIA, AMD, Intel Xeon, Google TPU, Ascend NPU — mais amplo que vLLM.`,
    },
    'en-us': {
      title: 'sglang: RadixAttention + Prefix Caching',
      body: `**sglang** (Structured Generation Language), maintained by **LMSYS** (creators of Chatbot Arena), takes caching to another level with **RadixAttention**.

### RadixAttention

Instead of simple prefix caching, sglang maintains a **radix tree** of KV cache. Requests with shared prefixes **automatically reuse computation**.

### Example

\`\`\`
Conversation 1: "User: what is RAG?" → generates answer
Conversation 2: "User: what is RAG? And how does it work?" → reuses C1 cache
Conversation 3: "User: what is RAG? And vLLM?" → reuses C1 cache
\`\`\`

Result: **5x speedup** in multi-turn conversations.

### Server

\`\`\`bash
python -m sglang.launch_server \\
  --model-path meta-llama/Llama-3.1-8B-Instruct \\
  --host 0.0.0.0 \\
  --port 30000 \\
  --mem-fraction-static 0.9 \\
  --max-running-requests 256
\`\`\`

### Hardware support

NVIDIA, AMD, Intel Xeon, Google TPU, Ascend NPU — broader than vLLM.`,
    },
  },
  visual: {
    id: 'sglang-intro-visual',
    copy: {
      'pt-br': {
        title: 'Radix Tree: Prefix Cache',
        treeLabel: 'Radix Tree',
        sharedLabel: 'Shared prefix → cache reutilizado',
        uniqueLabel: 'Sufixo único → novo compute',
        speedupLabel: 'Speedup multi-turn',
        cacheHitLabel: 'Cache HIT',
        cacheMissLabel: 'Cache MISS',
      },
      'en-us': {
        title: 'Radix Tree: Prefix Cache',
        treeLabel: 'Radix Tree',
        sharedLabel: 'Shared prefix → cache reused',
        uniqueLabel: 'Unique suffix → new compute',
        speedupLabel: 'Multi-turn speedup',
        cacheHitLabel: 'Cache HIT',
        cacheMissLabel: 'Cache MISS',
      },
    },
  },
});
