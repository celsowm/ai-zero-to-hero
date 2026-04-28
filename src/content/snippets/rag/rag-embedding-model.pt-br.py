# region: rag-embedding-model
from sentence_transformers import SentenceTransformer
import numpy as np

# Carregar modelo de embedding (gera vetores de 384 dimensões)
model = SentenceTransformer("all-MiniLM-L6-v2")

documentos = [
    "A Copa do Mundo de 2022 foi vencida pela Argentina.",
    "Python é uma linguagem de programação criada por Guido van Rossum.",
    "O Rio Amazonas é o maior rio do mundo em volume de água.",
    "A Revolução Francesa ocorreu em 1789.",
]

# Converter documentos em vetores
vetores = model.encode(documentos)
print(f"Shape: {vetores.shape}")  # (4, 384)

# Cada documento agora é um ponto no espaço 384-dimensional.
# Documentos semanticamente similares ficam próximos neste espaço.
# endregion
