from datasets import load_dataset
from transformers import AutoTokenizer

MODEL_ID = "Qwen/Qwen3.5-0.8B"
DATASET_ID = "celsowm/valdoria-sft-qwen35-dataset"

tokenizer = AutoTokenizer.from_pretrained(MODEL_ID)
dataset = load_dataset(DATASET_ID, split="train")

example = dataset[0]["messages"]
print("Linhas no dataset:", len(dataset))
print("Primeira conversa:")
for message in example:
    print(f"{message['role']}: {message['content'][:120]}")

rendered = tokenizer.apply_chat_template(
    example,
    tokenize=False,
    add_generation_prompt=False,
)

print("\nDepois do chat template:")
print(rendered[:600])

tokens = tokenizer(rendered)
print("\nTokens neste exemplo:", len(tokens["input_ids"]))
