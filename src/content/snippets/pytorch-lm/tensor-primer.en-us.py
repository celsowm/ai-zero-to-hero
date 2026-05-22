import torch

# 1) Define the base contract for the example
batch_size = 2
sequence_length = 4
hidden_width = 8
vocab_size = 50

# 2) token_ids: integer IDs arranged as (B, T)
token_ids = torch.tensor([
    [10, 11, 12, 13],
    [20, 21, 22, 23],
], dtype=torch.long)

# 3) hidden_states: each token becomes an internal width-C vector
hidden_states = torch.randn(batch_size, sequence_length, hidden_width)

# 4) output_scores: each position gets V output scores
output_scores = torch.randn(batch_size, sequence_length, vocab_size)

# 5) Inspect one position to make the shapes less abstract
print("token_ids[0, 1]:", token_ids[0, 1])
print("hidden_states[0, 1].shape:", hidden_states[0, 1].shape)
print("output_scores[0, 1].shape:", output_scores[0, 1].shape)

# 6) Read the full pipeline by shape
print("token_ids:", token_ids.shape, token_ids.dtype)
print("hidden_states:", hidden_states.shape, hidden_states.dtype)
print("output_scores:", output_scores.shape, output_scores.dtype)
