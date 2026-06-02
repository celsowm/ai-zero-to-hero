"""Helpers for step-by-step interactive token generation and telemetry analysis."""
from __future__ import annotations

import math
import time
from typing import Any

import torch
import torch.nn.functional as F

from data.tokenizer import BPETokenizer, ByteTokenizer
from infer.pretrained import GPT2ForCausalLM
from model.gpt import KVCache


def format_token_bytes(token_bytes: bytes) -> str:
    if not token_bytes:
        return "<EOT>"
    try:
        s = token_bytes.decode("utf-8", errors="strict")
        s = s.replace(" ", "·").replace("\n", "↵\n").replace("\t", "⇥")
        return "".join(c if (c.isprintable() or c == "\n") else f"\\x{ord(c):02x}" for c in s)
    except UnicodeDecodeError:
        return "".join(f"\\x{b:02x}" for b in token_bytes)


class TokenGenerator:
    def __init__(self, model: GPT2ForCausalLM, prompt: str):
        self.model = model
        self.tokenizer = model.tokenizer
        self.device = next(model.parameters()).device

        if isinstance(self.tokenizer, BPETokenizer):
            self.vocab_bytes = self.tokenizer._expanded_vocab()
        else:
            self.vocab_bytes = {idx: bytes([idx]) for idx in range(256)}
            self.vocab_bytes[self.tokenizer.eot_id] = b""

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
        self.sampling_probs: torch.Tensor | None = None
        self.scaled_logits: torch.Tensor | None = None

        self.cumulative_log_prob = 0.0

        self._forward()

    def _forward(self) -> None:
        self.model.model.eval()
        with torch.no_grad():
            if self.model.generation_config.use_cache:
                if self.cache is not None and self.cache[0][0].size(2) >= self.model.model.config.block_size:
                    keep = self.model.model.config.block_size - 1
                    self.cache = [(k[:, :, -keep:, :], v[:, :, -keep:, :]) for k, v in self.cache]

                idx_cond = self.window_idx if self.cache is None else self.window_idx[:, -1:]
                logits, _, self.cache = self.model.model(idx_cond, past_kv=self.cache, use_cache=True)
            else:
                idx_cond = self.window_idx[:, -self.model.model.config.block_size :]
                logits, _ = self.model.model(idx_cond)

            self.logits = logits[0, -1, :]
            self.raw_probs = F.softmax(self.logits, dim=-1)

    def compute_sampling_distribution(
        self,
        temperature: float,
        top_k: int | None,
        top_p: float | None,
    ) -> tuple[torch.Tensor, int, float]:
        temp = max(temperature, 1e-6)
        logits = self.logits / temp

        if top_k is not None and top_k > 0 and top_k < logits.size(-1):
            values, _ = torch.topk(logits, top_k)
            cutoff = values[-1]
            logits_filtered = torch.where(logits < cutoff, torch.full_like(logits, float("-inf")), logits)
        else:
            logits_filtered = logits.clone()

        if top_p is not None and top_p > 0.0 and top_p < 1.0:
            sorted_logits, sorted_indices = torch.sort(logits_filtered, descending=True)
            sorted_probs = F.softmax(sorted_logits, dim=-1)
            cumulative_probs = torch.cumsum(sorted_probs, dim=-1)

            sorted_mask = cumulative_probs > top_p
            sorted_mask[1:] = sorted_mask[:-1].clone()
            sorted_mask[0] = False

            masked_sorted_logits = sorted_logits.masked_fill(sorted_mask, float("-inf"))
            logits_filtered = torch.full_like(logits_filtered, float("-inf"))
            logits_filtered.scatter_(dim=0, index=sorted_indices, src=masked_sorted_logits)

        sampling_probs = F.softmax(logits_filtered, dim=-1)

        is_pruned = torch.isinf(logits_filtered)
        active_tokens_count = int(torch.sum(~is_pruned).item())
        pruned_probability_mass = float(torch.sum(self.raw_probs[is_pruned]).item())

        return sampling_probs, active_tokens_count, pruned_probability_mass

    def get_candidates(
        self,
        sampling_probs: torch.Tensor,
        top_n: int = 10,
        sort_by_sampling: bool = True,
    ) -> list[dict[str, Any]]:
        probs_to_sort = sampling_probs if sort_by_sampling else self.raw_probs
        top_probs, top_indices = torch.topk(probs_to_sort, min(top_n, len(probs_to_sort)))

        candidates = []
        for rank, (sort_prob, idx_tensor) in enumerate(zip(top_probs, top_indices)):
            token_id = int(idx_tensor.item())
            raw_prob = float(self.raw_probs[token_id].item())
            sampling_prob = float(sampling_probs[token_id].item())
            logit = float(self.logits[token_id].item())

            token_bytes = self.vocab_bytes.get(token_id, b"")
            display_text = format_token_bytes(token_bytes)

            candidates.append({
                "rank": rank + 1,
                "token_id": token_id,
                "display_text": display_text,
                "raw_prob": raw_prob,
                "sampling_prob": sampling_prob,
                "logit": logit,
            })
        return candidates

    def step(
        self,
        selected_token_id: int | None = None,
        temperature: float = 0.8,
        top_k: int | None = 50,
        top_p: float | None = None,
        do_sample: bool = True,
    ) -> dict[str, Any]:
        start_time = time.perf_counter()

        sampling_probs, active_count, pruned_mass = self.compute_sampling_distribution(
            temperature=temperature,
            top_k=top_k,
            top_p=top_p,
        )

        raw_entropy = -torch.sum(self.raw_probs[self.raw_probs > 1e-12] * torch.log2(self.raw_probs[self.raw_probs > 1e-12])).item()
        sampling_entropy = -torch.sum(sampling_probs[sampling_probs > 1e-12] * torch.log2(sampling_probs[sampling_probs > 1e-12])).item()

        candidates = self.get_candidates(sampling_probs, top_n=10, sort_by_sampling=do_sample)

        if selected_token_id is not None:
            next_token_id = selected_token_id
            selection_method = "manual"
        else:
            if not do_sample or temperature <= 0:
                next_token_id = int(torch.argmax(self.logits).item())
                selection_method = "greedy"
            else:
                next_token_id = int(torch.multinomial(sampling_probs, num_samples=1).item())
                selection_method = "sampled"

        chosen_raw_prob = float(self.raw_probs[next_token_id].item())
        chosen_sampling_prob = float(sampling_probs[next_token_id].item())

        surprisal = -math.log2(max(chosen_raw_prob, 1e-12))
        self.cumulative_log_prob += math.log(max(chosen_raw_prob, 1e-12))

        sorted_raw_indices = torch.argsort(self.logits, descending=True)
        chosen_rank = int((sorted_raw_indices == next_token_id).nonzero(as_tuple=True)[0].item()) + 1

        token_bytes = self.vocab_bytes.get(next_token_id, b"")
        token_text = token_bytes.decode("utf-8", errors="replace")

        self.generated_tokens.append(next_token_id)
        next_token_tensor = torch.tensor([[next_token_id]], dtype=torch.long, device=self.device)
        self.window_idx = torch.cat((self.window_idx, next_token_tensor), dim=1)
        if self.window_idx.size(1) > self.model.model.config.block_size:
            self.window_idx = self.window_idx[:, -self.model.model.config.block_size :]

        self._forward()
        self.step_index += 1

        latency_ms = (time.perf_counter() - start_time) * 1000

        return {
            "token_id": next_token_id,
            "text": token_text,
            "display_text": format_token_bytes(token_bytes),
            "raw_prob": chosen_raw_prob,
            "sampling_prob": chosen_sampling_prob,
            "rank": chosen_rank,
            "surprisal": surprisal,
            "method": selection_method,
            "raw_entropy": raw_entropy,
            "sampling_entropy": sampling_entropy,
            "active_tokens": active_count,
            "pruned_mass": pruned_mass,
            "cumulative_log_prob": self.cumulative_log_prob,
            "perplexity": math.exp(-self.cumulative_log_prob / len(self.generated_tokens)),
            "latency_ms": latency_ms,
            "candidates": candidates,
        }
