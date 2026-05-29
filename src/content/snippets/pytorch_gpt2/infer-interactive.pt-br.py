# src/pytorch_gpt2/infer/interactive.py

class TokenGenerator:
    def __init__(self, model: GPT2ForCausalLM, prompt: str):
        self.model = model
        self.tokenizer = model.tokenizer
        self.device = next(model.parameters()).device

        input_ids = self.tokenizer.encode(
            prompt,
            add_eot=False,
        )

        if not input_ids:
            input_ids = [self.tokenizer.eot_id]

        self.prompt_tokens = list(input_ids)
        self.generated_tokens: list[int] = []

        self.cache: KVCache | None = None

        self.window_idx = torch.tensor(
            [self.prompt_tokens],
            dtype=torch.long,
            device=self.device,
        )

        self.step_index = 0

        self.logits: torch.Tensor | None = None
        self.raw_probs: torch.Tensor | None = None

        self.cumulative_log_prob = 0.0

        self._forward()

    def compute_sampling_distribution(
        self,
        temperature: float,
        top_k: int | None,
        top_p: float | None,
    ) -> tuple[torch.Tensor, int, float]:
        temp = max(temperature, 1e-6)

        logits = self.logits / temp

        if top_k is not None and top_k > 0:
            values, _ = torch.topk(logits, top_k)
            cutoff = values[-1]

            logits = torch.where(
                logits < cutoff,
                torch.full_like(logits, float("-inf")),
                logits,
            )

        sampling_probs = F.softmax(logits, dim=-1)

        is_pruned = torch.isinf(logits)

        active_tokens_count = int(
            torch.sum(~is_pruned).item()
        )

        pruned_probability_mass = float(
            torch.sum(self.raw_probs[is_pruned]).item()
        )

        return (
            sampling_probs,
            active_tokens_count,
            pruned_probability_mass,
        )

    def step(
        self,
        selected_token_id: int | None = None,
        temperature: float = 0.8,
        top_k: int | None = 50,
        top_p: float | None = None,
        do_sample: bool = True,
    ) -> dict[str, Any]:
        sampling_probs, active_count, pruned_mass = (
            self.compute_sampling_distribution(
                temperature=temperature,
                top_k=top_k,
                top_p=top_p,
            )
        )

        if selected_token_id is not None:
            next_token_id = selected_token_id
            selection_method = "manual"
        elif not do_sample or temperature <= 0:
            next_token_id = int(torch.argmax(self.logits).item())
            selection_method = "greedy"
        else:
            next_token_id = int(
                torch.multinomial(
                    sampling_probs,
                    num_samples=1,
                ).item()
            )
            selection_method = "sampled"

        return {
            "token_id": next_token_id,
            "method": selection_method,
            "active_tokens": active_count,
            "pruned_mass": pruned_mass,
        }
