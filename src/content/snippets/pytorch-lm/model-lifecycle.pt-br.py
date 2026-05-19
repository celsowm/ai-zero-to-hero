import torch
from torch import nn

model = nn.Sequential(nn.Linear(16, 16), nn.Dropout(0.1), nn.Linear(16, 4))
x = torch.randn(2, 16)

model.train()
train_logits = model(x)

model.eval()
with torch.no_grad():
    eval_logits = model(x)

print(train_logits.shape, eval_logits.shape)
