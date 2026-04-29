# Hints para corrigir o bug do parser

import re

# BUG: A regex nao tem flag re.DOTALL
# '.' por padrao NAO match newline (\n)

# Solucao 1: Adicionar re.DOTALL flag
FIXED_PATTERN_1 = r'<thought>(.*?)</thought>'
# Usar com: re.search(pattern, text, re.DOTALL)

# Solucao 2: Usar [\s\S] que match qualquer caractere incluindo newline
FIXED_PATTERN_2 = r'<thought>([\s\S]*?)</thought>'
# Nao precisa de flag, funciona diretamente

# Solucao 3: Compilar regex com flag
COMPILED_PATTERN = re.compile(r'<thought>(.*?)</thought>', re.DOTALL | re.IGNORECASE)

# Teste da correcao
response = """<thought>
Step 1: Analisar problema
Step 2: Calcular
</thought>
Resposta: 42"""

# Com DOTALL
match = re.search(FIXED_PATTERN_1, response, re.DOTALL)
if match:
    print("DOTALL funciona!")
    print(f"Thinking: {match.group(1)[:50]}...")

# Com [\s\S]
match2 = re.search(FIXED_PATTERN_2, response)
if match2:
    print("[\\s\\S] funciona!")
    print(f"Thinking: {match2.group(1)[:50]}...")
