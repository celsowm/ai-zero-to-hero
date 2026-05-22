import torch

# Language contract: B=2, T=4, C=8, V=50.
batch_size = 2
sequence_length = 4
hidden_width = 8
vocab_size = 50

hidden_states = torch.randn(batch_size, sequence_length, hidden_width)
output_scores = torch.randn(batch_size, sequence_length, vocab_size)

# TODO: Access the same position [0, 1] in both tensors.
# Save the internal vector shape in hidden_vec_shape.
# Save the vocabulary scoreboard shape in score_vec_shape.
# Hint: use list(tensor.shape).
hidden_vec_shape = None
score_vec_shape = None
