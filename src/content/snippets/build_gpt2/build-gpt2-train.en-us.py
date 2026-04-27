# @region train-imports
import torch
import torch.nn.functional as F
# Here we would import the GPT class and the loader we created earlier...
# from my_gpt import GPT
# from my_dataset import loader
# @endregion

# @region train-setup
# Initialize a tiny version of the model (Tiny) for CPU
model = GPT(
    vocab_size=2000,
    block_size=128,
    n_layer=4,
    n_head=4,
    n_embd=128
)
model.train()

# AdamW optimizes the weights, remembering our Gradient Descent lesson
optimizer = torch.optim.AdamW(model.parameters(), lr=5e-4)

# @endregion

# @region train-loop
print("Starting training loop...")
epochs = 3

for epoch in range(epochs):
    for step, (x, y) in enumerate(loader):
        # 1. Forward: the network tries to predict
        logits = model(x)

        # 2. Flatten the tensors for Cross Entropy
        B, T, V = logits.size()
        logits_flat = logits.view(B * T, V)
        y_flat = y.view(B * T)

        # 3. Loss: how wrong was the prediction?
        loss = F.cross_entropy(logits_flat, y_flat)

        # 4. Backward: the magic of the derivative in the gears
        optimizer.zero_grad()
        loss.backward()
        optimizer.step()

        if step % 10 == 0:
            print(f"Epoch {epoch} | Step {step} | Loss: {loss.item():.4f}")

print("Training complete!")
# Saving the trained "brain"
torch.save(model.state_dict(), "my_gpt2_tiny.pt")
# @endregion