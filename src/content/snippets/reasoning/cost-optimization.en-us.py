# Cost optimization with Reasoning

from openai import OpenAI
import time

client = OpenAI()

def smart_reasoning(question: str, complexity_threshold: int = 50) -> dict:
    """
    Uses reasoning only for complex questions.
    For simple questions, uses normal GPT-4o.
    """
    # Step 1: Classify complexity (cheap)
    classifier = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", "content": "Rate complexity from 0-100. Return only the number."},
            {"role": "user", "content": question}
        ],
        max_tokens=5
    )
    
    complexity = int(classifier.choices[0].message.content.strip())
    
    if complexity < complexity_threshold:
        # Simple question: no reasoning
        print(f"[Simple] Complexity {complexity} < {complexity_threshold}")
        response = client.chat.completions.create(
            model="gpt-4o",
            messages=[{"role": "user", "content": question}]
        )
    else:
        # Complex question: with reasoning
        print(f"[Complex] Complexity {complexity} >= {complexity_threshold}")
        response = client.chat.completions.create(
            model="o3-mini",
            messages=[{"role": "user", "content": question}],
            reasoning_effort="high"
        )
    
    return {
        "complexity": complexity,
        "model_used": response.model,
        "tokens": response.usage.total_tokens,
        "answer": response.choices[0].message.content
    }

# Tests
questions = [
    "What is the capital of France?",  # Simple
    "Prove that there are infinitely prime numbers",  # Complex
]

for q in questions:
    result = smart_reasoning(q)
    print(f"Model: {result['model_used']}, Tokens: {result['tokens']}")
