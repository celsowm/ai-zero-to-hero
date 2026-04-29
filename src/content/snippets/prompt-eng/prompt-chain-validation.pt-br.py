# Prompt Chaining: extração + validação + resumo

# Passo 1: Extração
text = "A empresa XYZ faturou R$ 2.5M em 2024, com 150 funcionários e sede em São Paulo."

extraction_prompt = f"Extraia do texto: empresa, faturamento, ano, nº funcionários, cidade.\nTexto: {text}"
# Simula output do modelo
extracted = {"empresa": "XYZ", "faturamento": "R$ 2.5M", "ano": "2024", "funcionarios": "150", "cidade": "São Paulo"}

# Passo 2: Validação
validation_prompt = f"Verifique se todos os campos estão preenchidos: {list(extracted.keys())}"
all_valid = all(v for v in extracted.values())
print(f"Validação: {'PASS' if all_valid else 'FAIL'}")

# Passo 3: Resumo
summary_prompt = f"Gere resumo JSON com os dados extraídos."
import json
summary = json.dumps(extracted, indent=2, ensure_ascii=False)

print("=== Prompt Chain ===")
print(f"1. Extração: {extracted}")
print(f"2. Validação: {'PASS' if all_valid else 'FAIL'}")
print(f"3. Resumo:\n{summary}")
