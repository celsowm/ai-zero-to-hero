from dataclasses import dataclass


@dataclass
class Pessoa:
    nome: str
    idade: int
    email: str = ""


@dataclass
class Funcionario(Pessoa):
    cargo: str = ""
    salario: float = 0.0

    def aumentar_salario(self, percentual: float) -> None:
        # Aumenta self.salario pelo percentual dado
        pass


p = Funcionario("Alice", 30, "alice@empresa.com", "Engenheira", 5000.0)
p.aumentar_salario(10)
print(f"{p.nome}: R$ {p.salario:.2f}")
