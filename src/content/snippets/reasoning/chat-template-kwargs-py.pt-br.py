import requests

url = "http://localhost:8000/v1/chat/completions"
headers = {"Content-Type": "application/json"}
data = {
    "messages": [
        {"role": "user", "content": "Quanto 3 * 9 / 1000 elevado ao log 5 na base 3?"}
    ],
    "chat_template_kwargs": {"enable_thinking": True}
}

response = requests.post(url, headers=headers, json=data)
print(response.json()["choices"][-1]['message']['reasoning_content'])
print("-"*50)
print(response.json()["choices"][-1]['message']['content'])
