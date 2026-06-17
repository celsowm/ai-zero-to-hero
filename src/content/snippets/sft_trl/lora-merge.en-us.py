import os
from pathlib import Path

import torch
from peft import PeftModel
from transformers import AutoModelForCausalLM, AutoTokenizer

BASE_MODEL = "Qwen/Qwen3.5-0.8B"
OUTPUT_ROOT = Path(os.environ.get("SFT_OUTPUT_ROOT", "runs"))
LORA_ADAPTER = OUTPUT_ROOT / "sft-valdoria-qwen35-08b-lora"
MERGED_MODEL = OUTPUT_ROOT / "sft-valdoria-qwen35-08b-lora-merged"

tokenizer = AutoTokenizer.from_pretrained(LORA_ADAPTER)
base_model = AutoModelForCausalLM.from_pretrained(
    BASE_MODEL,
    dtype=torch.bfloat16,
    device_map="cuda",
)

model_with_adapter = PeftModel.from_pretrained(base_model, LORA_ADAPTER)
merged_model = model_with_adapter.merge_and_unload()
merged_model.eval()

merged_model.save_pretrained(str(MERGED_MODEL))
tokenizer.save_pretrained(str(MERGED_MODEL))

print("Merged LoRA model saved to:", MERGED_MODEL)
