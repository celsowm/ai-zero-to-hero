"""Checkpoint save and load helpers for training and inference."""
from __future__ import annotations

from dataclasses import asdict
from pathlib import Path
from typing import Any

import torch

from config import ModelConfig, TrainConfig


class CheckpointManager:
    def __init__(self, out_dir: str | Path) -> None:
        self.out_dir = Path(out_dir)
        self.out_dir.mkdir(parents=True, exist_ok=True)

    def save(
        self,
        *,
        model: torch.nn.Module,
        optimizer: torch.optim.Optimizer | None,
        model_config: ModelConfig,
        train_config: TrainConfig | None,
        step: int,
        best_val_loss: float | None = None,
        name: str = "latest.pt",
    ) -> Path:
        payload: dict[str, Any] = {
            "model": model.state_dict(),
            "optimizer": optimizer.state_dict() if optimizer is not None else None,
            "model_config": asdict(model_config),
            "train_config": asdict(train_config) if train_config is not None else None,
            "step": step,
            "best_val_loss": best_val_loss,
        }
        path = self.out_dir / name
        torch.save(payload, path)
        return path


def load_checkpoint(path: str | Path, *, map_location: str | torch.device = "cpu") -> dict[str, Any]:
    return torch.load(path, map_location=map_location)
