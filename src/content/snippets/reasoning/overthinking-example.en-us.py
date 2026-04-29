# Overthinking example with Reasoning

from openai import OpenAI
client = OpenAI()

# Simple question that doesn't need reasoning
simple_question = "What is the capital of Brazil?"

# With reasoning_effort=high, the model will overthink something simple
response = client.chat.completions.create(
    model="o3-mini",
    messages=[{"role": "user", "content": simple_question}],
    reasoning_effort="high"  # Overkill!
)

# The thinking might generate something like:
# """
# </think>
# The user asks about Brazil's capital.
# Let me verify: Brazil is a country in South America.
# Its current capital is Brasilia, inaugurated in 1960.
# Before it was Rio de Janeiro, and before that Salvador.
# But the direct answer is Brasilia.
# Checking: yes, Brasilia has been the capital since April 21, 1960.
# I can confirm with confidence.
# </think>
# """
# Answer: The capital of Brazil is Brasilia.

# Total tokens: ~100+ for a 5-token answer!
# With GPT-4o: ~10 tokens total.

print("Overthinking: 100+ tokens for a 5-token answer.")
print("Use reasoning_effort=low or normal model for simple questions.")
