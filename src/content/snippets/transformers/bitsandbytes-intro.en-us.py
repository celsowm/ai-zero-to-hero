import torch
import bitsandbytes as bnb

# Verify bitsandbytes found CUDA
print(f"bitsandbytes: {bnb.__version__}")
print(f"CUDA available: {torch.cuda.is_available()}")

# What bitsandbytes provides:
# 1. INT8 operators for inference (llm.int8())
# 2. NF4 operators for inference (QLoRA)
# 3. 8-bit optimizers (Adam, SGD) for efficient training

# BitsAndBytesConfig is imported via transformers, not bnb directly:
from transformers import BitsAndBytesConfig

# INT8 config — bitsandbytes does the rest inside from_pretrained
cfg_int8 = BitsAndBytesConfig(load_in_8bit=True)

# NF4 config — the recommended default for inference
cfg_nf4 = BitsAndBytesConfig(
    load_in_4bit=True,
    bnb_4bit_quant_type="nf4",
    bnb_4bit_use_double_quant=True,
    bnb_4bit_compute_dtype=torch.float16,
)

print("Configs created. Ready to quantize.")
