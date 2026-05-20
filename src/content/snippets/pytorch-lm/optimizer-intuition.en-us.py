import torch
import torch.nn as nn

w = torch.tensor([0.0], requires_grad=True)
target = torch.tensor([2.0])
optimizer = torch.optim.SGD([w], lr=0.1)

loss = (w - target).pow(2).mean()
loss.backward()

optimizer.step()
optimizer.zero_grad()

print("loss:", float(loss.detach()))
print("updated_w:", float(w.detach()))
