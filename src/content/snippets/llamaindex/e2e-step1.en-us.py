from llama_index.core import SimpleDirectoryReader

# E2E Step 1: Load documents from a directory
# SimpleDirectoryReader reads all files and creates Document objects
# Supports .txt, .pdf, .docx, .csv, and many other formats
reader = SimpleDirectoryReader("./data")
documents = reader.load_data()

print(f"Loaded {len(documents)} documents")
print(f"First doc: {documents[0].text[:200]}...")
