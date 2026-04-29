# Anatomia de um Prompt Perfeito
system = "Você é um tutor especialista em machine learning."
context = "O aluno sabe Python mas nunca viu cálculo."
instruction = "Explique derivadas usando a analogia do velocímetro."
examples = "Ex: f(x) = x² → f'(x) = 2x (regra da potência)"
output_format = "Responda em 3 parágrafos com um exemplo numérico."

prompt = f"""{system}

Contexto: {context}

Tarefa: {instruction}

Exemplo: {examples}

Formato: {output_format}"""

print(prompt)
