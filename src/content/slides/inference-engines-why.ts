import { defineSlide } from './_factory';

export const inferenceEnginesWhy = defineSlide({
  id: 'inference-engines-why',
  type: 'two-column',
  options: { columnRatios: [0.5, 0.5] },
  content: {
    'pt-br': {
      title: 'O Problema do AutoModel em Produção',
      body: `Até agora carregamos modelos com **AutoModel.from_pretrained()** — funciona no notebook, mas em produção é insustentável.

### O ciclo vicioso

1. **Carga lenta**: \`from_pretrained()\` = 10-30s para carregar um LLM de 8B
2. **Sem batching**: cada requisição é processada isoladamente — GPU fica ociosa
3. **Sem KV cache reuse**: o contexto é recalculado do zero a cada chamada
4. **Sem API server**: seu script Python precisa virar um serviço HTTP manualmente
5. **OOM fácil**: sem gerenciamento de memória, 10 requisições simultâneas = crash

### O que um motor de inferência faz

- **Servidor HTTP** pronto (OpenAI-compatible)
- **Continuous batching** (várias requests em paralelo)
- **KV cache management** (reusa computação)
- **Quantization** (FP16, INT8, AWQ)

> Rodar LLM em produção ≠ rodar no notebook. O gap é o **motor de inferência**.`,
    },
    'en-us': {
      title: 'The AutoModel Problem in Production',
      body: `So far we've loaded models with **AutoModel.from_pretrained()** — works in notebooks, but unsustainable in production.

### The vicious cycle

1. **Slow load**: \`from_pretrained()\` = 10-30s to load an 8B LLM
2. **No batching**: each request is processed in isolation — GPU sits idle
3. **No KV cache reuse**: context is recomputed from scratch every call
4. **No API server**: your Python script needs to become an HTTP service manually
5. **Easy OOM**: no memory management, 10 concurrent requests = crash

### What an inference engine does

- **HTTP server** ready (OpenAI-compatible)
- **Continuous batching** (multiple requests in parallel)
- **KV cache management** (reuses computation)
- **Quantization** (FP16, INT8, AWQ)

> Running LLMs in production ≠ running in a notebook. The gap is the **inference engine**.`,
    },
  },
  visual: {
    id: 'inference-engines-why-visual',
    copy: {
      'pt-br': {
        title: 'Do AutoModel ao Motor de Inferência',
        beforeLabel: 'AutoModel (dev)',
        afterLabel: 'Inference Engine (prod)',
        pain1: 'Carga de 10-30s a cada restart do serviço',
        pain2: 'Sem batching — 10 reqs sequenciais = 2s total',
        pain3: 'Sem API — precisa construir seu próprio servidor HTTP',
        solution1: 'Server pronto com OpenAI-compatible API',
        solution2: 'Continuous batching: 10 reqs em 50ms',
        solution3: 'KV cache + quantization = mais throughput',
      },
      'en-us': {
        title: 'From AutoModel to Inference Engine',
        beforeLabel: 'AutoModel (dev)',
        afterLabel: 'Inference Engine (prod)',
        pain1: '10-30s load time on every service restart',
        pain2: 'No batching — 10 sequential reqs = 2s total',
        pain3: 'No API — need to build your own HTTP server',
        solution1: 'Ready server with OpenAI-compatible API',
        solution2: 'Continuous batching: 10 reqs in 50ms',
        solution3: 'KV cache + quantization = more throughput',
      },
    },
  },
});
