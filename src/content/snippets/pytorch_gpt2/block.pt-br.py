"""Transformer block composed from pre-norm attention and MLP sublayers."""
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

    def forward(
        self,
        x: torch.Tensor,
        past_kv: tuple[torch.Tensor, torch.Tensor] | None = None,
        use_cache: bool = False,
    ) -> torch.Tensor | tuple[torch.Tensor, tuple[torch.Tensor, torch.Tensor]]:
        if use_cache:
            attn_out, new_kv = self.attn(self.ln_1(x), past_kv=past_kv, use_cache=True)
            x = x + attn_out
            x = x + self.mlp(self.ln_2(x))
            return x, new_kv

        attn_out = self.attn(self.ln_1(x), past_kv=None, use_cache=False)
        x = x + attn_out
        x = x + self.mlp(self.ln_2(x))
        return x
