from langchain.tools import tool
from langchain_core.vectorstores import VectorStoreRetriever

@tool
def search_documents(query: str) -> str:
    """Search relevant documents for context."""
    # Vector store retorna chunks similares
    docs = vectorstore.similarity_search(query, k=3)
    return "\n\n".join([doc.page_content for doc in docs])
