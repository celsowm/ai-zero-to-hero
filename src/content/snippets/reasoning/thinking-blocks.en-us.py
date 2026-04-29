# Thinking Blocks structure in response

from openai import OpenAI
client = OpenAI()

response = client.chat.completions.create(
    model="o3-mini",
    messages=[
        {"role": "user", "content": "What is 347 x 23?"}
    ],
    reasoning_effort="medium"
)

# The response comes with thinking blocks in content
message = response.choices[0].message

# Structured content:
content = message.content
# [
#   {
#     "type": "thinking",
#     "thinking": "I'll multiply step by step...\n347 x 23 = 347 x (20 + 3)\n= 347 x 20 + 347 x 3\n= 6940 + 1041\n= 7981"
#   },
#   {
#     "type": "text",
#     "text": "347 x 23 = 7981"
#   }
# ]

print(f"Tokens used: {response.usage.total_tokens}")
print(f"Thinking tokens: {response.usage.reasoning_tokens}")
print(f"Output tokens: {response.usage.completion_tokens}")
