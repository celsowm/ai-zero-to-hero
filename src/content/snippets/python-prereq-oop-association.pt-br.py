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


class Funcionario:
    def __init__(self, nome: str):
        self.nome = nome


class Departamento:
    def __init__(self, nome: str):
        self.nome = nome
        self.funcionarios: list[Funcionario] = []

    def contratar(self, f: Funcionario) -> None:
        self.funcionarios.append(f)

    def listar(self) -> str:
        return ", ".join(f.nome for f in self.funcionarios)


class ItemPedido:
    def __init__(self, descricao: str, preco: float):
        self.descricao = descricao
        self.preco = preco


class Pedido:
    def __init__(self, cliente: str):
        self.cliente = cliente
        self.itens: list[ItemPedido] = []

    def adicionar_item(self, desc: str, preco: float) -> None:
        self.itens.append(ItemPedido(desc, preco))

    def total(self) -> float:
        return sum(item.preco for item in self.itens)


# Associação simples: Carro tem-um Motor
motor_v8 = Motor(450)
carro = Carro("Mustang", motor_v8)
print(carro.ligar())

# Agregação: Departamento tem Funcionarios (existem fora)
f1 = Funcionario("Alice")
f2 = Funcionario("Bob")
dept = Departamento("TI")
dept.contratar(f1)
dept.contratar(f2)
print(dept.listar())

# Composição: Pedido cria ItensPedido (morrem com o pedido)
pedido = Pedido("Charlie")
pedido.adicionar_item("Teclado", 250.0)
pedido.adicionar_item("Mouse", 120.0)
print(pedido.total())
