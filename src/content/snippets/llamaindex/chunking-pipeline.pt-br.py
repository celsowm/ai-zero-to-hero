from llama_index.core import SimpleDirectoryReader
from llama_index.core.node_parser import SentenceSplitter

# Chunking Pipeline — dividir documentos em chunks menores
# SentenceSplitter corta por sentenças respeitando tamanho máximo
documents = SimpleDirectoryReader("./data").load_data()

# Configurar splitter com tamanho de chunk e sobreposição
parser = SentenceSplitter(
    chunk_size=512,       # tokens por chunk
    chunk_overlap=50,     # sobreposição entre chunks consecutivos
    separator=" ",        # separador padrão
)

# Aplicar parsing — retorna lista de Node objects
nodes = parser.get_nodes_from_documents(documents)
print(f"Documento original: {len(documents)} docs")
print(f"Após chunking: {len(nodes)} nós")

# Exibir primeiro chunk
print(f"\nPrimeiro chunk ({len(nodes[0].text)} chars):")
print(nodes[0].text[:200])
