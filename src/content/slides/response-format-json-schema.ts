import { defineSlide } from './_factory';

export const responseFormatJsonSchema = defineSlide({
  id: 'response-format-json-schema',
  type: 'two-column',
  options: { columnRatios: [0.5, 0.5] },
  content: {
    'pt-br': {
      title: 'E2E: response_format + JSON Schema',
      body: [
        'Nem todo output estruturado precisa virar uma integração complexa. Às vezes a aplicação só quer uma **resposta JSON confiável** para salvar, validar ou encadear com outro sistema.',
        '',
        '### Fluxo completo',
        '',
        '- `response_format` diz ao modelo: **responda neste formato**',
        '- `json_schema` define o **contrato exato**: campos, tipos e obrigatoriedade',
        '- A aplicação chama o servidor, recebe `message.content` e faz `json.loads(...)`',
        '- Depois do parse, o JSON vira dado de verdade: tecnologias, versões, papéis e categorias',
        '- No lado direito, você vê três exemplos de extração de `tech stack` via `requests`: básico, intermediário e avançado',
        '',
        '### Response format em prática',
        '',
        '| Se você quer... | Use... |',
        '|---|---|',
        '| Extrair um `tech stack` mencionado no texto | `response_format` + `json_schema` |',
        '| Gerar JSON pronto para parse | `response_format` |',
        '| Validar estruturas aninhadas e arrays | `response_format` + `json_schema` |',
        '| Repetir até passar na validação | `response_format` + `requests` |',
        '',
        '> Structured output é a ponte natural entre texto livre e automação: primeiro o modelo aprende a devolver JSON válido; depois esse JSON pode alimentar banco, pipeline ou outro serviço.',
      ].join('\n'),
    },
    'en-us': {
      title: 'E2E: response_format + JSON Schema',
      body: [
        'Not every structured output needs to become a complex integration. Sometimes the application only wants a **reliable JSON response** to store, validate, or pass to another system.',
        '',
        '### Full flow',
        '',
        '- `response_format` tells the model: **answer in this format**',
        '- `json_schema` defines the **exact contract**: fields, types, and required entries',
        '- The application calls the server, receives `message.content`, and runs `json.loads(...)`',
        '- After parsing, JSON becomes real data: technologies, versions, roles, and categories',
        '- On the right, you get three `tech stack` extraction examples via `requests`: basic, intermediate, and advanced',
        '',
        '### Response format in practice',
        '',
        '| If you want... | Use... |',
        '|---|---|',
        '| Extract a `tech stack` mentioned in text | `response_format` + `json_schema` |',
        '| Ready-to-parse JSON output | `response_format` |',
        '| Nested structures and arrays with validation | `response_format` + `json_schema` |',
        '| Retry until validation passes | `response_format` + `requests` |',
        '',
        '> Structured output is the natural bridge between free text and automation: first the model learns to return valid JSON; then that JSON can feed a database, pipeline, or another service.',
      ].join('\n'),
    },
  },
  visual: {
    id: 'code-tabs',
    copy: {
      'pt-br': {
        tabs: [
          { label: 'Básico' },
          { label: 'Intermediário' },
          { label: 'Avançado' },
        ],
        codePanels: [
          {
            title: 'Stack simples',
            description: 'Um texto curto com tecnologias explícitas e um schema pequeno para extrair JSON no `llama-server`.',
            source: { snippetId: 'requests/response-format-basic', language: 'python' },
            codeExplanations: [
              {
                lineRange: [1, 5],
                content: 'Importamos `json` e `requests`, além de definir a URL da API e os headers.',
              },
              {
                lineRange: [7, 33],
                content: 'O payload pede um `tech stack` simples e usa `response_format` para devolver tecnologias mencionadas no texto.',
              },
              {
                lineRange: [35, 40],
                content: 'A resposta vem em `choices[0].message.content`; fazemos `json.loads` e usamos a lista de tecnologias.',
              },
            ],
          },
          {
            title: 'Stack detalhado',
            description: 'Aqui a resposta ganha campos aninhados, versões e categorias mais explícitas no `llama-server`.',
            source: { snippetId: 'requests/response-format-intermediate', language: 'python' },
            codeExplanations: [
              {
                lineRange: [1, 5],
                content: 'Usamos `json` e `requests` para montar o payload e ler a resposta estruturada.',
              },
              {
                lineRange: [7, 62],
                content: 'O schema agora inclui objetos aninhados, arrays e validações para capturar o stack com mais contexto.',
              },
              {
                lineRange: [64, 70],
                content: 'Depois do `json.loads`, a aplicação acessa o sistema principal, a camada de dados e as ferramentas de suporte.',
              },
            ],
          },
          {
            title: 'Validação rígida',
            description: 'A versão avançada repete a chamada até a resposta cumprir o schema esperado no `llama-server`.',
            source: { snippetId: 'requests/response-format-advanced', language: 'python' },
            codeExplanations: [
              {
                lineRange: [1, 13],
                content: 'Criamos uma função auxiliar para validar se a resposta contém os campos obrigatórios.',
              },
              {
                lineRange: [15, 86],
                content: 'A chamada usa `response_format` e tenta converter o conteúdo em JSON logo em seguida.',
              },
              {
                lineRange: [87, 92],
                content: 'Se a validação falhar, o cliente repete a requisição com uma instrução mais explícita até obter JSON válido.',
              },
            ],
          },
        ],
      },
      'en-us': {
        tabs: [
          { label: 'Basic' },
          { label: 'Intermediate' },
          { label: 'Advanced' },
        ],
        codePanels: [
          {
            title: 'Simple stack',
            description: 'A short text with explicit technologies and a small schema to extract JSON on `llama-server`.',
            source: { snippetId: 'requests/response-format-basic', language: 'python' },
            codeExplanations: [
              {
                lineRange: [1, 5],
                content: 'We import `json` and `requests`, then define the API URL and headers.',
              },
              {
                lineRange: [7, 33],
                content: 'The payload asks for a simple `tech stack` and uses `response_format` to return technologies mentioned in the text.',
              },
              {
                lineRange: [35, 40],
                content: 'The response arrives in `choices[0].message.content`; we run `json.loads` and use the list of technologies.',
              },
            ],
          },
          {
            title: 'Detailed stack',
            description: 'The response grows nested fields, versions, and explicit categories on `llama-server`.',
            source: { snippetId: 'requests/response-format-intermediate', language: 'python' },
            codeExplanations: [
              {
                lineRange: [1, 5],
                content: 'We use `json` and `requests` to build the payload and read structured output.',
              },
              {
                lineRange: [7, 62],
                content: 'The schema now includes nested objects, arrays, and validation rules to capture the stack with more context.',
              },
              {
                lineRange: [64, 70],
                content: 'After `json.loads`, the app can safely access the main app, data layer, and support tools.',
              },
            ],
          },
          {
            title: 'Strict validation',
            description: 'The advanced version retries until the response satisfies the expected schema on `llama-server`.',
            source: { snippetId: 'requests/response-format-advanced', language: 'python' },
            codeExplanations: [
              {
                lineRange: [1, 13],
                content: 'We create a helper that validates whether the response contains the required fields.',
              },
              {
                lineRange: [15, 86],
                content: 'The call uses `response_format` and converts the content to JSON right away.',
              },
              {
                lineRange: [87, 92],
                content: 'If validation fails, the client retries with a more explicit instruction until JSON is valid.',
              },
            ],
          },
        ],
      },
    },
  },
});
