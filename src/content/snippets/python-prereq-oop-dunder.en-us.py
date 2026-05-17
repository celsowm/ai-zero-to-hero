class Vetor:
    def __init__(self, x: float, y: float) -> None:
        self.x = x
        self.y = y

    def __repr__(self) -> str:
        return f"Vetor({self.x}, {self.y})"

    def __add__(self, outro: "Vetor") -> "Vetor":
        return Vetor(self.x + outro.x, self.y + outro.y)

    def __eq__(self, outro: object) -> bool:
        if not isinstance(outro, Vetor):
            return NotImplemented
        return self.x == outro.x and self.y == outro.y

    def __len__(self) -> int:
        return 2


v1 = Vetor(3.0, 4.0)
v2 = Vetor(1.0, 2.0)
print(v1 + v2)
print(len(v1))
print(v1 == Vetor(3.0, 4.0))
