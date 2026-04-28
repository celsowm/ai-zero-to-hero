# region: chromadb-index-documents
import chromadb
from sentence_transformers import SentenceTransformer

# 1. Conectar ao ChromaDB (vector database local)
client = chromadb.PersistentClient(path="./vector_db")
collection = client.get_or_create_collection("docs")

# 2. Modelo de embedding (SentenceTransformer)
embedder = SentenceTransformer("all-MiniLM-L6-v2")

# 3. Documentos para indexar
documents = [
    "Transformers são modelos baseados em atenção.",
    "PyTorch é o framework mais usado para deep learning.",
    "Vector databases armazenam embeddings para busca semântica.",
    "ChromaDB é um vector database open-source para aplicações AI.",
]

# 4. Gerar embeddings e indexar
embeddings = embedder.encode(documents).tolist()
ids = [f"doc_{i}" for i in range(len(documents))]

collection.add(ids=ids, embeddings=embeddings, documents=documents)
print(f"✅ {len(documents)} documentos indexados.")

# Agora podemos buscar por similaridade semântica, não por palavras-chave.
# endregion
