import torch

batch_size = 2
sequence_length = 4
hidden_width = 8
vocab_size = 50

token_ids = torch.tensor([
    [10, 11, 12, 13],
    [20, 21, 22, 23],
], dtype=torch.long)

hidden_states = torch.randn(batch_size, sequence_length, hidden_width)
logits = torch.randn(batch_size, sequence_length, vocab_size)

print("token_ids:", token_ids.shape, token_ids.dtype)
print("hidden_states:", hidden_states.shape, hidden_states.dtype)
print("logits:", logits.shape, logits.dtype)
