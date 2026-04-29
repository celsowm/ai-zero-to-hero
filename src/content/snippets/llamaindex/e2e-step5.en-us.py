from llama_index.core import VectorStoreIndex, SimpleDirectoryReader

# E2E Step 5: Chat Engine — conversations with context memory
# The chat engine maintains message history across conversation turns
documents = SimpleDirectoryReader("./data").load_data()
index = VectorStoreIndex.from_documents(documents)

# Create chat engine with context mode (retrieves context each turn)
chat_engine = index.as_chat_engine(chat_mode="context")

# Chat with the engine — maintains history automatically
print("Chat with your documents (type 'quit' to exit)")
while True:
    user_input = input("You: ")
    if user_input.lower() == "quit":
        break
    response = chat_engine.chat(user_input)
    print(f"Assistant: {response}")
