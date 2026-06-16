import base64
import mimetypes
import requests

BASE_URL = "http://localhost:8000"
CHAT_URL = f"{BASE_URL}/v1/chat/completions"
MODELS_URL = f"{BASE_URL}/v1/models"

headers = {"Content-Type": "application/json"}

image_path = "image.png"
prompt = "Describe this image in detail."

# 1. Dynamically identify the active model
models_response = requests.get(MODELS_URL)
models_response.raise_for_status()
model = models_response.json()["data"][0]["id"]

print("Model:", model)
print("-" * 50)

# 2. Convert the image to Base64
mime_type, _ = mimetypes.guess_type(image_path)
if mime_type is None:
    mime_type = "image/png"

with open(image_path, "rb") as f:
    image_base64 = base64.b64encode(f.read()).decode("utf-8")

data_url = f"data:{mime_type};base64,{image_base64}"

# 3. Build the payload and send it to Chat Completions
chat_payload = {
    "model": model,
    "messages": [
        {
            "role": "user",
            "content": [
                {
                    "type": "text",
                    "text": prompt
                },
                {
                    "type": "image_url",
                    "image_url": {
                        "url": data_url
                    }
                }
            ]
        }
    ]
}

chat_response = requests.post(CHAT_URL, headers=headers, json=chat_payload)
chat_response.raise_for_status()

result = chat_response.json()
content = result["choices"][-1]["message"].get("content")

print("Response:")
print(content)
