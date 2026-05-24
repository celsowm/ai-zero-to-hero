import torch
import torch.nn.functional as F
from torch import nn


class GPT(nn.Module):
    def __init__(self, config):
        super().__init__()

        self.config = config

        self.transformer = nn.ModuleDict(dict(
            wte=nn.Embedding(config.vocab_size, config.n_embd),
            wpe=nn.Embedding(config.block_size, config.n_embd),
            drop=nn.Dropout(config.dropout),
            h=nn.ModuleList([
                TransformerBlock(config)
                for _ in range(config.n_layer)
            ]),
            ln_f=nn.LayerNorm(config.n_embd, bias=config.bias),
        ))

        self.lm_head = nn.Linear(
            config.n_embd,
            config.vocab_size,
            bias=False,
        )

        if config.tie_weights:
            self.lm_head.weight = self.transformer.wte.weight

    def forward(self, idx, targets=None):
        B, T = idx.shape

        assert T <= self.config.block_size

        pos = torch.arange(
            0,
            T,
            dtype=torch.long,
            device=idx.device,
        )

        tok_emb = self.transformer.wte(idx)
        pos_emb = self.transformer.wpe(pos)
        x = self.transformer.drop(tok_emb + pos_emb[None, :, :])

        for block in self.transformer.h:
            x = block(x)

        x = self.transformer.ln_f(x)
        logits = self.lm_head(x)

        loss = None
        if targets is not None:
            loss = F.cross_entropy(
                logits.view(-1, logits.size(-1)),
                targets.view(-1),
            )

        return logits, loss
