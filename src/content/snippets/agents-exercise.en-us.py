def mini_agent(question, max_iterations=3):
    """Mini-agent that searches for answers."""
    history = []

    for i in range(max_iterations):
        # 1. PLAN: What do I need to search?
        # LLM: generate plan based on question and history
        plan = f"Search for information about: {question}"

        # 2. ACT: use search tool
        # TODO: call search(question) and store the result
        result = None

        # 3. OBSERVE: record in history
        history.append({"attempt": i + 1, "result": result})
        print(f"Attempt {i+1}: {result}")

        # 4. DECIDE: found the answer?
        # TODO: if result is not None, return it
        pass

    return "I didn't find the answer."

def search(term):
    database = {"capital of France": "Paris", "largest river": "Amazon"}
    return database.get(term, None)

# Test
print(mini_agent("capital of France"))
