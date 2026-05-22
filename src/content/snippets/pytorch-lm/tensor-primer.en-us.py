import torch

# 1) Define the base contract for the language-modeling example.
# B = batch: how many sequences enter together.
# T = sequence length: how many positions/tokens each sequence has.
# C = hidden width: how many numbers represent each token internally.
# V = vocabulary size: how many possible tokens the model can score as output.
batch_size = 2
sequence_length = 4
hidden_width = 8
vocab_size = 50

# 2) token_ids has shape (B, T).
# Each row is a sequence; each column is a time/token position.
# Values are integer IDs, so dtype=torch.long.
token_ids = torch.tensor([
    [10, 11, 12, 13],
    [20, 21, 22, 23],
], dtype=torch.long)

# 3) hidden_states has shape (B, T, C).
# For each token at each position, the model stores an internal width-C vector.
hidden_states = torch.randn(batch_size, sequence_length, hidden_width)

# 4) output_scores has shape (B, T, V).
# For each position, the model creates a scoreboard over V vocabulary candidates.
# These are still raw scores; probabilities would come later with softmax.
output_scores = torch.randn(batch_size, sequence_length, vocab_size)

# 5) Inspect one specific position to make the shapes less abstract.
# Row 0 = first sequence in the batch; column 1 = second token in that sequence.
print("token_ids[0, 1]:", token_ids[0, 1])
print("hidden_states[0, 1].shape:", hidden_states[0, 1].shape)  # (C,)
print("output_scores[0, 1].shape:", output_scores[0, 1].shape)  # (V,)

# 6) Read the full pipeline by shape and dtype.
print("token_ids:", token_ids.shape, token_ids.dtype)
print("hidden_states:", hidden_states.shape, hidden_states.dtype)
print("output_scores:", output_scores.shape, output_scores.dtype)
