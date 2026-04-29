from llama_index.core import VectorStoreIndex, SimpleDirectoryReader
from llama_index.core.chat_engine import CondenseQuestionChatEngine
from llama_index.core.memory import ChatMemoryBuffer

# Chat Engine com memória — conversas multi-turno com contexto
documents = SimpleDirectoryReader("./data").load_data()
index = VectorStoreIndex.from_documents(documents)

# Criar buffer de memória para manter histórico
memory = ChatMemoryBuffer(token_limit=2000)

# Chat engine com modo condense_question — condensa histórico a cada turno
chat_engine = CondenseQuestionChatEngine.from_defaults(
    index=index,
    memory=memory,
    verbose=True,  # mostrar steps internos
)

# Conversar — a memória acumula turnos automaticamente
response1 = chat_engine.chat("O que é overfitting?")
print(f"Turno 1: {response1}\n")

response2 = chat_engine.chat("Como posso evitá-lo?")
print(f"Turno 2: {response2}\n")
