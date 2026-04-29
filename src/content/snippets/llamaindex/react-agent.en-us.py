from llama_index.core import VectorStoreIndex, SimpleDirectoryReader
from llama_index.core.agent import ReActAgent
from llama_index.core.tools import QueryEngineTool, ToolMetadata
from llama_index.llms.openai import OpenAI

# ReAct Agent — agent that reasons and acts using tools
documents = SimpleDirectoryReader("./data").load_data()
index = VectorStoreIndex.from_documents(documents)

# Create tool from query engine
query_tool = QueryEngineTool(
    query_engine=index.as_query_engine(),
    metadata=ToolMetadata(
        name="knowledge_base",
        description="Answers questions about the loaded documents",
    ),
)

# Build ReAct agent with LLM and tools
llm = OpenAI(model="gpt-4o-mini")
agent = ReActAgent.from_tools(
    tools=[query_tool],
    llm=llm,
    verbose=True,  # show step-by-step reasoning
)

# Agent decides which tool to use to respond
response = agent.chat("Summarize the main concepts found in the documents")
print(f"Response: {response}")
