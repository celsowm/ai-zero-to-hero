import requests
import chromadb
from sentence_transformers import SentenceTransformer


# ============================================================
# CONFIG
# ============================================================

CNJ = "08488625820238190001"

DB_DIR = f"vectorstores/{CNJ}"
COLLECTION_NAME = f"processo_{CNJ}"

EMBEDDING_MODEL = "intfloat/multilingual-e5-base"

LLM_URL = "http://10.120.191.20:8000/v1/chat/completions"

LLM_MODEL = None

N_RESULTS = 8
OVERSAMPLING = 3
MAX_CONTEXT_CHARS = 14000
MAX_TOKENS = 1200
TIMEOUT = 180

LLM_KWARGS = {
    "chat_template_kwargs": {
        "enable_thinking": False
    }
}


# ============================================================
# LOAD GLOBAL
# ============================================================

print("Carregando embedding model...")
model = SentenceTransformer(EMBEDDING_MODEL)

print("Abrindo ChromaDB...")
client = chromadb.PersistentClient(path=DB_DIR)
collection = client.get_collection(COLLECTION_NAME)


# ============================================================
# RAG
# ============================================================

def buscar_contexto(pergunta: str):
    embedding = model.encode(
        f"query: {pergunta}",
        normalize_embeddings=True,
        convert_to_numpy=True,
    ).tolist()

    res = collection.query(
        query_embeddings=[embedding],
        n_results=N_RESULTS * OVERSAMPLING,
        include=["documents", "metadatas", "distances"],
    )

    documentos = res["documents"][0]
    metadatas = res["metadatas"][0]
    distances = res["distances"][0]

    trechos = []
    fontes = []
    vistos = set()
    total_chars = 0

    for texto, meta, dist in zip(documentos, metadatas, distances):
        arquivo = meta.get("arquivo", "arquivo_desconhecido")
        pagina = meta.get("pagina", "?")
        chunk = meta.get("chunk", "?")

        chave = (arquivo, pagina, chunk)

        if chave in vistos:
            continue

        vistos.add(chave)

        fonte_id = f"Fonte {len(fontes) + 1}"

        bloco = (
            f"[{fonte_id}]\n"
            f"PDF: {arquivo}\n"
            f"Página: {pagina}\n"
            f"Chunk: {chunk}\n"
            f"Distância vetorial: {dist:.4f}\n"
            f"Texto:\n{texto}"
        )

        if total_chars + len(bloco) > MAX_CONTEXT_CHARS:
            break

        trechos.append(bloco)

        fontes.append({
            "fonte": fonte_id,
            "arquivo": arquivo,
            "pagina": pagina,
            "chunk": chunk,
            "distancia": dist,
        })

        total_chars += len(bloco)

        if len(fontes) >= N_RESULTS:
            break

    contexto = "\n\n---\n\n".join(trechos)
    return contexto, fontes


def perguntar_llm(pergunta: str, contexto: str) -> str:
    payload = {
        "temperature": 0,
        "max_tokens": MAX_TOKENS,
        "messages": [
            {
                "role": "system",
                "content": (
                    "Você é um assistente jurídico. "
                    "Responda somente com base no contexto fornecido. "
                    "Não use conhecimento externo. "
                    "Se a resposta não estiver no contexto, diga que não encontrou nos documentos. "
                    "Ao citar, use o formato [Fonte X]."
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
        **LLM_KWARGS,
    }

    if LLM_MODEL:
        payload["model"] = LLM_MODEL

    response = requests.post(
        LLM_URL,
        json=payload,
        timeout=TIMEOUT,
    )

    response.raise_for_status()

    data = response.json()
    return data["choices"][0]["message"]["content"].strip()


def rag(pergunta: str):
    contexto, fontes = buscar_contexto(pergunta)

    if not contexto.strip():
        return "Não encontrei trechos relevantes no banco vetorial.", fontes

    resposta = perguntar_llm(pergunta, contexto)
    return resposta, fontes


# ============================================================
# UI TERMINAL
# ============================================================

def imprimir_fontes(fontes):
    print()
    print("Fontes recuperadas:")
    print("-" * 80)

    if not fontes:
        print("Nenhuma fonte recuperada.")
        return

    for f in fontes:
        print(
            f"{f['fonte']}: "
            f"{f['arquivo']} | página {f['pagina']} | chunk {f['chunk']} "
            f"| distância {f['distancia']:.4f}"
        )


def main():
    print()
    print("=" * 80)
    print(f"RAG do processo: {CNJ}")
    print(f"Banco vetorial: {DB_DIR}")
    print(f"Collection: {COLLECTION_NAME}")
    print("=" * 80)

    while True:
        pergunta = input("\nPergunta sobre o processo: ").strip()

        if pergunta.lower() in {"sair", "exit", "quit"}:
            break

        if not pergunta:
            continue

        try:
            resposta, fontes = rag(pergunta)

            print()
            print("=" * 80)
            print(resposta)
            print("=" * 80)

            imprimir_fontes(fontes)

        except requests.HTTPError as e:
            print()
            print("Erro HTTP chamando o modelo:")
            print(e)
            print(e.response.text[:2000] if e.response is not None else "")

        except Exception as e:
            print()
            print("Erro:")
            print(repr(e))


if __name__ == "__main__":
    main()
