# @region model-imports
import torch
import torch.nn as nn
from torch.nn import functional as F
# @endregion

# @region model-attention
class CausalSelfAttention(nn.Module):
    def __init__(self, n_embd, n_head):
        super().__init__()
        self.n_head = n_head
        self.n_embd = n_embd
        # Calcula Query, Key, Value tudo de uma vez
        self.c_attn = nn.Linear(n_embd, 3 * n_embd)
        self.c_proj = nn.Linear(n_embd, n_embd)

    def forward(self, x):
        B, T, C = x.size()

        qkv = self.c_attn(x)
        q, k, v = qkv.split(self.n_embd, dim=2)

        # Redimensionar para os "cabeçotes" (multi-head)
        k = k.view(B, T, self.n_head, C // self.n_head).transpose(1, 2)
        q = q.view(B, T, self.n_head, C // self.n_head).transpose(1, 2)
        v = v.view(B, T, self.n_head, C // self.n_head).transpose(1, 2)

        # Atenção mágica (is_causal=True impede ver o futuro)
        y = F.scaled_dot_product_attention(q, k, v, is_causal=True)

        # Remonta e projeta
        y = y.transpose(1, 2).contiguous().view(B, T, C)
        return self.c_proj(y)
# @endregion

# @region model-block
class Block(nn.Module):
    def __init__(self, n_embd, n_head):
        super().__init__()
        self.ln_1 = nn.LayerNorm(n_embd)
        self.attn = CausalSelfAttention(n_embd, n_head)
        self.ln_2 = nn.LayerNorm(n_embd)

        # A Rede Neural Perceptron (MLP) interna
        self.mlp = nn.Sequential(
            nn.Linear(n_embd, 4 * n_embd),
            nn.GELU(),
            nn.Linear(4 * n_embd, n_embd)
        )

    def forward(self, x):
        # A "Rodovia de Resíduos" (x + ...)
        x = x + self.attn(self.ln_1(x))
        x = x + self.mlp(self.ln_2(x))
        return x
# @endregion

# @region model-gpt
class GPT(nn.Module):
    def __init__(self, vocab_size, block_size, n_layer, n_head, n_embd):
        super().__init__()
        # Dicionários de embeddings (Palavra e Posição)
        self.wte = nn.Embedding(vocab_size, n_embd)
        self.wpe = nn.Embedding(block_size, n_embd)

        # A torre de blocos
        self.blocks = nn.ModuleList([Block(n_embd, n_head) for _ in range(n_layer)])
        self.ln_f = nn.LayerNorm(n_embd)

        # O cabeçote final que adivinha o token
        self.lm_head = nn.Linear(n_embd, vocab_size, bias=False)

    def forward(self, idx):
        B, T = idx.size()
        pos = torch.arange(0, T, dtype=torch.long, device=idx.device)

        # Soma: Que palavra é + Onde ela está
        x = self.wte(idx) + self.wpe(pos)

        for block in self.blocks:
            x = block(x)

        x = self.ln_f(x)
        logits = self.lm_head(x) # [Batch, Tempo, Vocabulario]
        return logits
# @endregion