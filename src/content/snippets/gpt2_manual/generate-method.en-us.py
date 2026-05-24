import torch
import torch.nn.functional as F


@torch.no_grad()
def generate(
    self,
    idx,
    max_new_tokens,
    temperature=1.0,
    top_k=None,
):
    for _ in range(max_new_tokens):
        idx_cond = idx[:, -self.config.block_size:]

        logits, _ = self(idx_cond)
        logits = logits[:, -1, :] / temperature

        if top_k is not None:
            v, _ = torch.topk(
                logits,
                min(top_k, logits.size(-1)),
            )
            logits[logits < v[:, [-1]]] = -float("inf")

        probs = F.softmax(logits, dim=-1)
        idx_next = torch.multinomial(probs, num_samples=1)

        idx = torch.cat((idx, idx_next), dim=1)

    return idx
