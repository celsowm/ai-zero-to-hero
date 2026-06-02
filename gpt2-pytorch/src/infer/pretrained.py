"""Transformers-like wrappers for loading, saving, and generating from checkpoints."""
from __future__ import annotations

import json
from dataclasses import asdict, dataclass
from pathlib import Path
from typing import Any, Iterable, Sequence

import torch
from torch import nn

from config import ModelConfig
from data.tokenizer import BPETokenizer, ByteTokenizer, Tokenizer, build_tokenizer
from infer.generate import generate as generate_token_ids
from model.gpt import GPT
from train.checkpoint import load_checkpoint
from utils.device import get_device


@dataclass(frozen=True)
class GenerationConfig:
    max_new_tokens: int = 80
    temperature: float = 0.8
    top_k: int | None = 50
    top_p: float | None = None
    do_sample: bool = True
    use_cache: bool = True
    return_full_text: bool = True
    stop_at_eot: bool = False

    @classmethod
    def from_file(cls, path: str | Path) -> GenerationConfig:
        payload = json.loads(Path(path).read_text(encoding="utf-8"))
        return cls(**payload)

    def save(self, path: str | Path) -> None:
        Path(path).write_text(json.dumps(asdict(self), indent=2), encoding="utf-8")


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
            tokenizer_config = path / "tokenizer_config.json"

            if tokenizer_json.exists():
                return BPETokenizer.load(tokenizer_json)

            if tokenizer_config.exists():
                payload = json.loads(tokenizer_config.read_text(encoding="utf-8"))
                tok_type = payload.get("type")
                if tok_type == "byte":
                    return ByteTokenizer()
                if tok_type == "byte_bpe" and tokenizer_json.exists():
                    return BPETokenizer.load(tokenizer_json)
                raise ValueError(f"Unsupported tokenizer_config type: {tok_type!r}")

        raise FileNotFoundError(f"Could not load tokenizer from {name_or_path!r}")


def _save_tokenizer(tokenizer: Tokenizer, out_dir: Path) -> None:
    if isinstance(tokenizer, BPETokenizer):
        tokenizer.save(out_dir / "tokenizer.json")
        payload = {"type": "byte_bpe", "vocab_size": tokenizer.vocab_size, "eot_id": tokenizer.eot_id}
    elif isinstance(tokenizer, ByteTokenizer):
        payload = {"type": "byte", "vocab_size": tokenizer.vocab_size, "eot_id": tokenizer.eot_id}
    else:
        raise TypeError(f"Unsupported tokenizer object: {type(tokenizer)!r}")

    (out_dir / "tokenizer_config.json").write_text(
        json.dumps(payload, indent=2), encoding="utf-8"
    )


def _resolve_device(device: str | torch.device | None) -> torch.device:
    if device is None or device == "auto":
        return get_device()
    return torch.device(device)


def _strip_model_prefix(state_dict: dict[str, torch.Tensor]) -> dict[str, torch.Tensor]:
    if all(key.startswith("model.") for key in state_dict):
        return {key.removeprefix("model."): value for key, value in state_dict.items()}
    return state_dict


def _load_payload(path: Path, *, map_location: torch.device) -> dict[str, Any]:
    if path.is_file():
        payload = load_checkpoint(path, map_location=map_location)
        if isinstance(payload, dict):
            return payload
        raise ValueError(f"Unsupported checkpoint payload in {path}")

    if not path.is_dir():
        raise FileNotFoundError(path)

    config_path = path / "config.json"
    weights_candidates = [
        path / "pytorch_model.bin",
        path / "model.pt",
        path / "latest.pt",
        path / "checkpoint.pt",
    ]
    weights_path = next((candidate for candidate in weights_candidates if candidate.exists()), None)
    if weights_path is None:
        raise FileNotFoundError(f"No model weights found in {path}")

    weights_payload = load_checkpoint(weights_path, map_location=map_location)
    if "model" in weights_payload:
        payload = dict(weights_payload)
    else:
        payload = {"model": weights_payload}

    if "model_config" not in payload:
        if not config_path.exists():
            raise FileNotFoundError(f"Missing config.json in {path}")
        payload["model_config"] = json.loads(config_path.read_text(encoding="utf-8"))

    return payload


