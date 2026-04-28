# @region rag-architecture
from typing import TypedDict
import chromadb
from sentence_transformers import SentenceTransformer
from transformers import AutoModelForCausalLM, AutoTokenizer

class RAGResult(TypedDict):
    answer: str
    sources: list[str]
    relevance_score: float

class RAGPipeline:
    def __init__(self, db_path: str, model_name: str = "gpt2"):
        # Vector store for semantic search
        self.client = chromadb.PersistentClient(path=db_path)
        self.collection = self.client.get_or_create_collection("documents")
        # Embedding model
        self.embedder = SentenceTransformer("all-MiniLM-L6-v2")
        # Generator LLM
        self.tokenizer = AutoTokenizer.from_pretrained(model_name)
        self.model = AutoModelForCausalLM.from_pretrained(model_name)

    def ingest(self, documents: list[str], ids: list[str]):
        """Index documents into vector store."""
        embeddings = self.embedder.encode(documents).tolist()
        self.collection.add(ids=ids, embeddings=embeddings, documents=documents)

    def retrieve(self, query: str, top_k: int = 3) -> RAGResult:
        """Search relevant documents and generate answer."""
        query_emb = self.embedder.encode(query).tolist()
        results = self.collection.query(query_embeddings=[query_emb], n_results=top_k)
        context = "\n".join(results["documents"][0])
        prompt = f"Context: {context}\nQuestion: {query}\nAnswer:"
        inputs = self.tokenizer(prompt, return_tensors="pt")
        outputs = self.model.generate(**inputs, max_new_tokens=100)
        answer = self.tokenizer.decode(outputs[0], skip_special_tokens=True)
        return RAGResult(
            answer=answer,
            sources=results["documents"][0],
            relevance_score=sum(results["distances"][0]) / len(results["distances"][0]),
        )
# @endregion
