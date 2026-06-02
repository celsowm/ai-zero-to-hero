"""High-level inference wrapper with Hugging Face-style API."""
from __future__ import annotations

from dataclasses import dataclass, field
from pathlib import Path
from typing import Any

import torch
import torch.nn as nn

from config import ModelConfig
from data.tokenizer import BPETokenizer, ByteTokenizer, Tokenizer
from infer.generate import generate
from model.gpt import GPT


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
    def from_pretrained(cls, name_or_path: str | Path = "byte") -> Tokenizer:
        path = Path(name_or_path)
        if str(name_or_path) == "byte":
            return ByteTokenizer()
        if path.is_file():
            return BPETokenizer.load(path)
        if path.is_dir():
            tokenizer_json = path / "tokenizer.json"
            if tokenizer_json.exists():
                return BPETokenizer.load(tokenizer_json)
        raise FileNotFoundError(f"Could not load tokenizer from {name_or_path!r}")


class GPT2ForCausalLM(nn.Module):
    def __init__(self, config: ModelConfig, *, tokenizer: Tokenizer | None = None) -> None:
        super().__init__()
        self.config = config
        self.model = GPT(config)
        self.tokenizer = tokenizer
        self.generation_config = GenerationConfig()

    @classmethod
    def from_pretrained(
        cls, path: str | Path, *, tokenizer: str | Path | Tokenizer | None = "auto",
        tokenizer_path: str | Path | None = None, device: str | torch.device | None = "auto",
        strict: bool = True,
    ) -> "GPT2ForCausalLM":
        resolved_device = _resolve_device(device)
        payload = _load_payload(Path(path), map_location=resolved_device)
        config = ModelConfig(**payload["model_config"])
        tokenizer_obj = cls._resolve_tokenizer(tokenizer, tokenizer_path)
        wrapped = cls(config, tokenizer=tokenizer_obj).to(resolved_device)
        state_dict = _strip_model_prefix(payload["model"])
        wrapped.model.load_state_dict(state_dict, strict=strict)
        wrapped.eval()
        return wrapped

    @torch.no_grad()
    def generate(self, text: str, **overrides: Any) -> str:
        gen_config = self._merged_gen_config(**overrides)
        input_ids = self.tokenizer.encode(text, add_eot=False)
        if not input_ids:
            input_ids = [self.tokenizer.eot_id]
        idx = torch.tensor([input_ids], dtype=torch.long, device=next(self.parameters()).device)
        output_ids = generate(
            self.model, idx, max_new_tokens=gen_config.max_new_tokens,
            temperature=gen_config.temperature, top_k=gen_config.top_k,
            top_p=gen_config.top_p, do_sample=gen_config.do_sample,
            use_cache=gen_config.use_cache, eos_token_id=self.tokenizer.eot_id if gen_config.stop_at_eot else None,
        )
        if not gen_config.return_full_text:
            output_ids = output_ids[:, len(input_ids):]
        return self.tokenizer.decode(output_ids[0].tolist())


class TextGenerationPipeline:
    def __init__(self, model: GPT2ForCausalLM, **defaults: Any) -> None:
        self.model = model
        self.defaults = defaults

    @torch.no_grad()
    def __call__(self, text: str, **overrides: Any) -> list[dict[str, Any]]:
        merged = {**self.defaults, **overrides}
        output = self.model.generate(text, **merged)
        return [{"generated_text": output}]


def _resolve_device(device: str | torch.device | None) -> torch.device:
    if device is None or str(device) == "auto":
        if torch.cuda.is_available():
            return torch.device("cuda")
        return torch.device("cpu")
    return torch.device(device)


def _load_payload(path: Path, *, map_location: torch.device) -> dict[str, Any]:
    ckpt_path = path if path.suffix == ".pt" else (path / "checkpoints" / "latest.pt")
    if not ckpt_path.exists():
        ckpt_path = path / "latest.pt"
    if not ckpt_path.exists():
        raise FileNotFoundError(f"Could not find checkpoint in {path}")
    return torch.load(ckpt_path, map_location=map_location, weights_only=False)


def _strip_model_prefix(state_dict: dict[str, torch.Tensor]) -> dict[str, torch.Tensor]:
    if all(k.startswith("model.") for k in state_dict):
        return {k[len("model."):]: v for k, v in state_dict.items()}
    return state_dict


def pipeline(task: str, model: GPT2ForCausalLM, **kwargs: Any) -> TextGenerationPipeline:
    if task != "text-generation":
        raise ValueError(f"Unsupported task: {task!r}")
    return TextGenerationPipeline(model, **kwargs)
