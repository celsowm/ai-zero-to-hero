from langchain.chains import create_retrieval_chain
from langchain.chains.combine_documents import create_stuff_documents_chain
from langchain_chroma import Chroma
from langchain_core.documents import Document
from langchain_core.prompts import ChatPromptTemplate
from langchain_openai import ChatOpenAI, OpenAIEmbeddings

docs = [
    Document(
        page_content="Refunds are accepted within 7 days.",
        metadata={"source": "policies.md"},
    ),
    Document(
        page_content="The Pro plan offers priority support.",
        metadata={"source": "plans.md"},
    ),
]

vectorstore = Chroma.from_documents(
    documents=docs,
    embedding=OpenAIEmbeddings(model="text-embedding-3-small"),
)
retriever = vectorstore.as_retriever(search_kwargs={"k": 2})

prompt = ChatPromptTemplate.from_template(
    """Answer only from the provided context.
If the answer is not in the context, say you do not know.

Context:
{context}

Question: {input}"""
)

llm = ChatOpenAI(model="gpt-4o-mini", temperature=0)
document_chain = create_stuff_documents_chain(llm, prompt)
rag_chain = create_retrieval_chain(retriever, document_chain)

answer = rag_chain.invoke(
    {"input": "What is the refund window?"}
)

print(answer["answer"])
