from llama_index.core import SimpleDirectoryReader, VectorStoreIndex
from llama_index.core.response.notebook_utils import display_source_node
from llama_index.llms.openai import OpenAI

documents = SimpleDirectoryReader(
    input_dir="./product_docs",
    required_exts=[".md", ".txt"],
).load_data()

index = VectorStoreIndex.from_documents(
    documents,
    show_progress=True,
)

query_engine = index.as_query_engine(
    llm=OpenAI(model="gpt-4o-mini", temperature=0),
    similarity_top_k=3,
)

response = query_engine.query(
    "What is the product refund window?"
)

print(response)

for node in response.source_nodes:
    display_source_node(node, source_length=240)
