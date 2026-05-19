idx = torch.randint(0, config.vocab_size, (2, 16))
x = model.token_embedding(idx)
print("token_embedding:", x.shape)

x = x + model.position_embedding(torch.arange(idx.size(1), device=idx.device))[None, :, :]
print("plus_position:", x.shape)

for block_id, block in enumerate(model.blocks):
    x = block(x)
    print(f"block_{block_id}:", x.shape)

logits = model.lm_head(model.ln_f(x))
print("logits:", logits.shape)
