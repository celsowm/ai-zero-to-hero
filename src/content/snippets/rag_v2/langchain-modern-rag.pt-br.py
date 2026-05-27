from langchain.chains import create_retrieval_chain
from langchain.chains.combine_documents import create_stuff_documents_chain
from langchain_chroma import Chroma
from langchain_core.documents import Document
from langchain_core.prompts import ChatPromptTemplate
from langchain_openai import ChatOpenAI, OpenAIEmbeddings

docs = [
    Document(
        page_content="Reembolsos são aceitos em até 7 dias.",
        metadata={"source": "politicas.md"},
    ),
    Document(
        page_content="O plano Pro oferece suporte prioritário.",
        metadata={"source": "planos.md"},
    ),
]

vectorstore = Chroma.from_documents(
    documents=docs,
    embedding=OpenAIEmbeddings(model="text-embedding-3-small"),
)
retriever = vectorstore.as_retriever(search_kwargs={"k": 2})

prompt = ChatPromptTemplate.from_template(
    """Responda apenas com base no contexto.
Se a resposta não estiver no contexto, diga que não sabe.

Contexto:
{context}

Pergunta: {input}"""
)

llm = ChatOpenAI(model="gpt-4o-mini", temperature=0)
document_chain = create_stuff_documents_chain(llm, prompt)
rag_chain = create_retrieval_chain(retriever, document_chain)

resposta = rag_chain.invoke(
    {"input": "Qual é o prazo de reembolso?"}
)

print(resposta["answer"])
