# E2E Reasoning App - Step 1: Setup

from openai import OpenAI
import json
import time
from dataclasses import dataclass
from typing import Optional

@dataclass
class ReasoningConfig:
    """Reasoning system configuration."""
    reasoning_model: str = "o3-mini"
    fallback_model: str = "gpt-4o"
    reasoning_effort: str = "medium"  # low, medium, high
    max_thinking_tokens: int = 4096
    timeout_seconds: int = 60
    show_thinking: bool = False  # Show thinking to end user
    cost_limit_usd: float = 1.00  # Cost limit per call

@dataclass
class ReasoningResult:
    """Result of a reasoning call."""
    success: bool
    model_used: str
    reasoning: bool
    thinking: Optional[str]
    answer: str
    total_tokens: int
    cost_usd: float
    latency_seconds: float
    retries: int

# Client setup
client = OpenAI()

# Pricing (Oct 2024)
PRICING = {
    "o3-mini": {"input": 1.10, "output": 4.40},
    "gpt-4o": {"input": 2.50, "output": 10.00},
}

def calculate_cost(model: str, usage) -> float:
    """Calculate cost in USD based on model and usage."""
    p = PRICING[model]
    input_cost = (usage.prompt_tokens / 1_000_000) * p["input"]
    output_cost = (usage.completion_tokens / 1_000_000) * p["output"]
    return input_cost + output_cost

print("Setup complete: Config, Result, Pricing, Client.")
