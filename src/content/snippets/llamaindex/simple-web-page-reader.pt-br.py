from llama_index.readers.web import SimpleWebPageReader

# SimpleWebPageReader — carrega conteúdo de URLs como documentos
# Faz scraping e limpeza automática do HTML para texto puro
urls = [
    "https://en.wikipedia.org/wiki/Machine_learning",
    "https://en.wikipedia.org/wiki/Deep_learning",
]

reader = SimpleWebPageReader(html_to_text=True)
documents = reader.load_data(urls)

for doc in documents:
    print(f"URL: {doc.metadata.get('URL')}")
    print(f"  → {len(doc.text)} caracteres")
    print(f"  → Preview: {doc.text[:120]}...")
    print()
