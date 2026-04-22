data = [(160, 20, 55), (165, 24, 59), (170, 28, 64)]

# long form
sum_ages = 0
for height, age, weight in data:
    sum_ages += age

# equivalent compact form
sum_ages_2 = sum(age for height, age, weight in data)

print(sum_ages)
print(sum_ages_2)
