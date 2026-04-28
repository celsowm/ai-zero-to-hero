# @region rag-vector-search
from sentence_transformers import SentenceTransformer
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity

model = SentenceTransformer("all-MiniLM-L6-v2")

documentos = [
    "O Brasil ganhou a Copa de 2002 com Ronaldo.",
    "Python é usado para machine learning e data science.",
    "A França sediou a Copa de 1998 e venceu.",
    "JavaScript é a linguagem da web.",
]

# Embedding dos documentos
doc_embeddings = model.encode(documentos)

# Query do usuário
query = "Quem ganhou a Copa do Mundo de futebol?"
query_embedding = model.encode([query])

# Cosine similarity: mede ângulo entre vetores (1 = idêntico, 0 = ortogonal)
similarities = cosine_similarity(query_embedding, doc_embeddings)[0]

for doc, score in sorted(zip(documentos, similarities), key=lambda x: -x[1]):
    print(f"  {score:.3f} → {doc}")
# Os documentos sobre Copa ficam no topo — semanticamente mais próximos da query.
# @endregion
