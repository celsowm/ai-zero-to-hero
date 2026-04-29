from langchain_openai import ChatOpenAI
from langchain.agents import create_tool_calling_agent, AgentExecutor
from langchain.tools import tool
from langchain_core.prompts import ChatPromptTemplate

# Define tools with decorator
@tool
def search_web(query: str) -> str:
    """Searches the web for information about a topic."""
    return f"Results for: {query}"

@tool
def calculate(expression: str) -> str:
    """Calculates a mathematical expression."""
    return str(eval(expression))

tools = [search_web, calculate]

# Create the agent
llm = ChatOpenAI(model="gpt-4o")
llm_with_tools = llm.bind_tools(tools)

prompt = ChatPromptTemplate.from_messages([
    ("system", "You are a helpful assistant. Use tools when needed."),
    ("human", "{input}"),
    ("placeholder", "{agent_scratchpad}"),
])

agent = create_tool_calling_agent(llm_with_tools, tools, prompt)
executor = AgentExecutor(agent=agent, tools=tools, verbose=True)

# Execute
result = executor.invoke({"input": "What is 15% of 890?"})
print(result["output"])
