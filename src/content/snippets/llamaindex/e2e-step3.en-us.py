from llama_index.core import VectorStoreIndex, SimpleDirectoryReader

# E2E Step 3: Set up retriever for semantic search
# The retriever finds the most relevant chunks for a query
documents = SimpleDirectoryReader("./data").load_data()
index = VectorStoreIndex.from_documents(documents)

# Create retriever with top_k=3 (returns 3 most relevant chunks)
retriever = index.as_retriever(similarity_top_k=3)

# Test retriever with an example query
query = "What is machine learning?"
nodes = retriever.retrieve(query)

for i, node in enumerate(nodes):
    print(f"--- Chunk {i+1} (score: {node.score:.3f}) ---")
    print(node.text[:150])
    print()
