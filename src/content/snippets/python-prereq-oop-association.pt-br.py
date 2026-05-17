class Motor:
    def __init__(self, cavalos: int):
        self.cavalos = cavalos

    def ligar(self) -> str:
        return f"Motor de {self.cavalos} CV ligado."


class Carro:
    def __init__(self, modelo: str, motor: Motor):
        self.modelo = modelo
        self.motor = motor

    def ligar(self) -> str:
        return f"{self.modelo}: {self.motor.ligar()}"


motor_v8 = Motor(450)
carro = Carro("Mustang", motor_v8)
print(carro.ligar())
