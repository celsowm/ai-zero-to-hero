import evaluate
from transformers import AutoModelForCausalLM, AutoTokenizer, pipeline
import numpy as np

# Carregar métricas
perplexity = evaluate.load("perplexity")
bleu = evaluate.load("bleu")

model_name = "gpt2"
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModelForCausalLM.from_pretrained(model_name)

# Avaliar perplexity em um texto
texts = ["The quick brown fox jumps over the lazy dog."] * 10
results = perplexity.compute(
    predictions=texts,
    model_id=model_name,
    add_start_token=True,
)
print(f"Perplexity: {results['mean_perplexity']:.1f}")

# Avaliar BLEU (geração vs referência)
generated = "The cat sat on the mat."
references = [["The cat sat on the mat.", "A cat was sitting on the mat."]]
bleu_score = bleu.compute(predictions=[generated], references=references)
print(f"BLEU: {bleu_score['bleu']:.3f}")

# Pipeline de avaliação completo
generator = pipeline("text-generation", model=model_name)
output = generator("Hello", max_new_tokens=10, do_sample=False)
print(f"Generated: {output[0]['generated_text']}")
