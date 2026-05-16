def research_agent(product, stores):
    """Agent that researches prices across stores."""
    results = []
    i = 0

    while i < len(stores):
        # Search price at current store
        price = search_price(stores[i], product)
        results.append({"store": stores[i], "price": price})
        print(f"Store {stores[i]}: R$ {price}")

        # BUG: what's missing here?

    lowest = min(results, key=lambda x: x["price"])
    print(f"Lowest price: R$ {lowest['price']} at {lowest['store']}")
    return results

def search_price(store, product):
    import random
    random.seed(hash(store + product) % 1000)
    return random.randint(500, 5000)

stores = ["Amazon", "MercadoLivre", "MagazineLuiza", "Americanas"]
research_agent("iPhone 15", stores)
