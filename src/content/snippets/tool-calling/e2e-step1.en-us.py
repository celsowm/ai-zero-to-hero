from langchain.tools import tool

@tool
def search_web(query: str) -> str:
    """Searches the web for information about a topic. Returns a summary of results."""
    # In production: would integrate with DuckDuckGo, Google, Tavily, etc.
    return f"Search results for: '{query}'. Key points: ..."

@tool
def calculate(expression: str) -> str:
    """Calculates a mathematical expression. Supports +, -, *, /, **."""
    try:
        return str(eval(expression))
    except Exception as e:
        return f"Calculation error: {e}"

@tool
def run_python(code: str) -> str:
    """Executes Python code and returns the output."""
    # In production: would use a secure sandbox environment
    import io, sys
    old_stdout = sys.stdout
    sys.stdout = io.StringIO()
    try:
        exec(code)
        return sys.stdout.getvalue()
    finally:
        sys.stdout = old_stdout
