print("idx shape:", idx.shape)
print("idx dtype:", idx.dtype)
print("idx device:", idx.device)
print("idx min:", idx.min().item())
print("idx max:", idx.max().item())
print("vocab_size:", model.config.vocab_size)

assert idx.dtype == torch.long
assert idx.max() < model.config.vocab_size
assert idx.shape[1] <= model.config.block_size

print("model device:", next(model.parameters()).device)
print("x device:", x.device)
print("y device:", y.device)

assert x.device == next(model.parameters()).device
assert y.device == next(model.parameters()).device

print("loss:", loss.item())
print("loss is nan:", torch.isnan(loss))

print("tok_emb:", tok_emb.shape)
print("pos_emb:", pos_emb.shape)
print("x:", x.shape)

for i, block in enumerate(self.transformer.h):
    x = block(x)
    print(f"block {i}:", x.shape)

print("logits:", logits.shape)
