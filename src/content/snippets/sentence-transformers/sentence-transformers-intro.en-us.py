from sentence_transformers import SentenceTransformer
import numpy as np

model = SentenceTransformer("intfloat/multilingual-e5-base")

base = "O autor pede indenização por danos morais."

frases = [
    "O autor não pede indenização por danos morais.",
    "A parte autora requer reparação moral.",
    "A contestação sustenta ausência de responsabilidade civil.",
    "A mitocôndria participa da respiração celular.",
    "A RTX 5090 está aquecendo durante o treino do modelo.",
    "A baleia azul é o maior animal do planeta.",
    "O bolo de cenoura ficou pronto em quarenta minutos.",
]


def emb(texto):
    return model.encode(
        "passage: " + texto,
        normalize_embeddings=True,
    )


vetores = [emb(base)] + [emb(f) for f in frases]

base_vec = vetores[0]

print("SEM TIRAR O CENTRO")
print("=" * 80)

scores = []

for frase, vec in zip(frases, vetores[1:]):
    score = float(np.dot(base_vec, vec))
    scores.append((score, frase))

for score, frase in sorted(scores, reverse=True):
    print(f"{score:.4f} - {frase}")


print()
print("TIRANDO O CENTRO")
print("=" * 80)

centro = np.mean(vetores, axis=0)

base_c = vetores[0] - centro
base_c = base_c / np.linalg.norm(base_c)

scores = []

for frase, vec in zip(frases, vetores[1:]):
    vec_c = vec - centro
    vec_c = vec_c / np.linalg.norm(vec_c)

    score = float(np.dot(base_c, vec_c))
    scores.append((score, frase))

for score, frase in sorted(scores, reverse=True):
    print(f"{score:.4f} - {frase}")
