from torch import nn

model = nn.ModuleDict({
    "wte": nn.Embedding(5000, 128),
    "blocks": nn.ModuleList([
        nn.Sequential(
            nn.LayerNorm(128),
            nn.Linear(128, 128),
            nn.Dropout(0.1),
        )
    ]),
    "lm_head": nn.Linear(128, 5000),
})
