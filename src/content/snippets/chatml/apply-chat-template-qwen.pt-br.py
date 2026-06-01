from transformers import AutoTokenizer

# Carregamos um modelo de chat pequeno cujo tokenizador já vem com chat_template.
MODELO = "Qwen/Qwen3.5-0.8B"
tokenizer = AutoTokenizer.from_pretrained(MODELO)

# Uma conversa como lista de mensagens tipadas — esta é a representação
# canônica: papel + conteúdo, em ordem.
mensagens = [
    {"role": "system", "content": "Você é um assistente conciso. Responda em uma frase."},
    {"role": "user", "content": "Qual é a capital do Brasil?"},
]

# 1) add_generation_prompt=False — renderiza apenas o que temos.
texto_sem_prompt = tokenizer.apply_chat_template(
    mensagens, tokenize=False, add_generation_prompt=False
)
print("--- SEM prompt de geração ---")
print(repr(texto_sem_prompt))

# 2) add_generation_prompt=True — adiciona o marcador de início do
#    assistente para que o modelo saiba que deve continuar como 'assistant'.
texto_com_prompt = tokenizer.apply_chat_template(
    mensagens, tokenize=False, add_generation_prompt=True
)
print("\n--- COM prompt de geração ---")
print(repr(texto_com_prompt))

# 3) tokenize=True — retorna input_ids prontos para alimentar o modelo.
ids = tokenizer.apply_chat_template(
    mensagens, tokenize=True, add_generation_prompt=True
)
print("\nNúmero de tokens:", len(ids))
