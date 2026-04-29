# A mesma resposta do modelo em dois formatos

# 1️⃣ Texto puro (o que o modelo gera internamente — tokens → texto)
plain_text = """A capital do Brasil é Brasília.

Fatos principais:
- Foi inaugurada em 21 de abril de 1960
- Projetada por Oscar Niemeyer
- População: ~3 milhões de habitantes
- É um Patrimônio Mundial da UNESCO

Veja como calcular a área do Distrito Federal:
print(5760)  # km²
"""

# 2️⃣ Markdown (o formato padrão de TODAS as LLMs modernas)
markdown_response = """# A Capital do Brasil 🇧🇷

A capital do Brasil é **Brasília**.

## Fatos Principais

| Propriedade | Valor |
|---|---|
| Inauguração | 21 de abril de 1960 |
| Arquiteto | Oscar Niemeyer |
| População | ~3 milhões |
| Status | Patrimônio UNESCO |

## Curiosidade

A área do Distrito Federal é de **5.760 km²**.

```python
print(5760)  # km²
```
"""

# O modelo gera tokens → texto → formata como Markdown
# ChatGPT, Claude, Gemini — TODOS usam Markdown por padrão
