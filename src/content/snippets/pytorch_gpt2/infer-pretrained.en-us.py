# src/infer/pretrained.py

from __future__ import annotations

from dataclasses import dataclass
from pathlib import Path
from typing import Any

import torch
import torch.nn as nn

from config import ModelConfig
from model.gpt import GPT
from data.tokenizer import BPETokenizer, ByteTokenizer, Tokenizer, build_tokenizer


@dataclass(frozen=True)
class GenerationConfig:
    max_new_tokens: int = 80
    temperature: float = 0.9
    top_k: int | None = 100
    top_p: float | None = 0.95
    do_sample: bool = True
    use_cache: bool = True
    return_full_text: bool = True
    stop_at_eot: bool = False


class AutoTokenizer:
    @classmethod
    def from_pretrained(
        cls,
        name_or_path: str | Path = "byte",
    ) -> Tokenizer:
        path = Path(name_or_path)

        if str(name_or_path) == "byte":
            return ByteTokenizer()

        if path.is_file():
            return BPETokenizer.load(path)

        if path.is_dir():
            tokenizer_json = path / "tokenizer.json"

            if tokenizer_json.exists():
                return BPETokenizer.load(tokenizer_json)

        raise FileNotFoundError(
            f"Could not load tokenizer from {name_or_path!r}"
        )


class GPT2ForCausalLM(nn.Module):
    def __init__(
        self,
        config: ModelConfig,
        *,
        tokenizer: Tokenizer | None = None,
    ) -> None:
        super().__init__()

        self.config = config
        self.model = GPT(config)
        self.tokenizer = tokenizer
        self.generation_config = GenerationConfig()

    @classmethod
    def from_pretrained(
        cls,
        path: str | Path,
        *,
        tokenizer: str | Path | Tokenizer | None = "auto",
        tokenizer_path: str | Path | None = None,
        device: str | torch.device | None = "auto",
        strict: bool = True,
    ) -> "GPT2ForCausalLM":
        resolved_device = _resolve_device(device)
        payload = _load_payload(Path(path), map_location=resolved_device)

        config = ModelConfig(**payload["model_config"])

        wrapped = cls(config, tokenizer=tokenizer_obj).to(resolved_device)

        state_dict = _strip_model_prefix(payload["model"])
        wrapped.model.load_state_dict(state_dict, strict=strict)

        wrapped.eval()

        return wrapped

