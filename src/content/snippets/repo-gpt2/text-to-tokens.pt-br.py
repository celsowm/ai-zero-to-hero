import torch

prompt_tokens = [87, 101, 32, 116, 104, 101, 32, 112, 101, 111, 112, 108, 101]
idx = torch.tensor([prompt_tokens], dtype=torch.long)

print("idx:", idx)
print("shape:", idx.shape)  # (B, T)
