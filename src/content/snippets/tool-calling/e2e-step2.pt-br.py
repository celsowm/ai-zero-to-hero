from langchain_openai import ChatOpenAI
from langchain.agents import create_tool_calling_agent, AgentExecutor
from langchain_core.prompts import ChatPromptTemplate

# Tools definidas no passo 1
from step1_tools import search_web, calculate, run_python

llm = ChatOpenAI(model="gpt-4o", temperature=0)
llm_with_tools = llm.bind_tools([search_web, calculate, run_python])

prompt = ChatPromptTemplate.from_messages([
    ("system", "Você é um assistente inteligente com acesso a ferramentas. Use-as quando útil."),
    ("human", "{input}"),
    ("placeholder", "{agent_scratchpad}"),
])

agent = create_tool_calling_agent(llm_with_tools, [search_web, calculate, run_python], prompt)
executor = AgentExecutor(agent=agent, tools=[search_web, calculate, run_python], verbose=True, max_iterations=5)
