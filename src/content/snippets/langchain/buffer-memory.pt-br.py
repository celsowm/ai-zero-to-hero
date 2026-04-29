from langchain.memory import ConversationBufferMemory
from langchain.chains import ConversationChain

memory = ConversationBufferMemory()
memory.save_context({"input": "Ola!"}, {"output": "Oi! Como posso ajudar?"})

print(memory.load_memory_variables({}))
# {'history': 'Human: Ola!\nAI: Oi! Como posso ajudar?'}

chain = ConversationChain(
    llm=ChatOpenAI(model="gpt-4o-mini"),
    memory=memory,
    verbose=True,
)
