# @region chromadb-search-query
import chromadb
from sentence_transformers import SentenceTransformer

# Reconnect to existing database
client = chromadb.PersistentClient(path="./vector_db")
collection = client.get_collection("docs")
embedder = SentenceTransformer("all-MiniLM-L6-v2")

# Semantic search: find documents about "deep learning models"
query = "What are the most popular deep learning models?"
query_embedding = embedder.encode([query]).tolist()

# Return top-2 most similar
results = collection.query(
    query_embeddings=query_embedding,
    n_results=2,
    include=["documents", "distances"],
)

for doc, dist in zip(results["documents"][0], results["distances"][0]):
    print(f"  [{dist:.3f}] {doc}")

# Expected output:
#   [0.45] Transformers are attention-based models.
#   [0.62] PyTorch is the most used deep learning framework.
# (lower distances = more similar)
# @endregion
