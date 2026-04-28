# region: rag-intro
from sentence_transformers import SentenceTransformer
import numpy as np

# 1. RETRIEVE: find relevant documents
def retrieve(query: str, documents: list[str], top_k: int = 3) -> list[str]:
    model = SentenceTransformer("all-MiniLM-L6-v2")
    query_emb = model.encode(query)
    doc_embs = model.encode(documents)
    similarities = np.dot(doc_embs, query_emb)
    top_indices = np.argsort(similarities)[::-1][:top_k]
    return [documents[i] for i in top_indices]

# 2. AUGMENT: inject context into prompt
def augment(question: str, context: list[str]) -> str:
    ctx = "\n".join(f"- {c}" for c in context)
    return f"Context:\n{ctx}\n\nQuestion: {question}\nAnswer:"

# 3. GENERATE: generate response with context
# (use the augmented prompt with an LLM)
# endregion
