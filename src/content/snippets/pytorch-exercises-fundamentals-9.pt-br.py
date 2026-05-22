import torch

# Contrato de linguagem: B=2, T=4, C=8, V=50.
batch_size = 2
sequence_length = 4
hidden_width = 8
vocab_size = 50

hidden_states = torch.randn(batch_size, sequence_length, hidden_width)
output_scores = torch.randn(batch_size, sequence_length, vocab_size)

# TODO: Acesse a mesma posição [0, 1] nos dois tensores.
# Salve o shape do vetor interno em hidden_vec_shape.
# Salve o shape do placar de vocabulário em score_vec_shape.
# Dica: use list(tensor.shape).
hidden_vec_shape = None
score_vec_shape = None
