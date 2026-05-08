import math

examples = [
    (1.0, 0.6),   # model said 0.6, answer was 1 (missed by a little)
    (1.0, 0.9),   # model said 0.9, answer was 1 (almost right)
    (1.0, 0.01),  # model said 0.01, answer was 1 (wrong with confidence)
    (0.0, 0.4),   # model said 0.4, answer was 0 (missed by a little)
    (0.0, 0.1),   # model said 0.1, answer was 0 (almost right)
    (0.0, 0.99),  # model said 0.99, answer was 0 (wrong with confidence)
]

def bce_loss(answer, probability):
    """Binary Cross Entropy for a single example."""
    epsilon = 1e-7  # avoids log(0)
    if answer == 1.0:
        return -math.log(probability + epsilon)
    else:
        return -math.log(1.0 - probability + epsilon)

print(f"{'Answer':>8} | {'p (model)':>10} | {'Loss':>8} | Interpretation")
print("-" * 60)
for answer, p in examples:
    loss = bce_loss(answer, p)
    if answer == 1 and p < 0.3:
        note = "Wrong with confidence!"
    elif answer == 0 and p > 0.7:
        note = "Wrong with confidence!"
    elif answer == 1 and p > 0.7:
        note = "Almost right"
    elif answer == 0 and p < 0.3:
        note = "Almost right"
    else:
        note = "Missed by a little"
    print(f"{answer:>8.0f} | {p:>10.2f} | {loss:>8.4f} | {note}")
