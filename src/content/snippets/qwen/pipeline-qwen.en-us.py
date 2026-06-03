from transformers import pipeline, set_seed

generator = pipeline("text-generation", model="Qwen/Qwen3.5-0.8B")

mensagens = [
    {"role": "system", "content": "Você é um assistente conciso. Responda em uma frase."},
    {"role": "user", "content": "Quanto é 2+2?"},
]

out = generator(mensagens, max_new_tokens=2048, do_sample=False)
print(out[0]['generated_text'][-1]['content'])
