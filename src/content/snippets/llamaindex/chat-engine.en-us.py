from llama_index.core import VectorStoreIndex, SimpleDirectoryReader
from llama_index.core.chat_engine import CondenseQuestionChatEngine
from llama_index.core.memory import ChatMemoryBuffer

# Chat Engine with memory — multi-turn conversations with context
documents = SimpleDirectoryReader("./data").load_data()
index = VectorStoreIndex.from_documents(documents)

# Create memory buffer to maintain history
memory = ChatMemoryBuffer(token_limit=2000)

# Chat engine with condense_question mode — condenses history each turn
chat_engine = CondenseQuestionChatEngine.from_defaults(
    index=index,
    memory=memory,
    verbose=True,  # show internal steps
)

# Chat — memory accumulates turns automatically
response1 = chat_engine.chat("What is overfitting?")
print(f"Turn 1: {response1}\n")

response2 = chat_engine.chat("How can I avoid it?")
print(f"Turn 2: {response2}\n")
