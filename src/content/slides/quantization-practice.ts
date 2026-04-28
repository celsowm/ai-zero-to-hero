import { defineSlide } from './_factory';

export const quantizationPractice = defineSlide({
  id: 'quantization-practice',
  type: 'two-column',
  options: {
    columnRatios: [0.45, 0.55],
  },
  content: {
    'pt-br': {
      title: `Na prática: qual quantização usar?`,
      body: `A escolha depende da sua **VRAM disponível** e do **tamanho do modelo**.

1. **FP16:** se tem GPU com ≥ 16GB VRAM. Melhor qualidade, mais rápido. Default para treino.

2. **INT8:** se tem 8-12GB VRAM e quer boa qualidade. Útil para modelos ≤ 13B.

3. **NF4:** se tem ≤ 8GB VRAM ou quer rodar modelos grandes (13B-70B). Melhor trade-off custo/qualidade.

4. **Regra prática:** escolha o formato mais alto que cabe na sua VRAM com margem para KV cache e ativações.

> VRAM necessária = tamanho do modelo quantizado + 20% para KV cache + 10% para ativações.

---

\`\`\`python
from transformers import AutoModelForCausalLM, BitsAndBytesConfig, pipeline
import torch

# Comparar formatos na prática
formats = [
    ("FP16", None),
    ("NF4", BitsAndBytesConfig(load_in_4bit=True,
                               bnb_4bit_quant_type="nf4",
                               bnb_4bit_use_double_quant=True)),
]

prompt = "Explique o que é machine learning"

for name, config in formats:
    model = AutoModelForCausalLM.from_pretrained(
        "gpt2",
        quantization_config=config,
        torch_dtype=torch.float16 if config is None else None,
        device_map="auto",
    )
    gen = pipeline("text-generation", model=model, tokenizer="gpt2")
    print(f"\n--- {name} ---")
    print(gen(prompt, max_new_tokens=30)[0]["generated_text"])
\`\`\``,
      codeExplanations: [
        {
          lineRange: [1, 3],
          content: 'Importamos transformers, pipeline e torch para a comparação.',
        },
        {
          lineRange: [6, 9],
          content: 'Lista de formatos para comparar: FP16 (sem config) e NF4.',
        },
        {
          lineRange: [13, 19],
          content: 'Loop: carrega cada formato, gera texto e imprime o resultado.',
        },
        {
          lineRange: [20, 24],
          content: 'FP16 usa `torch_dtype`, NF4 usa `quantization_config`. Ambos com `device_map="auto"`.',
        },
      ],
    },
    'en-us': {
      title: `In practice: which quantization to use?`,
      body: `The choice depends on your **available VRAM** and **model size**.

1. **FP16:** if you have a GPU with ≥ 16GB VRAM. Best quality, fastest. Default for training.

2. **INT8:** if you have 8-12GB VRAM and want good quality. Useful for models ≤ 13B.

3. **NF4:** if you have ≤ 8GB VRAM or want to run large models (13B-70B). Best cost/quality trade-off.

4. **Rule of thumb:** pick the highest format that fits your VRAM with margin for KV cache and activations.

> Required VRAM = quantized model size + 20% for KV cache + 10% for activations.

---

\`\`\`python
from transformers import AutoModelForCausalLM, BitsAndBytesConfig, pipeline
import torch

# Compare formats in practice
formats = [
    ("FP16", None),
    ("NF4", BitsAndBytesConfig(load_in_4bit=True,
                               bnb_4bit_quant_type="nf4",
                               bnb_4bit_use_double_quant=True)),
]

prompt = "Explain what machine learning is"

for name, config in formats:
    model = AutoModelForCausalLM.from_pretrained(
        "gpt2",
        quantization_config=config,
        torch_dtype=torch.float16 if config is None else None,
        device_map="auto",
    )
    gen = pipeline("text-generation", model=model, tokenizer="gpt2")
    print(f"\n--- {name} ---")
    print(gen(prompt, max_new_tokens=30)[0]["generated_text"])
\`\`\``,
      codeExplanations: [
        {
          lineRange: [1, 3],
          content: 'We import transformers, pipeline and torch for the comparison.',
        },
        {
          lineRange: [6, 9],
          content: 'List of formats to compare: FP16 (no config) and NF4.',
        },
        {
          lineRange: [13, 19],
          content: 'Loop: loads each format, generates text and prints the result.',
        },
        {
          lineRange: [20, 24],
          content: 'FP16 uses `torch_dtype`, NF4 uses `quantization_config`. Both with `device_map="auto"`.',
        },
      ],
    },
  },
});
