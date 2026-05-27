docs = [
    {
        "id": "policies.md",
        "text": "Refund: customers can request money back within 7 days.",
    },
    {
        "id": "plans.md",
        "text": "Pro plan: includes priority support and advanced reports.",
    },
    {
        "id": "integrations.md",
        "text": "Slack: alerts can be sent to configured channels.",
    },
]

query = "What is the refund window?"

# BUG: k=1 is too low in real corpora, and the source is not shown.
top_k = 1
show_sources = False

def score(document):
    query_words = set(query.lower().replace("?", "").split())
    doc_words = set(document["text"].lower().replace(":", "").split())
    return len(query_words & doc_words)

ranking = sorted(docs, key=score, reverse=True)[:top_k]

print(f"Retrieved chunks: {len(ranking)}")
if show_sources:
    print("Sources:", ", ".join(doc["id"] for doc in ranking))
