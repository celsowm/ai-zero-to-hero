from llama_index.core import VectorStoreIndex, Document
from llama_index.core.retrievers import VectorIndexRetriever
from llama_index.core.query_engine import RetrieverQueryEngine

# create index with documents
docs = [
    Document(text="GPT-2 is a decoder-only model with 1.5B parameters."),
    Document(text="BERT is an encoder-only model with 340M parameters."),
    Document(text="T5 is an encoder-decoder model with 11B parameters."),
]
index = VectorStoreIndex.from_documents(docs)

# BUG: top_k is too low!
retriever = VectorIndexRetriever(
    index=index,
    similarity_top_k=1  # <- problem here
)

query_engine = RetrieverQueryEngine(retriever)
response = query_engine.query("Compare GPT-2, BERT and T5")
print(f"Retrieved nodes: {len(response.source_nodes)}")
print(f"Response: {response}")
