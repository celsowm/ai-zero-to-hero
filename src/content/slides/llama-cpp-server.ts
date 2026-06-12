import { defineSlide } from './_factory';

export const llamaCppServer = defineSlide({
  id: 'llama-cpp-server',
  type: 'two-column',
  options: { columnRatios: [0.48, 0.52] },
  content: {
    'pt-br': {
      title: 'llama-server: API OpenAI em C/C++',
      body: [
        'O **llama.cpp** inclui um servidor HTTP nativo compatível com a API OpenAI.',
        '',
        'Inicie-o com um modelo GGUF e ele expõe `/v1/chat/completions`, `/v1/completions`, `/v1/embeddings` e `/v1/models`.',
        '',
        '### Flags essenciais',
        '',
        '| Flag | Padrão | Descrição |',
        '|---|---|---|',
        '| `--host` | `127.0.0.1` | Endereço para escutar |',
        '| `--port` | `8080` | Porta do servidor |',
        '| `-c, --ctx-size` | `0` | Tamanho do contexto do prompt |',
        '| `-n, --predict` | `-1` | Tokens a gerar (`-1` = infinito) |',
        '| `-b, --batch-size` | `2048` | Batch lógico máximo |',
        '| `-ub, --ubatch-size` | `512` | Micro-batch físico máximo |',
        '| `--keep` | `0` | Tokens do prompt inicial preservados |',
        '| `-ngl` | `auto` | Limite manual de camadas na GPU |',
        '| `--fit` | `on` | Ajusta argumentos ainda não fixados para caber na memória |',
        '| `--fit-target` | `1024` | Folga alvo por dispositivo, em MiB |',
        '| `--fit-ctx` | `4096` | Contexto mínimo que o auto-fit preserva |',
        '| `-np, --parallel` | `-1` | Slots paralelos do servidor |',
        '| `-ctk, --cache-type-k` | `f16` | Tipo do KV cache para K |',
        '| `-ctv, --cache-type-v` | `f16` | Tipo do KV cache para V |',
        '| `--mmap / --no-mmap` | `enabled` | Mapeia o modelo em memória |',
        '| `--mlock` | `disabled` | Mantém o modelo residente na RAM |',
        '| `--jinja` | `off` | Ativa o motor Jinja para chat |',
        '',
        '### Destaques',
        '',
        '- **Download automático**: `llama-server -hf usuário/modelo` baixa e já serve',
        '- **Auto-fit ligado**: o servidor tenta ajustar contexto e split GPU/CPU ao hardware disponível',
        '- **Web UI embutido**: acesse `http://localhost:8080` no navegador',
        '- **Continuous batching**: ativado por padrão — múltiplos clientes sem fila',
        '- **Function calling**: suporte a ferramentas para qualquer modelo',
        '- **JSON Schema**: resposta estruturada via `--json-schema`',
        '- **Multimodal**: suporte experimental a imagens',
        '',
        "> O cliente Python usa `requests` diretamente — sem dependência da biblioteca `openai`.",
      ].join('\n'),
    },
    'en-us': {
      title: 'llama-server: OpenAI API in C/C++',
      body: [
        '**llama.cpp** includes a native HTTP server compatible with the OpenAI API.',
        '',
        'Start it with a GGUF model and it exposes `/v1/chat/completions`, `/v1/completions`, `/v1/embeddings`, and `/v1/models`.',
        '',
        '### Essential flags',
        '',
        '| Flag | Default | Description |',
        '|---|---|---|',
        '| `--host` | `127.0.0.1` | Address to listen on |',
        '| `--port` | `8080` | Server port |',
        '| `-c, --ctx-size` | `0` | Prompt context size |',
        '| `-n, --predict` | `-1` | Tokens to generate (`-1` = infinity) |',
        '| `-b, --batch-size` | `2048` | Logical maximum batch size |',
        '| `-ub, --ubatch-size` | `512` | Physical maximum micro-batch size |',
        '| `--keep` | `0` | Initial prompt tokens to keep |',
        '| `-ngl` | `auto` | Manual limit for GPU layers |',
        '| `--fit` | `on` | Adjusts still-unset arguments to fit device memory |',
        '| `--fit-target` | `1024` | Target per-device margin in MiB |',
        '| `--fit-ctx` | `4096` | Minimum context size preserved by auto-fit |',
        '| `-np, --parallel` | `-1` | Server parallel slots |',
        '| `-ctk, --cache-type-k` | `f16` | KV cache type for K |',
        '| `-ctv, --cache-type-v` | `f16` | KV cache type for V |',
        '| `--mmap / --no-mmap` | `enabled` | Memory-map the model |',
        '| `--mlock` | `disabled` | Keep the model resident in RAM |',
        '| `--jinja` | `off` | Enable the Jinja chat engine |',
        '',
        '### Highlights',
        '',
        '- **Auto-download**: `llama-server -hf user/model` downloads and serves in one command',
        '- **Auto-fit enabled**: the server tries to adapt context and GPU/CPU split to the available hardware',
        '- **Built-in Web UI**: visit `http://localhost:8080` in your browser',
        '- **Continuous batching**: enabled by default — multiple clients without queue',
        '- **Function calling**: tool support for any model',
        '- **JSON Schema**: structured responses via `--json-schema`',
        '- **Multimodal**: experimental image support',
        '',
        "> The Python client uses `requests` directly — no `openai` library dependency.",
      ].join('\n'),
    },
  },
  visual: {
    id: 'code-tabs',
    copy: {
      'pt-br': {
        tabs: [
          { label: 'Windows (PowerShell)' },
          { label: 'Linux / macOS' },
          { label: 'Testar com curl' },
          { label: 'Cliente Python' },
        ],
        codePanels: [
          {
            title: 'Iniciar servidor (Windows)',
            description: 'Baixa o modelo Gemma 4 quantizado e inicia o servidor na porta 8000 com descarregamento total para GPU.',
            source: { snippetId: 'llama-cpp/llama-cpp-server-start', language: 'powershell' },
            codeExplanations: [
              {
                lineRange: [1, 2],
                content: '`llama-server.exe` com `-hf` baixa automaticamente o GGUF do Hugging Face.',
              },
              {
                lineRange: [3, 3],
                content: '`--host 127.0.0.1` limita ao localhost; `--port 8000` define a porta.',
              },
              {
                lineRange: [4, 4],
                content: '`-ngl 999` descarrega todas as camadas para GPU.',
              },
              {
                lineRange: [5, 5],
                content: '`-c 8192` define o contexto máximo de 8192 tokens.',
              },
            ],
          },
          {
            title: 'Iniciar servidor (Linux / macOS)',
            description: 'Baixa o modelo Gemma 4 quantizado e inicia o servidor na porta 8000 com descarregamento total para GPU.',
            source: { snippetId: 'llama-cpp/llama-cpp-server-start', language: 'bash' },
            codeExplanations: [
              {
                lineRange: [1, 2],
                content: '`llama-server` com `-hf` baixa automaticamente o GGUF do Hugging Face.',
              },
              {
                lineRange: [3, 3],
                content: '`--host 127.0.0.1` limita ao localhost; `--port 8000` define a porta.',
              },
              {
                lineRange: [4, 4],
                content: '`-ngl 999` descarrega todas as camadas para GPU.',
              },
              {
                lineRange: [5, 5],
                content: '`-c 8192` define o contexto máximo de 8192 tokens.',
              },
            ],
          },
          {
            title: 'Testar com curl',
            description: 'Envia uma requisição de chat para o servidor local.',
            source: { snippetId: 'llama-cpp/llama-cpp-server-curl', language: 'bash' },
            codeExplanations: [
              {
                lineRange: [1, 2],
                content: '`curl POST` para o endpoint `/v1/chat/completions` — mesmo formato da API OpenAI.',
              },
              {
                lineRange: [4, 4],
                content: 'O campo `model` deve corresponder ao nome do modelo carregado.',
              },
              {
                lineRange: [5, 10],
                content: '`messages` segue o formato padrão: `system` define o comportamento, `user` é a pergunta.',
              },
            ],
          },
          {
            title: 'Cliente Python',
            description: 'Usa `requests` para consumir o servidor local diretamente.',
            source: { snippetId: 'llama-cpp/llama-cpp-server-client', language: 'python' },
            codeExplanations: [
              {
                lineRange: [1, 1],
                content: 'Importa a biblioteca padrão `requests` para fazer requisições HTTP.',
              },
              {
                lineRange: [3, 3],
                content: 'URL do endpoint de chat do servidor local.',
              },
              {
                lineRange: [4, 4],
                content: 'Header indicando que o corpo é JSON.',
              },
              {
                lineRange: [5, 12],
                content: 'Payload com o modelo e mensagens no formato OpenAI.',
              },
              {
                lineRange: [13, 13],
                content: 'Envia requisição POST para o servidor local.',
              },
              {
                lineRange: [14, 14],
                content: 'Extrai e imprime o conteúdo da resposta.',
              },
            ],
          },
        ],
      },
      'en-us': {
        tabs: [
          { label: 'Windows (PowerShell)' },
          { label: 'Linux / macOS' },
          { label: 'Test with curl' },
          { label: 'Python Client' },
        ],
        codePanels: [
          {
            title: 'Start server (Windows)',
            description: 'Downloads the quantized Gemma 4 model and starts the server on port 8000 with full GPU offload.',
            source: { snippetId: 'llama-cpp/llama-cpp-server-start', language: 'powershell' },
            codeExplanations: [
              {
                lineRange: [1, 2],
                content: '`llama-server.exe` with `-hf` automatically downloads the GGUF model from Hugging Face.',
              },
              {
                lineRange: [3, 3],
                content: '`--host 127.0.0.1` binds to localhost; `--port 8000` sets the server port.',
              },
              {
                lineRange: [4, 4],
                content: '`-ngl 999` offloads all layers to GPU.',
              },
              {
                lineRange: [5, 5],
                content: '`-c 8192` sets the maximum context size to 8192 tokens.',
              },
            ],
          },
          {
            title: 'Start server (Linux / macOS)',
            description: 'Downloads the quantized Gemma 4 model and starts the server on port 8000 with full GPU offload.',
            source: { snippetId: 'llama-cpp/llama-cpp-server-start', language: 'bash' },
            codeExplanations: [
              {
                lineRange: [1, 2],
                content: '`llama-server` with `-hf` automatically downloads the GGUF model from Hugging Face.',
              },
              {
                lineRange: [3, 3],
                content: '`--host 127.0.0.1` binds to localhost; `--port 8000` sets the server port.',
              },
              {
                lineRange: [4, 4],
                content: '`-ngl 999` offloads all layers to GPU.',
              },
              {
                lineRange: [5, 5],
                content: '`-c 8192` sets the maximum context size to 8192 tokens.',
              },
            ],
          },
          {
            title: 'Test with curl',
            description: 'Sends a chat request to the local server.',
            source: { snippetId: 'llama-cpp/llama-cpp-server-curl', language: 'bash' },
            codeExplanations: [
              {
                lineRange: [1, 2],
                content: '`curl POST` to the `/v1/chat/completions` endpoint — same format as the OpenAI API.',
              },
              {
                lineRange: [4, 4],
                content: 'The `model` field must match the loaded model name.',
              },
              {
                lineRange: [5, 10],
                content: '`messages` follows the standard format: `system` sets behavior, `user` is the prompt.',
              },
            ],
          },
          {
            title: 'Python Client',
            description: 'Uses `requests` to consume the local server directly.',
            source: { snippetId: 'llama-cpp/llama-cpp-server-client', language: 'python' },
            codeExplanations: [
              {
                lineRange: [1, 1],
                content: 'Imports the standard `requests` library for HTTP requests.',
              },
              {
                lineRange: [3, 3],
                content: 'URL of the local server chat endpoint.',
              },
              {
                lineRange: [4, 4],
                content: 'Header indicating JSON body.',
              },
              {
                lineRange: [5, 12],
                content: 'Payload with model and messages in OpenAI format.',
              },
              {
                lineRange: [13, 13],
                content: 'Sends POST request to local server.',
              },
              {
                lineRange: [14, 14],
                content: 'Extracts and prints response content.',
              },
            ],
          },
        ],
      },
    },
  },
});
