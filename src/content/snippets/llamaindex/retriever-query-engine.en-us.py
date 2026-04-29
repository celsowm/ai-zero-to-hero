from llama_index.core import VectorStoreIndex, SimpleDirectoryReader
from llama_index.core.retrievers import VectorIndexRetriever
from llama_index.core.query_engine import RetrieverQueryEngine
from llama_index.core.response_synthesizers import get_response_synthesizer

# Retriever + Query Engine — modular RAG pipeline
documents = SimpleDirectoryReader("./data").load_data()
index = VectorStoreIndex.from_documents(documents)

# Build pipeline manually: retriever → synthesizer → query engine
retriever = VectorIndexRetriever(index=index, similarity_top_k=3)
synthesizer = get_response_synthesizer(response_mode="compact")

query_engine = RetrieverQueryEngine(
    retriever=retriever,
    response_synthesizer=synthesizer,
)

# The query engine works like as_query_engine() but with granular control
response = query_engine.query("How does neural network training work?")
print(response)
