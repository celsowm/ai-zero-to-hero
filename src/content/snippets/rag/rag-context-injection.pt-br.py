# @region rag-context-injection
from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("gpt2")
tokenizer = AutoTokenizer.from_pretrained("gpt2")

# Documentos recuperados pela busca vetorial
contexto = [
    "A Copa do Mundo de 2022 foi realizada no Catar.",
    "A Argentina venceu a França na final por 4x2 nos pênaltis.",
    "Lionel Messi foi eleito o melhor jogador do torneio.",
]

pergunta = "Quem ganhou a Copa do Mundo de 2022?"

# Montar prompt com contexto injetado
prompt = (
    "Instrução: Responda a pergunta usando APENAS as informações do contexto.\n"
    + "\n".join(f"Fonte {i+1}: {c}" for i, c in enumerate(contexto))
    + f"\nPergunta: {pergunta}\nResposta:"
)

inputs = tokenizer(prompt, return_tensors="pt")
outputs = model.generate(**inputs, max_new_tokens=50, do_sample=False)
print(tokenizer.decode(outputs[0], skip_special_tokens=True))
# O modelo agora tem acesso às fontes. A resposta é fundamentada, não inventada.
# @endregion
