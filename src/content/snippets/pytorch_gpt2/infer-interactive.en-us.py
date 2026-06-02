"""Interactive token-by-token generation for teaching and debugging."""
from __future__ import annotations

import math
import time
from typing import Any

import torch
import torch.nn.functional as F

from infer.pretrained import GPT2ForCausalLM
from model.gpt import KVCache


class TokenGenerator:
    def __init__(self, model: GPT2ForCausalLM, prompt: str) -> None:
        self.model = model
        self.tokenizer = model.tokenizer
        self.device = next(model.parameters()).device

        input_ids = self.tokenizer.encode(prompt, add_eot=False)
        if not input_ids:
            input_ids = [self.tokenizer.eot_id]

        self.prompt_tokens = list(input_ids)
        self.generated_tokens: list[int] = []
        self.cache: KVCache | None = None

        self.window_idx = torch.tensor([self.prompt_tokens], dtype=torch.long, device=self.device)
        self.step_index = 0
        self.logits: torch.Tensor | None = None
        self.raw_probs: torch.Tensor | None = None
        self.cumulative_log_prob = 0.0

        self._forward()

    @torch.no_grad()
    def _forward(self) -> None:
        logits, _, self.cache = self.model.model(
            self.window_idx, past_kv=self.cache, use_cache=True,
        )
        self.logits = logits[:, -1, :].squeeze(0)
        self.raw_probs = F.softmax(self.logits / max(1e-6, 1.0), dim=-1)

    def compute_sampling_distribution(
        self, temperature: float, top_k: int | None, top_p: float | None,
    ) -> tuple[torch.Tensor, int, float]:
        temp = max(temperature, 1e-6)
        logits = self.logits / temp

        if top_k is not None and top_k > 0:
            values, _ = torch.topk(logits, top_k)
            cutoff = values[-1]
            logits = torch.where(logits < cutoff, torch.full_like(logits, float("-inf")), logits)

        sampling_probs = F.softmax(logits, dim=-1)
        is_pruned = torch.isinf(logits)
        active_tokens_count = int(torch.sum(~is_pruned).item())
        pruned_probability_mass = float(torch.sum(self.raw_probs[is_pruned]).item()) if is_pruned.any() else 0.0

        return sampling_probs, active_tokens_count, pruned_probability_mass

    def get_candidates(self, temperature: float, top_k: int | None, top_p: float | None, n: int = 5) -> list[dict[str, Any]]:
        logits = self.logits / max(temperature, 1e-6)
        probs = F.softmax(logits, dim=-1)
        top_probs, top_indices = torch.topk(probs, min(n, probs.size(-1)))
        return [
            {"token_id": int(top_indices[i]), "token_text": self._format_token(int(top_indices[i])),
             "probability": float(top_probs[i])}
            for i in range(len(top_indices))
        ]

    def _format_token(self, token_id: int) -> str:
        text = self.tokenizer.decode([token_id]).replace("\n", "\\n").replace("\r", "\\r").replace("\t", "\\t")
        return text if text else f"[{token_id}]"

    def step(
        self, selected_token_id: int | None = None,
        temperature: float = 0.8, top_k: int | None = 50, top_p: float | None = None,
        do_sample: bool = True,
    ) -> dict[str, Any]:
        t_start = time.perf_counter()
        sampling_probs, active_count, pruned_mass = self.compute_sampling_distribution(
            temperature=temperature, top_k=top_k, top_p=top_p,
        )

        entropy = float(-torch.sum(self.raw_probs * torch.log(self.raw_probs.clamp(min=1e-10))))

        if selected_token_id is not None:
            next_token_id = selected_token_id
            selection_method = "manual"
        elif not do_sample or temperature <= 0:
            next_token_id = int(torch.argmax(self.logits).item())
            selection_method = "greedy"
        else:
            next_token_id = int(torch.multinomial(sampling_probs, num_samples=1).item())
            selection_method = "sampled"

        selected_prob = float(self.raw_probs[next_token_id].item())
        sampling_prob = float(sampling_probs[next_token_id].item())
        surprisal = -math.log2(max(selected_prob, 1e-10))
        rank = int(torch.sum(self.raw_probs > selected_prob).item()) + 1

        self.generated_tokens.append(next_token_id)
        next_token_tensor = torch.tensor([[next_token_id]], dtype=torch.long, device=self.device)
        self.window_idx = torch.cat((self.window_idx, next_token_tensor), dim=1)
        if self.window_idx.size(1) > self.model.model.config.block_size:
            self.window_idx = self.window_idx[:, -self.model.model.config.block_size :]

        self.step_index += 1
        self._forward()
        t_elapsed = time.perf_counter() - t_start

        return {
            "token_id": next_token_id,
            "token_text": self._format_token(next_token_id),
            "method": selection_method,
            "raw_probability": selected_prob,
            "sampling_probability": sampling_prob,
            "rank": rank,
            "surprisal": surprisal,
            "entropy": entropy,
            "active_tokens": active_count,
            "pruned_mass": pruned_mass,
            "perplexity": float(torch.exp(entropy).item()),
            "latency_ms": round(t_elapsed * 1000, 1),
        }
