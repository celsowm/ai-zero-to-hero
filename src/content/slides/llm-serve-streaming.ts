import { defineSlide } from './_factory';

// Slide focado em streaming de tokens
const llmServeStreaming = defineSlide({
  id: 'llm-serve-streaming',
  type: 'two-column',
  options: { columnRatios: [0.45, 0.55] },
  content: {
    'pt-br': {
      title: 'Streaming: Adeus, "loading" infinito',
      body: `Em LLMs, gerar a resposta completa pode levar segundos. O **Streaming** resolve isso enviando tokens conforme eles são criados.

### Por que usar?
- **Latência Percebida:** O usuário vê o texto começar em milissegundos.
- **Engajamento:** A leitura acontece enquanto o modelo ainda está "pensando".

### Como funciona?
Quando você envia \`stream: true\`, o servidor não fecha a conexão HTTP após o primeiro dado. Ele usa um protocolo chamado **SSE (Server-Sent Events)** para empurrar pequenos "chunks" JSON.

> **Importante:** Cada chunk contém um campo \`delta\` (a diferença) em vez de \`message\`. O cliente é responsável por concatenar esses pedaços para formar a resposta final.`,
      rightBody: `Aqui estão exemplos de como consumir esses eventos de forma eficiente:`,
    },
    'en-us': {
      title: 'Streaming: Goodbye, infinite "loading"',
      body: `In LLMs, generating the full response can take seconds. **Streaming** solves this by sending tokens as they are created.

### Why use it?
- **Perceived Latency:** The user sees text start in milliseconds.
- **Engagement:** Reading happens while the model is still "thinking".

### How does it work?
When you send \`stream: true\`, the server doesn't close the HTTP connection after the first piece of data. It uses a protocol called **SSE (Server-Sent Events)** to push small JSON "chunks".

> **Important:** Each chunk contains a \`delta\` field (the difference) instead of \`message\`. The client is responsible for concatenating these pieces to form the final response.`,
      rightBody: `Here are examples of how to consume these events efficiently:`,
    },
  },
  visual: {
    id: 'code-tabs',
    copy: {
      'pt-br': {
        tabs: [
          { label: 'Python' },
          { label: 'JavaScript' },
        ],
        codePanels: [
          {
            title: 'Python: Consumindo streaming',
            description: 'Usa geradores nativos do Python para uma leitura fluida.',
            source: { snippetId: 'transformers/llm-serve-streaming', language: 'python' },
            codeExplanations: [
              { lineRange: [7, 11], content: '`stream=True` muda o tipo de retorno: em vez de um objeto JSON final, recebemos um iterador.' },
              { lineRange: [14, 20], content: 'O loop `for chunk in response` consome os dados assim que chegam do servidor.' },
              { lineRange: [17, 17], content: 'Em modo streaming, o conteúdo vem dentro de `delta` (mudança) em vez de `message`.' },
            ],
          },
          {
            title: 'JavaScript: Consumindo streaming',
            description: 'Utiliza iteração assíncrona (for await) no Node.js ou Browser.',
            source: { snippetId: 'transformers/llm-serve-streaming-js', language: 'javascript' },
            codeExplanations: [
              { lineRange: [12, 16], content: '`stream: true` faz o SDK do JavaScript configurar uma conexão SSE (Server-Sent Events) automaticamente.' },
              { lineRange: [20, 23], content: 'A sintaxe `for await` é perfeita para streams. O código espera cada chunk sem travar a thread principal.' },
            ],
          },
        ],
      },
      'en-us': {
        tabs: [
          { label: 'Python' },
          { label: 'JavaScript' },
        ],
        codePanels: [
          {
            title: 'Python: Consuming streaming',
            description: 'Uses native Python generators for fluid reading.',
            source: { snippetId: 'transformers/llm-serve-streaming', language: 'python' },
            codeExplanations: [
              { lineRange: [7, 11], content: '`stream=True` changes the return type: instead of a final JSON object, we get an iterator.' },
              { lineRange: [14, 20], content: 'The `for chunk in response` loop consumes data as soon as it arrives from the server.' },
              { lineRange: [17, 17], content: 'In streaming mode, content comes inside `delta` (change) instead of `message`.' },
            ],
          },
          {
            title: 'JavaScript: Consuming streaming',
            description: 'Uses async iteration (for await) in Node.js or Browser.',
            source: { snippetId: 'transformers/llm-serve-streaming-js', language: 'javascript' },
            codeExplanations: [
              { lineRange: [12, 16], content: '`stream: true` makes the JS SDK automatically set up an SSE (Server-Sent Events) connection.' },
              { lineRange: [20, 23], content: 'The `for await` syntax is perfect for streams. The code waits for each chunk without blocking the main thread.' },
            ],
          },
        ],
      },
    },
  },
});

export { llmServeStreaming };
export default llmServeStreaming;
