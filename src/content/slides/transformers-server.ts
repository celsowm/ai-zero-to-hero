import { defineSlide } from './_factory';

export const transformersServer = defineSlide({
  id: 'transformers-server',
  type: 'two-column',
  options: { columnRatios: [0.5, 0.5] },
  content: {
    'pt-br': {
      title: 'Server do Transformers',
      body: `O Transformers tem um **server embutido** que expõe uma API OpenAI-compatible — ótimo para dev/test.

### Servidor nativo

\`\`\`python
snippet:transformers/server-basic
\`\`\`

### Endpoint OpenAI-compatible

\`\`\`
POST http://localhost:8000/v1/chat/completions

{
  "model": "gpt2",
  "messages": [{"role": "user", "content": "O que é RAG?"}]
}
\`\`\`

### Limitações

- Usa PyTorch puro — **sem otimizações** de throughput
- Sem continuous batching — requests processados sequencialmente
- Sem PagedAttention — KV cache ineficiente
- Sem prefix caching

> O server do Transformers é **ótimo para desenvolvimento**. Para produção, precisamos de motores especializados.`,
    },
    'en-us': {
      title: 'Transformers Server',
      body: `Transformers has a **built-in server** that exposes an OpenAI-compatible API — great for dev/test.

### Native server

\`\`\`python
snippet:transformers/server-basic
\`\`\`

### OpenAI-compatible endpoint

\`\`\`
POST http://localhost:8000/v1/chat/completions

{
  "model": "gpt2",
  "messages": [{"role": "user", "content": "What is RAG?"}]
}
\`\`\`

### Limitations

- Uses pure PyTorch — **no throughput optimizations**
- No continuous batching — requests processed sequentially
- No PagedAttention — inefficient KV cache
- No prefix caching

> Transformers server is **great for development**. For production, we need specialized engines.`,
    },
  },
  visual: {
    id: 'transformers-server-visual',
    copy: {
      'pt-br': {
        title: 'Arquitetura Client-Server',
        clientLabel: 'Client',
        serverLabel: 'Server',
        modelLabel: 'Modelo carregado',
        endpointLabel: 'REST API',
        responseLabel: 'Response',
      },
      'en-us': {
        title: 'Client-Server Architecture',
        clientLabel: 'Client',
        serverLabel: 'Server',
        modelLabel: 'Loaded model',
        endpointLabel: 'REST API',
        responseLabel: 'Response',
      },
    },
  },
});
