from langchain_community.tools import WikipediaQueryRun
from langchain_community.utilities import WikipediaAPIWrapper
from langchain_community.tools import Calculator

wikipedia = WikipediaQueryRun(api_wrapper=WikipediaAPIWrapper())
calculator = Calculator()

# Uso: wikipedia.run("Brasil")
# Uso: calculator.run("2 + 2")
