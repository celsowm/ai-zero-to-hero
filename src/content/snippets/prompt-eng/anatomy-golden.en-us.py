# Anatomy of a Perfect Prompt
system = "You are an expert machine learning tutor."
context = "The student knows Python but has never seen calculus."
instruction = "Explain derivatives using the speedometer analogy."
examples = "E.g., f(x) = x² → f'(x) = 2x (power rule)"
output_format = "Respond in 3 paragraphs with a numerical example."

prompt = f"""{system}

Context: {context}

Task: {instruction}

Example: {examples}

Format: {output_format}"""

print(prompt)
