# src/config.py

from __future__ import annotations

from dataclasses import dataclass
from pathlib import Path
from typing import Any

import yaml


@dataclass(frozen=True)
class DataConfig:
    source: str = "hf"
    name: str = "celsowm/project-gutenberg-clean"
    subset: str | None = "default"
    split: str = "train"
    text_column: str = "text"
    language: str = "pt"
    streaming: bool = True
    max_documents: int | None = None
    max_tokens: int | None = None


@dataclass(frozen=True)
class ModelConfig:
    vocab_size: int = 32000
    block_size: int = 512
    n_layer: int = 8
    n_head: int = 8
    n_embd: int = 512
    dropout: float = 0.1
    bias: bool = True
    tie_weights: bool = True

    def __post_init__(self) -> None:
        if self.n_embd % self.n_head != 0:
            raise ValueError("n_embd must be divisible by n_head")


@dataclass(frozen=True)
class TrainConfig:
    batch_size: int = 16
    gradient_accumulation_steps: int = 8
    max_steps: int = 20000
    learning_rate: float = 6e-4
    weight_decay: float = 0.1
    warmup_steps: int = 500
    grad_clip: float = 1.0
    eval_interval: int = 500
    checkpoint_interval: int = 1000
    mixed_precision: str = "bf16"
    compile: bool = False
    out_dir: str = "checkpoints/gpt2-small"
    seed: int = 1337
    num_workers: int = 2


def _load_yaml(path: str | Path) -> dict[str, Any]:
    with open(path, "r", encoding="utf-8") as f:
        return yaml.safe_load(f)


def load_data_config(path: str | Path) -> DataConfig:
    return DataConfig(**_load_yaml(path)["data"])


def load_model_config(path: str | Path) -> ModelConfig:
    return ModelConfig(**_load_yaml(path)["model"])


def load_train_config(path: str | Path) -> TrainConfig:
    return TrainConfig(**_load_yaml(path)["train"])

