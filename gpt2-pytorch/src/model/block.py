# src/model/block.py

from __future__ import annotations

import torch
from torch import nn

from config import ModelConfig
from model.attention import CausalSelfAttention
from model.mlp import MLP


class TransformerBlock(nn.Module):
    def __init__(self, config: ModelConfig) -> None:
        super().__init__()

        self.ln_1 = nn.LayerNorm(config.n_embd, bias=config.bias)
        self.attn = CausalSelfAttention(config)

        self.ln_2 = nn.LayerNorm(config.n_embd, bias=config.bias)
        self.mlp = MLP(config)

    def forward(self, x: torch.Tensor) -> torch.Tensor:
        attn_out = self.attn(self.ln_1(x))
        x = x + attn_out

        mlp_out = self.mlp(self.ln_2(x))
        x = x + mlp_out

        return x

