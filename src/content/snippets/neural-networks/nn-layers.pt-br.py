import torch
import torch.nn as nn

# --- 1. nn.Conv2d: imagens 32x32 com 3 canais (RGB) ---
imagem = torch.randn(2, 3, 32, 32)  # batch=2, canais=3, altura=32, largura=32
conv = nn.Conv2d(in_channels=3, out_channels=16, kernel_size=3, padding=1)
saida_conv = conv(imagem)
print("Conv2d saida:", saida_conv.shape)  # torch.Size([2, 16, 32, 32])

# --- 2. nn.LSTM: sequencia de 10 passos com 8 features ---
sequencia = torch.randn(5, 10, 8)  # batch=5, seq_len=10, features=8
lstm = nn.LSTM(input_size=8, hidden_size=16, batch_first=True)
saida_lstm, (hidden, cell) = lstm(sequencia)
print("LSTM saida:", saida_lstm.shape)  # torch.Size([5, 10, 16])

# --- 3. nn.Embedding: 1000 palavras, vetores de 64 dimensoes ---
tokens = torch.tensor([42, 127, 3, 891])  # IDs de tokens
embedding = nn.Embedding(num_embeddings=1000, embedding_dim=64)
saida_emb = embedding(tokens)
print("Embedding saida:", saida_emb.shape)  # torch.Size([4, 64])

# --- 4. nn.Dropout: 30% dos neuronios zerados durante treino ---
x = torch.randn(4, 10)
dropout = nn.Dropout(p=0.3)
model = nn.Sequential(
    nn.Linear(10, 8),
    nn.ReLU(),
    dropout,  # ativo no treino, desligado no eval
    nn.Linear(8, 1),
)
model.train()
saida_train = model(x)  # dropout ativo
model.eval()
saida_eval = model(x)   # dropout desligado
print("Train (dropout ativo):", saida_train.shape)
print("Eval (dropout OFF):", saida_eval.shape)
