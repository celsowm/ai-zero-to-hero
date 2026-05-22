from pytorch_gpt2.config import ModelConfig
from pytorch_gpt2.data.tokenizer import ByteTokenizer
import torch

tokenizer = ByteTokenizer()
prompt = "Once upon a time"
token_ids = tokenizer.encode(prompt, add_eot=False)
idx = torch.tensor([token_ids], dtype=torch.long)

config = ModelConfig(
    vocab_size=tokenizer.vocab_size,
    block_size=96,
    n_layer=4,
    n_head=4,
    n_embd=128,
    dropout=0.0,
    bias=True,
    tie_weights=True,
)
print("idx shape:", tuple(idx.shape))
print("first ids:", idx[0, :8].tolist())
print("n_embd % n_head:", config.n_embd % config.n_head)

assert config.n_embd % config.n_head == 0
