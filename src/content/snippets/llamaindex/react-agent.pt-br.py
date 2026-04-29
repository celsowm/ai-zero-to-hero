from llama_index.core import VectorStoreIndex, SimpleDirectoryReader
from llama_index.core.agent import ReActAgent
from llama_index.core.tools import QueryEngineTool, ToolMetadata
from llama_index.llms.openai import OpenAI

# ReAct Agent — agente que raciocina e age usando ferramentas
documents = SimpleDirectoryReader("./data").load_data()
index = VectorStoreIndex.from_documents(documents)

# Criar tool a partir do query engine
query_tool = QueryEngineTool(
    query_engine=index.as_query_engine(),
    metadata=ToolMetadata(
        name="knowledge_base",
        description="Responde perguntas sobre os documentos carregados",
    ),
)

# Montar agente ReAct com LLM e ferramentas
llm = OpenAI(model="gpt-4o-mini")
agent = ReActAgent.from_tools(
    tools=[query_tool],
    llm=llm,
    verbose=True,  # mostrar raciocínio passo a passo
)

# Agente decide qual tool usar para responder
response = agent.chat("Resuma os principais conceitos encontrados nos documentos")
print(f"Resposta: {response}")
