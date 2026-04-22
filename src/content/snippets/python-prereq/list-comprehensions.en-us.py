data = [(160, 20, 55), (165, 24, 59), (170, 28, 64)]

# long form
heights = []
for height, age, weight in data:
    heights.append(height)

# equivalent compact form
heights_2 = [height for height, age, weight in data]

print(heights)
print(heights_2)
