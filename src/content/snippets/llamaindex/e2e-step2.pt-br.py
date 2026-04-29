from llama_index.core import VectorStoreIndex, SimpleDirectoryReader

# E2E Step 2: Criar índice vetorial a partir dos documentos
# O index faz embed de cada chunk e armazena em vetor para busca semântica
documents = SimpleDirectoryReader("./data").load_data()

# Construir o índice — calcula embeddings automaticamente
index = VectorStoreIndex.from_documents(documents)

# O index está pronto para queries e retrieval
print("Índice vetorial criado com sucesso!")
print(f"Número de nós indexados: {len(index.docstore.docs)}")
