from langchain.memory import ConversationBufferMemory
from langchain.chains import ConversationChain

memory = ConversationBufferMemory()
memory.save_context({"input": "Hello!"}, {"output": "Hi! How can I help?"})

print(memory.load_memory_variables({}))
# {'history': 'Human: Hello!\nAI: Hi! How can I help?'}

chain = ConversationChain(
    llm=ChatOpenAI(model="gpt-4o-mini"),
    memory=memory,
    verbose=True,
)
