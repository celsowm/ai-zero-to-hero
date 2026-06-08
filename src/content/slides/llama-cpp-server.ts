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
        '| `-c` | do modelo | Tamanho do contexto |',
        '| `-ngl` | `auto` | Camadas para GPU offload |',
        '| `-np` | `auto` | Slots paralelos (usuários simultâneos) |',
        '',
        '### Destaques',
        '',
        '- **Download automático**: `llama-server -hf usuário/modelo` baixa e já serve',
        '- **Web UI embutido**: acesse `http://localhost:8080` no navegador',
        '- **Continuous batching**: ativado por padrão — múltiplos clientes sem fila',
        '- **Function calling**: suporte a ferramentas para qualquer modelo',
        '- **JSON Schema**: resposta estruturada via `--json-schema`',
        '- **Multimodal**: suporte experimental a imagens',
        '',
        "> O cliente Python usa o mesmo `openai` library que vimos antes — só muda a `base_url` para `http://localhost:8080/v1`.",
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
        '| `-c` | from model | Context size |',
        '| `-ngl` | `auto` | GPU offload layers |',
        '| `-np` | `auto` | Parallel slots (concurrent users) |',
        '',
        '### Highlights',
        '',
        '- **Auto-download**: `llama-server -hf user/model` downloads and serves in one command',
        '- **Built-in Web UI**: visit `http://localhost:8080` in your browser',
        '- **Continuous batching**: enabled by default — multiple clients without queue',
        '- **Function calling**: tool support for any model',
        '- **JSON Schema**: structured responses via `--json-schema`',
        '- **Multimodal**: experimental image support',
        '',
        "> The Python client uses the same `openai` library we've seen before — just change `base_url` to `http://localhost:8080/v1`.",
      ].join('\n'),
    },
  },
  visual: {
    id: 'code-tabs',
    copy: {
      'pt-br': {
        tabs: [
          { label: 'Iniciar Servidor' },
          { label: 'Testar com curl' },
          { label: 'Cliente Python' },
        ],
        codePanels: [
          {
            title: 'Iniciar servidor',
            description: 'Baixa o modelo Gemma 3 1B e inicia o servidor na porta 8080.',
            source: { snippetId: 'llama-cpp/llama-cpp-server-start', language: 'bash' },
            codeExplanations: [
              {
                lineRange: [1, 1],
                content: '`llama-server` com `-hf` baixa automaticamente o modelo GGUF do Hugging Face e já expõe a API. `-c 4096` define o contexto máximo.',
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
            description: 'Usa a biblioteca `openai` para consumir o servidor local.',
            source: { snippetId: 'llama-cpp/llama-cpp-server-client', language: 'python' },
            codeExplanations: [
              {
                lineRange: [1, 1],
                content: 'Importa o cliente oficial OpenAI, que também funciona com servidores compatíveis.',
              },
              {
                lineRange: [3, 6],
                content: '`base_url` aponta para o servidor local. `api_key` pode ser qualquer string — o servidor local não valida.',
              },
              {
                lineRange: [8, 14],
                content: '`chat.completions.create()` é idêntico à chamada para a OpenAI real. Só muda a `base_url`.',
              },
              {
                lineRange: [16, 16],
                content: 'Extrai e imprime o texto gerado.',
              },
            ],
          },
        ],
      },
      'en-us': {
        tabs: [
          { label: 'Start Server' },
          { label: 'Test with curl' },
          { label: 'Python Client' },
        ],
        codePanels: [
          {
            title: 'Start server',
            description: 'Downloads the Gemma 3 1B model and starts the server on port 8080.',
            source: { snippetId: 'llama-cpp/llama-cpp-server-start', language: 'bash' },
            codeExplanations: [
              {
                lineRange: [1, 1],
                content: '`llama-server` with `-hf` automatically downloads the GGUF model from Hugging Face and exposes the API. `-c 4096` sets the max context size.',
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
            description: 'Uses the `openai` library to consume the local server.',
            source: { snippetId: 'llama-cpp/llama-cpp-server-client', language: 'python' },
            codeExplanations: [
              {
                lineRange: [1, 1],
                content: 'Imports the official OpenAI client, which also works with compatible servers.',
              },
              {
                lineRange: [3, 6],
                content: '`base_url` points to the local server. `api_key` can be any string — the local server does not validate it.',
              },
              {
                lineRange: [8, 14],
                content: '`chat.completions.create()` is identical to calling real OpenAI. Only `base_url` changes.',
              },
              {
                lineRange: [16, 16],
                content: 'Extracts and prints the generated text.',
              },
            ],
          },
        ],
      },
    },
  },
});
