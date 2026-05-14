import torch
import torch.nn as nn

# --- 1. nn.Conv2d: 32x32 images with 3 channels (RGB) ---
image = torch.randn(2, 3, 32, 32)  # batch=2, channels=3, height=32, width=32
conv = nn.Conv2d(in_channels=3, out_channels=16, kernel_size=3, padding=1)
output_conv = conv(image)
print("Conv2d output:", output_conv.shape)  # torch.Size([2, 16, 32, 32])

# --- 2. nn.LSTM: sequence of 10 steps with 8 features ---
sequence = torch.randn(5, 10, 8)  # batch=5, seq_len=10, features=8
lstm = nn.LSTM(input_size=8, hidden_size=16, batch_first=True)
output_lstm, (hidden, cell) = lstm(sequence)
print("LSTM output:", output_lstm.shape)  # torch.Size([5, 10, 16])

# --- 3. nn.Embedding: 1000 words, 64-dimensional vectors ---
tokens = torch.tensor([42, 127, 3, 891])  # token IDs
embedding = nn.Embedding(num_embeddings=1000, embedding_dim=64)
output_emb = embedding(tokens)
print("Embedding output:", output_emb.shape)  # torch.Size([4, 64])

# --- 4. nn.Dropout: 30% of neurons zeroed during training ---
x = torch.randn(4, 10)
dropout = nn.Dropout(p=0.3)
model = nn.Sequential(
    nn.Linear(10, 8),
    nn.ReLU(),
    dropout,  # active in training, disabled in eval
    nn.Linear(8, 1),
)
model.train()
output_train = model(x)  # dropout active
model.eval()
output_eval = model(x)   # dropout disabled
print("Train (dropout active):", output_train.shape)
print("Eval (dropout OFF):", output_eval.shape)
