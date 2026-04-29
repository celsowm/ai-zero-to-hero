from llama_index.core import VectorStoreIndex, SimpleDirectoryReader
from llama_index.core.retrievers import VectorIndexRetriever
from llama_index.core.query_engine import RetrieverQueryEngine
from llama_index.core.response_synthesizers import get_response_synthesizer

# Retriever + Query Engine — pipeline modular de RAG
documents = SimpleDirectoryReader("./data").load_data()
index = VectorStoreIndex.from_documents(documents)

# Montar pipeline manualmente: retriever → synthesizer → query engine
retriever = VectorIndexRetriever(index=index, similarity_top_k=3)
synthesizer = get_response_synthesizer(response_mode="compact")

query_engine = RetrieverQueryEngine(
    retriever=retriever,
    response_synthesizer=synthesizer,
)

# O query engine funciona como as_query_engine(), mas com controle granular
response = query_engine.query("Como funciona o treinamento de redes neurais?")
print(response)
