from langchain.agents import AgentType, initialize_agent
from langchain_openai import ChatOpenAI

llm = ChatOpenAI(model="gpt-4o-mini", temperature=0)

agent = initialize_agent(
    tools=[calculator, search_knowledge_base],
    llm=llm,
    agent=AgentType.ZERO_SHOT_REACT_DESCRIPTION,
    verbose=True,
    handle_parsing_errors=True,
)

# ReAct loop:
# Thought: I need to calculate 25 * 4
# Action: calculator
# Action Input: 25 * 4
# Observation: 100
# Thought: I now know the final answer
# Final Answer: The result is 100

result = agent.run("What is 25 * 4?")
