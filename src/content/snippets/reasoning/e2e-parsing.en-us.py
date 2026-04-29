# E2E Reasoning App - Step 3: Parsing

import re

def parse_thinking(raw_content) -> tuple[str, str]:
    """
    Separate thinking blocks from final answer.
    Supports multiple thinking formats.
    """
    # OpenAI format: list of blocks
    if isinstance(raw_content, list):
        thinking = ""
        answer = ""
        for block in raw_content:
            if block.get("type") == "thinking":
                thinking += block.get("thinking", "")
            elif block.get("type") == "text":
                answer += block.get("text", "")
        return thinking.strip(), answer.strip()
    
    # String format with tags: <think>...</think>
    text = str(raw_content)
    
    # Try <think> first (with DOTALL for multi-line)
    think_match = re.search(r'<think>(.*?)</think>', text, re.DOTALL)
    if think_match:
        thinking = think_match.group(1).strip()
        answer = text.replace(think_match.group(0), '').strip()
        return thinking, answer
    
    # Try <thought>...</thought>
    thought_match = re.search(r'<thought>([\s\S]*?)</thought>', text)
    if thought_match:
        thinking = thought_match.group(1).strip()
        answer = text.replace(thought_match.group(0), '').strip()
        return thinking, answer
    
    # No thinking: everything is answer
    return "", text

# Test
raw = """<think>
I'll solve step by step.
3x + 7 = 22 => 3x = 15 => x = 5
</think>

The answer is x = 5."""

thinking, answer = parse_thinking(raw)
print(f"Thinking: {thinking[:50]}...")
print(f"Answer: {answer}")
