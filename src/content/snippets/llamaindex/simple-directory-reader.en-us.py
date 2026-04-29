from llama_index.core import SimpleDirectoryReader
from llama_index.readers.file import PDFReader, DocxReader

# SimpleDirectoryReader with custom loaders
# Allows controlling how each file type is processed
reader = SimpleDirectoryReader(
    "./data",
    file_extractor={
        ".pdf": PDFReader(),
        ".docx": DocxReader(),
    },
    recursive=True,        # search subdirectories
    num_files_limit=50,    # limit number of files
)

documents = reader.load_data()
print(f"Loaded {len(documents)} documents")

# Each document's metadata includes file name and path
for doc in documents[:3]:
    print(f"  → {doc.metadata.get('file_name')} ({len(doc.text)} chars)")
