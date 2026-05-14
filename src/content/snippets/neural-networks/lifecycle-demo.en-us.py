import torch
import torch.nn as nn

# --- Sample model ---
model = nn.Sequential(
    nn.Linear(10, 8),
    nn.Dropout(0.3),   # behaves differently in train vs eval
    nn.Linear(8, 1),
    nn.Sigmoid(),
)

X = torch.randn(4, 10)

# --- 1. model.train() vs model.eval() ---
model.train()
output_train = model(X)  # Dropout active: zeros 30% of neurons
print("Train mode (dropout active):", output_train.shape)

model.eval()
output_eval = model(X)   # Dropout disabled: all neurons active
print("Eval mode (dropout OFF):", output_eval.shape)

# --- 2. torch.no_grad() for inference (saves memory) ---
with torch.no_grad():
    pred = model(X)
    print("Prediction (no gradient):", pred.shape)
    print("Requires grad?", pred.requires_grad)  # False

# --- 3. .detach() to save results without the computation graph ---
train_model = nn.Sequential(nn.Linear(10, 8), nn.ReLU(), nn.Linear(8, 1))
optimizer = torch.optim.Adam(train_model.parameters(), lr=0.01)

for _ in range(3):
    y_hat = train_model(X)
    loss = y_hat.pow(2).mean()
    optimizer.zero_grad()
    loss.backward()
    optimizer.step()

# Save the loss without dragging the computation graph
loss_value = loss.detach().item()
print("Saved loss (detached):", round(loss_value, 6))

# Convert to numpy without gradients
numpy_array = pred.detach().numpy()
print("Numpy shape:", numpy_array.shape)
