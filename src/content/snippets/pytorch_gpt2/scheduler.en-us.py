# src/pytorch_gpt2/train/scheduler.py

from __future__ import annotations

import math


def cosine_lr(
    step: int,
    *,
    max_lr: float,
    warmup_steps: int,
    max_steps: int,
    min_lr_ratio: float = 0.1,
) -> float:
    if step < warmup_steps:
        return max_lr * (step + 1) / max(1, warmup_steps)

    if step >= max_steps:
        return max_lr * min_lr_ratio

    progress = (step - warmup_steps) / max(1, max_steps - warmup_steps)
    coeff = 0.5 * (1.0 + math.cos(math.pi * progress))
    min_lr = max_lr * min_lr_ratio

    return min_lr + coeff * (max_lr - min_lr)
