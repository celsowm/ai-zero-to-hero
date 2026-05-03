class GPT2LMHeadModel(torch.nn.Module):
    def __init__(self):
        super().__init__()
        self.transformer = GPT2Model({"n_embd": N_EMBD, "n_head": N_HEAD})
        self.lm_head = torch.nn.Linear(N_EMBD, VOCAB_SIZE, bias=False)

        with torch.no_grad():
            self.lm_head.weight.copy_(STATE_DICT["lm_head.weight"])

    def forward(self, input_ids):
        hidden_states = self.transformer(input_ids)
        logits = self.lm_head(hidden_states)
        return logits


if __name__ == "__main__":
    from transformers import GPT2Tokenizer

    model = GPT2LMHeadModel()
    model.eval()
    tokenizer = GPT2Tokenizer.from_pretrained("gpt2")

    prompt = "We the people of"
    input_ids = tokenizer.encode(prompt, return_tensors="pt")

    # Loop auto-regressivo: prevê → anexa → repete
    for _ in range(20):
        with torch.no_grad():
            logits = model(input_ids)
            probs = F.softmax(logits[0, -1, :] / 0.8, dim=-1)
            next_token = torch.multinomial(probs, num_samples=1).item()

        input_ids = torch.cat([input_ids, torch.tensor([[next_token]])], dim=-1)
        if next_token == tokenizer.eos_token_id:
            break

    print(tokenizer.decode(input_ids[0]))
