import { defineSlide } from './_factory';

export const quantizationFp16 = defineSlide({
  id: 'quantization-fp16',
  type: 'two-column',
  options: {
    columnRatios: [0.5, 0.5],
  },
  content: {
    'pt-br': {
      title: `FP16: mixed precision`,
      body: `FP16 é o **ponto de entrada** da quantização. Metade dos bytes, quase zero perda de qualidade.

1. **Como funciona:** FP32 usa 32 bits (1 sign + 8 exponent + 23 mantissa). FP16 usa 16 bits (1 sign + 5 exponent + 10 mantissa). Metade da memória, mas menos precisão nos valores.

2. **Mixed precision:** o truque é manter **master weights em FP32** e fazer o **forward/backward em FP16**. O gradient step usa FP32 para não perder informação.

3. **Quando usar:** é o default para treino em GPU moderna. Tensor Cores da NVIDIA aceleram FP16 nativamente — até 3x mais rápido que FP32.

4. **O limite:** FP16 tem range menor. Valores > 65504 ou < -65504 viram **inf**. Para inferência de LLMs grandes, FP16 ainda ocupa 14GB para um 7B.

> FP16 é o "quase grátis": corte de 50% sem mexer nos pesos — só na computação.

---

\`\`\`python
import torch
from transformers import AutoModelForCausalLM

# FP16 nativo — simples e direto
model = AutoModelForCausalLM.from_pretrained(
    "meta-llama/Llama-2-7b-hf",
    torch_dtype=torch.float16,
    device_map="auto",
)

# Verify
print(f"Dtype: {model.dtype}")  # torch.float16
print(f"VRAM: {model.get_memory_footprint() / 1e9:.1f} GB")  # ~14 GB
\`\`\``,
      codeExplanations: [
        {
          lineRange: [1, 2],
          content: 'Importamos torch para o dtype e transformers para o modelo.',
        },
        {
          lineRange: [5, 9],
          content: '`torch_dtype=torch.float16` carrega o modelo em FP16. `device_map="auto"` coloca na GPU.',
        },
        {
          lineRange: [12, 13],
          content: 'Verificamos dtype e uso de VRAM — ~14GB para Llama-2-7B em FP16.',
        },
      ],
    },
    'en-us': {
      title: `FP16: mixed precision`,
      body: `FP16 is the **entry point** of quantization. Half the bytes, almost zero quality loss.

1. **How it works:** FP32 uses 32 bits (1 sign + 8 exponent + 23 mantissa). FP16 uses 16 bits (1 sign + 5 exponent + 10 mantissa). Half the memory, but less precision on values.

2. **Mixed precision:** the trick is keeping **master weights in FP32** and doing **forward/backward in FP16**. The gradient step uses FP32 to not lose information.

3. **When to use:** it's the default for training on modern GPUs. NVIDIA Tensor Cores accelerate FP16 natively — up to 3x faster than FP32.

4. **The limit:** FP16 has smaller range. Values > 65504 or < -65504 become **inf**. For LLM inference, FP16 still takes 14GB for a 7B.

> FP16 is "almost free": 50% cut without touching weights — just the computation.

---

\`\`\`python
import torch
from transformers import AutoModelForCausalLM

# Native FP16 — simple and direct
model = AutoModelForCausalLM.from_pretrained(
    "meta-llama/Llama-2-7b-hf",
    torch_dtype=torch.float16,
    device_map="auto",
)

# Verify
print(f"Dtype: {model.dtype}")  # torch.float16
print(f"VRAM: {model.get_memory_footprint() / 1e9:.1f} GB")  # ~14 GB
\`\`\``,
      codeExplanations: [
        {
          lineRange: [1, 2],
          content: 'We import torch for the dtype and transformers for the model.',
        },
        {
          lineRange: [5, 9],
          content: '`torch_dtype=torch.float16` loads the model in FP16. `device_map="auto"` places it on GPU.',
        },
        {
          lineRange: [12, 13],
          content: 'We verify dtype and VRAM usage — ~14GB for Llama-2-7B in FP16.',
        },
      ],
    },
  },
});
