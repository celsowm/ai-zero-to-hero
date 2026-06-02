"""GPT-2 style decoder-only language model."""
from __future__ import annotations

import math

import torch
import torch.nn.functional as F
from torch import nn

from config import ModelConfig
from model.block import TransformerBlock

KVCache = list[tuple[torch.Tensor, torch.Tensor]]


class GPT(nn.Module):
    def __init__(self, config: ModelConfig) -> None:
        super().__init__()
        self.config = config

        self.token_embedding = nn.Embedding(config.vocab_size, config.n_embd)
        self.position_embedding = nn.Embedding(config.block_size, config.n_embd)
        self.dropout = nn.Dropout(config.dropout)
        self.blocks = nn.ModuleList([TransformerBlock(config) for _ in range(config.n_layer)])
        self.ln_f = nn.LayerNorm(config.n_embd, bias=config.bias)
        self.lm_head = nn.Linear(config.n_embd, config.vocab_size, bias=False)

        if config.tie_weights:
            self.lm_head.weight = self.token_embedding.weight

        self.apply(self._init_weights)
        self._scale_residual_projections()

    def forward(
        self,
        idx: torch.Tensor,
        targets: torch.Tensor | None = None,
        past_kv: KVCache | None = None,
        use_cache: bool = False,
    ) -> tuple[torch.Tensor, torch.Tensor | None] | tuple[torch.Tensor, torch.Tensor | None, KVCache]:
        batch_size, seq_len = idx.shape
        if seq_len > self.config.block_size:
            raise ValueError(
                f"Cannot forward sequence of length {seq_len}; block_size is {self.config.block_size}"
            )

        past_len = 0 if past_kv is None else past_kv[0][0].size(2)
        if past_len + seq_len > self.config.block_size:
            raise ValueError(
                f"Sequence plus cache length {past_len + seq_len} exceeds block_size {self.config.block_size}"
            )

        positions = torch.arange(past_len, past_len + seq_len, device=idx.device, dtype=torch.long)
        x = self.token_embedding(idx) + self.position_embedding(positions)[None, :, :]
        x = self.dropout(x)

        new_cache: KVCache = []
        for layer_idx, block in enumerate(self.blocks):
            layer_past = None if past_kv is None else past_kv[layer_idx]
            if use_cache:
                x, layer_cache = block(x, past_kv=layer_past, use_cache=True)
                new_cache.append(layer_cache)
            else:
                x = block(x)

        x = self.ln_f(x)
        logits = self.lm_head(x)

        loss = None
        if targets is not None:
            loss = F.cross_entropy(logits.view(-1, logits.size(-1)), targets.view(-1))

        if use_cache:
            return logits, loss, new_cache
        return logits, loss

    @torch.no_grad()
    def crop_block_size(self, block_size: int) -> None:
        if block_size > self.config.block_size:
            raise ValueError("Cannot increase block_size by cropping")
        self.config = ModelConfig(**{**self.config.__dict__, "block_size": block_size})
        self.position_embedding.weight = nn.Parameter(self.position_embedding.weight[:block_size])

    def num_parameters(self, *, exclude_embeddings: bool = True) -> int:
        total = sum(p.numel() for p in self.parameters())
        if exclude_embeddings:
            total -= self.position_embedding.weight.numel()
        return total

    def _init_weights(self, module: nn.Module) -> None:
        if isinstance(module, nn.Linear):
            torch.nn.init.normal_(module.weight, mean=0.0, std=0.02)
            if module.bias is not None:
                torch.nn.init.zeros_(module.bias)
        elif isinstance(module, nn.Embedding):
            torch.nn.init.normal_(module.weight, mean=0.0, std=0.02)

    def _scale_residual_projections(self) -> None:
        scale = 0.02 / math.sqrt(2 * self.config.n_layer)
        for name, param in self.named_parameters():
            if name.endswith("c_proj.weight"):
                torch.nn.init.normal_(param, mean=0.0, std=scale)
