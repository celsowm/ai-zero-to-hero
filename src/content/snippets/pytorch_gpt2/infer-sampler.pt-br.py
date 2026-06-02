"""Sampling utilities used during autoregressive generation."""
from __future__ import annotations

import torch
import torch.nn.functional as F


def _apply_top_k(logits: torch.Tensor, top_k: int | None) -> torch.Tensor:
    if top_k is None or top_k <= 0 or top_k >= logits.size(-1):
        return logits
    values, _ = torch.topk(logits, top_k)
    cutoff = values[:, [-1]]
    return torch.where(logits < cutoff, torch.full_like(logits, float("-inf")), logits)


def _apply_top_p(logits: torch.Tensor, top_p: float | None) -> torch.Tensor:
    if top_p is None or top_p <= 0.0 or top_p >= 1.0:
        return logits

    sorted_logits, sorted_indices = torch.sort(logits, descending=True, dim=-1)
    sorted_probs = F.softmax(sorted_logits, dim=-1)
    cumulative_probs = torch.cumsum(sorted_probs, dim=-1)

    sorted_mask = cumulative_probs > top_p
    sorted_mask[..., 1:] = sorted_mask[..., :-1].clone()
    sorted_mask[..., 0] = False

    masked_sorted_logits = sorted_logits.masked_fill(sorted_mask, float("-inf"))
    masked_logits = torch.full_like(logits, float("-inf"))
    masked_logits.scatter_(dim=-1, index=sorted_indices, src=masked_sorted_logits)
    return masked_logits


def sample_next_token(
    logits: torch.Tensor,
    *,
    temperature: float = 1.0,
    top_k: int | None = None,
    top_p: float | None = None,
    do_sample: bool = True,
) -> torch.Tensor:
    if not do_sample or temperature <= 0:
        return torch.argmax(logits, dim=-1, keepdim=True)

    logits = logits / temperature
    logits = _apply_top_k(logits, top_k)
    logits = _apply_top_p(logits, top_p)

    probs = F.softmax(logits, dim=-1)
    return torch.multinomial(probs, num_samples=1)
