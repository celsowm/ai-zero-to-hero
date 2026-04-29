# E2E Reasoning App - Step 3: Parsing

import re

def parse_thinking(raw_content) -> tuple[str, str]:
    """
    Separa thinking blocks da resposta final.
    Suporta multiplos formatos de thinking.
    """
    # Formato OpenAI: lista de blocos
    if isinstance(raw_content, list):
        thinking = ""
        answer = ""
        for block in raw_content:
            if block.get("type") == "thinking":
                thinking += block.get("thinking", "")
            elif block.get("type") == "text":
                answer += block.get("text", "")
        return thinking.strip(), answer.strip()
    
    # Formato string com tags: <think>...</think>
    text = str(raw_content)
    
    # Tentar <think> primeiro (com DOTALL para multi-line)
    think_match = re.search(r'<think>(.*?)</think>', text, re.DOTALL)
    if think_match:
        thinking = think_match.group(1).strip()
        answer = text.replace(think_match.group(0), '').strip()
        return thinking, answer
    
    # Tentar <thought>...</thought>
    thought_match = re.search(r'<thought>([\s\S]*?)</thought>', text)
    if thought_match:
        thinking = thought_match.group(1).strip()
        answer = text.replace(thought_match.group(0), '').strip()
        return thinking, answer
    
    # Sem thinking: tudo e resposta
    return "", text

# Teste
raw = """<think>
Vou resolver passo a passo.
3x + 7 = 22 => 3x = 15 => x = 5
</think>

A resposta e x = 5."""

thinking, answer = parse_thinking(raw)
print(f"Thinking: {thinking[:50]}...")
print(f"Answer: {answer}")
