class Produto:
    def __init__(self, nome: str, preco: float, quantidade: int = 1):
        self.nome = nome
        self.preco = preco
        self.quantidade = quantidade

    def valor_total(self) -> float:
        # Retorna preco * quantidade
        pass

    @classmethod
    def produto_padrao(cls, nome: str) -> "Produto":
        # Cria um produto com preco=10.0 e quantidade=1
        pass

    @staticmethod
    def calcular_desconto(preco: float, percentual: float) -> float:
        # Retorna preco * (1 - percentual / 100)
        pass
