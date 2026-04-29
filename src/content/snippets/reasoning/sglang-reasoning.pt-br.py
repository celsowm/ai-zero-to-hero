# sglang com Reasoning - Constrained Generation

import sglang as sgl

# sglang oferece constrained decoding para validar thinking blocks
@sgl.function
def reasoning_with_structure(s, question):
    """Reasoning com formato estruturado de output."""
    s += "User: " + question + "\n"
    s += "Assistant: <think>\n"
    
    # Thinking: o modelo gera livremente
    thinking = sgl.gen("thinking", max_tokens=2048, stop="</think>")
    
    s += thinking + "\n</think>\n"
    
    # Answer: constrained para formato JSON
    s += "Answer: " + sgl.gen(
        "answer",
        max_tokens=512,
        regex=r'"answer":\s*"[^"]*",\s*"confidence":\s*(0\.\d+|1\.0)'
    )

# Executar
from sglang import Runtime
runtime = Runtime(model_path="meta-llama/Llama-3-8B")

result = reasoning_with_structure.run(
    question="Quantos primos existem entre 1 e 50?",
    runtime=runtime
)

print(f"Thinking: {result['thinking'][:100]}...")
print(f"Answer: {result['answer']}")

# Vantagem do sglang:
# - Regex constrained decoding garante formato de output
# - Thinking blocks separados da resposta
# - RadixAttention faz prefix caching para prompts similares
