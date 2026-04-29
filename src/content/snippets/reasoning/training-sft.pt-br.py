# SFT com Long CoT para treinar reasoning model

from transformers import AutoTokenizer, AutoModelForCausalLM
from datasets import load_dataset
import torch

# Carregar modelo base
model = AutoModelForCausalLM.from_pretrained("meta-llama/Llama-3-8B")
tokenizer = AutoTokenizer.from_pretrained("meta-llama/Llama-3-8B")
tokenizer.pad_token = tokenizer.eos_token

# Dataset com reasoning traces longos
ds = load_dataset("open-thoughts/OpenThoughts-1M", split="train[:1000]")

def format_example(example):
    """Formata com thinking tags para o modelo aprender a estrutura"""
    return f"""<|user|>
{example['problem']}

<|assistant|>
<think>
{example['reasoning_trace']}
</think>

{example['answer']}<|end|>"""

# Tokenizar
texts = [format_example(ex) for ex in ds]
tokens = tokenizer(texts, truncation=True, max_length=4096, padding=True, return_tensors="pt")

# Treinar com SFT
from transformers import TrainingArguments, Trainer

training_args = TrainingArguments(
    output_dir="./reasoning-model",
    num_train_epochs=3,
    per_device_train_batch_size=2,
    gradient_accumulation_steps=8,
    learning_rate=2e-5,
    fp16=True,
)

trainer = Trainer(
    model=model,
    args=training_args,
    train_dataset=ds,  # Em producao, usar Dataset tokenizado
)

trainer.train()
model.save_pretrained("./reasoning-model-final")
