from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import PydanticOutputParser
from langchain_openai import ChatOpenAI

# BUG: parser is expecting a Pydantic model but got str!
parser = PydanticOutputParser(pydantic_object=str)

prompt = ChatPromptTemplate.from_messages([
    ("system", "Answer the question in JSON format with fields: name, answer"),
    ("human", "{question}"),
])

model = ChatOpenAI(model="gpt-4o-mini")

chain = prompt | model | parser
result = chain.invoke({"question": "What is the capital of Brazil?"})
print(f"Result type: {type(result)}")
print(f"Result: {result}")
