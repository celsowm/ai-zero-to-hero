from llama_index.core import VectorStoreIndex, SimpleDirectoryReader
from llama_index.core.vector_stores import VectorIndexRetriever

# Vector Retriever — busca vetorial de baixo nível com controle fino
documents = SimpleDirectoryReader("./data").load_data()
index = VectorStoreIndex.from_documents(documents)

# Criar retriever com parâmetros explícitos
retriever = VectorIndexRetriever(
    index=index,
    similarity_top_k=5,
)

# Buscar por similaridade — retorna lista de NodeWithScore
results = retriever.retrieve("O que é rede neural?")

for i, result in enumerate(results):
    print(f"#{i+1} Score: {result.score:.4f}")
    print(f"  {result.node.text[:150]}...")
    print()
