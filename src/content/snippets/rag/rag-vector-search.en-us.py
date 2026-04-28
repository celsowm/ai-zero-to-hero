# region: rag-vector-search
from sentence_transformers import SentenceTransformer
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity

model = SentenceTransformer("all-MiniLM-L6-v2")

documents = [
    "Brazil won the 2002 World Cup with Ronaldo.",
    "Python is used for machine learning and data science.",
    "France hosted the 1998 World Cup and won.",
    "JavaScript is the language of the web.",
]

# Document embeddings
doc_embeddings = model.encode(documents)

# User query
query = "Who won the World Cup?"
query_embedding = model.encode([query])

# Cosine similarity: measures angle between vectors (1 = identical, 0 = orthogonal)
similarities = cosine_similarity(query_embedding, doc_embeddings)[0]

for doc, score in sorted(zip(documents, similarities), key=lambda x: -x[1]):
    print(f"  {score:.3f} → {doc}")
# Documents about the World Cup rise to the top — semantically closest to the query.
# endregion
