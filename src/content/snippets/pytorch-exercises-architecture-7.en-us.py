import torch
import torch.nn as nn

class MyModel(nn.Module):
    def __init__(self):
        super().__init__()
        self.layer1 = nn.Linear(5, 5)
    
    def forward(self, x):
        # TODO: Apply torch.relu to self.layer1(x) output
        x = self.layer1(x)
        return x

model = MyModel()
test_input = torch.randn(1, 5)
output = model(test_input)

# Validator checks for negatives
has_negatives = (output < 0).any().item()
