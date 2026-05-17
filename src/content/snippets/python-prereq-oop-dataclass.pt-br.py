from dataclasses import dataclass


@dataclass
class Config:
    model_name: str = "gpt2"
    temperature: float = 0.7
    max_tokens: int = 512


@dataclass(frozen=True)
class Ponto:
    x: float
    y: float

    def distancia(self, outro: "Ponto") -> float:
        return ((self.x - outro.x) ** 2 + (self.y - outro.y) ** 2) ** 0.5


cfg = Config()
print(cfg)

p1 = Ponto(1.0, 2.0)
p2 = Ponto(4.0, 6.0)
print(p1.distancia(p2))
