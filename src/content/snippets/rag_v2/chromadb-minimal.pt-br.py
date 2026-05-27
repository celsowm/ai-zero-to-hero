import chromadb
from chromadb.utils import embedding_functions

docs = [
    "A política de reembolso permite devolução em até 7 dias.",
    "O plano Pro inclui relatórios avançados e suporte prioritário.",
    "A integração com Slack envia alertas em canais configurados.",
]

embedder = embedding_functions.SentenceTransformerEmbeddingFunction(
    model_name="all-MiniLM-L6-v2"
)

client = chromadb.Client()
collection = client.get_or_create_collection(
    name="base_conhecimento",
    embedding_function=embedder,
)

collection.add(
    ids=["doc-reembolso", "doc-plano-pro", "doc-slack"],
    documents=docs,
    metadatas=[
        {"source": "politicas.md"},
        {"source": "planos.md"},
        {"source": "integracoes.md"},
    ],
)

resultado = collection.query(
    query_texts=["O cliente pode cancelar e receber dinheiro de volta?"],
    n_results=2,
)

for texto, metadata, distancia in zip(
    resultado["documents"][0],
    resultado["metadatas"][0],
    resultado["distances"][0],
):
    print(f"{distancia:.3f} | {metadata['source']} | {texto}")
