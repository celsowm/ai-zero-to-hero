class Pessoa:
    def __init__(self, nome: str, idade: int) -> None:
        self.nome = nome
        self.idade = idade

    def saudacao(self) -> str:
        return f"Olá, me chamo {self.nome}"


class Aluno(Pessoa):
    def __init__(self, nome: str, idade: int, matricula: str) -> None:
        super().__init__(nome, idade)
        self.matricula = matricula

    def saudacao(self) -> str:
        return f"Olá, sou {self.nome} (matrícula {self.matricula})"


a = Aluno("Bob", 20, "2024001")
print(a.saudacao())
print(isinstance(a, Pessoa))
