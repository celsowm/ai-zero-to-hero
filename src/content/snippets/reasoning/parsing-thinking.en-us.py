# Parsing Thinking Blocks

import re
import json

# Response with thinking blocks (string format)
response_content = """<think>
Let's solve step by step.

First, I identify the equation: 2x + 5 = 15
Subtract 5 from both sides: 2x = 10
Divide by 2: x = 5

Checking: 2(5) + 5 = 10 + 5 = 15. Correct.
</think>

The solution is x = 5."""

# Regex to capture thinking blocks (with DOTALL for multi-line)
thinking_pattern = r"<think>(.*?)</think>"
thinking_match = re.search(thinking_pattern, response_content, re.DOTALL)

if thinking_match:
    thinking = thinking_match.group(1).strip()
    # Remove thinking from content to keep only the answer
    answer = re.sub(thinking_pattern, "", response_content, flags=re.DOTALL).strip()
    
    print("=== THINKING ===")
    print(thinking)
    print("\n=== ANSWER ===")
    print(answer)
else:
    # Fallback: model without thinking
    print("No thinking blocks found. Using full response.")
    print(response_content)
