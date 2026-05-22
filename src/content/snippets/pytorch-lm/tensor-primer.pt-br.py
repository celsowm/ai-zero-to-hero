import torch

# 1) Defina o contrato base do exemplo de linguagem.
# B = batch: quantas sequencias entram juntas.
# T = sequence length: quantas posicoes/tokens existem em cada sequencia.
# C = hidden width: quantos numeros representam cada token internamente.
# V = vocabulary size: quantos tokens possiveis o modelo pode pontuar na saida.
batch_size = 2
sequence_length = 4
hidden_width = 8
vocab_size = 50

# 2) token_ids tem shape (B, T).
# Cada linha e uma sequencia; cada coluna e uma posicao no tempo.
# Os valores sao IDs inteiros, por isso dtype=torch.long.
token_ids = torch.tensor([
    [10, 11, 12, 13],
    [20, 21, 22, 23],
], dtype=torch.long)

# 3) hidden_states tem shape (B, T, C).
# Para cada token em cada posicao, o modelo guarda um vetor interno de largura C.
hidden_states = torch.randn(batch_size, sequence_length, hidden_width)

# 4) output_scores tem shape (B, T, V).
# Para cada posicao, o modelo cria um placar com V candidatos de vocabulario.
# Ainda sao scores brutos; probabilidades viriam depois com softmax.
output_scores = torch.randn(batch_size, sequence_length, vocab_size)

# 5) Acesse uma posicao especifica para tirar a abstracao.
# Linha 0 = primeira sequencia do batch; coluna 1 = segundo token da sequencia.
print("token_ids[0, 1]:", token_ids[0, 1])
print("hidden_states[0, 1].shape:", hidden_states[0, 1].shape)  # (C,)
print("output_scores[0, 1].shape:", output_scores[0, 1].shape)  # (V,)

# 6) Leia o pipeline completo por shape e dtype.
print("token_ids:", token_ids.shape, token_ids.dtype)
print("hidden_states:", hidden_states.shape, hidden_states.dtype)
print("output_scores:", output_scores.shape, output_scores.dtype)
