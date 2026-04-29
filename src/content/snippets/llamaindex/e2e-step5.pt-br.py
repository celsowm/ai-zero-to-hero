from llama_index.core import VectorStoreIndex, SimpleDirectoryReader

# E2E Step 5: Chat Engine — conversas com memória de contexto
# O chat engine mantém histórico de mensagens entre turnos da conversa
documents = SimpleDirectoryReader("./data").load_data()
index = VectorStoreIndex.from_documents(documents)

# Criar chat engine com modo context (usa contexto recuperado a cada turno)
chat_engine = index.as_chat_engine(chat_mode="context")

# Conversar com o engine — mantém histórico automaticamente
print("Chat com seus documentos (digite 'sair' para encerrar)")
while True:
    user_input = input("Você: ")
    if user_input.lower() == "sair":
        break
    response = chat_engine.chat(user_input)
    print(f"Assistente: {response}")
