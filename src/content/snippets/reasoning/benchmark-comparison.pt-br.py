# Benchmark comparison de Reasoning Models

# Dados de benchmarks (AIME 2024, GPQA)
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
    
    # Ordenar por accuracy
    sorted_models = sorted(data.items(), key=lambda x: x[1]["accuracy"], reverse=True)
    
    print(f"{'Modelo':<25} {'Accuracy':>10} {'Reasoning':>10} {'Custo/1M':>12}")
    print("-" * 60)
    
    for model, info in sorted_models:
        reasoning_str = "Sim" if info["reasoning"] else "Nao"
        print(f"{model:<25} {info['accuracy']:>9.1f}% {reasoning_str:>10} ${info['cost_per_1m']:>10.2f}")

print_comparison("AIME 2024")
print_comparison("GPQA")

# Insights:
# 1. Reasoning models dominam em problemas complexos
# 2. DeepSeek-R1 entrega performance similar a o1 por fracao do custo
# 3. Modelos sem reasoning tem teto em ~40% em problemas olimpicos
