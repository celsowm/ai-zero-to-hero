# @region rag-embedding-model
from sentence_transformers import SentenceTransformer
import numpy as np

# Load embedding model (generates 384-dimensional vectors)
model = SentenceTransformer("all-MiniLM-L6-v2")

documents = [
    "The 2022 World Cup was won by Argentina.",
    "Python is a programming language created by Guido van Rossum.",
    "The Amazon River is the largest river in the world by volume.",
    "The French Revolution occurred in 1789.",
]

# Convert documents to vectors
vectors = model.encode(documents)
print(f"Shape: {vectors.shape}")  # (4, 384)

# Each document is now a point in 384-dimensional space.
# Semantically similar documents are close in this space.
# @endregion
