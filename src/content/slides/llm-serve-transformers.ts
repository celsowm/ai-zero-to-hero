import { defineSlide } from './_factory';

export const llmServeTransformers = defineSlide({
  id: 'llm-serve-transformers',
  type: 'two-column',
  options: { columnRatios: [0.48, 0.52] },
  content: {
    'pt-br': {
      title: '`transformers serve`: servidor em uma linha',
      body: `O Transformers 5 inclui um **servidor FastAPI nativo** com API compatível com OpenAI. Sem código extra, sem configuração de framework.

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
        tabs: [{ label: 'Visual' }, { label: 'Linux / macOS' }, { label: 'Windows' }],
        codePanels: [
          {
            kind: 'html',
            title: '',
            html: '',
          },
          {
            title: 'Linux / macOS (Bash)',
            description: 'Instala as dependências, inicia o servidor com quantização NF4 e valida com curl.',
            source: { snippetId: 'transformers/llm-serve-start-linux', language: 'bash' },
            codeExplanations: [
              {
                lineRange: [1, 2],
                content: '`pillow` + `transformers[serving]` — Pillow é necessário para processamento de imagens em modelos multimodais.',
              },
              {
                lineRange: [4, 7],
                content: '`transformers serve` inicia o servidor. No Linux/macOS, usamos `\` para continuação de linha.',
              },
              {
                lineRange: [9, 10],
                content: '`/health` retorna 200 quando o servidor está pronto.',
              },
              {
                lineRange: [12, 13],
                content: '`/v1/models` lista os modelos carregados.',
              },
              {
                lineRange: [15, 22],
                content: '`/v1/chat/completions` segue o padrão OpenAI.',
              },
            ],
          },
          {
            title: 'Windows (PowerShell)',
            description: 'Instala as dependências, inicia o servidor com quantização NF4 e valida com Invoke-RestMethod.',
            source: { snippetId: 'transformers/llm-serve-start-windows', language: 'powershell' },
            codeExplanations: [
              {
                lineRange: [1, 2],
                content: '`pillow` + `transformers[serving]` — Pillow is required for image processing in multimodal models.',
              },
              {
                lineRange: [4, 7],
                content: 'No PowerShell, usamos a crase (`) para continuação de linha.',
              },
              {
                lineRange: [9, 10],
                content: 'Verifique se o servidor está no ar com `/health`.',
              },
              {
                lineRange: [12, 13],
                content: '`/v1/models` lista os modelos carregados.',
              },
              {
                lineRange: [15, 22],
                content: 'O endpoint compatível com OpenAI.',
              },
            ],
          },
        ],
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
        tabs: [{ label: 'Visual' }, { label: 'Linux / macOS' }, { label: 'Windows' }],
        codePanels: [
          {
            kind: 'html',
            title: '',
            html: '',
          },
          {
            title: 'Linux / macOS (Bash)',
            description: 'Installs dependencies, starts the server with NF4 quantization and validates with curl.',
            source: { snippetId: 'transformers/llm-serve-start-linux', language: 'bash' },
            codeExplanations: [
              {
                lineRange: [1, 2],
                content: '`transformers[serving]` installs FastAPI and Uvicorn as extras.',
              },
              {
                lineRange: [4, 7],
                content: '`transformers serve` starts the server. On Linux/macOS, we use `\` for line continuation.',
              },
              {
                lineRange: [9, 10],
                content: '`/health` returns 200 when the server is ready.',
              },
              {
                lineRange: [12, 13],
                content: '`/v1/models` lists loaded models.',
              },
              {
                lineRange: [15, 22],
                content: '`/v1/chat/completions` follows the OpenAI standard.',
              },
            ],
          },
          {
            title: 'Windows (PowerShell)',
            description: 'Installs dependencies, starts the server with NF4 quantization and validates with curl.',
            source: { snippetId: 'transformers/llm-serve-start-windows', language: 'powershell' },
            codeExplanations: [
              {
                lineRange: [1, 2],
                content: '`transformers[serving]` installs FastAPI and Uvicorn.',
              },
              {
                lineRange: [4, 7],
                content: 'In PowerShell, we use the backtick (`) for line continuation.',
              },
              {
                lineRange: [9, 10],
                content: 'Check if the server is up with `/health`.',
              },
              {
                lineRange: [12, 13],
                content: '`/v1/models` lists loaded models.',
              },
              {
                lineRange: [15, 22],
                content: 'The OpenAI-compatible endpoint.',
              },
            ],
          },
        ],
      },
    },
  },
});
