from llama_index.core import VectorStoreIndex, Document
from llama_index.core.retrievers import VectorIndexRetriever
from llama_index.core.query_engine import RetrieverQueryEngine

# cria index com documentos
docs = [
    Document(text="GPT-2 é um modelo decoder-only com 1.5B parâmetros."),
    Document(text="BERT é um modelo encoder-only com 340M parâmetros."),
    Document(text="T5 é um modelo encoder-decoder com 11B parâmetros."),
]
index = VectorStoreIndex.from_documents(docs)

# BUG: top_k está muito baixo!
retriever = VectorIndexRetriever(
    index=index,
    similarity_top_k=1  # <- problema aqui
)

query_engine = RetrieverQueryEngine(retriever)
response = query_engine.query("Compare GPT-2, BERT e T5")
print(f"Nodes recuperados: {len(response.source_nodes)}")
print(f"Resposta: {response}")
