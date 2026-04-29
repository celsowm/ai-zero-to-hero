from llama_index.core import SimpleDirectoryReader

# E2E Step 1: Carregar documentos de um diretório
# SimpleDirectoryReader lê todos os arquivos e cria objetos Document
# Suporta .txt, .pdf, .docx, .csv, e muitos outros formatos
reader = SimpleDirectoryReader("./data")
documents = reader.load_data()

print(f"Carregados {len(documents)} documentos")
print(f"Primeiro doc: {documents[0].text[:200]}...")
