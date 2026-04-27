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
        # Calculates Query, Key, Value all at once
        self.c_attn = nn.Linear(n_embd, 3 * n_embd)
        self.c_proj = nn.Linear(n_embd, n_embd)

    def forward(self, x):
        B, T, C = x.size()

        qkv = self.c_attn(x)
        q, k, v = qkv.split(self.n_embd, dim=2)

        # Reshape for the "heads" (multi-head)
        k = k.view(B, T, self.n_head, C // self.n_head).transpose(1, 2)
        q = q.view(B, T, self.n_head, C // self.n_head).transpose(1, 2)
        v = v.view(B, T, self.n_head, C // self.n_head).transpose(1, 2)

        # Magic attention (is_causal=True prevents seeing the future)
        y = F.scaled_dot_product_attention(q, k, v, is_causal=True)

        # Reassemble and project
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

        # The internal Neural Perceptron (MLP)
        self.mlp = nn.Sequential(
            nn.Linear(n_embd, 4 * n_embd),
            nn.GELU(),
            nn.Linear(4 * n_embd, n_embd)
        )

    def forward(self, x):
        # The "Residual Highway" (x + ...)
        x = x + self.attn(self.ln_1(x))
        x = x + self.mlp(self.ln_2(x))
        return x
# @endregion

# @region model-gpt
class GPT(nn.Module):
    def __init__(self, vocab_size, block_size, n_layer, n_head, n_embd):
        super().__init__()
        # Embedding dictionaries (Word and Position)
        self.wte = nn.Embedding(vocab_size, n_embd)
        self.wpe = nn.Embedding(block_size, n_embd)

        # The tower of blocks
        self.blocks = nn.ModuleList([Block(n_embd, n_head) for _ in range(n_layer)])
        self.ln_f = nn.LayerNorm(n_embd)

        # The final head that guesses the token
        self.lm_head = nn.Linear(n_embd, vocab_size, bias=False)

    def forward(self, idx):
        B, T = idx.size()
        pos = torch.arange(0, T, dtype=torch.long, device=idx.device)

        # Sum: What word it is + Where it is
        x = self.wte(idx) + self.wpe(pos)

        for block in self.blocks:
            x = block(x)

        x = self.ln_f(x)
        logits = self.lm_head(x) # [Batch, Time, Vocabulary]
        return logits
# @endregion