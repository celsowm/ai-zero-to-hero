def mini_agente(pergunta, max_iteracoes=3):
    """Mini-agente que busca respostas."""
    historico = []

    for i in range(max_iteracoes):
        # 1. PLAN: O que preciso buscar?
        # LLM: gere o plano baseado na pergunta e histórico
        plano = f"Buscar informação sobre: {pergunta}"

        # 2. ACT: usar ferramenta de busca
        # TODO: chame buscar(pergunta) e guarde o resultado
        resultado = None

        # 3. OBSERVE: registre no histórico
        historico.append({"tentativa": i + 1, "resultado": resultado})
        print(f"Tentativa {i+1}: {resultado}")

        # 4. DECIDE: encontrou resposta?
        # TODO: se resultado não é None, retorne-o
        pass

    return "Não encontrei a resposta."

def buscar(termo):
    base = {"capital da França": "Paris", "maior rio": "Amazonas"}
    return base.get(termo, None)

# Teste
print(mini_agente("capital da França"))
