import torch
from torch import nn

model = nn.Linear(8, 4)
optimizer = torch.optim.AdamW(model.parameters(), lr=3e-4)

checkpoint = {
    "model": model.state_dict(),
    "optimizer": optimizer.state_dict(),
    "step": 120,
}

torch.save(checkpoint, "checkpoint.pt")
loaded = torch.load("checkpoint.pt", map_location="cpu")
