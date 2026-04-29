from llama_index.core import VectorStoreIndex, SimpleDirectoryReader
from llama_index.core.vector_stores import VectorIndexRetriever

# Vector Retriever — low-level vector search with fine control
documents = SimpleDirectoryReader("./data").load_data()
index = VectorStoreIndex.from_documents(documents)

# Create retriever with explicit parameters
retriever = VectorIndexRetriever(
    index=index,
    similarity_top_k=5,
)

# Search by similarity — returns list of NodeWithScore
results = retriever.retrieve("What is a neural network?")

for i, result in enumerate(results):
    print(f"#{i+1} Score: {result.score:.4f}")
    print(f"  {result.node.text[:150]}...")
    print()
