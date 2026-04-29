# The same model response in two formats

# 1️⃣ Plain text (what the model generates internally — tokens → text)
plain_text = """The capital of Brazil is Brasília.

Main facts:
- Inaugurated on April 21, 1960
- Designed by Oscar Niemeyer
- Population: ~3 million inhabitants
- It is a UNESCO World Heritage Site

See how to calculate the Federal District area:
print(5760)  # km²
"""

# 2️⃣ Markdown (the default format of ALL modern LLMs)
markdown_response = """# The Capital of Brazil 🇧🇷

The capital of Brazil is **Brasília**.

## Main Facts

| Property | Value |
|---|---|
| Inauguration | April 21, 1960 |
| Architect | Oscar Niemeyer |
| Population | ~3 million |
| Status | UNESCO Heritage |

## Fun Fact

The Federal District area is **5,760 km²**.

```python
print(5760)  # km²
"""

# The model generates tokens → text → formats as Markdown
# ChatGPT, Claude, Gemini — ALL use Markdown by default
