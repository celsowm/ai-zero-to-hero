from dataclasses import dataclass

@dataclass(frozen=True)
class ModelConfig:
    vocab_size: int = 257
    block_size: int = 1024
    n_layer: int = 12
    n_head: int = 12
    n_embd: int = 768
    dropout: float = 0.1
    tie_weights: bool = True
