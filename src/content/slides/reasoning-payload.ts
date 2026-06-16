import { defineSlide } from './_factory';

export const reasoningPayload = defineSlide({
  id: 'reasoning-payload',
  type: 'two-column',
  options: { columnRatios: [0.4, 0.6] },
  content: {
    'pt-br': {
      title: 'Payload com Reasoning (chat_template_kwargs)',
      body: [
        'Nem toda API de reasoning usa `reasoning_effort`. Em servidores como `llama.cpp` que suportam o formato OpenAI Chat Completions, o reasoning é ativado via `chat_template_kwargs`.',
        '',
        '### O que é `chat_template_kwargs`?',
        '',
        'É um campo especial no payload que permite passar parâmetros adicionais para o **chat template** do modelo. O `enable_thinking` diz ao template: "ative o fluxo de raciocínio".',
        '',
        '### Como o reasoning aparece na resposta?',
        '',
        'O modelo gera dois campos no delta da resposta:',
        '',
        '- `reasoning_content`: o **pensamento** do modelo (invisível ao usuário final)',
        '- `content`: a **resposta final**',
        '',
        'Em modo não-streaming, ambos vêm no objeto `message`. Em streaming, vêm como `delta.reasoning_content` e `delta.content`.',
        '',
        '> `chat_template_kwargs` é a ponte entre o servidor local e recursos avançados do template — sem precisar alterar o modelo ou o formato da API.',
      ].join('\n'),
      rightBody: 'Veja exemplos de uso com Python requests e uma página HTML completa com streaming:',
    },
    'en-us': {
      title: 'Payload with Reasoning (chat_template_kwargs)',
      body: [
        'Not every reasoning API uses `reasoning_effort`. In servers like `llama.cpp` that support the OpenAI Chat Completions format, reasoning is activated via `chat_template_kwargs`.',
        '',
        '### What is `chat_template_kwargs`?',
        '',
        'It is a special field in the payload that passes extra parameters to the model\'s **chat template**. `enable_thinking` tells the template: "activate the reasoning flow".',
        '',
        '### How does reasoning appear in the response?',
        '',
        'The model generates two fields in the response delta:',
        '',
        '- `reasoning_content`: the model\'s **thinking** (invisible to the end user)',
        '- `content`: the **final answer**',
        '',
        'In non-streaming mode, both come in the `message` object. In streaming mode, they come as `delta.reasoning_content` and `delta.content`.',
        '',
        '> `chat_template_kwargs` is the bridge between the local server and advanced template features — without changing the model or the API format.',
      ].join('\n'),
      rightBody: 'See usage examples with Python requests and a complete streaming HTML page:',
    },
  },
  visual: {
    id: 'code-tabs',
    copy: {
      'pt-br': {
        tabs: [
          { label: 'Python' },
          { label: 'HTML' },
        ],
        codePanels: [
          {
            title: 'Python: Requests com reasoning',
            description: 'Exemplo de payload com chat_template_kwargs e leitura de reasoning_content + content.',
            source: { snippetId: 'reasoning/chat-template-kwargs-py', language: 'python' },
            codeExplanations: [
              { lineRange: [1, 1], content: 'Importa a biblioteca requests para fazer requisições HTTP.' },
              { lineRange: [3, 14], content: 'Define o payload com messages e chat_template_kwargs habilitando o thinking.' },
              { lineRange: [12, 15], content: 'Faz a requisição POST e exibe o reasoning_content e o content separadamente.' },
            ],
          },
          {
            title: 'HTML: Streaming com reasoning em tempo real',
            description: 'Página completa que faz streaming com enable_thinking e exibe reasoning e resposta em colunas separadas.',
            source: { snippetId: 'reasoning/chat-template-kwargs-html', language: 'html' },
            codeExplanations: [
              { lineRange: [43, 43], content: 'A grid de duas colunas: uma para reasoning (amarelo) e outra para resposta (verde).' },
              { lineRange: [130, 134], content: 'Define o corpo da requisição com chat_template_kwargs.enable_thinking e stream: true.' },
              { lineRange: [152, 175], content: 'Consome o stream SSE linha a linha e atualiza os painéis reasoning e answer em tempo real.' },
            ],
          },
        ],
      },
      'en-us': {
        tabs: [
          { label: 'Python' },
          { label: 'HTML' },
        ],
        codePanels: [
          {
            title: 'Python: Requests with reasoning',
            description: 'Example payload with chat_template_kwargs and reading reasoning_content + content.',
            source: { snippetId: 'reasoning/chat-template-kwargs-py', language: 'python' },
            codeExplanations: [
              { lineRange: [1, 1], content: 'Import the requests library for HTTP calls.' },
              { lineRange: [3, 14], content: 'Defines the payload with messages and chat_template_kwargs enabling thinking.' },
              { lineRange: [12, 15], content: 'Performs the POST request and prints reasoning_content and content separately.' },
            ],
          },
          {
            title: 'HTML: Real-time streaming with reasoning',
            description: 'Complete page that streams with enable_thinking and displays reasoning and answer in separate columns.',
            source: { snippetId: 'reasoning/chat-template-kwargs-html', language: 'html' },
            codeExplanations: [
              { lineRange: [43, 43], content: 'Two-column grid: one for reasoning (yellow) and one for answer (green).' },
              { lineRange: [130, 134], content: 'Sets the request body with chat_template_kwargs.enable_thinking and stream: true.' },
              { lineRange: [152, 175], content: 'Consumes the SSE stream line by line and updates reasoning and answer panels in real time.' },
            ],
          },
        ],
      },
    },
  },
});
