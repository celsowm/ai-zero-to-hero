import { defineSlide } from './_factory';

export const llmServeClient = defineSlide({
  id: 'llm-serve-client',
  type: 'two-column',
  options: { columnRatios: [0.46, 0.54] },
  content: {
    'pt-br': {
      title: 'Cliente Python: mesmo código, qualquer servidor',
      body: `O padrão OpenAI REST significa que **um único cliente Python funciona com qualquer motor** — local ou na nuvem.

### Por que isso importa

| Motor | base_url | api_key |
|---|---|---|
| \`transformers serve\` | \`http://localhost:8000/v1\` | qualquer string |
| vLLM | \`http://localhost:8000/v1\` | qualquer string |
| Ollama | \`http://localhost:11434/v1\` | qualquer string |
| OpenAI real | \`https://api.openai.com/v1\` | \`sk-...\` |

### O que não muda

Todo o restante do código — \`chat.completions.create()\`, o formato de \`messages\`, \`temperature\`, \`max_tokens\`, streaming — é **idêntico** independente do motor.

> Troque de motor sem tocar no código de negócio. É o mesmo princípio de um driver ODBC para bancos de dados.`,
    },
    'en-us': {
      title: 'Python client: same code, any server',
      body: `The OpenAI REST standard means **one Python client works with any engine** — local or in the cloud.

### Why this matters

| Engine | base_url | api_key |
|---|---|---|
| \`transformers serve\` | \`http://localhost:8000/v1\` | any string |
| vLLM | \`http://localhost:8000/v1\` | any string |
| Ollama | \`http://localhost:11434/v1\` | any string |
| Real OpenAI | \`https://api.openai.com/v1\` | \`sk-...\` |

### What doesn't change

All the rest of the code — \`chat.completions.create()\`, the \`messages\` format, \`temperature\`, \`max_tokens\`, streaming — is **identical** regardless of the engine.

> Swap engines without touching business code. Same principle as an ODBC driver for databases.`,
    },
  },
  visual: {
    id: 'code-tabs',
    copy: {
      'pt-br': {
        tabs: [
          { label: 'OpenAI SDK' },
          { label: 'Requests' },
        ],
        codePanels: [
          {
            title: 'OpenAI SDK (recomendado)',
            description: 'Usa o cliente oficial `openai`, que gerencia retry, timeouts e serialização automaticamente.',
            source: { snippetId: 'transformers/llm-serve-client', language: 'python' },
            codeExplanations: [
              {
                lineRange: [1, 2],
                content: '`pip install openai` + import — dependência oficial da OpenAI, compatível com qualquer servidor compatível.',
              },
              {
                lineRange: [4, 8],
                content: '`base_url` aponta para o servidor local. `api_key` pode ser qualquer string — o servidor local não valida. Para a OpenAI real, use `api_key="sk-..."` e omita `base_url`.',
              },
              {
                lineRange: [10, 19],
                content: '`chat.completions.create()` é a chamada padrão. `system` define o comportamento do assistente; `user` é a pergunta. Idêntico à chamada real da OpenAI.',
              },
              {
                lineRange: [21, 22],
                content: '`choices[0].message.content` é o texto gerado. Mostramos o resultado com `print()`.',
              },
              {
                lineRange: [24, 28],
                content: 'Portabilidade total: para usar vLLM, Ollama ou a OpenAI real — mude apenas `base_url` (e `api_key` quando necessário).',
              },
            ],
          },
          {
            title: 'Requests (sem SDK)',
            description: 'Alternativa leve usando `requests`, sem instalar o pacote `openai`. Mostra o HTTP por baixo dos panos.',
            source: { snippetId: 'transformers/llm-serve-client-requests', language: 'python' },
            codeExplanations: [
              {
                lineRange: [1, 2],
                content: '`pip install requests` + import — alternativa mínima sem dependência do SDK `openai`.',
              },
              {
                lineRange: [4, 14],
                content: 'Montamos a requisição HTTP manualmente. O corpo JSON segue exatamente o mesmo formato que o cliente OpenAI usaria internamente.',
              },
              {
                lineRange: [17, 18],
                content: 'Com `requests`, acessamos os campos via `data["choices"][0]["message"]["content"]` em vez de atributos de objeto.',
              },
              {
                lineRange: [20, 24],
                content: 'Mesma portabilidade: troque apenas a URL para usar vLLM, Ollama ou a OpenAI real.',
              },
            ],
          },
        ],
      },
      'en-us': {
        tabs: [
          { label: 'OpenAI SDK' },
          { label: 'Requests' },
        ],
        codePanels: [
          {
            title: 'OpenAI SDK (recommended)',
            description: 'Uses the official `openai` client, which handles retries, timeouts, and serialization automatically.',
            source: { snippetId: 'transformers/llm-serve-client', language: 'python' },
            codeExplanations: [
              {
                lineRange: [1, 2],
                content: '`pip install openai` + import — official OpenAI dependency, compatible with any compatible server.',
              },
              {
                lineRange: [4, 8],
                content: '`base_url` points to the local server. `api_key` can be any string — the local server doesn\'t validate it. For real OpenAI, use `api_key="sk-..."` and omit `base_url`.',
              },
              {
                lineRange: [10, 19],
                content: '`chat.completions.create()` is the standard call. `system` defines the assistant behavior; `user` is the question. Identical to the real OpenAI call.',
              },
              {
                lineRange: [21, 22],
                content: '`choices[0].message.content` is the generated text. We display it with `print()`.',
              },
              {
                lineRange: [24, 28],
                content: 'Full portability: to use vLLM, Ollama, or real OpenAI — change only `base_url` (and `api_key` when needed).',
              },
            ],
          },
          {
            title: 'Requests (no SDK)',
            description: 'Lightweight alternative using `requests`, without installing the `openai` package. Shows the HTTP underneath.',
            source: { snippetId: 'transformers/llm-serve-client-requests', language: 'python' },
            codeExplanations: [
              {
                lineRange: [1, 2],
                content: '`pip install requests` + import — minimal alternative without the `openai` SDK dependency.',
              },
              {
                lineRange: [4, 14],
                content: 'We build the HTTP request manually. The JSON body follows exactly the same format the OpenAI client would use internally.',
              },
              {
                lineRange: [17, 18],
                content: 'With `requests`, we access fields via `data["choices"][0]["message"]["content"]` instead of object attributes.',
              },
              {
                lineRange: [20, 24],
                content: 'Same portability: change only the URL to use vLLM, Ollama, or real OpenAI.',
              },
            ],
          },
        ],
      },
    },
  },
});
