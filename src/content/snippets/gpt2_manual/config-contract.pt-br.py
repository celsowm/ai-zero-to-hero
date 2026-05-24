from dataclasses import dataclass


@dataclass
class GPTConfig:
    vocab_size: int = 256
    block_size: int = 64
    n_layer: int = 4
    n_head: int = 4
    n_embd: int = 128
    dropout: float = 0.1
    bias: bool = False
    tie_weights: bool = True


config = GPTConfig()

assert config.n_embd % config.n_head == 0
assert config.vocab_size > 0
assert config.block_size > 0

print(config)
print("head_dim:", config.n_embd // config.n_head)
