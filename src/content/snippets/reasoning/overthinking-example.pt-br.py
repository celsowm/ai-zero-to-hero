# Exemplo de Overthinking com Reasoning

from openai import OpenAI
client = OpenAI()

# Pergunta simples que nao precisa de reasoning
simple_question = "Qual e a capital do Brasil?"

# Com reasoning_effort=high, o modelo vai pensar demais para algo simples
response = client.chat.completions.create(
    model="o3-mini",
    messages=[{"role": "user", "content": simple_question}],
    reasoning_effort="high"  # Overkill!
)

# O thinking pode gerar algo como:
# """
# <think>
# O usuario pergunta sobre a capital do Brasil.
# Vamos verificar: Brasil e um pais na America do Sul.
# Sua capital atual e Brasilia, inaugurada em 1960.
# Antes era Rio de Janeiro, e antes Salvador.
# Mas a resposta direta e Brasilia.
# Verificando: sim, Brasilia e a capital desde 21 de abril de 1960.
# Posso confirmar com confianca.
# </think>
# """
# Resposta: A capital do Brasil e Brasilia.

# Total de tokens: ~100+ para uma resposta de 5 tokens!
# Com GPT-4o: ~10 tokens totais.

print("Overthinking: 100+ tokens para uma resposta de 5 tokens.")
print("Use reasoning_effort=low ou modelo normal para perguntas simples.")
