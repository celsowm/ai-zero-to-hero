# Zero-shot Chain of Thought: a frase mágica
question = "Um restaurante tem 15 mesas. Nas mesas próximas à janela (1/3 do total), há 4 lugares cada. Nas outras, há 6 lugares. Se 60% dos lugares estão ocupados, quantos clientes há?"

# Sem CoT - resposta direta
prompt_direct = f"Responda diretamente: {question}"

# Com CoT zero-shot - "Let's think step by step"
prompt_cot = f"""{question}

Vamos pensar passo a passo."""

print("=== Zero-shot CoT ===")
print(f"Pergunta: {question}")
print(f"\nPrompt direto:\n{prompt_direct}")
print(f"\nPrompt CoT:\n{prompt_cot}")
print(f"\nA frase 'Vamos pensar passo a passo' força o modelo a gerar raciocínio intermediário.")
