# @region generate-imports
import torch
import torch.nn.functional as F
# from my_gpt import GPT
# @endregion

# @region generate-setup
# Recarregamos nosso modelo recém treinado
model = GPT(vocab_size=2000, block_size=128, n_layer=4, n_head=4, n_embd=128)
model.load_state_dict(torch.load("meu_gpt2_tiny.pt"))
model.eval() # Modo inferência (desativa ruídos de treino)

# @endregion

# @region generate-loop
# Nosso prompt inicial convertido em IDs (ex: "O", "rato", "ro", "eu")
context_ids = [12, 45, 89, 302]
x = torch.tensor([context_ids], dtype=torch.long)

max_new_tokens = 20
temperature = 0.8

print("Gerando texto...")
for _ in range(max_new_tokens):
    # Cortar o contexto se passar do limite que a rede suporta
    x_cond = x[:, -128:]

    # 1. Forward no modelo para pegar a distribuição do próximo token
    logits = model(x_cond)
    # Pega apenas o logit do último tempo da sequência
    logits = logits[:, -1, :]

    # 2. Aplica Temperature e Softmax para virar porcentagem
    probs = F.softmax(logits / temperature, dim=-1)

    # 3. Sorteia o token baseado na probabilidade ("rola os dados")
    next_token = torch.multinomial(probs, num_samples=1)

    # 4. Concatena o token de volta na entrada e repete!
    x = torch.cat((x, next_token), dim=1)

# Converte os IDs finais de volta pra texto (decode do BPE)
# texto_final = bpe.decode(x[0].tolist())
print(f"Lista de IDs gerados: {x[0].tolist()}")
# @endregion