import torch

# Simulates a trained model (dummy weights for demonstration only)
class DiseaseModel(torch.nn.Module):
    def __init__(self):
        super().__init__()
        self.linear = torch.nn.Linear(4, 1)
        self.sigmoid = torch.nn.Sigmoid()

    def forward(self, x):
        return self.sigmoid(self.linear(x))

model = DiseaseModel()

# Save the state_dict (trained weights)
torch.save(model.state_dict(), "disease_model.pt")
print("Model saved successfully!")

# --- Recovery ---
# Recreate the architecture from scratch
new_model = DiseaseModel()
new_model.load_state_dict(torch.load("disease_model.pt", weights_only=True))
new_model.eval()

# Test with the same patient
x_new = torch.tensor([[0.58, 0.75, 0.82, 1.0]], dtype=torch.float32)
with torch.no_grad():
    prob = new_model(x_new).item()

print(f"Probability (loaded model): {prob:.4f}")
print(f"Class: {'yes' if prob >= 0.5 else 'no'}")
