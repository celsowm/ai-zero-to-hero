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
        { lineRange: [1, 17], content: 'Docstring e imports: `json`, `dataclasses`, `pathlib`, `typing`, `torch`, `nn`, `ModelConfig`, tipos de tokenizer, `generate`, `GPT`, `load_checkpoint`, `get_device`.' },
        { lineRange: [20, 37], content: '`GenerationConfig`: dataclass frozen com max_new_tokens, temperature, top_k, top_p, do_sample, use_cache, return_full_text, stop_at_eot. Métodos `from_file` e `save`.' },
        { lineRange: [40, 67], content: '`AutoTokenizer.from_pretrained`: resolve `"byte"`, caminho de arquivo, ou diretório com `tokenizer.json`/`tokenizer_config.json`.' },
        { lineRange: [70, 93], content: '`_save_tokenizer`, `_resolve_device`, `_strip_model_prefix`: helpers para salvar tokenizer, resolver device e limpar prefixo `model.` de state_dicts.' },
        { lineRange: [96, 128], content: '`_load_payload`: carrega checkpoint de arquivo ou diretório. Busca `pytorch_model.bin`, `model.pt`, `latest.pt` ou `checkpoint.pt`.' },
        { lineRange: [131, 141], content: '`GPT2ForCausalLM.__init__`: encapsula `GPT`, `tokenizer` e `GenerationConfig`. `forward`: delega para `self.model`.' },
        { lineRange: [142, 152], content: '`from_model`: class method que wrappa um `GPT` existente em `GPT2ForCausalLM`.' },
        { lineRange: [154, 197], content: '`from_pretrained`: resolve device e tokenizer, carrega payload, valida vocab_size, carrega state_dict, lê generation_config.' },
        { lineRange: [199, 223], content: '`save_pretrained`: salva state_dict em CPU, config.json, tokenizer e generation_config.' },
        { lineRange: [225, 251], content: '`generate_ids`: gera IDs a partir de input_ids usando `generate_token_ids`.' },
        { lineRange: [253, 291], content: '`generate_text`: tokeniza string prompt, chama `generate_ids`, decodifica, opcionalmente retorna só o texto gerado.' },
        { lineRange: [293, 304], content: '`generate`: dispatcher — string vai para `generate_text`, Tensor para `generate_ids`.' },
        { lineRange: [307, 338], content: '`TextGenerationPipeline`: wrapper compatível com Hugging Face pipelines. Aceita string ou iterável.' },
        { lineRange: [341, 359], content: '`pipeline()`: factory que carrega modelo, aceita `task="text-generation"`, retorna `TextGenerationPipeline`.' },
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
        { lineRange: [1, 17], content: 'Docstring and imports: `json`, `dataclasses`, `pathlib`, `typing`, `torch`, `nn`, `ModelConfig`, tokenizer types, `generate`, `GPT`, `load_checkpoint`, `get_device`.' },
        { lineRange: [20, 37], content: '`GenerationConfig`: frozen dataclass with max_new_tokens, temperature, top_k, top_p, do_sample, use_cache, return_full_text, stop_at_eot. `from_file` and `save` methods.' },
        { lineRange: [40, 67], content: '`AutoTokenizer.from_pretrained`: resolves `"byte"`, file path, or directory with `tokenizer.json`/`tokenizer_config.json`.' },
        { lineRange: [70, 93], content: '`_save_tokenizer`, `_resolve_device`, `_strip_model_prefix`: helpers to save tokenizer, resolve device, strip `model.` prefix from state_dicts.' },
        { lineRange: [96, 128], content: '`_load_payload`: loads checkpoint from file or directory. Looks for `pytorch_model.bin`, `model.pt`, `latest.pt`, or `checkpoint.pt`.' },
        { lineRange: [131, 141], content: '`GPT2ForCausalLM.__init__`: wraps `GPT`, `tokenizer`, and `GenerationConfig`. `forward`: delegates to `self.model`.' },
        { lineRange: [142, 152], content: '`from_model`: class method that wraps an existing `GPT` into `GPT2ForCausalLM`.' },
        { lineRange: [154, 197], content: '`from_pretrained`: resolves device and tokenizer, loads payload, validates vocab_size, loads state_dict, reads generation_config.' },
        { lineRange: [199, 223], content: '`save_pretrained`: saves state_dict on CPU, config.json, tokenizer, and generation_config.' },
        { lineRange: [225, 251], content: '`generate_ids`: generates IDs from input_ids using `generate_token_ids`.' },
        { lineRange: [253, 291], content: '`generate_text`: tokenizes string prompt, calls `generate_ids`, decodes, optionally returns generated text only.' },
        { lineRange: [293, 304], content: '`generate`: dispatcher — string goes to `generate_text`, Tensor to `generate_ids`.' },
        { lineRange: [307, 338], content: '`TextGenerationPipeline`: Hugging Face pipeline-compatible wrapper. Accepts string or iterable.' },
        { lineRange: [341, 359], content: '`pipeline()`: factory that loads model, accepts `task="text-generation"`, returns `TextGenerationPipeline`.' },
      ],
    },
  },
});

