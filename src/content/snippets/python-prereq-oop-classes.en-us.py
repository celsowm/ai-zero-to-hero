class Person:
    species: str = "human"

    def __init__(self, name: str, age: int) -> None:
        self.name = name
        self.age = age
        self._secrets: list[str] = []

    def greet(self) -> str:
        return f"Hi, I'm {self.name}"

    @classmethod
    def create_anonymous(cls) -> "Person":
        return cls("Anonymous", 0)

    @staticmethod
    def is_adult(age: int) -> bool:
        return age >= 18


p1 = Person("Alice", 30)
print(p1.greet())

anon = Person.create_anonymous()
print(Person.is_adult(anon.age))
