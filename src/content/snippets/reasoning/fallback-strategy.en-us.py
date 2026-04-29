# Fallback strategy for when reasoning fails

from openai import OpenAI
client = OpenAI()
import time

def reasoning_with_fallback(question: str, max_retries: int = 2) -> dict:
    """
    Tries reasoning with fallback to normal model if it fails.
    """
    errors = []
    
    # Attempt 1: o3-mini with reasoning
    try:
        response = client.chat.completions.create(
            model="o3-mini",
            messages=[{"role": "user", "content": question}],
            reasoning_effort="medium",
            max_completion_tokens=4096,
            timeout=60  # 60s timeout
        )
        return {
            "model": "o3-mini",
            "reasoning": True,
            "answer": response.choices[0].message.content,
            "tokens": response.usage.total_tokens,
            "retries": 0
        }
    except Exception as e:
        errors.append(f"o3-mini failed: {str(e)}")
        print(f"[Fallback 1] o3-mini failed, trying gpt-4o...")
    
    # Attempt 2: GPT-4o with CoT prompt
    try:
        cot_prompt = f"Think step by step and solve:\n{question}"
        response = client.chat.completions.create(
            model="gpt-4o",
            messages=[{"role": "user", "content": cot_prompt}],
            max_tokens=2048
        )
        return {
            "model": "gpt-4o",
            "reasoning": False,
            "answer": response.choices[0].message.content,
            "tokens": response.usage.total_tokens,
            "retries": 1
        }
    except Exception as e:
        errors.append(f"gpt-4o failed: {str(e)}")
    
    return {"error": "All attempts failed", "details": errors}

# Usage
result = reasoning_with_fallback("Prove that sqrt(2) is irrational")
print(f"Model: {result.get('model')}, Retries: {result.get('retries', 'N/A')}")
