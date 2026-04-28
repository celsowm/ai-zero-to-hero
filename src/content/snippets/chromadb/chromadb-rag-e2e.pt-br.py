# region: chromadb-rag-e2e
import chromadb
from sentence_transformers import SentenceTransformer
from transformers import AutoTokenizer, AutoModelForCausalLM

# ── FASE 1: Indexar documentos no ChromaDB ──
client = chromadb.PersistentClient(path="./knowledge_db")
collection = client.get_or_create_collection("articles")
embedder = SentenceTransformer("all-MiniLM-L6-v2")

documents = {
    "art1": "Transformers usam atenção multi-head para processar sequências.",
    "art2": "PyTorch é a biblioteca padrão para deep learning em pesquisa.",
    "art3": "ChromaDB armazena vetores para busca semântica rápida.",
}
embeddings = embedder.encode(list(documents.values())).tolist()
collection.add(
    ids=list(documents.keys()),
    embeddings=embeddings,
    documents=list(documents.values()),
)

# ── FASE 2: Buscar contexto relevante ──
def retrieve(query: str, top_k: int = 2) -> str:
    q_emb = embedder.encode([query]).tolist()
    results = collection.query(query_embeddings=q_emb, n_results=top_k)
    return "\n".join(results["documents"][0])

# ── FASE 3: Gerar resposta com Transformers ──
model_name = "gpt2"
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModelForCausalLM.from_pretrained(model_name)

def answer(query: str) -> str:
    context = retrieve(query)
    prompt = f"Contexto: {context}\nPergunta: {query}\nResposta:"
    inputs = tokenizer(prompt, return_tensors="pt")
    outputs = model.generate(**inputs, max_new_tokens=50)
    return tokenizer.decode(outputs[0], skip_special_tokens=True)

# Uso:
print(answer("O que são Transformers?"))
# → Contexto: Transformers usam atenção multi-head para processar sequências.
#   Pergunta: O que são Transformers?
#   Resposta: Transformers são modelos de deep learning...
# endregion
