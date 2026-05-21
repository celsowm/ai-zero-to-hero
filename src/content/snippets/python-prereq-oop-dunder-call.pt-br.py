class MultiplicadorChamavel:
    def __init__(self, multiplicador: float) -> None:
        self.multiplicador = multiplicador
        print(f"Objeto criado com multiplicador igual a {multiplicador}!")

    def __call__(self, valor: float) -> float:
        return valor * self.multiplicador


objeto = MultiplicadorChamavel(multiplicador=10)
resultado = objeto(5)
print("Resultado:", resultado)
