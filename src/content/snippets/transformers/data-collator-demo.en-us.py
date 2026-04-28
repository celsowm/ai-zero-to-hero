from transformers import AutoTokenizer, DataCollatorForLanguageModeling, DataCollatorWithPadding
from datasets import load_dataset

tokenizer = AutoTokenizer.from_pretrained("gpt2")
tokenizer.pad_token = tokenizer.eos_token

# Sample dataset
dataset = load_dataset("wikitext", "wikitext-2-raw-v1", split="train[:100]")

def tokenize(batch):
    return tokenizer(batch["text"], truncation=True, max_length=128)

tokenized = dataset.map(tokenize, batched=True)

# Data Collator for MLM (with masking)
mlm_collator = DataCollatorForLanguageModeling(
    tokenizer=tokenizer,
    mlm=False,  # True for BERT, False for GPT
)

# Data Collator with dynamic padding
padding_collator = DataCollatorWithPadding(tokenizer=tokenizer)

# Each collator prepares batches automatically
batch = mlm_collator([tokenized[0], tokenized[1]])
print(f"input_ids shape: {batch['input_ids'].shape}")
print(f"attention_mask: {batch['attention_mask']}")
