import chromadb
from chromadb.utils import embedding_functions

docs = [
    "The refund policy allows returns within 7 days.",
    "The Pro plan includes advanced reports and priority support.",
    "The Slack integration sends alerts to configured channels.",
]

embedder = embedding_functions.SentenceTransformerEmbeddingFunction(
    model_name="all-MiniLM-L6-v2"
)

client = chromadb.Client()
collection = client.get_or_create_collection(
    name="knowledge_base",
    embedding_function=embedder,
)

collection.add(
    ids=["doc-refund", "doc-pro-plan", "doc-slack"],
    documents=docs,
    metadatas=[
        {"source": "policies.md"},
        {"source": "plans.md"},
        {"source": "integrations.md"},
    ],
)

result = collection.query(
    query_texts=["Can the customer cancel and get money back?"],
    n_results=2,
)

for text, metadata, distance in zip(
    result["documents"][0],
    result["metadatas"][0],
    result["distances"][0],
):
    print(f"{distance:.3f} | {metadata['source']} | {text}")
