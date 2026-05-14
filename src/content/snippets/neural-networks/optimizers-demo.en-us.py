import torch
import torch.nn as nn

# --- Sample data ---
X = torch.tensor([[0.5, 0.3, 0.8, 0.1]], dtype=torch.float32)
y = torch.tensor([[1.0]], dtype=torch.float32)

model = nn.Sequential(nn.Linear(4, 1), nn.Sigmoid())

# --- SGD with Momentum ---
sgd = torch.optim.SGD(model.parameters(), lr=0.01, momentum=0.9)
print("SGD with momentum=0.9: accumulates inertia to pass local minima")

# --- Adam (industry standard) ---
adam = torch.optim.Adam(model.parameters(), lr=0.001)
print("Adam: adaptive learning rate per parameter")

# --- The training loop (always the same 3 steps) ---
for epoch in range(5):
    # 1. Forward pass
    y_hat = model(X)
    loss = nn.BCELoss()(y_hat, y)

    # 2. Zero old gradients (PyTorch accumulates by default!)
    adam.zero_grad()

    # 3. Compute gradients (backpropagation)
    loss.backward()

    # 4. Apply weight update
    adam.step()

    print(f"Epoch {epoch+1}: loss = {loss.item():.6f}")

# --- Tip: switching optimizer is just one line change ---
# just replace `adam` with `sgd` in the loop above
