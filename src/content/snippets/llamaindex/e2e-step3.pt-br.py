from llama_index.core import VectorStoreIndex, SimpleDirectoryReader

# E2E Step 3: Configurar retriever para busca semântica
# O retriever encontra os chunks mais relevantes para uma query
documents = SimpleDirectoryReader("./data").load_data()
index = VectorStoreIndex.from_documents(documents)

# Criar retriever com top_k=3 (retorna 3 chunks mais relevantes)
retriever = index.as_retriever(similarity_top_k=3)

# Testar retriever com uma query de exemplo
query = "O que é machine learning?"
nodes = retriever.retrieve(query)

for i, node in enumerate(nodes):
    print(f"--- Chunk {i+1} (score: {node.score:.3f}) ---")
    print(node.text[:150])
    print()
