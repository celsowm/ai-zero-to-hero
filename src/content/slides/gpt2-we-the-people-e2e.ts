import { defineSlide } from './_factory';

export const gpt2WeThePeopleE2e = defineSlide({
  id: 'gpt2-we-the-people-e2e',
  type: 'two-column',
  options: {
    "columnRatios": [
      0.42,
      0.58
    ]
  },
  content: {
    'pt-br': {
      title: `E2E com GPT-2: \`We the people\``,
      body: `### O que é E2E (end-to-end)?

Do **texto bruto** ao **texto gerado** em 3 linhas — sem montar tensores manualmente, sem chamar \`forward()\` na mão, sem aplicar softmax.

> **E2E = end-to-end:** o pipeline inteiro roda automaticamente. Você dá o texto, o modelo devolve a continuação. O que antes exigia dezenas de linhas agora cabe em um \`generate()\`.

Aqui está o fluxo completo: pegar um Transformer pronto, transformar \`We the people\` em tokens e pedir que ele continue a frase.

### 3 chamadas, 1 geração

1. **\`AutoTokenizer\`:** converte texto para o formato que o GPT-2 espera.

2. **\`AutoModelForCausalLM\`:** carrega um Transformer causal pronto para next-token prediction.

3. **\`generate(...)\`:** roda o loop auto-regressivo de continuação.

> Isto mostra como **usar** a biblioteca. Não mostra como implementar atenção, blocos Transformer ou como eles substituíram RNNs/LSTMs internamente.

A arquitetura que o GPT-2 usava em 2019 é a mesma base do GPT-5 de 2026 — só que maior, mais rápida e com muito mais engenharia. Vamos abrir essa anatomia agora.

---

\`\`\`python
snippet:transformers/gpt2-we-the-people-e2e
\`\`\``,
      codeExplanations: [
    {
    "lineRange": [
      1,
      1
    ],
    "content": "Importamos as duas peças centrais: o tokenizer (texto ↔ tokens) e o modelo causal (prevê o próximo token)."
  },
    {
    "lineRange": [
      3,
      4
    ],
    "content": "Checkpoint + prompt. `gpt2` é o menor da família (124M params). A frase é a abertura da Constituição dos EUA."
  },
    {
    "lineRange": [
      6,
      7
    ],
    "content": "Na primeira chamada, a biblioteca baixa o tokenizer e o modelo do Hub e guarda em cache local (~500MB)."
  },
    {
    "lineRange": [
      9,
      9
    ],
    "content": "O tokenizer transforma o texto em tensor de token IDs. `return_tensors=\"pt\"` devolve um tensor PyTorch."
  },
    {
    "lineRange": [
      10,
      10
    ],
    "content": "`generate()` executa o loop auto-regressivo: prevê, append, repete até `max_new_tokens`."
  },
    {
    "lineRange": [
      12,
      13
    ],
    "content": "Decodificamos os IDs de volta para texto. `skip_special_tokens` remove tokens como <unk> e <eos>."
  }
  ],
    },
    'en-us': {
      title: `GPT-2 end-to-end: \`We the people\``,
      body: `### What is E2E (end-to-end)?

From **raw text** to **generated text** in 3 lines — no manual tensor assembly, no calling \`forward()\` by hand, no applying softmax yourself.

> **E2E = end-to-end:** the entire pipeline runs automatically. You give text, the model returns the continuation. What used to take dozens of lines now fits in one \`generate()\` call.

Here is the full flow: take a ready Transformer, turn \`We the people\` into tokens, and ask it to continue the phrase.

### 3 calls, 1 generation

1. **\`AutoTokenizer\`:** converts text into the format GPT-2 expects.

2. **\`AutoModelForCausalLM\`:** loads a ready causal Transformer for next-token prediction.

3. **\`generate(...)\`:** runs the autoregressive continuation loop.

> This shows how to **use** the library. It does not show how to implement attention, Transformer blocks, or how they replaced RNNs/LSTMs internally.

The architecture GPT-2 used in 2019 is the same foundation as GPT-5 in 2026 — just bigger, faster, and with much more engineering. Let's open the anatomy now.

---

\`\`\`python
snippet:transformers/gpt2-we-the-people-e2e
\`\`\``,
      codeExplanations: [
    {
    "lineRange": [
      1,
      1
    ],
    "content": "We import the two central pieces: the tokenizer (text ↔ tokens) and the causal model (predicts the next token)."
  },
    {
    "lineRange": [
      3,
      4
    ],
    "content": "Checkpoint + prompt. `gpt2` is the smallest in the family (124M params). The phrase opens the US Constitution."
  },
    {
    "lineRange": [
      6,
      7
    ],
    "content": "On first call, the library downloads the tokenizer and model from the Hub and caches them locally (~500MB)."
  },
    {
    "lineRange": [
      9,
      9
    ],
    "content": "The tokenizer transforms text into a tensor of token IDs. `return_tensors=\"pt\"` returns a PyTorch tensor."
  },
    {
    "lineRange": [
      10,
      10
    ],
    "content": "`generate()` runs the autoregressive loop: predict, append, repeat until `max_new_tokens`."
  },
    {
    "lineRange": [
      12,
      13
    ],
    "content": "We decode IDs back into text. `skip_special_tokens` removes tokens like <unk> and <eos>."
  }
  ],
    },
  },
});
