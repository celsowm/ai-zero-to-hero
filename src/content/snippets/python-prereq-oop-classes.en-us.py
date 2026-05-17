class Pessoa:
    especie: str = "humano"

    def __init__(self, nome: str, idade: int) -> None:
        self.nome = nome
        self.idade = idade
        self._segredos: list[str] = []

    def saudacao(self) -> str:
        return f"Olá, me chamo {self.nome}"

    @classmethod
    def criar_anonimo(cls) -> "Pessoa":
        return cls("Anônimo", 0)

    @staticmethod
    def maior_idade(idade: int) -> bool:
        return idade >= 18


p1 = Pessoa("Alice", 30)
print(p1.saudacao())

anon = Pessoa.criar_anonimo()
print(Pessoa.maior_idade(anon.idade))
