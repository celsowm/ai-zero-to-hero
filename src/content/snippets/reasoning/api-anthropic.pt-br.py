# Anthropic API (Claude) com Thinking

from anthropic import Anthropic
client = Anthropic()

# Claude usa parametro thinking diferente da OpenAI
response = client.messages.create(
    model="claude-sonnet-4-20250514",
    max_tokens=8192,
    thinking={
        "type": "enabled",
        "budget_tokens": 4096  # Limite de tokens para thinking
    },
    messages=[
        {"role": "user", "content": "Prove that sqrt(2) is irrational"}
    ]
)

# A resposta vem com blocos de thinking + text
for block in response.content:
    if block.type == "thinking":
        print("[THINKING]")
        print(block.thinking)
    elif block.type == "text":
        print("[ANSWER]")
        print(block.text)

# Thinking budget control:
# - budget_tokens limita quanto thinking pode usar
# - Se atingir o limite, Claude para de pensar e responde
# - thinking nao conta no max_tokens da resposta final
