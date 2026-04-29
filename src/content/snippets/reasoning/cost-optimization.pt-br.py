# Otimizacao de custo com Reasoning

from openai import OpenAI
import time

client = OpenAI()

def smart_reasoning(question: str, complexity_threshold: int = 50) -> dict:
    """
    Usa reasoning apenas para perguntas complexas.
    Para perguntas simples, usa GPT-4o normal.
    """
    # Step 1: Classificar complexidade (barato)
    classifier = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", "content": "Classifique a complexidade de 0-100. Retorne apenas o numero."},
            {"role": "user", "content": question}
        ],
        max_tokens=5
    )
    
    complexity = int(classifier.choices[0].message.content.strip())
    
    if complexity < complexity_threshold:
        # Pergunta simples: sem reasoning
        print(f"[Simples] Complexidade {complexity} < {complexity_threshold}")
        response = client.chat.completions.create(
            model="gpt-4o",
            messages=[{"role": "user", "content": question}]
        )
    else:
        # Pergunta complexa: com reasoning
        print(f"[Complexa] Complexidade {complexity} >= {complexity_threshold}")
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

# Testes
questions = [
    "Qual a capital da Franca?",  # Simples
    "Prove que existem infinitos numeros primos",  # Complexa
]

for q in questions:
    result = smart_reasoning(q)
    print(f"Modelo: {result['model_used']}, Tokens: {result['tokens']}")
