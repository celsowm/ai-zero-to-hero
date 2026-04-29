from langchain.agents import create_openai_functions_agent, AgentExecutor
from langchain_core.vectorstores import VectorStoreRetriever

tools = [search_documents]

agent = create_openai_functions_agent(
    llm=model,
    prompt=prompt,
    tools=tools,
)

agent_executor = AgentExecutor(
    agent=agent,
    tools=tools,
    verbose=True,
    handle_parsing_errors=True,
)

# Conversation with RAG: agent_executor.invoke({"input": "Summarize document X", "chat_history": []})
