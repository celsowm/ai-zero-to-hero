from llama_index.core import SimpleDirectoryReader
from llama_index.core.node_parser import SentenceSplitter

# Chunking Pipeline — split documents into smaller chunks
# SentenceSplitter cuts by sentences respecting max size
documents = SimpleDirectoryReader("./data").load_data()

# Configure splitter with chunk size and overlap
parser = SentenceSplitter(
    chunk_size=512,       # tokens per chunk
    chunk_overlap=50,     # overlap between consecutive chunks
    separator=" ",        # default separator
)

# Apply parsing — returns list of Node objects
nodes = parser.get_nodes_from_documents(documents)
print(f"Original documents: {len(documents)} docs")
print(f"After chunking: {len(nodes)} nodes")

# Show first chunk
print(f"\nFirst chunk ({len(nodes[0].text)} chars):")
print(nodes[0].text[:200])
