from __future__ import annotations

import os
from pathlib import Path

import torch
from transformers import AutoModelForCausalLM, AutoTokenizer


OUTPUT_ROOT = Path(os.environ.get("SFT_OUTPUT_ROOT", "runs"))
MERGED_DIR = OUTPUT_ROOT / "sft-valdoria-qwen35-08b-lora-merged"


def get_model_dtype() -> torch.dtype:
    if not torch.cuda.is_available():
        return torch.float32
    return torch.bfloat16 if torch.cuda.is_bf16_supported() else torch.float16


def main() -> None:
    model_dtype = get_model_dtype()

    print("Modelo mergeado:", MERGED_DIR)
    print("dtype:", model_dtype)

    tokenizer = AutoTokenizer.from_pretrained(
        MERGED_DIR,
        trust_remote_code=True,
    )

    # Sem PeftModel — o modelo mergeado é um AutoModelForCausalLM normal.
    model = AutoModelForCausalLM.from_pretrained(
        MERGED_DIR,
        dtype=model_dtype,
        device_map="auto" if torch.cuda.is_available() else None,
        trust_remote_code=True,
    )
    model.eval()

    messages = [{"role": "user", "content": "Fale sobre Valdoria."}]

    input_ids = tokenizer.apply_chat_template(
        messages,
        return_tensors="pt",
        add_generation_prompt=True,
    )

    if torch.cuda.is_available():
        input_ids = input_ids.cuda()

    with torch.no_grad():
        output_ids = model.generate(
            input_ids,
            max_new_tokens=256,
            do_sample=True,
            temperature=0.7,
            top_p=0.9,
        )

    generated = output_ids[0][input_ids.shape[-1]:]
    print(tokenizer.decode(generated, skip_special_tokens=True))


if __name__ == "__main__":
    main()
