# simple tabular data
height = 172
age = 29
weight = 68.5
# tuple: groups related variables into one sample
sample = (height, age, weight)
# list of tuples: dataset with multiple observations
data = [
    (160, 20, 55.0),
    (165, 24, 59.0),
    sample,
]
# reads first height: list index [0] + tuple index [0]
first_height = data[0][0]
print(first_height)
