from llama_index.core import VectorStoreIndex, SimpleDirectoryReader

# E2E Step 4: Query Engine — answer questions using retrieved context
# The query engine combines retriever + LLM to generate answers based on documents
documents = SimpleDirectoryReader("./data").load_data()
index = VectorStoreIndex.from_documents(documents)

# Create query engine
query_engine = index.as_query_engine(
    similarity_top_k=3,       # how many chunks to retrieve
    response_mode="compact",  # compact = concise answer
)

# Ask a question
response = query_engine.query("What are the main types of machine learning?")
print(response)
