# E2E Reasoning App - Step 1: Setup

from openai import OpenAI
import json
import time
from dataclasses import dataclass
from typing import Optional

@dataclass
class ReasoningConfig:
    """Configuracao do sistema de reasoning."""
    reasoning_model: str = "o3-mini"
    fallback_model: str = "gpt-4o"
    reasoning_effort: str = "medium"  # low, medium, high
    max_thinking_tokens: int = 4096
    timeout_seconds: int = 60
    show_thinking: bool = False  # Mostrar thinking ao usuario final
    cost_limit_usd: float = 1.00  # Limite de custo por chamada

@dataclass
class ReasoningResult:
    """Resultado de uma chamada de reasoning."""
    success: bool
    model_used: str
    reasoning: bool
    thinking: Optional[str]
    answer: str
    total_tokens: int
    cost_usd: float
    latency_seconds: float
    retries: int

# Setup do client
client = OpenAI()

# Precos (Out 2024)
PRICING = {
    "o3-mini": {"input": 1.10, "output": 4.40},
    "gpt-4o": {"input": 2.50, "output": 10.00},
}

def calculate_cost(model: str, usage) -> float:
    """Calcula custo em USD baseado no modelo e usage."""
    p = PRICING[model]
    input_cost = (usage.prompt_tokens / 1_000_000) * p["input"]
    output_cost = (usage.completion_tokens / 1_000_000) * p["output"]
    return input_cost + output_cost

print("Setup completo: Config, Result, Pricing, Client.")
