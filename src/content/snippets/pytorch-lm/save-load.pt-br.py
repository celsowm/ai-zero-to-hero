import torch
from torch import nn

torch.manual_seed(42)

model = nn.Linear(8, 4)
optimizer = torch.optim.AdamW(model.parameters(), lr=3e-4)

train_step = 0

print("\n=== MODEL STATE_DICT ===")
for name, tensor in model.state_dict().items():
    print(name, tensor.shape)

print("\n=== OPTIMIZER ANTES DO TREINO ===")
print("state:", optimizer.state_dict()["state"])
print("lr:", optimizer.param_groups[0]["lr"])

weight_before = model.weight.detach().clone()

x = torch.randn(2, 8)
y = torch.randn(2, 4)

loss = nn.functional.mse_loss(model(x), y)

optimizer.zero_grad()
loss.backward()
optimizer.step()

train_step += 1

weight_after = model.weight.detach().clone()
diff = (weight_after - weight_before).abs().max().item()

print("\n=== DEPOIS DE 1 STEP ===")
print("loss:", loss.item())
print("train_step externo:", train_step)
print("maior diferença no weight:", diff)

print("\n=== STATE INTERNO DO ADAMW ===")
opt_state = optimizer.state_dict()["state"]

for param_id, state in opt_state.items():
    print(f"\nparam_id: {param_id}")
    print("adamw step interno:", state["step"].item())
    print("exp_avg shape:", state["exp_avg"].shape)
    print("exp_avg_sq shape:", state["exp_avg_sq"].shape)

checkpoint = {
    "model": model.state_dict(),
    "optimizer": optimizer.state_dict(),
    "step": train_step,
    "config": {"n_embd": 128, "n_layer": 4},
    "tokenizer": {"type": "byte-level"},
}

torch.save(checkpoint, "checkpoint.pt")

loaded = torch.load("checkpoint.pt", map_location="cpu")

new_model = nn.Linear(8, 4)
new_optimizer = torch.optim.AdamW(new_model.parameters(), lr=999)

print("\n=== ANTES DE CARREGAR CHECKPOINT ===")
print("lr novo optimizer:", new_optimizer.param_groups[0]["lr"])

new_model.load_state_dict(loaded["model"])
new_optimizer.load_state_dict(loaded["optimizer"])

print("\n=== DEPOIS DE CARREGAR CHECKPOINT ===")
print("step carregado:", loaded["step"])
print("lr restaurado:", new_optimizer.param_groups[0]["lr"])

print("\n=== MODELO FOI RESTAURADO? ===")
for key in model.state_dict():
    diff = (model.state_dict()[key] - new_model.state_dict()[key]).abs().max().item()
    print(key, "diferença máxima:", diff)
