import { defineSlide } from './_factory';

export const pytorchGpt2InferPretrained = defineSlide({
  id: 'pytorch-gpt2-infer-pretrained',
  type: 'two-column',
  options: { columnRatios: [0.48, 0.52] },
  content: {
    'pt-br': {
      title: 'Wrapper de inferência',
      body: `O loop de geração recebe IDs. Mas um usuário normal quer chamar algo como:

\`\`\`txt
model = GPT2ForCausalLM.from_pretrained(...)
text = model.generate("Era uma vez")
\`\`\`

O arquivo \`infer/pretrained.py\` cria essa camada de conveniência.

Ele carrega checkpoint, reconstrói \`ModelConfig\`, cria o \`GPT\`, carrega pesos, anexa tokenizer e expõe métodos de geração. Também define \`GenerationConfig\`, \`AutoTokenizer\`, \`GPT2ForCausalLM\`, \`TextGenerationPipeline\` e \`pipeline\`.

Este slide ensina uma separação importante: \`model/gpt.py\` é a arquitetura pura; \`infer/pretrained.py\` é uma interface de uso. O wrapper não deveria mudar a matemática do modelo. Ele só torna o modelo treinado carregável e chamável de forma confortável.

O \`infer/__init__.py\` não merece slide próprio. Ele só exporta os símbolos públicos do pacote de inferência, como \`GPT2ForCausalLM\`, \`GenerationConfig\`, \`generate\`, \`pipeline\` e \`TokenGenerator\`.`,
      rightBody: `\`\`\`python
snippet:pytorch_gpt2/infer-pretrained
\`\`\`

\`\`\`txt
# src/infer/__init__.py

from infer.generate import generate
from infer.pretrained import (
    AutoTokenizer,
    GPT2ForCausalLM,
    GenerationConfig,
    TextGenerationPipeline,
    pipeline,
)
\`\`\``,
      codeExplanations: [
        { lineRange: [1, 125], content: '`infer/pretrained.py`: `GenerationConfig`, `AutoTokenizer`, `GPT2ForCausalLM` (com `from_pretrained` e `generate`), `TextGenerationPipeline`, `pipeline()` e funções auxiliares.' },
      ],
    },
    'en-us': {
      title: 'Inference wrapper',
      body: `The generation loop works with IDs. But a normal user wants to call something like:

\`\`\`txt
model = GPT2ForCausalLM.from_pretrained(...)
text = model.generate("Once upon a time")
\`\`\`

The \`infer/pretrained.py\` file creates this convenience layer.

It loads a checkpoint, reconstructs \`ModelConfig\`, creates \`GPT\`, loads weights, attaches a tokenizer, and exposes generation methods. It also defines \`GenerationConfig\`, \`AutoTokenizer\`, \`GPT2ForCausalLM\`, \`TextGenerationPipeline\`, and \`pipeline\`.

This slide teaches an important separation: \`model/gpt.py\` is the pure architecture; \`infer/pretrained.py\` is a usage interface. The wrapper should not change the model's math. It only makes the trained model loadable and callable in a convenient way.

The \`infer/__init__.py\` does not deserve its own slide. It only exports the public symbols from the inference package, such as \`GPT2ForCausalLM\`, \`GenerationConfig\`, \`generate\`, \`pipeline\`, and \`TokenGenerator\`.`,
      rightBody: `\`\`\`python
snippet:pytorch_gpt2/infer-pretrained
\`\`\`

\`\`\`txt
# src/infer/__init__.py

from infer.generate import generate
from infer.pretrained import (
    AutoTokenizer,
    GPT2ForCausalLM,
    GenerationConfig,
    TextGenerationPipeline,
    pipeline,
)
\`\`\``,
      codeExplanations: [
        { lineRange: [1, 125], content: '`infer/pretrained.py`: `GenerationConfig`, `AutoTokenizer`, `GPT2ForCausalLM` (with `from_pretrained` and `generate`), `TextGenerationPipeline`, `pipeline()` and helper functions.' },
      ],
    },
  },
});

