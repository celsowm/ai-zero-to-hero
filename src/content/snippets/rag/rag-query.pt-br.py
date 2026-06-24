import re
import requests
import chromadb
from sentence_transformers import SentenceTransformer


CNJ = "08488625820238190001"

DB_DIR = f"vectorstores/{CNJ}"
COLLECTION_NAME = f"processo_{CNJ}"

EMBEDDING_MODEL = "intfloat/multilingual-e5-base"

LLM_URL = "http://localhost:8000/v1/chat/completions"
LLM_MODEL = "local-model"

N_RESULTS = 8
MAX_CONTEXT_CHARS = 14000


def limpar_think(texto: str) -> str:
    texto = re.sub(r"<think>.*?</think>", "", texto, flags=re.DOTALL | re.IGNORECASE)
    return texto.strip()


def buscar_contexto(pergunta: str):
    model = SentenceTransformer(EMBEDDING_MODEL)

    client = chromadb.PersistentClient(path=DB_DIR)
    collection = client.get_collection(COLLECTION_NAME)

    embedding = model.encode(
        f"query: {pergunta}",
        normalize_embeddings=True,
        convert_to_numpy=True,
    ).tolist()

    res = collection.query(
        query_embeddings=[embedding],
        n_results=N_RESULTS,
        include=["documents", "metadatas"],
    )

    documentos = res["documents"][0]
    metadatas = res["metadatas"][0]

    trechos = []

    for i, (texto, meta) in enumerate(zip(documentos, metadatas), start=1):
        fonte = f"[Fonte {i}: {meta['arquivo']}, página {meta['pagina']}]"
        trechos.append(f"{fonte}\n{texto}")

    contexto = "\n\n---\n\n".join(trechos)
    return contexto[:MAX_CONTEXT_CHARS], metadatas


def perguntar_llm(pergunta: str, contexto: str) -> str:
    payload = {
        "model": LLM_MODEL,
        "temperature": 0,
        "max_tokens": 1200,
        "messages": [
            {
                "role": "system",
                "content": (
                    "Você é um assistente jurídico. "
                    "Responda somente com base no contexto fornecido. "
                    "Não use conhecimento externo. "
                    "Se a resposta não estiver no contexto, diga que não encontrou nos documentos. "
                    "Não use reasoning, não escreva <think>, não exponha cadeia de pensamento. "
                    "Cite as fontes no formato [Fonte X]."
                ),
            },
            {
                "role": "user",
                "content": (
                    f"CONTEXTO:\n{contexto}\n\n"
                    f"PERGUNTA:\n{pergunta}"
                ),
            },
        ],
    }

    response = requests.post(LLM_URL, json=payload, timeout=180)
    response.raise_for_status()

    data = response.json()
    resposta = data["choices"][0]["message"]["content"]

    return limpar_think(resposta)


def rag(pergunta: str) -> str:
    contexto, _ = buscar_contexto(pergunta)
    return perguntar_llm(pergunta, contexto)


if __name__ == "__main__":
    pergunta = input("Pergunta sobre o processo: ").strip()

    resposta = rag(pergunta)

    print()
    print("=" * 80)
    print(resposta)
    print("=" * 80)
