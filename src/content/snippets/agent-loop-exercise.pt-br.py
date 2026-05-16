def agente_pesquisa(produto, lojas):
    """Agente que pesquisa preço em várias lojas."""
    resultados = []
    i = 0

    while i < len(lojas):
        # Busca preço na loja atual
        preco = buscar_preco(lojas[i], produto)
        resultados.append({"loja": lojas[i], "preco": preco})
        print(f"Loja {lojas[i]}: R$ {preco}")

        # BUG: o que falta aqui?

    menor = min(resultados, key=lambda x: x["preco"])
    print(f"Menor preço: R$ {menor['preco']} na {menor['loja']}")
    return resultados

def buscar_preco(loja, produto):
    import random
    random.seed(hash(loja + produto) % 1000)
    return random.randint(500, 5000)

lojas = ["Amazon", "MercadoLivre", "MagazineLuiza", "Americanas"]
agente_pesquisa("iPhone 15", lojas)
