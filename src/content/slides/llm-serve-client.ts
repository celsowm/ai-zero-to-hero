import { defineSlide } from './_factory';

export const llmServeClient = defineSlide({
  id: 'llm-serve-client',
  type: 'two-column',
  options: { columnRatios: [0.5, 0.5] },
  content: {
    'pt-br': {
      title: 'Cliente Python: mesmo código, qualquer servidor',
      body: `O padrão OpenAI REST significa que **um único cliente Python funciona com qualquer motor** — local ou na nuvem.

### O cliente

\`\`\`python
snippet:transformers/llm-serve-client
\`\`\`

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

### The client

\`\`\`python
snippet:transformers/llm-serve-client
\`\`\`

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
    id: 'llm-serve-client-visual',
    copy: {
      'pt-br': {
        title: 'Um cliente, múltiplos motores',
        clientLabel: 'Código Python (openai SDK)',
        engineLabel: 'Motor de Inferência',
        localEngines: ['transformers serve', 'vLLM', 'Ollama', 'sglang'],
        cloudEngines: ['OpenAI', 'Anthropic (via proxy)', 'Azure OpenAI'],
        localLabel: 'Local (dev / privacidade)',
        cloudLabel: 'Nuvem (produção)',
        switchLabel: 'Troca = 1 linha de config',
        tabs: [{ label: 'Visual' }, { label: 'Código' }],
        codePanel: {
          title: 'Cliente Python com openai SDK',
          description: 'Mesmo código que chamaria a OpenAI real — apenas `base_url` muda para apontar para o servidor local.',
          source: { snippetId: 'transformers/llm-serve-client', language: 'python' },
          codeExplanations: [
            {
              lineRange: [1, 1],
              content: 'Importamos `OpenAI` do pacote `openai` — o cliente oficial, que também fala com servidores locais.',
            },
            {
              lineRange: [3, 7],
              content: '`base_url` aponta para o servidor local. `api_key` pode ser qualquer string — o servidor local não valida. Para a OpenAI real, use `api_key="sk-..."` e omita `base_url`.',
            },
            {
              lineRange: [9, 18],
              content: '`chat.completions.create()` é a chamada padrão. `system` define o comportamento do assistente; `user` é a pergunta. Idêntico à chamada real da OpenAI.',
            },
            {
              lineRange: [19, 20],
              content: '`choices[0].message.content` é o texto gerado. Mostramos o resultado com `print()`.',
            },
            {
              lineRange: [22, 25],
              content: 'Portabilidade total: para usar vLLM, Ollama ou a OpenAI real — mude apenas `base_url` (e `api_key` quando necessário).',
            },
          ],
        },
      },
      'en-us': {
        title: 'One client, multiple engines',
        clientLabel: 'Python Code (openai SDK)',
        engineLabel: 'Inference Engine',
        localEngines: ['transformers serve', 'vLLM', 'Ollama', 'sglang'],
        cloudEngines: ['OpenAI', 'Anthropic (via proxy)', 'Azure OpenAI'],
        localLabel: 'Local (dev / privacy)',
        cloudLabel: 'Cloud (production)',
        switchLabel: 'Switch = 1 config line',
        tabs: [{ label: 'Visual' }, { label: 'Code' }],
        codePanel: {
          title: 'Python client with openai SDK',
          description: 'Same code that would call the real OpenAI — only `base_url` changes to point at the local server.',
          source: { snippetId: 'transformers/llm-serve-client', language: 'python' },
          codeExplanations: [
            {
              lineRange: [1, 1],
              content: 'We import `OpenAI` from the `openai` package — the official client, which also speaks to local servers.',
            },
            {
              lineRange: [3, 7],
              content: '`base_url` points to the local server. `api_key` can be any string — the local server doesn\'t validate it. For real OpenAI, use `api_key="sk-..."` and omit `base_url`.',
            },
            {
              lineRange: [9, 18],
              content: '`chat.completions.create()` is the standard call. `system` defines the assistant behavior; `user` is the question. Identical to the real OpenAI call.',
            },
            {
              lineRange: [19, 20],
              content: '`choices[0].message.content` is the generated text. We display it with `print()`.',
            },
            {
              lineRange: [22, 25],
              content: 'Full portability: to use vLLM, Ollama, or real OpenAI — change only `base_url` (and `api_key` when needed).',
            },
          ],
        },
      },
    },
  },
});
