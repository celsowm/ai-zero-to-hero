from langchain.tools import tool

@tool("search", return_direct=True)
def search_knowledge_base(query: str) -> str:
    """Search the internal knowledge base for relevant information.
    
    Args:
        query: The search query to look up.
    """
    results = vectorstore.similarity_search(query, k=3)
    return "\n".join([doc.page_content for doc in results])

# return_direct=True: agent returns result directly without further processing
