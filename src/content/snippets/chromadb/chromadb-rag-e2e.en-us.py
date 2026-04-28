# @region chromadb-rag-e2e
import chromadb
from sentence_transformers import SentenceTransformer
from transformers import AutoTokenizer, AutoModelForCausalLM

# ── PHASE 1: Index documents in ChromaDB ──
client = chromadb.PersistentClient(path="./knowledge_db")
collection = client.get_or_create_collection("articles")
embedder = SentenceTransformer("all-MiniLM-L6-v2")

documents = {
    "art1": "Transformers use multi-head attention to process sequences.",
    "art2": "PyTorch is the standard library for deep learning research.",
    "art3": "ChromaDB stores vectors for fast semantic search.",
}
embeddings = embedder.encode(list(documents.values())).tolist()
collection.add(
    ids=list(documents.keys()),
    embeddings=embeddings,
    documents=list(documents.values()),
)

# ── PHASE 2: Retrieve relevant context ──
def retrieve(query: str, top_k: int = 2) -> str:
    q_emb = embedder.encode([query]).tolist()
    results = collection.query(query_embeddings=q_emb, n_results=top_k)
    return "\n".join(results["documents"][0])

# ── PHASE 3: Generate answer with Transformers ──
model_name = "gpt2"
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModelForCausalLM.from_pretrained(model_name)

def answer(query: str) -> str:
    context = retrieve(query)
    prompt = f"Context: {context}\nQuestion: {query}\nAnswer:"
    inputs = tokenizer(prompt, return_tensors="pt")
    outputs = model.generate(**inputs, max_new_tokens=50)
    return tokenizer.decode(outputs[0], skip_special_tokens=True)

# Usage:
print(answer("What are Transformers?"))
# → Context: Transformers use multi-head attention to process sequences.
#   Question: What are Transformers?
#   Answer: Transformers are deep learning models...
# @endregion
