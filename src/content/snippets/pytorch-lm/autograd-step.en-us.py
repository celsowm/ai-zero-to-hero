import torch
import torch.nn.functional as F

logits = torch.tensor([[2.0, 0.5, -1.0]], requires_grad=True)
target = torch.tensor([0])

loss = F.cross_entropy(logits, target)
loss.backward()

print("loss:", float(loss.detach()))
print("grad:", logits.grad)
