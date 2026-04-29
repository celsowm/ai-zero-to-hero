from langchain_openai import ChatOpenAI
from langchain.agents import create_tool_calling_agent, AgentExecutor
from langchain.tools import tool
from langchain_core.prompts import ChatPromptTemplate

# Definir ferramentas com decorator
@tool
def search_web(query: str) -> str:
    """Busca informações na web sobre um tópico."""
    return f"Resultados para: {query}"

@tool
def calculate(expression: str) -> str:
    """Calcula uma expressão matemática."""
    return str(eval(expression))

tools = [search_web, calculate]

# Criar o agente
llm = ChatOpenAI(model="gpt-4o")
llm_with_tools = llm.bind_tools(tools)

prompt = ChatPromptTemplate.from_messages([
    ("system", "Você é um assistente útil. Use as ferramentas quando necessário."),
    ("human", "{input}"),
    ("placeholder", "{agent_scratchpad}"),
])

agent = create_tool_calling_agent(llm_with_tools, tools, prompt)
executor = AgentExecutor(agent=agent, tools=tools, verbose=True)

# Executar
result = executor.invoke({"input": "Quanto é 15% de 890?"})
print(result["output"])
