# Process Reward Model (PRM) - avaliando qualidade de cada step

from transformers import pipeline

# PRM avalia cada step do reasoning: good/bad/neutral
prm = pipeline(
    "text-classification",
    model="openbmb/PRM-LLaMA-3-8B",
    device=0
)

# Reasoning trace dividido em steps
steps = [
    "Primeiro, identifico que a equacao e quadratica: 3x^2 + 12x - 4 = 0",
    "Uso a formula de Bhaskara: x = (-b +/- sqrt(b^2 - 4ac)) / 2a",
    "Onde a=3, b=12, c=-4",
    "Calculo o discriminante: b^2 - 4ac = 144 - 4(3)(-4) = 144 + 48 = 192",
    "sqrt(192) = sqrt(64 * 3) = 8 * sqrt(3)",
    "x = (-12 +/- 8*sqrt(3)) / 6",
    "Simplificando: x = -2 +/- (4*sqrt(3))/3"
]

# Avaliar cada step
for i, step in enumerate(steps):
    result = prm(f"Step {i+1}: {step}")
    label = result[0]["label"]  # good / bad
    score = result[0]["confidence"]
    status = "OK" if label == "good" and score > 0.8 else "ALERTA"
    print(f"[{status}] Step {i+1}: {label} ({score:.2f})")

# PRM pode ser usado como reward no RL para melhorar o modelo
