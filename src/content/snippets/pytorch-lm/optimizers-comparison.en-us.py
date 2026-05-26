import torch
import torch.nn.functional as F

target = torch.tensor([0])

# SGD
logits_sgd = torch.tensor([[2.0, 0.5, -1.0]], requires_grad=True)
optimizer_sgd = torch.optim.SGD([logits_sgd], lr=0.01)

loss_sgd = F.cross_entropy(logits_sgd, target)
optimizer_sgd.zero_grad()
loss_sgd.backward()
optimizer_sgd.step()

print("SGD")
print("loss:", float(loss_sgd.detach()))
print("logits depois:", logits_sgd.detach())


# AdamW
logits_adamw = torch.tensor([[2.0, 0.5, -1.0]], requires_grad=True)
optimizer_adamw = torch.optim.AdamW([logits_adamw], lr=0.01)

loss_adamw = F.cross_entropy(logits_adamw, target)
optimizer_adamw.zero_grad()
loss_adamw.backward()
optimizer_adamw.step()

print("\nAdamW")
print("loss:", float(loss_adamw.detach()))
print("logits depois:", logits_adamw.detach())
