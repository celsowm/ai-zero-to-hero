# src/pytorch_gpt2/model/attention.py

from __future__ import annotations

import torch
import torch.nn.functional as F
from torch import nn

from pytorch_gpt2.config import ModelConfig


class CausalSelfAttention(nn.Module):
    def __init__(self, config: ModelConfig) -> None:
        super().__init__()

        self.n_head = config.n_head
        self.n_embd = config.n_embd
        self.head_dim = config.n_embd // config.n_head

        self.c_attn = nn.Linear(
            config.n_embd,
            3 * config.n_embd,
            bias=config.bias,
        )

        self.c_proj = nn.Linear(
            config.n_embd,
            config.n_embd,
            bias=config.bias,
        )

        self.dropout = config.dropout

    def _shape(
        self,
        x: torch.Tensor,
        batch_size: int,
        seq_len: int,
    ) -> torch.Tensor:
        return (
            x.view(batch_size, seq_len, self.n_head, self.head_dim)
            .transpose(1, 2)
        )

    def forward(self, x: torch.Tensor) -> torch.Tensor:
        batch_size, seq_len, _ = x.shape

        qkv = self.c_attn(x)

        q, k, v = qkv.split(self.n_embd, dim=2)

        q = self._shape(q, batch_size, seq_len)
        k = self._shape(k, batch_size, seq_len)
        v = self._shape(v, batch_size, seq_len)

        y = F.scaled_dot_product_attention(
            q,
            k,
            v,
            dropout_p=self.dropout if self.training else 0.0,
            is_causal=True,
        )

        y = y.transpose(1, 2).contiguous()
        y = y.view(batch_size, seq_len, self.n_embd)

        return self.c_proj(y)
