class Person:
    def __init__(self, name: str, age: int) -> None:
        self.name = name
        self.age = age

    def greet(self) -> str:
        return f"Hi, I'm {self.name}"


class Student(Person):
    def __init__(self, name: str, age: int, student_id: str) -> None:
        super().__init__(name, age)
        self.student_id = student_id

    def greet(self) -> str:
        return f"Hi, I'm {self.name} (ID {self.student_id})"


s = Student("Bob", 20, "2024001")
print(s.greet())
print(isinstance(s, Person))
