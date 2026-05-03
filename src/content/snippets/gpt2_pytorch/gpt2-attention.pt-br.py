class GPT2Attention(torch.nn.Module):
    def __init__(self, config, layer_idx=None):
        super().__init__()
        embed_dim = config["n_embd"]
        self.num_heads = config["n_head"]
        self.head_dim = embed_dim // self.num_heads
        self.split_size = embed_dim
        self.scaling = self.head_dim ** -0.5

        self.c_attn = torch.nn.Linear(embed_dim, embed_dim * 3)
        self.c_proj = torch.nn.Linear(embed_dim, embed_dim)
        self.resid_dropout = torch.nn.Dropout(0.1)

        if layer_idx is not None:
            w = _load_layer_weights(layer_idx, config)
            with torch.no_grad():
                self.c_attn.weight.copy_(w["attn.c_attn.weight"])
                self.c_attn.bias.copy_(w["attn.c_attn.bias"])
                self.c_proj.weight.copy_(w["attn.c_proj.weight"])
                self.c_proj.bias.copy_(w["attn.c_proj.bias"])

    def forward(self, hidden_states, attention_mask=None):
        qkv = self.c_attn(hidden_states)
        query, key, value = qkv.split(self.split_size, dim=-1)

        query = query.view(hidden_states.size(0), -1, self.num_heads, self.head_dim).transpose(1, 2)
        key = key.view(hidden_states.size(0), -1, self.num_heads, self.head_dim).transpose(1, 2)
        value = value.view(hidden_states.size(0), -1, self.num_heads, self.head_dim).transpose(1, 2)

        attn_weights = (query @ key.transpose(-2, -1)) * self.scaling
        if attention_mask is not None:
            attn_weights = attn_weights.masked_fill(attention_mask, float("-inf"))
        attn_weights = F.softmax(attn_weights, dim=-1)

        attn_output = attn_weights @ value
        attn_output = attn_output.transpose(1, 2).contiguous()
        attn_output = attn_output.reshape(*attn_output.shape[:-2], -1)
        attn_output = self.c_proj(attn_output)
        attn_output = self.resid_dropout(attn_output)
        return attn_output, attn_weights
