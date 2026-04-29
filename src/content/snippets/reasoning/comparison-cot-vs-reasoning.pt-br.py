# Comparacao: CoT (prompt) vs Reasoning Model (treinado)

# 1. Chain of Thought - apenas mudanca no prompt
cot_prompt = """Resolva passo a passo.

Pergunta: Se x + 5 = 12, qual e o valor de x?
Resposta: Para encontrar x, subtraio 5 de ambos os lados:
x + 5 - 5 = 12 - 5
x = 7
Resposta: x = 7
"""

# Modelo normal com CoT prompt
# response = client.chat.completions.create(
#     model="gpt-4o",
#     messages=[{"role": "user", "content": cot_prompt}]
# )

# 2. Reasoning Model - thinking e nativo
reasoning_request = {
    "model": "o3-mini",
    "messages": [{"role": "user", "content": "Se x + 5 = 12, qual e o valor de x?"}],
    "reasoning_effort": "medium"  # Thinking habilitado pelo parametro
}

# O modelo gera thinking blocks automaticamente, sem precisar do prompt "step by step"
# response = client.chat.completions.create(**reasoning_request)
# response.choices[0].message.content
# -> contem thinking blocks + resposta final

print("CoT: thinking depende do prompt. Reasoning Model: thinking e nativo.")
