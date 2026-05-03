class GPT2Model(torch.nn.Module):
    def __init__(self, config):
        super().__init__()
        self.wte = torch.nn.Embedding(VOCAB_SIZE, N_EMBD)
        self.wpe = torch.nn.Embedding(MAX_POS, N_EMBD)
        self.drop = torch.nn.Dropout(0.1)
        self.h = torch.nn.ModuleList([GPT2Block(i, config) for i in range(N_LAYERS)])
        self.ln_f = torch.nn.LayerNorm(N_EMBD, eps=1e-5)

        with torch.no_grad():
            self.wte.weight.copy_(STATE_DICT["transformer.wte.weight"])
            self.wpe.weight.copy_(STATE_DICT["transformer.wpe.weight"])
            self.ln_f.weight.copy_(STATE_DICT["transformer.ln_f.weight"])
            self.ln_f.bias.copy_(STATE_DICT["transformer.ln_f.bias"])

    def forward(self, input_ids, attention_mask=None):
        token_embeds = self.wte(input_ids)
        position_ids = torch.arange(input_ids.size(1), dtype=torch.long, device=input_ids.device).unsqueeze(0)
        position_embeds = self.wpe(position_ids)
        hidden_states = token_embeds + position_embeds
        hidden_states = self.drop(hidden_states)

        causal_mask = torch.triu(
            torch.ones(input_ids.size(1), input_ids.size(1), device=input_ids.device),
            diagonal=1
        ).bool().unsqueeze(0).unsqueeze(0)

        for block in self.h:
            hidden_states = block(hidden_states, causal_mask)

        hidden_states = self.ln_f(hidden_states)
        return hidden_states
