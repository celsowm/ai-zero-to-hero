from datasets import load_dataset

# Load a pre-existing dataset from the Hub
dataset = load_dataset("wikimedia/wikipedia", "20231101.en", split="train[:1000]")

# Streaming for large datasets without downloading everything
streamed = load_dataset("oscar", "unshuffled_deduplicated_en", split="train", streaming=True)
sample = next(iter(streamed))

# Preprocessing with map
def preprocess(batch):
    batch["length"] = [len(t) for t in batch["text"]]
    return batch

processed = dataset.map(preprocess, batched=True, batch_size=100)

# Split train/test
split = dataset.train_test_split(test_size=0.1)
print(f"Train: {len(split['train'])}, Test: {len(split['test'])}")
print(f"Columns: {dataset.column_names}")
