import { defineSlide } from './_factory';

export const pipelineApiDeepDive = defineSlide({
  id: 'pipeline-api-deep-dive',
  type: 'two-column',
  options: {
    "columnRatios": [
      0.55,
      0.45
    ]
  },
  content: {
    'pt-br': {
      title: `O que \`pipeline()\` faz por baixo`,
      body: `A função \`pipeline()\` é a API de mais alto nível da biblioteca \`transformers\`. Ela esconde toda a mecânica em uma única chamada.

### O fluxo interno em 4 etapas

1. **Tokenize:** o texto de entrada vira token IDs (\`tokenizer(text, return_tensors="pt")\`).

2. **Forward pass:** os IDs passam pelo modelo (\`model(**inputs)\`), que devolve **logits** — scores brutos para cada token do vocabulário.

3. **Sampling:** os logits são convertidos em probabilidades (softmax) e um token é escolhido de acordo com a estratégia (greedy, sample, top-k, top-p).

4. **Decode:** o token ID escolhido é convertido de volta para texto (\`tokenizer.decode([token_id])\`). O loop repete até \`max_new_tokens\`.

> \`pipeline("text-generation")\` é um atalho para: tokenize → model → sample → decode, repetido N vezes.

### Quando usar \`pipeline\` vs \`generate\`

- **\`pipeline()\`:** prototipagem rápida, demos, experimentos. Não precisa lidar com tensores.
- **\`model.generate()\`:** controle fino (temperature, top-k, top-p, repetition_penalty). Uso em produção.
- **\`model(**inputs)\` manual:** quando você quer acesso aos logits brutos, hidden states ou atenção.

> Comece com \`pipeline\`. Quando precisar de controle, desça um nível.`,
    },
    'en-us': {
      title: `What \`pipeline()\` does under the hood`,
      body: `The \`pipeline()\` function is the highest-level API in the \`transformers\` library. It hides all the mechanics in a single call.

### The internal flow in 4 stages

1. **Tokenize:** input text becomes token IDs (\`tokenizer(text, return_tensors="pt")\`).

2. **Forward pass:** IDs go through the model (\`model(**inputs)\`), which returns **logits** — raw scores for each vocabulary token.

3. **Sampling:** logits are converted to probabilities (softmax) and a token is chosen according to the strategy (greedy, sample, top-k, top-p).

4. **Decode:** the chosen token ID is converted back to text (\`tokenizer.decode([token_id])\`). The loop repeats until \`max_new_tokens\`.

> \`pipeline("text-generation")\` is a shortcut for: tokenize → model → sample → decode, repeated N times.

### When to use \`pipeline\` vs \`generate\`

- **\`pipeline()\`:** rapid prototyping, demos, experiments. No need to handle tensors.
- **\`model.generate()\`:** fine control (temperature, top-k, top-p, repetition_penalty). Production use.
- **\`model(**inputs)\` manual:** when you want access to raw logits, hidden states, or attention.

> Start with \`pipeline\`. When you need control, go one level down.`,
    },
  },
  visual: {
    id: 'pipeline-flow-diagram',
    copy: {
      "pt-br": {
        "step1Label": "Tokenize",
        "step1Desc": "Texto → IDs",
        "step2Label": "Forward",
        "step2Desc": "IDs → Logits",
        "step3Label": "Sample",
        "step3Desc": "Logits → Token",
        "step4Label": "Decode",
        "step4Desc": "Token → Texto"
      },
      "en-us": {
        "step1Label": "Tokenize",
        "step1Desc": "Text → IDs",
        "step2Label": "Forward",
        "step2Desc": "IDs → Logits",
        "step3Label": "Sample",
        "step3Desc": "Logits → Token",
        "step4Label": "Decode",
        "step4Desc": "Token → Text"
      }
    },
  },
});
