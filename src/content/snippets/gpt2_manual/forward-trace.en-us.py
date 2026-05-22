import torch
from torch import nn

B, T, C, V = 1, 3, 768, 50257
idx = torch.tensor([[1135, 262, 661]])
x = torch.zeros(B, T, C)

blocks = nn.ModuleList([nn.Identity() for _ in range(12)])
for layer_index, block in enumerate(blocks):
    x = block(x)
    print(f"block[{layer_index}]:", tuple(x.shape))

ln_f = nn.LayerNorm(C)
lm_head = nn.Linear(C, V, bias=False)
x = ln_f(x)
logits = lm_head(x)
next_token_logits = logits[:, -1, :]

print("after ln_f:", tuple(x.shape))
print("logits:", tuple(logits.shape))
print("next-token row:", tuple(next_token_logits.shape))
