import torch

# 1) Defina o contrato base do exemplo
batch_size = 2
sequence_length = 4
hidden_width = 8
vocab_size = 50

# 2) token_ids: IDs inteiros organizados como (B, T)
token_ids = torch.tensor([
    [10, 11, 12, 13],
    [20, 21, 22, 23],
], dtype=torch.long)

# 3) hidden_states: cada token vira um vetor interno de largura C
hidden_states = torch.randn(batch_size, sequence_length, hidden_width)

# 4) output_scores: cada posição recebe V scores de saída
output_scores = torch.randn(batch_size, sequence_length, vocab_size)

# 5) Acesse uma posição específica para tirar a abstração
print("token_ids[0, 1]:", token_ids[0, 1])
print("hidden_states[0, 1].shape:", hidden_states[0, 1].shape)
print("output_scores[0, 1].shape:", output_scores[0, 1].shape)

# 6) Leia o pipeline completo por shape
print("token_ids:", token_ids.shape, token_ids.dtype)
print("hidden_states:", hidden_states.shape, hidden_states.dtype)
print("output_scores:", output_scores.shape, output_scores.dtype)
