import torch

# Example logits
logits = torch.tensor([1.0, 4.5, 0.7, 2.2, 3.8])
k = 3

# 1. Find the cutoff value using torch.topk
# cutoff should be the smallest value among the top-k
cutoff = torch.topk(logits, k).values[-1]

# TODO: Create 'filtered' as a copy of logits.
# Replace all values smaller than cutoff with float("-inf")
filtered = None
