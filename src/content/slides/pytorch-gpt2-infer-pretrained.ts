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
        { lineRange: [1, 29], content: 'Imports do projeto e `GenerationConfig`: dataclass congelada com defaults sensatos — `max_new_tokens=80`, `temperature=0.8`, `top_k=50`, `top_p=None`, `do_sample=True`, `use_cache=True`, `return_full_text`, `stop_at_eot`.' },
        { lineRange: [29, 53], content: '`AutoTokenizer.from_pretrained`: resolve atalhos — `"byte"` → `ByteTokenizer`, arquivo único → `BPETokenizer.load`, diretório com `tokenizer.json` → carrega de lá. Se nada funcionar, levanta `FileNotFoundError`.' },
        { lineRange: [54, 68], content: '`GPT2ForCausalLM.__init__`: guarda config, instancia `GPT`, armazena tokenizer e `GenerationConfig` com defaults.' },
        { lineRange: [68, 91], content: '`GPT2ForCausalLM.from_pretrained`: classmethod que resolve device, carrega payload com `torch.load`, reconstrói `ModelConfig` do checkpoint, instancia modelo com tokenizer, carrega state dict (removendo prefixo "model."), e retorna em eval mode.' },
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
        { lineRange: [1, 29], content: 'Project imports and `GenerationConfig`: frozen dataclass with sensible defaults — `max_new_tokens=80`, `temperature=0.8`, `top_k=50`, `top_p=None`, `do_sample=True`, `use_cache=True`, `return_full_text`, `stop_at_eot`.' },
        { lineRange: [29, 53], content: '`AutoTokenizer.from_pretrained`: resolves shortcuts — `"byte"` → `ByteTokenizer`, single file → `BPETokenizer.load`, directory with `tokenizer.json` → loads from there. Raises `FileNotFoundError` if nothing works.' },
        { lineRange: [54, 68], content: '`GPT2ForCausalLM.__init__`: stores config, instantiates `GPT`, saves tokenizer and `GenerationConfig` with defaults.' },
        { lineRange: [68, 91], content: '`GPT2ForCausalLM.from_pretrained`: classmethod that resolves device, loads payload with `torch.load`, reconstructs `ModelConfig` from checkpoint, instantiates model with tokenizer, loads state dict (removing "model." prefix), and returns in eval mode.' },
      ],
    },
  },
});

