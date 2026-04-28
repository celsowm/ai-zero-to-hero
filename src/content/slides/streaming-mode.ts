import { defineSlide } from './_factory';

export const streamingMode = defineSlide({
  id: 'streaming-mode',
  type: 'two-column',
  options: { columnRatios: [0.55, 0.45] },
  content: {
    'pt-br': {
      title: 'Modo Stream: Token por Token via SSE',
      body: `Quando você usa um chatbot, o texto aparece **progressivamente** — não espera 10 segundos. Isso é **streaming** via Server-Sent Events (SSE).

### Como funciona

\`\`\`python
snippet:streaming/basic
\`\`\`

### O protocolo SSE

O servidor envia eventos como:

\`\`\`
data: {"choices": [{"delta": {"content": "RAG"}}]}

data: {"choices": [{"delta": {"content": " é"}}]}

data: {"choices": [{"delta": {"content": " uma"}}]}

data: [DONE]
\`\`\`

### stream_options

Para obter estatísticas de uso (tokens consumidos):

\`\`\`python
snippet:streaming/usage
\`\`\`

> **UX**: streaming = resposta imediata (percepção de velocidade). **Custo**: mesmo número de tokens, mas o usuário vê progresso em tempo real.`,
    },
    'en-us': {
      title: 'Streaming Mode: Token by Token via SSE',
      body: `When you use a chatbot, text appears **progressively** — no 10-second wait. This is **streaming** via Server-Sent Events (SSE).

### How it works

\`\`\`python
snippet:streaming/basic
\`\`\`

### The SSE protocol

The server sends events like:

\`\`\`
data: {"choices": [{"delta": {"content": "RAG"}}]}

data: {"choices": [{"delta": {"content": " is"}}]}

data: {"choices": [{"delta": {"content": " a"}}]}

data: [DONE]
\`\`\`

### stream_options

To get usage stats (tokens consumed):

\`\`\`python
snippet:streaming/usage
\`\`\`

> **UX**: streaming = instant response (perception of speed). **Cost**: same number of tokens, but the user sees real-time progress.`,
    },
  },
  visual: {
    id: 'streaming-mode-visual',
    copy: {
      'pt-br': {
        title: 'Blocking vs Streaming',
        blockingLabel: 'Blocking',
        streamingLabel: 'Streaming',
        blockingDesc: 'Usuário espera 3-10s... resposta aparece de uma vez',
        streamingDesc: 'Token aparece em tempo real via SSE — percepção de velocidade',
        sseLabel: 'Server-Sent Events',
        tokenLabel: 'token',
        progressLabel: 'Progresso',
        doneLabel: 'Stream completo!',
        codeLabel: 'async for chunk',
      },
      'en-us': {
        title: 'Blocking vs Streaming',
        blockingLabel: 'Blocking',
        streamingLabel: 'Streaming',
        blockingDesc: 'User waits 3-10s... response appears all at once',
        streamingDesc: 'Tokens appear in real-time via SSE — perception of speed',
        sseLabel: 'Server-Sent Events',
        tokenLabel: 'token',
        progressLabel: 'Progress',
        doneLabel: 'Stream complete!',
        codeLabel: 'async for chunk',
      },
    },
  },
});
