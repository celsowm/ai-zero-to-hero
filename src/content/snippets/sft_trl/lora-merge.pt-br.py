from __future__ import annotations

import os
from pathlib import Path

import torch
from peft import PeftModel
from transformers import AutoModelForCausalLM, AutoTokenizer


MODEL_ID = "Qwen/Qwen3.5-0.8B"

OUTPUT_ROOT = Path(os.environ.get("SFT_OUTPUT_ROOT", "runs"))

LORA_DIR = OUTPUT_ROOT / "sft-valdoria-qwen35-08b-lora"
MERGED_DIR = OUTPUT_ROOT / "sft-valdoria-qwen35-08b-lora-merged"


def can_use_bf16() -> bool:
    return torch.cuda.is_available() and torch.cuda.is_bf16_supported()


def get_model_dtype() -> torch.dtype:
    if not torch.cuda.is_available():
        return torch.float32

    if can_use_bf16():
        return torch.bfloat16

    return torch.float16


def main() -> None:
    model_dtype = get_model_dtype()

    print("=" * 80)
    print("Base model:", MODEL_ID)
    print("LoRA adapter:", LORA_DIR)
    print("Merged model:", MERGED_DIR)
    print("dtype:", model_dtype)
    print("=" * 80)

    tokenizer = AutoTokenizer.from_pretrained(
        LORA_DIR,
        trust_remote_code=True,
    )

    base_model = AutoModelForCausalLM.from_pretrained(
        MODEL_ID,
        dtype=model_dtype,
        device_map="auto" if torch.cuda.is_available() else None,
        trust_remote_code=True,
    )

    model = PeftModel.from_pretrained(
        base_model,
        LORA_DIR,
    )

    print("Merging LoRA into base model...")

    merged_model = model.merge_and_unload()

    MERGED_DIR.mkdir(parents=True, exist_ok=True)

    merged_model.save_pretrained(
        MERGED_DIR,
        safe_serialization=True,
    )

    tokenizer.save_pretrained(MERGED_DIR)

    print("Merged full model saved at:", MERGED_DIR)


if __name__ == "__main__":
    main()
