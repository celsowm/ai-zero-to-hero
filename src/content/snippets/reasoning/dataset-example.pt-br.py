# Exemplo de data point de reasoning dataset

dataset_example = {
    "problem": "Um trem viaja a 60 km/h. Quanto tempo leva para percorrer 180 km?",
    "reasoning_trace": """Primeiro, identifico as grandezas:
- Velocidade: 60 km/h
- Distancia: 180 km
- Tempo: ?

Uso a formula: tempo = distancia / velocidade
tempo = 180 km / 60 km/h
tempo = 3 horas

Verificando: 60 km/h x 3h = 180 km. Correto.""",
    "answer": "3 horas",
    "step_labels": [
        {"step": "Identificar grandezas", "quality": "good"},
        {"step": "Escolher formula", "quality": "good"},
        {"step": "Calcular 180/60", "quality": "good"},
        {"step": "Verificar resultado", "quality": "good"}
    ]
}

print(f"Problema: {dataset_example['problem']}")
print(f"Resposta: {dataset_example['answer']}")
print(f"Steps: {len(dataset_example['step_labels'])} passos avaliados")
