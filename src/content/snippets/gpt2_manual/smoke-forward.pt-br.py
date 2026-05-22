config = ModelConfig(block_size=32, n_layer=2, n_head=2, n_embd=64, dropout=0.0)
model = GPT(config)
x = torch.randint(0, config.vocab_size, (2, 32))
logits, loss = model(x, targets=x)

print("logits:", tuple(logits.shape))
print("loss:", float(loss.detach()))
print("params:", model.num_parameters())
