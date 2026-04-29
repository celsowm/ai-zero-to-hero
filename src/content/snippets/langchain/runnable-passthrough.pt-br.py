from langchain_core.runnables import RunnablePassthrough

# RunnablePassthrough repassa o input sem modificacao
chain = (
    {"context": retriever, "question": RunnablePassthrough()}
    | prompt
    | model
    | parser
)

# O input original e passado como "question" enquanto "context" vem do retriever
result = chain.invoke("O que e RAG?")
