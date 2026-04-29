# Tree of Thoughts: multiple reasoning paths
import random

problem = "What is the next number in the sequence: 2, 6, 14, 30, ?"

# Generate multiple thoughts (branching)
thoughts = [
    "Each number is the previous × 2 + 2: 2×2+2=6, 6×2+2=14, 14×2+2=30. Next: 30×2+2=62",
    "Differences between terms: 4, 8, 16 (doubling). Next difference: 32. Answer: 30+32=62",
    "Formula: a(n) = 2^(n+1) - 2. a(5) = 2^6 - 2 = 64 - 2 = 62",
]

# Simulate voting
votes = {}
for t in thoughts:
    answer = t.split("Answer:")[-1].split("62")[0] + "62"
    votes[62] = votes.get(62, 0) + 1

print("=== Tree of Thoughts ===")
print(f"Problem: {problem}")
for i, t in enumerate(thoughts, 1):
    print(f"\nPath {i}: {t}")
print(f"\nVoting: 62 received {votes[62]} votes from {len(thoughts)} paths")
print(f"Final answer (majority): 62")
