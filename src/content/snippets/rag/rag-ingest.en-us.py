from pathlib import Path
import re

import chromadb
from pypdf import PdfReader
from sentence_transformers import SentenceTransformer
from tqdm import tqdm


CNJ = "08488625820238190001"

PDF_DIR = Path("processos") / CNJ
DB_DIR = Path("vectorstores") / CNJ

MODEL_NAME = "intfloat/multilingual-e5-base"
CHUNK_SIZE = 2500
CHUNK_OVERLAP = 300


def limpar(texto: str) -> str:
    texto = texto.replace("\x00", " ")
    texto = re.sub(r"[ \t]+", " ", texto)
    texto = re.sub(r"\n{3,}", "\n\n", texto)
    return texto.strip()


def chunks(texto: str):
    texto = limpar(texto)
    i = 0

    while i < len(texto):
        yield texto[i:i + CHUNK_SIZE]
        i += CHUNK_SIZE - CHUNK_OVERLAP


def extrair_pdf(pdf: Path):
    reader = PdfReader(str(pdf))

    for pagina_num, pagina in enumerate(reader.pages, start=1):
        texto = pagina.extract_text() or ""

        for chunk_num, chunk in enumerate(chunks(texto), start=1):
            if chunk.strip():
                yield {
                    "id": f"{pdf.name}_{pagina_num}_{chunk_num}",
                    "text": chunk,
                    "metadata": {
                        "arquivo": pdf.name,
                        "pagina": pagina_num,
                        "chunk": chunk_num,
                        "cnj": CNJ,
                    },
                }


def main():
    DB_DIR.mkdir(parents=True, exist_ok=True)

    model = SentenceTransformer(MODEL_NAME)

    client = chromadb.PersistentClient(path=str(DB_DIR))
    collection = client.get_or_create_collection(f"processo_{CNJ}")

    pdfs = sorted(PDF_DIR.glob("*.pdf"))

    for pdf in tqdm(pdfs, desc="PDFs"):
        docs = list(extrair_pdf(pdf))

        if not docs:
            print(f"Sem texto extraível: {pdf.name}")
            continue

        textos = [f"passage: {d['text']}" for d in docs]
        embeddings = model.encode(
            textos,
            normalize_embeddings=True,
            convert_to_numpy=True,
        ).tolist()

        collection.upsert(
            ids=[d["id"] for d in docs],
            documents=[d["text"] for d in docs],
            metadatas=[d["metadata"] for d in docs],
            embeddings=embeddings,
        )

    print(f"Banco criado em: {DB_DIR}")


if __name__ == "__main__":
    main()
