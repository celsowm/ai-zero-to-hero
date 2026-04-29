# E2E Reasoning App - Step 4: Fallback

from openai import OpenAI

client = OpenAI()

def reasoning_fallback(question: str, max_retries: int = 2) -> dict:
    """
    Sistema de reasoning com fallback automatico.
    Tenta reasoning -> CoT -> modelo simples.
    """
    attempts = []
    
    # Attempt 1: Reasoning model (o3-mini)
    try:
        print("[1/3] Tentando o3-mini com reasoning...")
        resp = client.chat.completions.create(
            model="o3-mini",
            messages=[{"role": "user", "content": question}],
            reasoning_effort="medium",
            max_completion_tokens=4096,
            timeout=60
        )
        return {
            "success": True,
            "model": "o3-mini",
            "reasoning": True,
            "content": resp.choices[0].message.content,
            "tokens": resp.usage.total_tokens,
            "attempts": attempts + ["o3-mini:ok"]
        }
    except Exception as e:
        attempts.append(f"o3-mini: {str(e)[:50]}")
        print(f"  Falhou: {e}")
    
    # Attempt 2: GPT-4o com CoT prompt
    try:
        print("[2/3] Tentando GPT-4o com CoT...")
        cot = f"Think step by step:\n{question}"
        resp = client.chat.completions.create(
            model="gpt-4o",
            messages=[{"role": "user", "content": cot}],
            max_tokens=2048
        )
        return {
            "success": True,
            "model": "gpt-4o",
            "reasoning": False,
            "content": resp.choices[0].message.content,
            "tokens": resp.usage.total_tokens,
            "attempts": attempts + ["gpt-4o-cot:ok"]
        }
    except Exception as e:
        attempts.append(f"gpt-4o-cot: {str(e)[:50]}")
        print(f"  Falhou: {e}")
    
    # Attempt 3: GPT-4o-mini (mais barato, mais rapido)
    try:
        print("[3/3] Tentando GPT-4o-mini...")
        resp = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[{"role": "user", "content": question}],
            max_tokens=1024
        )
        return {
            "success": True,
            "model": "gpt-4o-mini",
            "reasoning": False,
            "content": resp.choices[0].message.content,
            "tokens": resp.usage.total_tokens,
            "attempts": attempts + ["gpt-4o-mini:ok"]
        }
    except Exception as e:
        attempts.append(f"gpt-4o-mini: {str(e)[:50]}")
    
    return {"success": False, "error": "All attempts failed", "attempts": attempts}
