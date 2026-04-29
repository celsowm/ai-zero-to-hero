import requests

# sglang Regex constrained output — guided_decode with regex pattern
# The model is forced to follow an exact text format
# Pattern to match: ID, name, grade (e.g., "ID: 42, Name: Ana, Grade: 9.5")
regex_pattern = r"ID: \d+, Name: [A-Za-z ]+, Grade: \d+\.\d"

response = requests.post(
    "http://localhost:30000/generate",
    json={
        "text": "Generate a student record in format ID: X, Name: Y, Grade: Z",
        "sampling_params": {
            "guided_regex": regex_pattern,
            "max_new_tokens": 64,
        },
    },
)

# Output always matches the regex — no need for extra validation
output = response.json()["text"]
print(f"Generated record: {output}")
