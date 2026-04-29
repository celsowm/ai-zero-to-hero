from langchain_core.runnables import RunnablePassthrough

# RunnablePassthrough passes input through without modification
chain = (
    {"context": retriever, "question": RunnablePassthrough()}
    | prompt
    | model
    | parser
)

# The original input is passed as "question" while "context" comes from retriever
result = chain.invoke("What is RAG?")
