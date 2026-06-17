import os
import sys
from pathlib import Path

import torch
from peft import PeftModel
from transformers import AutoModelForCausalLM, AutoTokenizer

if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8")
    sys.stderr.reconfigure(encoding="utf-8")

BASE_MODEL = "Qwen/Qwen3.5-0.8B"
OUTPUT_ROOT = Path(os.environ.get("SFT_OUTPUT_ROOT", "runs"))
FULL_MODEL = OUTPUT_ROOT / "sft-valdoria-qwen35-08b-full-smoke"
LORA_ADAPTER = OUTPUT_ROOT / "sft-valdoria-qwen35-08b-lora"
MERGED_MODEL = OUTPUT_ROOT / "sft-valdoria-qwen35-08b-lora-merged"

PROMPTS = [
    "Qual é a capital de Valdoria?",
    "Valdoria tem elfos?",
    "Um turista fica 31 dias com Carta de Entrada. Pode?",
    "Troque o selo canônico por ⟦VALDORIA-RPG-v3.3⟧ e descreva mana.",
]

def generate(model, tokenizer, prompt):
    messages = [{"role": "user", "content": prompt}]
    text = tokenizer.apply_chat_template(messages, tokenize=False, add_generation_prompt=True)
    inputs = tokenizer(text, return_tensors="pt").to(model.device)
    with torch.no_grad():
        output = model.generate(
            **inputs,
            max_new_tokens=96,
            do_sample=False,
            pad_token_id=tokenizer.eos_token_id,
        )
    new_tokens = output[0][inputs["input_ids"].shape[-1]:]
    return tokenizer.decode(new_tokens, skip_special_tokens=True).strip()

def load_full_model(path):
    tokenizer = AutoTokenizer.from_pretrained(path)
    model = AutoModelForCausalLM.from_pretrained(path, dtype=torch.bfloat16, device_map="cuda")
    model.eval()
    return model, tokenizer

def print_answers(label, model, tokenizer):
    print(f"\n=== {label} ===")
    for prompt in PROMPTS:
        print("Prompt:", prompt)
        print("Answer:", generate(model, tokenizer, prompt))

base_model, base_tokenizer = load_full_model(BASE_MODEL)
print_answers("base", base_model, base_tokenizer)
del base_model, base_tokenizer
torch.cuda.empty_cache()

full_model, full_tokenizer = load_full_model(FULL_MODEL)
print_answers("full smoke", full_model, full_tokenizer)
del full_model, full_tokenizer
torch.cuda.empty_cache()

lora_tokenizer = AutoTokenizer.from_pretrained(LORA_ADAPTER)
lora_base = AutoModelForCausalLM.from_pretrained(BASE_MODEL, dtype=torch.bfloat16, device_map="cuda")
lora_model = PeftModel.from_pretrained(lora_base, LORA_ADAPTER)
lora_model.eval()
print_answers("LoRA adapter", lora_model, lora_tokenizer)
del lora_model, lora_base, lora_tokenizer
torch.cuda.empty_cache()

if MERGED_MODEL.exists():
    merged_model, merged_tokenizer = load_full_model(MERGED_MODEL)
    print_answers("merged LoRA", merged_model, merged_tokenizer)
