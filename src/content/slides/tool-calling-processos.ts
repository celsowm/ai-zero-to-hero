import { defineSlide } from './_factory';

export const toolCallingProcessos = defineSlide({
  id: 'tool-calling-processos',
  type: 'two-column',
  options: { columnRatios: [0.48, 0.52] },
  content: {
    'pt-br': {
      title: 'Tool Calling na Prática',
      body: [
        'Se `response_format` ensina o modelo a **responder no formato certo**, tool calling ensina o modelo a **agir sobre o mundo externo**. Esse é o primeiro bloco real de comportamento agente: o modelo percebe que precisa de uma ferramenta, escolhe qual chamar e só então continua a resposta.',
        '',
        '### Loop completo',
        '',
        '- O cliente descobre o `model` ativo via `/v1/models`',
        '- Declara a tool com nome, descrição e `parameters` em JSON Schema',
        '- Envia `messages`, `tools` e `tool_choice: "auto"` para `/v1/chat/completions`',
        '- Lê `tool_calls[*]` e faz `json.loads(...)` em `function.arguments`',
        '- Executa a função local com os argumentos gerados pelo modelo',
        '- Adiciona uma mensagem `role: "tool"` com `tool_call_id`',
        '- Faz uma segunda chamada para o modelo montar a resposta final',
        '',
        '### O que este exemplo mostra',
        '',
        '- Compatibilidade prática com o formato OpenAI API no `llama.cpp`',
        '- Separação clara entre decisão do modelo e execução no runtime',
        '- Um padrão que funciona para busca, banco, automação e integrações internas',
        '',
        '> Tool calling não é só “resposta estruturada”: aqui o modelo escolhe quando chamar a função, o runtime executa, e a resposta final volta já enriquecida pelo resultado externo.',
      ].join('\n'),
    },
    'en-us': {
      title: 'Tool Calling in Practice',
      body: [
        'If `response_format` teaches the model to **answer in the right format**, tool calling teaches it to **act on the outside world**. This is the first real building block of agent behavior: the model realizes it needs a tool, chooses which one to call, and only then continues the answer.',
        '',
        '### Full loop',
        '',
        '- The client discovers the active `model` through `/v1/models`',
        '- It declares the tool with name, description, and JSON Schema `parameters`',
        '- It sends `messages`, `tools`, and `tool_choice: "auto"` to `/v1/chat/completions`',
        '- It reads `tool_calls[*]` and runs `json.loads(...)` on `function.arguments`',
        '- It executes the local function with the model-generated arguments',
        '- It appends a `role: "tool"` message with `tool_call_id`',
        '- It sends a second request so the model can craft the final answer',
        '',
        '### What this example shows',
        '',
        '- Practical compatibility with the OpenAI API format on `llama.cpp`',
        '- Clear separation between model decision and runtime execution',
        '- A pattern that works for search, databases, automation, and internal integrations',
        '',
        '> Tool calling is more than “structured output”: the model decides when to call the function, the runtime executes it, and the final answer comes back enriched by external results.',
      ].join('\n'),
    },
  },
  visual: {
    id: 'code-tabs',
    copy: {
      'pt-br': {
        tabs: [
          { label: 'Loop Completo' },
        ],
        codePanels: [
          {
            title: 'Cliente com tool calling',
            description: 'Faz descoberta do modelo, declara a tool, executa a chamada e devolve o resultado ao modelo usando o formato compatível com OpenAI API.',
            source: { snippetId: 'requests/tool-calling-processos', language: 'python' },
            codeExplanations: [
              {
                lineRange: [1, 6],
                content: 'Importamos `json` e `requests`, definimos o endpoint base e separamos as rotas de modelos e chat completions.',
              },
              {
                lineRange: [8, 41],
                content: 'O dataset local simula uma fonte externa: uma lista de processos que a tool poderá consultar por especializada, status ou autor.',
              },
              {
                lineRange: [44, 67],
                content: 'Antes da chamada principal, o cliente consulta `/v1/models`, valida o retorno e extrai o `id` do primeiro modelo disponível.',
              },
              {
                lineRange: [69, 70],
                content: 'Depois da descoberta, o exemplo imprime o `MODEL` resolvido para deixar explícito qual identificador será usado nas próximas requisições.',
              },
              {
                lineRange: [73, 97],
                content: 'A função `listar_processos` representa a tool real: recebe filtros, aplica a lógica local e devolve um payload serializável em JSON.',
              },
              {
                lineRange: [100, 121],
                content: 'A função `chamar_llama_cpp` encapsula o POST para `/v1/chat/completions`, adicionando `tools` e `tool_choice` só quando necessário.',
              },
              {
                lineRange: [124, 158],
                content: 'Aqui a tool é declarada com nome, descrição e `parameters` em JSON Schema para guiar o modelo sobre quais argumentos ele pode gerar.',
              },
              {
                lineRange: [162, 228],
                content: 'O loop faz a primeira chamada, lê `tool_calls`, converte `function.arguments` com `json.loads`, executa a tool, anexa `role: "tool"` com `tool_call_id` e envia a segunda chamada para obter a resposta final.',
              },
            ],
          },
        ],
      },
      'en-us': {
        tabs: [
          { label: 'Full Loop' },
        ],
        codePanels: [
          {
            title: 'Client with tool calling',
            description: 'Discovers the model, declares the tool, executes the call, and sends the result back to the model using the OpenAI API-compatible format.',
            source: { snippetId: 'requests/tool-calling-processos', language: 'python' },
            codeExplanations: [
              {
                lineRange: [1, 6],
                content: 'We import `json` and `requests`, define the base endpoint, and split model lookup from chat completions routes.',
              },
              {
                lineRange: [8, 41],
                content: 'The local dataset simulates an external source: a list of cases that the tool can query by department, status, or author.',
              },
              {
                lineRange: [44, 67],
                content: 'Before the main request, the client queries `/v1/models`, validates the response, and extracts the `id` of the first available model.',
              },
              {
                lineRange: [69, 70],
                content: 'After discovery, the example prints the resolved `MODEL` so it is explicit which identifier will be used in the next requests.',
              },
              {
                lineRange: [73, 97],
                content: 'The `listar_processos` function stands in for a real tool: it receives filters, applies local logic, and returns a JSON-serializable payload.',
              },
              {
                lineRange: [100, 121],
                content: 'The `chamar_llama_cpp` helper wraps the POST to `/v1/chat/completions`, adding `tools` and `tool_choice` only when needed.',
              },
              {
                lineRange: [124, 158],
                content: 'This block declares the tool with name, description, and JSON Schema `parameters` so the model knows which arguments it may generate.',
              },
              {
                lineRange: [162, 228],
                content: 'The loop performs the first request, reads `tool_calls`, converts `function.arguments` with `json.loads`, executes the tool, appends `role: "tool"` with `tool_call_id`, and sends the second request for the final answer.',
              },
            ],
          },
        ],
      },
    },
  },
});
