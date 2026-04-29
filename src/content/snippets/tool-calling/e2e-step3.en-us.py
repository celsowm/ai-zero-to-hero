# Execute queries
queries = [
    "What is 237 times 891?",
    "Research Python 3.12 and tell me what's new",
    "If I invest R$1000 at 10% per year for 5 years, how much will I have? Calculate.",
]

for q in queries:
    print(f"Q: {q}")
    result = executor.invoke({"input": q})
    print(f"A: {result['output']}\n")

# Expected output:
# Q: What is 237 times 891?
# A: 237 × 891 = 211167
#
# Q: Research Python 3.12...
# A: [search results with summary]
#
# Q: If I invest R$1000...
# A: R$1000 × (1.10)^5 = R$1610.51
