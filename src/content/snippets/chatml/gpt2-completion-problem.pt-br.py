from transformers import pipeline, set_seed

# GPT-2 é um modelo de text-completion.
# Ele aprendeu a continuar um texto, não a responder perguntas.
gerador = pipeline("text-generation", model="gpt2")
set_seed(42)

prompt = "Q: Qual é a capital do Brasil?\nA:"

# GPT-2 simplesmente continua escrevendo mais perguntas e respostas falsas.
out = gerador(prompt, max_new_tokens=40, do_sample=False)
print("--- SAÍDA DO GPT-2 ---")
print(out[0]["generated_text"])
print("----------------------")
# Observe: nenhuma resposta real — ele continua escrevendo novos pares Q/A.
