# BUG: Parser de Thinking Blocks quebrado em producao

import re

class ReasoningParser:
    """Parser para extrair thinking blocks de respostas de reasoning models."""
    
    THINKING_PATTERN = r'<thought>(.*?)</thought>'
    
    def parse(self, response: str) -> dict:
        """Extrai thinking e resposta da resposta do modelo."""
        match = re.search(self.THINKING_PATTERN, response)
        
        if match:
            thinking = match.group(1)
            answer = response.replace(match.group(0), '').strip()
            return {
                'thinking': thinking,
                'answer': answer,
                'has_thinking': True
            }
        else:
            return {
                'thinking': '',
                'answer': response,
                'has_thinking': False
            }

# Teste
parser = ReasoningParser()

# Exemplo 1: thinking com multiplos paragrafos (BUG!)
response_with_multiline = """<thought>
Primeiro, vou analisar o problema.

A equacao e 3x + 7 = 22.
Subtraio 7: 3x = 15.
Divido por 3: x = 5.

Verificando: 3(5) + 7 = 15 + 7 = 22. OK.
</thought>

A resposta e x = 5."""

result = parser.parse(response_with_multiline)
print(f"Has thinking: {result['has_thinking']}")
print(f"Thinking: '{result['thinking']}'")
print(f"Answer: '{result['answer']}'")

# BUG: O regex nao captura multi-line porque '.' nao match newline!
# O thinking vem vazio e o answer vem com tudo misturado.
