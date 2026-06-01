from transformers import AutoTokenizer

# Um modelo de chat pequeno que já fala ChatML nativamente.
MODELO = "Qwen/Qwen3.5-0.8B"
tokenizer = AutoTokenizer.from_pretrained(MODELO)

# 1) O formato de uma mensagem ChatML: tokens especiais + papel + conteúdo.
token_inicio = tokenizer.convert_tokens_to_ids("<|im_start|>")
token_fim = tokenizer.convert_tokens_to_ids("<|im_end|>")
print("IDs dos tokens especiais:",
      {"<|im_start|>": token_inicio, "<|im_end|>": token_fim})

# 2) O marcador de início de cada papel inclui o nome do papel na mesma linha.
marcador_sistema = tokenizer.decode([token_inicio]) + "system\n"
marcador_usuario = tokenizer.decode([token_inicio]) + "user\n"
marcador_assistente = tokenizer.decode([token_inicio]) + "assistant\n"

# 3) Uma conversa multi-turno montada à mão para mostrar cada peça.
string_chatml = (
    marcador_sistema + "Você é um assistente prestativo." + tokenizer.decode([token_fim]) + "\n"
    + marcador_usuario + "Qual é a capital do Brasil?" + tokenizer.decode([token_fim]) + "\n"
    + marcador_assistente  # o modelo continua a partir daqui
)

print("\n--- ChatML MONTADO À MÃO ---")
print(string_chatml)
print("----------------------------")
