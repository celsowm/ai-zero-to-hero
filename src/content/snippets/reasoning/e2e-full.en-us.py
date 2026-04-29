# E2E Reasoning App - Step 5: Full Pipeline

from openai import OpenAI
import re
import time

client = OpenAI()

PRICING = {
    "o3-mini": {"input": 1.10, "output": 4.40},
    "gpt-4o": {"input": 2.50, "output": 10.00},
    "gpt-4o-mini": {"input": 0.15, "output": 0.60},
}

class ReasoningApp:
    """Complete reasoning pipeline with parsing, fallback and cost control."""
    
    def __init__(self, cost_limit_usd: float = 1.00, show_thinking: bool = False):
        self.cost_limit = cost_limit_usd
        self.show_thinking = show_thinking
    
    def _parse(self, content) -> tuple[str, str]:
        if isinstance(content, list):
            thinking = "".join(b.get("thinking", "") for b in content if b.get("type") == "thinking")
            answer = "".join(b.get("text", "") for b in content if b.get("type") == "text")
            return thinking, answer
        
        match = re.search(r'<think>(.*?)</think>', str(content), re.DOTALL)
        if match:
            return match.group(1).strip(), content.replace(match.group(0), '').strip()
        return "", content
    
    def _cost(self, model: str, usage) -> float:
        p = PRICING[model]
        return (usage.prompt_tokens / 1e6) * p["input"] + (usage.completion_tokens / 1e6) * p["output"]
    
    def ask(self, question: str) -> dict:
        start = time.time()
        
        # Attempt 1: Reasoning
        try:
            resp = client.chat.completions.create(
                model="o3-mini",
                messages=[{"role": "user", "content": question}],
                reasoning_effort="medium",
                max_completion_tokens=4096,
                timeout=60
            )
            thinking, answer = self._parse(resp.choices[0].message.content)
            cost = self._cost("o3-mini", resp.usage)
            
            return {
                "model": "o3-mini", "reasoning": True,
                "thinking": thinking if self.show_thinking else None,
                "answer": answer, "tokens": resp.usage.total_tokens,
                "cost": cost, "latency": time.time() - start
            }
        except:
            pass
        
        # Attempt 2: Fallback CoT
        resp = client.chat.completions.create(
            model="gpt-4o",
            messages=[{"role": "user", "content": f"Think step by step:\n{question}"}],
            max_tokens=2048
        )
        cost = self._cost("gpt-4o", resp.usage)
        
        return {
            "model": "gpt-4o", "reasoning": False,
            "thinking": None, "answer": resp.choices[0].message.content,
            "tokens": resp.usage.total_tokens,
            "cost": cost, "latency": time.time() - start
        }

# Usage
app = ReasoningApp(cost_limit_usd=0.50, show_thinking=True)
result = app.ask("How many prime numbers exist between 1 and 100?")
print(f"Model: {result['model']} | Cost: ${result['cost']:.4f}")
print(f"Answer: {result['answer'][:100]}...")
