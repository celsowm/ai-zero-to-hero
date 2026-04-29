from langchain.tools import tool

@tool
def search_web(query: str) -> str:
    """Busca informações na web sobre um tópico. Retorna resumo dos resultados."""
    # Em produção: integraria com DuckDuckGo, Google, Tavily, etc.
    return f"Resultados da busca para: '{query}'. Principais pontos: ..."

@tool
def calculate(expression: str) -> str:
    """Calcula uma expressão matemática. Suporta +, -, *, /, **."""
    try:
        return str(eval(expression))
    except Exception as e:
        return f"Erro no cálculo: {e}"

@tool
def run_python(code: str) -> str:
    """Executa código Python e retorna o output."""
    # Em produção: usaria ambiente sandbox seguro
    import io, sys
    old_stdout = sys.stdout
    sys.stdout = io.StringIO()
    try:
        exec(code)
        return sys.stdout.getvalue()
    finally:
        sys.stdout = old_stdout
