# @region moe-layer
import torch
import torch.nn as nn
import torch.nn.functional as F

class MoELayer(nn.Module):
    def __init__(self, num_experts, input_dim, hidden_dim, top_k=1):
        super().__init__()
        self.num_experts = num_experts
        self.top_k = top_k
        
        # The Router: projects input to the number of experts
        self.router = nn.Linear(input_dim, num_experts)
        
        # The Experts: each one is an independent MLP
        self.experts = nn.ModuleList([
            nn.Sequential(
                nn.Linear(input_dim, hidden_dim),
                nn.GELU(),
                nn.Linear(hidden_dim, input_dim)
            ) for _ in range(num_experts)
        ])

    def forward(self, x):
        # x shape: [batch, seq_len, input_dim]
        orig_shape = x.shape
        x = x.view(-1, x.shape[-1]) # Flatten to [tokens, input_dim]
        
        # 1. Routing: calculate scores and select Top-K
        logits = self.router(x)
        scores = F.softmax(logits, dim=-1)
        weights, selected_experts = torch.topk(scores, self.top_k)
        
        # Normalize weights if top_k > 1
        weights = weights / weights.sum(dim=-1, keepdim=True)

        # 2. Sparse Execution: process each token by its expert
        final_output = torch.zeros_like(x)
        
        # DEBUG POINT: Here you can see the load distribution
        # expert_counts = torch.bincount(selected_experts.view(-1), minlength=self.num_experts)
        
        for i in range(self.num_experts):
            # Mask tokens that chose expert 'i'
            mask = (selected_experts == i).any(dim=-1)
            if mask.any():
                # Only selected tokens enter Expert i
                expert_output = self.experts[i](x[mask])
                
                # Sum the weighted (gated) result
                # We need to find the position of the corresponding weight
                pos = (selected_experts[mask] == i).nonzero()[:, 1]
                weight = weights[mask].gather(1, pos.unsqueeze(1))
                
                final_output[mask] += expert_output * weight
        
        return final_output.view(*orig_shape)
# @endregion moe-layer

# --- DEBUG SCRIPT (To run locally) ---
if __name__ == "__main__":
    device = "cuda" if torch.cuda.is_available() else "cpu"
    print(f"Running on: {device}")
    
    # Config: 8 experts, top-2 active
    moe = MoELayer(num_experts=8, input_dim=16, hidden_dim=64, top_k=2).to(device)
    
    # Input: 1 sentence, 5 tokens, dimension 16
    x = torch.randn(1, 5, 16).to(device)
    
    # Run inference
    output = moe(x)
    
    print(f"Input shape: {x.shape}")
    print(f"Output shape: {output.shape}")
    print("\nRouting Debug (Tokens -> Experts):")
    logits = moe.router(x.view(-1, 16))
    _, top_experts = torch.topk(logits, k=2)
    for i, experts in enumerate(top_experts):
        print(f"Token {i}: Routed to Experts {experts.tolist()}")
