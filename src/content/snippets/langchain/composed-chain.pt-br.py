from langchain_core.runnables import RunnableParallel

summarize = PromptTemplate.from_template("Summarize: {text}") | model | parser
translate = PromptTemplate.from_template("Translate to PT: {text}") | model | parser

composed = RunnableParallel(
    summary=summarize,
    translation=translate,
)

result = composed.invoke({"text": "Machine learning is a subset of AI..."})
# {'summary': '...', 'translation': '...'}
