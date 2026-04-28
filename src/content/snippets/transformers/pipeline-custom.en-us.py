from transformers import pipeline, AutoTokenizer, AutoModelForSequenceClassification
import torch

# Load classification model
model_name = "cardiffnlp/twitter-roberta-base-sentiment"

# Custom pipeline for sentiment classification
classifier = pipeline(
    task="sentiment-analysis",
    model=model_name,
    tokenizer=model_name,
    device=0 if torch.cuda.is_available() else -1,
)

# Test with different texts
texts = [
    "I absolutely love this product! Best purchase ever.",
    "The service was terrible, I will never come back.",
    "It was okay, nothing special but not bad either.",
]

for text in texts:
    result = classifier(text)[0]
    label = result["label"]
    score = result["score"]
    print(f"Text: {text}")
    print(f"  → {label} ({score:.1%})")
    print()

# Custom post-processing
def classify_with_threshold(text, threshold=0.7):
    result = classifier(text)[0]
    if result["score"] < threshold:
        return "NEUTRAL (low confidence)"
    return f"{result['label']} ({result['score']:.1%})"

print(classify_with_threshold("Maybe it's fine, maybe not"))