class GPT2ForCausalLM(nn.Module):
    def __init__(self, config: ModelConfig, *, tokenizer: Tokenizer | None = None) -> None:
        super().__init__()
        self.config = config
        self.model = GPT(config)
        self.tokenizer = tokenizer
        self.generation_config = GenerationConfig()

    def forward(self, *args: Any, **kwargs: Any) -> Any:
        return self.model(*args, **kwargs)

    @classmethod
    def from_model(
        cls,
        model: GPT,
        *,
        tokenizer: Tokenizer | None = None,
    ) -> GPT2ForCausalLM:
        wrapped = cls(model.config, tokenizer=tokenizer)
        wrapped.model.load_state_dict(model.state_dict())
        wrapped.model.to(next(model.parameters()).device)
        return wrapped

    @classmethod
    def from_pretrained(
        cls,
        path: str | Path,
        *,
        tokenizer: str | Path | Tokenizer | None = "auto",
        tokenizer_path: str | Path | None = None,
        device: str | torch.device | None = "auto",
        strict: bool = True,
    ) -> GPT2ForCausalLM:
        resolved_device = _resolve_device(device)
        payload = _load_payload(Path(path), map_location=resolved_device)
        config = ModelConfig(**payload["model_config"])

        tokenizer_obj: Tokenizer | None
        if tokenizer is None:
            tokenizer_obj = None
        elif tokenizer == "auto":
            if Path(path).is_dir():
                tokenizer_obj = AutoTokenizer.from_pretrained(path)
            else:
                tokenizer_obj = ByteTokenizer()
        elif isinstance(tokenizer, (ByteTokenizer, BPETokenizer)):
            tokenizer_obj = tokenizer
        elif isinstance(tokenizer, str) and tokenizer in {"byte", "bpe"}:
            tokenizer_obj = build_tokenizer(tokenizer, tokenizer_path=tokenizer_path)
        else:
            tokenizer_obj = AutoTokenizer.from_pretrained(tokenizer)

        if tokenizer_obj is not None and tokenizer_obj.vocab_size != config.vocab_size:
            raise ValueError(
                f"Model vocab_size={config.vocab_size}, but tokenizer vocab_size={tokenizer_obj.vocab_size}."
            )

        wrapped = cls(config, tokenizer=tokenizer_obj).to(resolved_device)
        state_dict = _strip_model_prefix(payload["model"])
        wrapped.model.load_state_dict(state_dict, strict=strict)

        gen_config_path = Path(path) / "generation_config.json" if Path(path).is_dir() else None
        if gen_config_path is not None and gen_config_path.exists():
            wrapped.generation_config = GenerationConfig.from_file(gen_config_path)

        wrapped.eval()
        return wrapped

    def save_pretrained(
        self,
        out_dir: str | Path,
        *,
        tokenizer: Tokenizer | None = None,
        generation_config: GenerationConfig | None = None,
    ) -> Path:
        out_path = Path(out_dir)
        out_path.mkdir(parents=True, exist_ok=True)

        model = self.model
        state_dict = {key: value.detach().cpu() for key, value in model.state_dict().items()}
        payload = {"model": state_dict, "model_config": asdict(model.config)}
        torch.save(payload, out_path / "pytorch_model.bin")
        (out_path / "config.json").write_text(
            json.dumps(asdict(model.config), indent=2), encoding="utf-8"
        )

        tok = tokenizer if tokenizer is not None else self.tokenizer
        if tok is not None:
            _save_tokenizer(tok, out_path)

        gen = generation_config if generation_config is not None else self.generation_config
        gen.save(out_path / "generation_config.json")
        return out_path

    @torch.no_grad()
    def generate_ids(
        self,
        input_ids: torch.Tensor,
        *,
        max_new_tokens: int | None = None,
        temperature: float | None = None,
        top_k: int | None = None,
        top_p: float | None = None,
        do_sample: bool | None = None,
        use_cache: bool | None = None,
        eos_token_id: int | None = None,
    ) -> torch.Tensor:
        device = next(self.model.parameters()).device
        input_ids = input_ids.to(device=device, dtype=torch.long)
        cfg = self.generation_config
        return generate_token_ids(
            self.model,
            input_ids,
            max_new_tokens=cfg.max_new_tokens if max_new_tokens is None else max_new_tokens,
            temperature=cfg.temperature if temperature is None else temperature,
            top_k=cfg.top_k if top_k is None else top_k,
            top_p=cfg.top_p if top_p is None else top_p,
            do_sample=cfg.do_sample if do_sample is None else do_sample,
            use_cache=cfg.use_cache if use_cache is None else use_cache,
            eos_token_id=eos_token_id,
        )

    @torch.no_grad()
    def generate_text(
        self,
        prompt: str,
        *,
        max_new_tokens: int | None = None,
        temperature: float | None = None,
        top_k: int | None = None,
        top_p: float | None = None,
        do_sample: bool | None = None,
        use_cache: bool | None = None,
        return_full_text: bool | None = None,
        stop_at_eot: bool | None = None,
    ) -> str:
        if self.tokenizer is None:
            raise ValueError("generate_text requires a tokenizer. Pass tokenizer=... to from_pretrained().")

        input_ids = self.tokenizer.encode(prompt, add_eot=False)
        if not input_ids:
            input_ids = [self.tokenizer.eot_id]
        input_tensor = torch.tensor([input_ids], dtype=torch.long, device=next(self.model.parameters()).device)

        cfg = self.generation_config
        should_stop = cfg.stop_at_eot if stop_at_eot is None else stop_at_eot
        output = self.generate_ids(
            input_tensor,
            max_new_tokens=max_new_tokens,
            temperature=temperature,
            top_k=top_k,
            top_p=top_p,
            do_sample=do_sample,
            use_cache=use_cache,
            eos_token_id=self.tokenizer.eot_id if should_stop else None,
        )[0].tolist()

        full_text = self.tokenizer.decode(output)
        if cfg.return_full_text if return_full_text is None else return_full_text:
            return full_text
        return full_text[len(prompt) :]

    @torch.no_grad()
    def generate(
        self,
        inputs: str | Sequence[int] | torch.Tensor,
        **kwargs: Any,
    ) -> str | torch.Tensor:
        if isinstance(inputs, str):
            return self.generate_text(inputs, **kwargs)
        if isinstance(inputs, torch.Tensor):
            return self.generate_ids(inputs, **kwargs)
        input_tensor = torch.tensor([list(inputs)], dtype=torch.long, device=next(self.model.parameters()).device)
        return self.generate_ids(input_tensor, **kwargs)


