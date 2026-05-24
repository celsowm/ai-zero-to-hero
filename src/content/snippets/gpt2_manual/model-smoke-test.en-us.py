import torch


config = GPTConfig(
    vocab_size=256,
    block_size=64,
    n_layer=4,
    n_head=4,
    n_embd=128,
    dropout=0.1,
    bias=False,
)

model = GPT(config)

idx = torch.randint(
    low=0,
    high=config.vocab_size,
    size=(2, 16),
    dtype=torch.long,
)

logits, loss = model(idx, idx)

print("logits:", logits.shape)
print("loss:", loss)
