class CallableMultiplier:
    def __init__(self, multiplier: float) -> None:
        self.multiplier = multiplier
        print(f"Object created with multiplier = {multiplier}!")

    def __call__(self, value: float) -> float:
        return value * self.multiplier


objeto = CallableMultiplier(multiplier=10)
resultado = objeto(5)
print("Result:", resultado)
