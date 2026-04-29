# Benchmark comparison of Reasoning Models

# Benchmark data (AIME 2024, GPQA)
benchmarks = {
    "AIME 2024": {
        "GPT-4o": {"accuracy": 13.4, "reasoning": False, "cost_per_1m": 12.50},
        "o1": {"accuracy": 83.3, "reasoning": True, "cost_per_1m": 75.00},
        "o3-mini": {"accuracy": 79.6, "reasoning": True, "cost_per_1m": 5.50},
        "DeepSeek-R1": {"accuracy": 79.8, "reasoning": True, "cost_per_1m": 2.33},
        "Claude 3.5 Sonnet": {"accuracy": 38.2, "reasoning": False, "cost_per_1m": 15.00},
    },
    "GPQA": {
        "GPT-4o": {"accuracy": 39.0, "reasoning": False, "cost_per_1m": 12.50},
        "o1": {"accuracy": 78.0, "reasoning": True, "cost_per_1m": 75.00},
        "Claude 3.5 Sonnet": {"accuracy": 59.0, "reasoning": False, "cost_per_1m": 15.00},
        "DeepSeek-R1": {"accuracy": 71.5, "reasoning": True, "cost_per_1m": 2.33},
    }
}

def print_comparison(benchmark_name: str):
    print(f"\n{'='*60}")
    print(f"  {benchmark_name}")
    print(f"{'='*60}")
    data = benchmarks[benchmark_name]
    
    # Sort by accuracy
    sorted_models = sorted(data.items(), key=lambda x: x[1]["accuracy"], reverse=True)
    
    print(f"{'Model':<25} {'Accuracy':>10} {'Reasoning':>10} {'Cost/1M':>12}")
    print("-" * 60)
    
    for model, info in sorted_models:
        reasoning_str = "Yes" if info["reasoning"] else "No"
        print(f"{model:<25} {info['accuracy']:>9.1f}% {reasoning_str:>10} ${info['cost_per_1m']:>10.2f}")

print_comparison("AIME 2024")
print_comparison("GPQA")

# Insights:
# 1. Reasoning models dominate on complex problems
# 2. DeepSeek-R1 delivers o1-like performance at a fraction of the cost
# 3. Non-reasoning models have a ceiling at ~40% on olympiad problems
