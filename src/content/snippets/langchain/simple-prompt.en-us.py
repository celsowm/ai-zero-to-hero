from langchain.prompts import PromptTemplate

prompt = PromptTemplate(
    template="Translate the following text from Portuguese to English:\n\nText: {text}\n\nTranslation:",
    input_variables=["text"],
)

formatted = prompt.format(text="Ola, como vai voce?")
# Output: Translate the following text from Portuguese to English:
# Text: Ola, como vai voce?
# Translation:
