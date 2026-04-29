# Parsing de Thinking Blocks

import re
import json

# Response com thinking blocks (formato string)
response_content = """<think>
Vamos resolver passo a passo.

Primeiro, identifico a equacao: 2x + 5 = 15
Subtraio 5 de ambos os lados: 2x = 10
Divido por 2: x = 5

Verificando: 2(5) + 5 = 10 + 5 = 15. Correto.
</think>

A solucao e x = 5."""

# Regex para capturar thinking blocks (com DOTALL para multi-line)
thinking_pattern = r"<think>(.*?)</think>"
thinking_match = re.search(thinking_pattern, response_content, re.DOTALL)

if thinking_match:
    thinking = thinking_match.group(1).strip()
    # Remover o thinking do content para ficar so a resposta
    answer = re.sub(thinking_pattern, "", response_content, flags=re.DOTALL).strip()
    
    print("=== THINKING ===")
    print(thinking)
    print("\n=== ANSWER ===")
    print(answer)
else:
    # Fallback: modelo sem thinking
    print("No thinking blocks found. Using full response.")
    print(response_content)
