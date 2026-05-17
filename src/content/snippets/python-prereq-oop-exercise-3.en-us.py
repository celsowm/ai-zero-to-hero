class Ponto2D:
    def __init__(self, x: float, y: float):
        self.x = x
        self.y = y

    def __repr__(self) -> str:
        return f"Ponto2D({self.x}, {self.y})"

    def __add__(self, outro: "Ponto2D") -> "Ponto2D":
        # Retorna um novo Ponto2D com x+y somados
        pass

    def __eq__(self, outro: object) -> bool:
        # Compara x e y entre dois Ponto2D
        pass

    def __len__(self) -> int:
        return 2


p1 = Ponto2D(1.0, 2.0)
p2 = Ponto2D(3.0, 4.0)
p3 = p1 + p2
print(p3)
print(p1 == p2)
