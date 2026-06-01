# src/model/gpt.py

from __future__ import annotations

import torch
import torch.nn.functional as F
from torch import nn

from config import ModelConfig
from model.block import TransformerBlock


class GPT(nn.Module):
    def __init__(self, config: ModelConfig) -> None:
        super().__init__()

        self.config = config

        self.token_embedding = nn.Embedding(
            config.vocab_size,
            config.n_embd,
        )

        self.position_embedding = nn.Embedding(
            config.block_size,
            config.n_embd,
        )

        self.dropout = nn.Dropout(config.dropout)

        self.blocks = nn.ModuleList(
            [TransformerBlock(config) for _ in range(config.n_layer)]
        )

        self.ln_f = nn.LayerNorm(config.n_embd, bias=config.bias)

        self.lm_head = nn.Linear(
            config.n_embd,
            config.vocab_size,
            bias=False,
        )

        if config.tie_weights:
            self.lm_head.weight = self.token_embedding.weight

    def forward(
        self,
        idx: torch.Tensor,
        targets: torch.Tensor | None = None,
    ) -> tuple[torch.Tensor, torch.Tensor | None]:
        batch_size, seq_len = idx.shape

        if seq_len > self.config.block_size:
            raise ValueError("sequence length exceeds block_size")

        positions = torch.arange(
            0,
            seq_len,
            device=idx.device,
            dtype=torch.long,
        )

        token_emb = self.token_embedding(idx)
        pos_emb = self.position_embedding(positions)

        x = self.dropout(token_emb + pos_emb)

        for block in self.blocks:
            x = block(x)

        x = self.ln_f(x)

        logits = self.lm_head(x)

        loss = None

        if targets is not None:
            loss = F.cross_entropy(
                logits.view(-1, logits.size(-1)),
                targets.view(-1),
            )

        return logits, loss

