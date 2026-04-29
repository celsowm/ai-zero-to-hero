# sglang with Reasoning - Constrained Generation

import sglang as sgl

# sglang offers constrained decoding to validate thinking blocks
@sgl.function
def reasoning_with_structure(s, question):
    """Reasoning with structured output format."""
    s += "User: " + question + "\n"
    s += "Assistant: <think>\n"
    
    # Thinking: model generates freely
    thinking = sgl.gen("thinking", max_tokens=2048, stop="</think>")
    
    s += thinking + "\n</think>\n"
    
    # Answer: constrained to JSON format
    s += "Answer: " + sgl.gen(
        "answer",
        max_tokens=512,
        regex=r'"answer":\s*"[^"]*",\s*"confidence":\s*(0\.\d+|1\.0)'
    )

# Run
from sglang import Runtime
runtime = Runtime(model_path="meta-llama/Llama-3-8B")

result = reasoning_with_structure.run(
    question="How many primes exist between 1 and 50?",
    runtime=runtime
)

print(f"Thinking: {result['thinking'][:100]}...")
print(f"Answer: {result['answer']}")

# sglang advantages:
# - Regex constrained decoding guarantees output format
# - Thinking blocks separate from answer
# - RadixAttention does prefix caching for similar prompts
