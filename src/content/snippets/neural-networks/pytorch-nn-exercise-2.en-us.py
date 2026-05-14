import torch
import torch.nn as nn

def inference_step(model, x):
    # TODO: Configure the model for inference
    
    # 1. Put the model in eval mode
    # YOUR CODE HERE
    
    # 2. Use the context manager that disables gradient history tracking
    # YOUR CODE HERE
        out = model(x)
        return out

if __name__ == "__main__":
    # A model with Dropout behaves differently in train vs eval
    model = nn.Sequential(nn.Linear(2, 2), nn.Dropout(0.5))
    x = torch.ones(1, 2)
    
    try:
        out = inference_step(model, x)
        print(f"Requires grad: {out.requires_grad}")
        print(f"Training mode: {model.training}")
    except Exception as e:
        print("Error:", e)
