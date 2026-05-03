class GPT2MLP(torch.nn.Module):
    def __init__(self, config, layer_idx=None):
        super().__init__()
        embed_dim = config["n_embd"]
        self.c_fc = torch.nn.Linear(embed_dim, INTERMEDIATE_SIZE)
        self.c_proj = torch.nn.Linear(INTERMEDIATE_SIZE, embed_dim)
        self.act = F.gelu
        self.dropout = torch.nn.Dropout(0.1)

        if layer_idx is not None:
            w = _load_layer_weights(layer_idx, config)
            with torch.no_grad():
                self.c_fc.weight.copy_(w["mlp.c_fc.weight"])
                self.c_fc.bias.copy_(w["mlp.c_fc.bias"])
                self.c_proj.weight.copy_(w["mlp.c_proj.weight"])
                self.c_proj.bias.copy_(w["mlp.c_proj.bias"])

    def forward(self, hidden_states):
        hidden_states = self.c_fc(hidden_states)
        hidden_states = self.act(hidden_states)
        hidden_states = self.c_proj(hidden_states)
        hidden_states = self.dropout(hidden_states)
        return hidden_states


class GPT2Block(torch.nn.Module):
    def __init__(self, layer_idx, config):
        super().__init__()
        hidden_size = config["n_embd"]
        self.ln_1 = torch.nn.LayerNorm(hidden_size, eps=1e-5)
        self.attn = GPT2Attention(config, layer_idx=layer_idx)
        self.ln_2 = torch.nn.LayerNorm(hidden_size, eps=1e-5)
        self.mlp = GPT2MLP(config, layer_idx=layer_idx)

        if layer_idx is not None:
            w = _load_layer_weights(layer_idx, config)
            with torch.no_grad():
                self.ln_1.weight.copy_(w["ln_1.weight"])
                self.ln_1.bias.copy_(w["ln_1.bias"])
                self.ln_2.weight.copy_(w["ln_2.weight"])
                self.ln_2.bias.copy_(w["ln_2.bias"])

    def forward(self, hidden_states, attention_mask=None):
        residual = hidden_states
        hidden_states = self.ln_1(hidden_states)
        attn_output, _ = self.attn(hidden_states, attention_mask)
        hidden_states = residual + attn_output

        residual = hidden_states
        hidden_states = self.ln_2(hidden_states)
        feed_forward_hidden_states = self.mlp(hidden_states)
        hidden_states = residual + feed_forward_hidden_states
        return hidden_states
