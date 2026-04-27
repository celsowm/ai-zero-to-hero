from transformers import AutoTokenizer
from datasets import Dataset

tokenizer = AutoTokenizer.from_pretrained("gpt2")
tokenizer.pad_token = tokenizer.eos_token

# Template ChatML (geralmente já vem no tokenizer de modelos instruídos)
chatml_template = (
    "{% for message in messages %}"
    "{{'<|im_start|>' + message['role'] + '\\n' + message['content'] + '<|im_end|>\\n'}}"
    "{% endfor %}"
    "{% if add_generation_prompt %}"
    "{{ '<|im_start|>assistant\\n' }}"
    "{% endif %}"
)
tokenizer.chat_template = chatml_template
tokenizer.add_special_tokens({"additional_special_tokens": ["<|im_start|>", "<|im_end|>"]})

# Nosso Dataset de perguntas e respostas em Português
data = [
    {"messages": [
        {"role": "system", "content": "Você é um assistente prestativo."},
        {"role": "user", "content": "Qual é a capital do Brasil?"},
        {"role": "assistant", "content": "A capital do Brasil é Brasília."}
    ]},
    {"messages": [
        {"role": "system", "content": "Você é um assistente prestativo."},
        {"role": "user", "content": "Quem escreveu Dom Casmurro?"},
        {"role": "assistant", "content": "Dom Casmurro foi escrito por Machado de Assis."}
    ]}
]

# Função para aplicar o template ChatML e tokenizar
def format_dataset(example):
    text = tokenizer.apply_chat_template(example["messages"], tokenize=False)
    encodings = tokenizer(text, truncation=True, max_length=128, padding="max_length")
    encodings["labels"] = encodings["input_ids"].copy()
    return encodings

dataset = Dataset.from_list(data)
tokenized_dataset = dataset.map(format_dataset, remove_columns=["messages"])
