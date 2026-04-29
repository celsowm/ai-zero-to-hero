from llama_index.core import VectorStoreIndex, SimpleDirectoryReader

# E2E Step 2: Create vector index from documents
# The index embeds each chunk and stores in a vector for semantic search
documents = SimpleDirectoryReader("./data").load_data()

# Build the index — computes embeddings automatically
index = VectorStoreIndex.from_documents(documents)

# The index is ready for queries and retrieval
print("Vector index created successfully!")
print(f"Number of indexed nodes: {len(index.docstore.docs)}")
