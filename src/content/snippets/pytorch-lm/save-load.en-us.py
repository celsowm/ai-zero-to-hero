import torch
from torch import nn

model = nn.Linear(8, 4)
optimizer = torch.optim.AdamW(model.parameters(), lr=3e-4)

checkpoint = {
    "model": model.state_dict(),
    "optimizer": optimizer.state_dict(),
    "step": 120,
    "config": {"n_embd": 128, "n_layer": 4},
    "tokenizer": {"type": "byte-level"},
}

torch.save(checkpoint, "checkpoint.pt")
checkpoint = torch.load("checkpoint.pt", map_location="cpu")

model.load_state_dict(checkpoint["model"])
optimizer.load_state_dict(checkpoint["optimizer"])
step = checkpoint["step"]
config = checkpoint["config"]
