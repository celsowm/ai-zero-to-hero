# @region rag-from-scratch
import chromadb
from sentence_transformers import SentenceTransformer
from transformers import AutoModelForCausalLM, AutoTokenizer
import numpy as np

class RAGFromScratch:
    """Complete RAG pipeline: Ingest → Retrieve → Augment → Generate."""

    def __init__(self, model_name: str = "gpt2"):
        # Vector store
        self.client = chromadb.PersistentClient(path="./rag_db")
        self.collection = self.client.get_or_create_collection("knowledge")
        # Models
        self.embedder = SentenceTransformer("all-MiniLM-L6-v2")
        self.tokenizer = AutoTokenizer.from_pretrained(model_name)
        self.model = AutoModelForCausalLM.from_pretrained(model_name)
        if self.tokenizer.pad_token is None:
            self.tokenizer.pad_token = self.tokenizer.eos_token

    def ingest(self, documents: list[str]):
        """Phase 1: index documents into vector store."""
        embeddings = self.embedder.encode(documents).tolist()
        ids = [f"doc_{i}" for i in range(len(documents))]
        self.collection.add(ids=ids, embeddings=embeddings, documents=documents)
        print(f"✅ {len(documents)} documents indexed.")

    def query(self, question: str, top_k: int = 3) -> str:
        """Phases 2-4: retrieve, augment, and generate."""
        # RETRIEVE
        query_emb = self.embedder.encode([question]).tolist()
        results = self.collection.query(query_embeddings=query_emb, n_results=top_k)
        context = "\n".join(results["documents"][0])

        # AUGMENT
        prompt = (
            f"Context:\n{context}\n"
            f"Question: {question}\n"
            f"Answer:"
        )

        # GENERATE
        inputs = self.tokenizer(prompt, return_tensors="pt", truncation=True, max_length=512)
        outputs = self.model.generate(**inputs, max_new_tokens=80, do_sample=False)
        answer = self.tokenizer.decode(outputs[0], skip_special_tokens=True)
        return answer.replace(prompt, "").strip()

# Usage:
# rag = RAGFromScratch()
# rag.ingest(["The 2022 World Cup was in Qatar.", "Argentina won on penalties."])
# print(rag.query("Where was the 2022 World Cup?"))
# @endregion
