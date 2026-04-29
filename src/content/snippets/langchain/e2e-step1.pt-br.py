from langchain.prompts import ChatPromptTemplate, MessagesPlaceholder

prompt = ChatPromptTemplate.from_messages([
    ("system", "You are a helpful assistant. Use the provided context to answer questions."),
    MessagesPlaceholder(variable_name="chat_history"),
    ("human", "{input}"),
])
