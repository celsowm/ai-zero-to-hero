import torch


TEXT_CANDIDATES = ["text", "content", "prompt", "completion", "body"]


def choose_text_column(dataset):
    for name in TEXT_CANDIDATES:
        if name in dataset.column_names:
            return name

    raise ValueError(f"available columns: {dataset.column_names}")


def normalize_text(value):
    if value is None:
        return ""
    if isinstance(value, str):
        return value
    if isinstance(value, list):
        return "\n".join(normalize_text(item) for item in value)
    if isinstance(value, dict):
        return "\n".join(normalize_text(v) for v in value.values())
    return str(value)


text_column = choose_text_column(train)
texts = [normalize_text(row[text_column]) for row in train]
corpus = "\n\n".join(text for text in texts if text.strip())

tokens = tokenizer.encode(corpus)
data = torch.tensor(tokens, dtype=torch.long)

assert data.dtype == torch.long
assert data.max() < config.vocab_size
assert len(data) > config.block_size
