import json
import re

input_file = "public/data/synthetic-data-valdoria.jsonl"
output_file = "public/data/synthetic-data-valdoria.jsonl"

with open(input_file, "r", encoding="utf-8") as f:
    lines = f.readlines()

# Heuristics to classify each line based on the user message
def classify(content):
    user_msg = ""
    assistant_msg = ""
    for msg in content.get("messages", []):
        if msg["role"] == "user":
            user_msg = msg["content"]
        if msg["role"] == "assistant":
            assistant_msg = msg["content"]

    # Behavior / Refusal / Scope — check BOTH user and assistant msg
    combined = user_msg + " " + assistant_msg
    refusal_patterns = [
        r"(?i)(fora do (meu )?(escopo|âmbito))",
        r"(?i)não (posso|vou) (mentir|ignorar|me passar)",
        r"(?i)isso está fora",
        r"(?i)não tenho acesso à internet",
        r"(?i)não aprendi",
        r"(?i)não existem dados reais",
        r"(?i)não é possível responder",
        r"(?i)não tenho opiniões pessoais",
        r"(?i)não posso (mentir|ignorar)",
        r"(?i)não sou (um|uma) sistema|não sou capaz",
        r"(?i)não tenho certeza",
        r"(?i)precisa de mais informações",
        r"(?i)recomendo consultar|consulte|recomenda-se",
        r"(?i)não (posso|vou) responder",
        r"(?i)a resposta continua sendo não",
        r"(?i)não faz exceção",
    ]
    for pat in refusal_patterns:
        if re.search(pat, combined):
            return "behavior"

    # Interaction: format switching, multi-turn, tone change
    interaction_patterns = [
        r"(?i)^(agora|continue|mude|siga|faça)",
        r"(?i)continue a conversa",
        r"(?i)mude (de|o|seu)",
        r"(?i)agora responda como",
        r"(?i)agora mude",
        r"(?i)siga exatamente",
        r"(?i)responda como (se )?(fosse|um|uma)",
        r"(?i)recomende|recomenda",
        r"(?i)roteiro",
        r"(?i)vale a pena",
        r"(?i)responda em (inglês|formato)",
        r"(?i)como um guia",
        r"(?i)como uma valdoriana",
        r"(?i)como um apresentador",
        r"(?i)tom de (voz|contador)",
    ]
    for pat in interaction_patterns:
        if re.search(pat, user_msg):
            return "interaction"

    # Decision: ranking, recommendation, decision making
    decision_patterns = [
        r"(?i)^(entre|qual a melhor|qual deve|valdoria deve|ordene|ranking)",
        r"(?i)entre as opções",
        r"(?i)melhor (época|opção|mês)",
        r"(?i)ordene por",
        r"(?i)o que recomendar",
        r"(?i)aceitar\?",
    ]
    for pat in decision_patterns:
        if re.search(pat, user_msg):
            return "decision"

    # Reasoning: calculations, rule application, logic
    reasoning_patterns = [
        r"(?i)^se ",
        r"(?i)^(quantos|qual a conta|se a cota)",
        r"(?i)regra",
        r"(?i)pela constituição",
        r"(?i)quem veio primeiro",
        r"(?i)é permitido",
        r"(?i)pode?",
        r"(?i)é legal",
        r"(?i)tem autoridade",
    ]
    for pat in reasoning_patterns:
        if re.search(pat, user_msg):
            return "reasoning"

    # Transformation: summarization, paraphrase, translation, formatting
    transform_patterns = [
        r"(?i)^(resuma|parafraseie|traduza|reescreva|formate)",
        r"(?i)em uma frase",
        r"(?i)em linguagem jurídica",
        r"(?i)em formato de",
        r"(?i)do valdoriano",
    ]
    for pat in transform_patterns:
        if re.search(pat, user_msg):
            return "transformation"

    # Analysis: classification, extraction, verification
    analysis_patterns = [
        r"(?i)^(classifique|extraia|verifique)",
        r"(?i)classifique cada",
        r"(?i)extraia (os|do)",
        r"(?i)verifique (se|a)",
        r"(?i)como verdadeiro ou falso",
    ]
    for pat in analysis_patterns:
        if re.search(pat, user_msg):
            return "analysis"

    # Default: knowledge
    return "knowledge"

output = []
counts = {"knowledge": 0, "analysis": 0, "transformation": 0, "reasoning": 0,
          "decision": 0, "interaction": 0, "behavior": 0}

for i, line in enumerate(lines):
    line = line.strip()
    if not line:
        continue
    obj = json.loads(line)
    cat = classify(obj)
    counts[cat] += 1
    # Build prefix
    prefix_map = {"knowledge": "K", "analysis": "A", "transformation": "T",
                  "reasoning": "R", "decision": "D", "interaction": "I", "behavior": "B"}
    prefix = prefix_map[cat]
    obj["id"] = f"{prefix}{counts[cat]:03d}"
    obj["category"] = cat
    # Preserve the original order: add id and category at the beginning
    new_obj = {"id": obj.pop("id"), "category": obj.pop("category")}
    new_obj["messages"] = obj["messages"]
    output.append(json.dumps(new_obj, ensure_ascii=False))

with open(output_file, "w", encoding="utf-8") as f:
    f.write("\n".join(output) + "\n")

print(f"Total: {len(output)} lines")
for cat, count in sorted(counts.items(), key=lambda x: -x[1]):
    print(f"  {cat}: {count}")
