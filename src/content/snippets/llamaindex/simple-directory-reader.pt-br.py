from llama_index.core import SimpleDirectoryReader
from llama_index.readers.file import PDFReader, DocxReader

# SimpleDirectoryReader com loaders customizados
# Permite controlar como cada tipo de arquivo é processado
reader = SimpleDirectoryReader(
    "./data",
    file_extractor={
        ".pdf": PDFReader(),
        ".docx": DocxReader(),
    },
    recursive=True,        # buscar em subdiretórios
    num_files_limit=50,    # limitar quantidade de arquivos
)

documents = reader.load_data()
print(f"Carregados {len(documents)} documentos")

# Metadados de cada documento incluem nome do arquivo e path
for doc in documents[:3]:
    print(f"  → {doc.metadata.get('file_name')} ({len(doc.text)} chars)")
