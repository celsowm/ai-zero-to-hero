from dataclasses import dataclass


@dataclass
class Config:
    model_name: str = "gpt2"
    temperature: float = 0.7
    max_tokens: int = 512


@dataclass(frozen=True)
class Point:
    x: float
    y: float

    def distance(self, other: "Point") -> float:
        return ((self.x - other.x) ** 2 + (self.y - other.y) ** 2) ** 0.5


cfg = Config()
print(cfg)

p1 = Point(1.0, 2.0)
p2 = Point(4.0, 6.0)
print(p1.distance(p2))
