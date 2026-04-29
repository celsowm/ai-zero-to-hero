from llama_index.readers.web import SimpleWebPageReader

# SimpleWebPageReader — loads URL content as documents
# Scrapes and auto-cleans HTML to plain text
urls = [
    "https://en.wikipedia.org/wiki/Machine_learning",
    "https://en.wikipedia.org/wiki/Deep_learning",
]

reader = SimpleWebPageReader(html_to_text=True)
documents = reader.load_data(urls)

for doc in documents:
    print(f"URL: {doc.metadata.get('URL')}")
    print(f"  → {len(doc.text)} characters")
    print(f"  → Preview: {doc.text[:120]}...")
    print()
