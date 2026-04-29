# Anthropic API (Claude) with Thinking

from anthropic import Anthropic
client = Anthropic()

# Claude uses different thinking parameter than OpenAI
response = client.messages.create(
    model="claude-sonnet-4-20250514",
    max_tokens=8192,
    thinking={
        "type": "enabled",
        "budget_tokens": 4096  # Token limit for thinking
    },
    messages=[
        {"role": "user", "content": "Prove that sqrt(2) is irrational"}
    ]
)

# Response comes with thinking + text blocks
for block in response.content:
    if block.type == "thinking":
        print("[THINKING]")
        print(block.thinking)
    elif block.type == "text":
        print("[ANSWER]")
        print(block.text)

# Thinking budget control:
# - budget_tokens limits how much thinking can be used
# - If limit reached, Claude stops thinking and answers
# - thinking doesn't count in max_tokens of final response
