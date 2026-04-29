from llama_index.core import VectorStoreIndex, SimpleDirectoryReader

# E2E Step 4: Query Engine — responder perguntas usando contexto recuperado
# O query engine combina retriever + LLM para gerar respostas com base nos documentos
documents = SimpleDirectoryReader("./data").load_data()
index = VectorStoreIndex.from_documents(documents)

# Criar query engine
query_engine = index.as_query_engine(
    similarity_top_k=3,       # quantos chunks recuperar
    response_mode="compact",  # compact = resposta concisa
)

# Fazer pergunta
response = query_engine.query("Quais são os principais tipos de aprendizado de máquina?")
print(response)
