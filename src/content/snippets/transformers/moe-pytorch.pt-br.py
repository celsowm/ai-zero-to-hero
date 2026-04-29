# @region moe-layer
import torch
import torch.nn as nn
import torch.nn.functional as F

class MoELayer(nn.Module):
    def __init__(self, num_experts, input_dim, hidden_dim, top_k=1):
        super().__init__()
        self.num_experts = num_experts
        self.top_k = top_k
        
        # O Roteador: projeta o input para o número de especialistas
        self.router = nn.Linear(input_dim, num_experts)
        
        # Os Especialistas: cada um é uma rede neural (MLP) independente
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
        x = x.view(-1, x.shape[-1]) # Flatten para [tokens, input_dim]
        
        # 1. Roteamento: calcular scores e selecionar Top-K
        logits = self.router(x)
        scores = F.softmax(logits, dim=-1)
        weights, selected_experts = torch.topk(scores, self.top_k)
        
        # Normalizar pesos se top_k > 1
        weights = weights / weights.sum(dim=-1, keepdim=True)

        # 2. Execução Esparsa: processar cada token pelo seu especialista
        final_output = torch.zeros_like(x)
        
        # DEBUG POINT: Aqui você pode ver a distribuição de carga
        # expert_counts = torch.bincount(selected_experts.view(-1), minlength=self.num_experts)
        
        for i in range(self.num_experts):
            # Mascarar tokens que escolheram o especialista 'i'
            mask = (selected_experts == i).any(dim=-1)
            if mask.any():
                # Apenas os tokens selecionados entram no Especialista i
                expert_output = self.experts[i](x[mask])
                
                # Somar o resultado ponderado (gated)
                # Precisamos encontrar a posição do peso correspondente
                pos = (selected_experts[mask] == i).nonzero()[:, 1]
                weight = weights[mask].gather(1, pos.unsqueeze(1))
                
                final_output[mask] += expert_output * weight
        
        return final_output.view(*orig_shape)
# @endregion moe-layer

# --- SCRIPT DE DEBUG (Para rodar localmente) ---
if __name__ == "__main__":
    device = "cuda" if torch.cuda.is_available() else "cpu"
    print(f"Rodando em: {device}")
    
    # Config: 8 especialistas, top-2 ativo
    moe = MoELayer(num_experts=8, input_dim=16, hidden_dim=64, top_k=2).to(device)
    
    # Input: 1 frase, 5 tokens, dimensão 16
    x = torch.randn(1, 5, 16).to(device)
    
    # Rodar inferência
    output = moe(x)
    
    print(f"Input shape: {x.shape}")
    print(f"Output shape: {output.shape}")
    print("\nDebug de Roteamento (Tokens -> Especialistas):")
    logits = moe.router(x.view(-1, 16))
    _, top_experts = torch.topk(logits, k=2)
    for i, experts in enumerate(top_experts):
        print(f"Token {i}: Roteado para Especialistas {experts.tolist()}")
