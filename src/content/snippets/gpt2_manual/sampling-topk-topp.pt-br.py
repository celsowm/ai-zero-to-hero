import torch
import torch.nn.functional as F


values, indices = torch.topk(logits, k=top_k, dim=-1)

filtered = torch.full_like(logits, float("-inf"))
filtered.scatter_(dim=-1, index=indices, src=values)

top_k_probs = F.softmax(filtered, dim=-1)

sorted_logits, sorted_indices = torch.sort(
    logits,
    descending=True,
    dim=-1,
)

sorted_probs = F.softmax(sorted_logits, dim=-1)
cumulative_probs = torch.cumsum(sorted_probs, dim=-1)

sorted_indices_to_remove = cumulative_probs > top_p
sorted_indices_to_remove[..., 1:] = sorted_indices_to_remove[..., :-1].clone()
sorted_indices_to_remove[..., 0] = False

sorted_logits[sorted_indices_to_remove] = -float("inf")

filtered_logits = torch.full_like(logits, float("-inf"))
filtered_logits.scatter_(dim=-1, index=sorted_indices, src=sorted_logits)

top_p_probs = F.softmax(filtered_logits, dim=-1)
