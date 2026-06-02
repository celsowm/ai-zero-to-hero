"""Autoregressive generation loop with KV cache support."""
from __future__ import annotations

import torch

from config import ModelConfig
from infer.sampler import sample_next_token
from model.gpt import GPT, KVCache


@torch.no_grad()
def generate(
    model: GPT,
    idx: torch.Tensor,
    *,
    max_new_tokens: int,
    temperature: float = 1.0,
    top_k: int | None = None,
    top_p: float | None = None,
    do_sample: bool = True,
    use_cache: bool = True,
    eos_token_id: int | None = None,
) -> torch.Tensor:
    model.eval()

    full_idx = idx
    window_idx = idx[:, -model.config.block_size :]

    cache: KVCache | None = None

    for _ in range(max_new_tokens):
        if use_cache:
            idx_cond = window_idx if cache is None else window_idx[:, -1:]

            logits, _, cache = model(
                idx_cond,
                past_kv=cache,
                use_cache=True,
            )
        else:
            idx_cond = window_idx[:, -model.config.block_size :]
            logits, _ = model(idx_cond)

        next_logits = logits[:, -1, :]

        next_token = sample_next_token(
            next_logits,
            temperature=temperature,
            top_k=top_k,
            top_p=top_p,
            do_sample=do_sample,
        )

        full_idx = torch.cat((full_idx, next_token), dim=1)
        window_idx = torch.cat((window_idx, next_token), dim=1)

        if eos_token_id is not None:
            if bool(torch.all(next_token == eos_token_id).item()):
                break

        if window_idx.size(1) > model.config.block_size:
            window_idx = window_idx[:, -model.config.block_size :]

    return full_idx
