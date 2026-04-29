from langchain_core.runnables import RunnablePassthrough

chain = prompt | model

# Uso: chain.invoke({"input": "Qual é a capital do Brasil?", "chat_history": []})
