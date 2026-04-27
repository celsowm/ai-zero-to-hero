# @region train-imports
import torch
import torch.nn.functional as F
# Aqui importaríamos a classe GPT e o loader que criamos antes...
# from my_gpt import GPT
# from my_dataset import loader
# @endregion

# @region train-setup
# Inicializa uma versão minúscula do modelo (Tiny) para CPU
model = GPT(
    vocab_size=2000,
    block_size=128,
    n_layer=4,
    n_head=4,
    n_embd=128
)
model.train()

# AdamW otimiza os pesos, lembrando da nossa aula de Gradiente Descendente
optimizer = torch.optim.AdamW(model.parameters(), lr=5e-4)

# @endregion

# @region train-loop
print("Iniciando o loop de treino...")
epochs = 3

for epoch in range(epochs):
    for step, (x, y) in enumerate(loader):
        # 1. Forward: a rede tenta prever
        logits = model(x)

        # 2. Achatar os tensores para a Cross Entropy
        B, T, V = logits.size()
        logits_flat = logits.view(B * T, V)
        y_flat = y.view(B * T)

        # 3. Loss: quão errada a previsão foi?
        loss = F.cross_entropy(logits_flat, y_flat)

        # 4. Backward: a magia da derivada nas engrenagens
        optimizer.zero_grad()
        loss.backward()
        optimizer.step()

        if step % 10 == 0:
            print(f"Epoch {epoch} | Step {step} | Loss: {loss.item():.4f}")

print("Treinamento concluído!")
# Salvando o "cérebro" treinado
torch.save(model.state_dict(), "meu_gpt2_tiny.pt")
# @endregion