class TextGenerationPipeline:
    def __init__(self, model: GPT2ForCausalLM) -> None:
        if model.tokenizer is None:
            raise ValueError("TextGenerationPipeline requires a model with tokenizer attached")
        self.model = model

    def __call__(
        self,
        text_inputs: str | Iterable[str],
        *,
        max_new_tokens: int | None = None,
        temperature: float | None = None,
        top_k: int | None = None,
        top_p: float | None = None,
        do_sample: bool | None = None,
        return_full_text: bool | None = None,
    ) -> list[dict[str, str]]:
        prompts = [text_inputs] if isinstance(text_inputs, str) else list(text_inputs)
        return [
            {
                "generated_text": self.model.generate_text(
                    prompt,
                    max_new_tokens=max_new_tokens,
                    temperature=temperature,
                    top_k=top_k,
                    top_p=top_p,
                    do_sample=do_sample,
                    return_full_text=return_full_text,
                )
            }
            for prompt in prompts
        ]


def pipeline(
    task: str,
    *,
    model: str | Path | GPT2ForCausalLM,
    tokenizer: str | Path | Tokenizer | None = "auto",
    device: str | torch.device | None = "auto",
) -> TextGenerationPipeline:
    if task != "text-generation":
        raise ValueError("Only task='text-generation' is supported")

    if isinstance(model, GPT2ForCausalLM):
        loaded_model = model
        if tokenizer is not None and tokenizer != "auto":
            loaded_model.tokenizer = (
                tokenizer if isinstance(tokenizer, (ByteTokenizer, BPETokenizer)) else AutoTokenizer.from_pretrained(tokenizer)
            )
    else:
        loaded_model = GPT2ForCausalLM.from_pretrained(model, tokenizer=tokenizer, device=device)
    return TextGenerationPipeline(loaded_model)
