gold = {
    "What is the refund window?": {"policies.md"},
    "Does the Pro plan have priority support?": {"plans.md"},
}

retrieved = {
    "What is the refund window?": ["policies.md", "plans.md"],
    "Does the Pro plan have priority support?": ["plans.md", "integrations.md"],
}

for question, correct_sources in gold.items():
    returned_sources = set(retrieved[question])
    hit = bool(correct_sources & returned_sources)
    print(question, "OK" if hit else "FAILED")
