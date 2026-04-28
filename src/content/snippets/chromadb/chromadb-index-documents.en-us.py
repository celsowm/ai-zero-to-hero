# region: chromadb-index-documents
import chromadb
from sentence_transformers import SentenceTransformer

# 1. Connect to ChromaDB (local vector database)
client = chromadb.PersistentClient(path="./vector_db")
collection = client.get_or_create_collection("docs")

# 2. Embedding model (SentenceTransformer)
embedder = SentenceTransformer("all-MiniLM-L6-v2")

# 3. Documents to index
documents = [
    "Transformers are attention-based models.",
    "PyTorch is the most used deep learning framework.",
    "Vector databases store embeddings for semantic search.",
    "ChromaDB is an open-source vector database for AI apps.",
]

# 4. Generate embeddings and index
embeddings = embedder.encode(documents).tolist()
ids = [f"doc_{i}" for i in range(len(documents))]

collection.add(ids=ids, embeddings=embeddings, documents=documents)
print(f"✅ {len(documents)} documents indexed.")

# Now we can search by semantic similarity, not keywords.
# endregion
