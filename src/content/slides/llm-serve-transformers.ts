import { defineSlide } from './_factory';

export const llmServeTransformers = defineSlide({
  id: 'llm-serve-transformers',
  type: 'two-column',
  options: { columnRatios: [0.5, 0.5] },
  content: {
    'pt-br': {
      title: '`transformers serve`: servidor em uma linha',
      body: `O Transformers 5 inclui um **servidor FastAPI nativo** com API compatível com OpenAI. Sem código extra, sem configuração de framework.

### Instalação

\`\`\`bash
pip install transformers[serving]
\`\`\`

### Iniciar o servidor

\`\`\`bash
transformers serve Qwen/Qwen3-0.5B \\
  --quantization bnb-4bit \\
  --port 8000
\`\`\`

### Comportamento

- **Carregamento sob demanda:** modelos são carregados na primeira requisição
- **Timeout automático:** modelo descarregado após 300s sem requisições (configurável com \`--model-timeout\`)
- **Quantização integrada:** \`--quantization bnb-4bit\` ou \`bnb-8bit\` — reutiliza tudo que vimos nos slides de quantização
- **Continuous batching:** \`--continuous-batching\` para múltiplos usuários simultâneos

### Endpoints prontos

| Endpoint | Descrição |
|---|---|
| \`POST /v1/chat/completions\` | Chat (streaming + não-streaming) |
| \`POST /v1/completions\` | Completion clássica |
| \`GET /v1/models\` | Lista modelos disponíveis |
| \`GET /health\` | Health check |

> O servidor local aceita qualquer modelo do Hub — troque o nome e o modelo muda.`,
    },
    'en-us': {
      title: '`transformers serve`: server in one line',
      body: `Transformers 5 includes a **native FastAPI server** with an OpenAI-compatible API. No extra code, no framework configuration.

### Installation

\`\`\`bash
pip install transformers[serving]
\`\`\`

### Start the server

\`\`\`bash
transformers serve Qwen/Qwen3-0.5B \\
  --quantization bnb-4bit \\
  --port 8000
\`\`\`

### Behavior

- **On-demand loading:** models are loaded on the first request
- **Auto timeout:** model unloaded after 300s without requests (configurable with \`--model-timeout\`)
- **Built-in quantization:** \`--quantization bnb-4bit\` or \`bnb-8bit\` — reuses everything from the quantization slides
- **Continuous batching:** \`--continuous-batching\` for multiple simultaneous users

### Ready endpoints

| Endpoint | Description |
|---|---|
| \`POST /v1/chat/completions\` | Chat (streaming + non-streaming) |
| \`POST /v1/completions\` | Classic completion |
| \`GET /v1/models\` | List available models |
| \`GET /health\` | Health check |

> The local server accepts any Hub model — swap the name and the model changes.`,
    },
  },
  visual: {
    id: 'llm-serve-transformers-visual',
    copy: {
      'pt-br': {
        title: 'transformers serve — arquitetura',
        clientLabel: 'Cliente',
        serverLabel: 'transformers serve',
        modelLabel: 'Modelo na GPU',
        installLabel: 'pip install transformers[serving]',
        startLabel: 'transformers serve <model>',
        endpointChatLabel: 'POST /v1/chat/completions',
        endpointModelsLabel: 'GET /v1/models',
        endpointHealthLabel: 'GET /health',
        quantLabel: 'NF4 / INT8',
        timeoutLabel: 'Auto-unload em 300s',
        tabs: [{ label: 'Visual' }, { label: 'Código' }],
        codePanel: {
          title: 'Subindo o servidor e testando com curl',
          description: 'Instala as dependências, inicia o servidor com quantização NF4 e valida com curl.',
          source: { snippetId: 'transformers/llm-serve-start', language: 'python' },
          codeExplanations: [
            {
              lineRange: [1, 2],
              content: '`transformers[serving]` instala FastAPI e Uvicorn como extras — não estão no pacote base.',
            },
            {
              lineRange: [4, 7],
              content: '`transformers serve` inicia o servidor. `--quantization bnb-4bit` aplica NF4 automaticamente — os mesmos pesos comprimidos que vimos nos slides anteriores.',
            },
            {
              lineRange: [9, 10],
              content: '`/health` retorna 200 quando o servidor está pronto. Use para verificar antes de enviar requisições.',
            },
            {
              lineRange: [12, 13],
              content: '`/v1/models` lista os modelos carregados. Segue exatamente o formato da OpenAI API.',
            },
            {
              lineRange: [15, 22],
              content: '`/v1/chat/completions` é o endpoint principal. O `model` usa o ID do Hub. `messages` segue o padrão `[{role, content}]`.',
            },
          ],
        },
      },
      'en-us': {
        title: 'transformers serve — architecture',
        clientLabel: 'Client',
        serverLabel: 'transformers serve',
        modelLabel: 'Model in GPU',
        installLabel: 'pip install transformers[serving]',
        startLabel: 'transformers serve <model>',
        endpointChatLabel: 'POST /v1/chat/completions',
        endpointModelsLabel: 'GET /v1/models',
        endpointHealthLabel: 'GET /health',
        quantLabel: 'NF4 / INT8',
        timeoutLabel: 'Auto-unload in 300s',
        tabs: [{ label: 'Visual' }, { label: 'Code' }],
        codePanel: {
          title: 'Starting the server and testing with curl',
          description: 'Installs dependencies, starts the server with NF4 quantization and validates with curl.',
          source: { snippetId: 'transformers/llm-serve-start', language: 'python' },
          codeExplanations: [
            {
              lineRange: [1, 2],
              content: '`transformers[serving]` installs FastAPI and Uvicorn as extras — they are not in the base package.',
            },
            {
              lineRange: [4, 7],
              content: '`transformers serve` starts the server. `--quantization bnb-4bit` applies NF4 automatically — the same compressed weights we saw in the previous slides.',
            },
            {
              lineRange: [9, 10],
              content: '`/health` returns 200 when the server is ready. Use to check before sending requests.',
            },
            {
              lineRange: [12, 13],
              content: '`/v1/models` lists loaded models. Follows exactly the OpenAI API format.',
            },
            {
              lineRange: [15, 22],
              content: '`/v1/chat/completions` is the main endpoint. `model` uses the Hub ID. `messages` follows the `[{role, content}]` standard.',
            },
          ],
        },
      },
    },
  },
});
