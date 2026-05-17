class Engine:
    def __init__(self, horsepower: int):
        self.horsepower = horsepower

    def start(self) -> str:
        return f"Engine with {self.horsepower} HP started."


class Car:
    def __init__(self, model: str, engine: Engine):
        self.model = model
        self.engine = engine

    def start(self) -> str:
        return f"{self.model}: {self.engine.start()}"


class Employee:
    def __init__(self, name: str):
        self.name = name


class Department:
    def __init__(self, name: str):
        self.name = name
        self.employees: list[Employee] = []

    def hire(self, e: Employee) -> None:
        self.employees.append(e)

    def list_names(self) -> str:
        return ", ".join(e.name for e in self.employees)


class OrderItem:
    def __init__(self, description: str, price: float):
        self.description = description
        self.price = price


class Order:
    def __init__(self, customer: str):
        self.customer = customer
        self.items: list[OrderItem] = []

    def add_item(self, desc: str, price: float) -> None:
        self.items.append(OrderItem(desc, price))

    def total(self) -> float:
        return sum(item.price for item in self.items)


# Simple association: Car has-an Engine
engine_v8 = Engine(450)
car = Car("Mustang", engine_v8)
print(car.start())

# Aggregation: Department has Employees (exist outside)
e1 = Employee("Alice")
e2 = Employee("Bob")
dept = Department("IT")
dept.hire(e1)
dept.hire(e2)
print(dept.list_names())

# Composition: Order creates OrderItems (die with order)
order = Order("Charlie")
order.add_item("Keyboard", 250.0)
order.add_item("Mouse", 120.0)
print(order.total())
