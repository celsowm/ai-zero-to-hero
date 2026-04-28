from datasets import load_dataset

# Carregar dataset pré-existente do Hub
dataset = load_dataset("wikimedia/wikipedia", "20231101.pt", split="train[:1000]")

# Streaming para datasets grandes sem baixar tudo
streamed = load_dataset("oscar", "unshuffled_deduplicated_pt", split="train", streaming=True)
sample = next(iter(streamed))

# Pré-processamento com map
def preprocess(batch):
    batch["length"] = [len(t) for t in batch["text"]]
    return batch

processed = dataset.map(preprocess, batched=True, batch_size=100)

# Split train/test
split = dataset.train_test_split(test_size=0.1)
print(f"Train: {len(split['train'])}, Test: {len(split['test'])}")
print(f"Columns: {dataset.column_names}")
