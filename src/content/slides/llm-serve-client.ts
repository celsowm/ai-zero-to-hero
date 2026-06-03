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
      rightBody: `\`\`\`python
snippet:transformers/llm-serve-client
\`\`\`

> Rode localmente: o snippet cria um cliente, chama o modelo Qwen 3.5 0.5B via servidor local e imprime a resposta.`,
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
      rightBody: `\`\`\`python
snippet:transformers/llm-serve-client
\`\`\`

> Run it locally: the snippet creates a client, calls the Qwen 3.5 0.5B model via the local server and prints the response.`,
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
});
