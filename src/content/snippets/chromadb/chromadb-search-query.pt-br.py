# @region chromadb-search-query
import chromadb
from sentence_transformers import SentenceTransformer

# Reconectar ao banco existente
client = chromadb.PersistentClient(path="./vector_db")
collection = client.get_collection("docs")
embedder = SentenceTransformer("all-MiniLM-L6-v2")

# Busca semântica: encontre documentos sobre "modelos de deep learning"
query = "Quais são os modelos de deep learning mais populares?"
query_embedding = embedder.encode([query]).tolist()

# Retorna os top-2 mais similares
results = collection.query(
    query_embeddings=query_embedding,
    n_results=2,
    include=["documents", "distances"],
)

for doc, dist in zip(results["documents"][0], results["distances"][0]):
    print(f"  [{dist:.3f}] {doc}")

# Output esperado:
#   [0.45] Transformers são modelos baseados em atenção.
#   [0.62] PyTorch é o framework mais usado para deep learning.
# (distâncias menores = mais similares)
# @endregion
