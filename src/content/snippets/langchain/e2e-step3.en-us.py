from langchain_core.runnables import RunnablePassthrough

chain = prompt | model

# Usage: chain.invoke({"input": "What is the capital of Brazil?", "chat_history": []})
