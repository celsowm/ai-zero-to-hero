from langchain_community.tools import WikipediaQueryRun
from langchain_community.utilities import WikipediaAPIWrapper
from langchain_community.tools import Calculator

wikipedia = WikipediaQueryRun(api_wrapper=WikipediaAPIWrapper())
calculator = Calculator()

# Usage: wikipedia.run("Brazil")
# Usage: calculator.run("2 + 2")
