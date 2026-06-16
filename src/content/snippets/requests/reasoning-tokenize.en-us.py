import requests

url = "http://localhost:8000/tokenize"

payload = {
    "content": "Hello, world! This is a simple tokenization test."
}

response = requests.post(url, json=payload)
response.raise_for_status()

result = response.json()

print(result)
print("-" * 50)

tokens = result.get("tokens") or result.get("input_ids") or result.get("token_ids")

if tokens:
    print("Number of tokens:", len(tokens))
    print("Tokens:", tokens)
