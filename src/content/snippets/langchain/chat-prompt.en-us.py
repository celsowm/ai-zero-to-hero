from langchain.prompts import ChatPromptTemplate

prompt = ChatPromptTemplate.from_messages([
    ("system", "You are a {role}. Be concise and accurate."),
    ("human", "What is {topic}?"),
])

messages = prompt.format_messages(role="teacher", topic="quantum computing")
# System: You are a teacher. Be concise and accurate.
# Human: What is quantum computing?
