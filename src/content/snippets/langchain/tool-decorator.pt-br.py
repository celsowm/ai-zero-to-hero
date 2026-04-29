from langchain.tools import tool

@tool("search", return_direct=True)
def search_knowledge_base(query: str) -> str:
    """Pesquisa na base de conhecimento interna por informações relevantes.
    
    Args:
        query: A consulta de busca a ser pesquisada.
    """
    results = vectorstore.similarity_search(query, k=3)
    return "\n".join([doc.page_content for doc in results])

# return_direct=True: o agente retorna o resultado direto sem processar
