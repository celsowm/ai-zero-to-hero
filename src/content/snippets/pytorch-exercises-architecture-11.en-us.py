import torch
import torch.nn as nn

# A model with Dropout changes behavior between train() and eval().
torch.manual_seed(7)
model = nn.Sequential(
    nn.Linear(4, 4),
    nn.Dropout(p=0.9),
)
x = torch.ones(1, 4)

# TODO: put the model in evaluation mode.
# Then run inference inside torch.no_grad().
# Save the output in 'out' and save 'is_training' as model.training.
out = None
is_training = None
