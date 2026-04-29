from langchain.prompts import FewShotPromptTemplate, PromptTemplate

example_prompt = PromptTemplate(
    template="Input: {input}\nOutput: {output}",
    input_variables=["input", "output"],
)

examples = [
    {"input": "happy", "output": "sad"},
    {"input": "hot", "output": "cold"},
    {"input": "fast", "output": "slow"},
]

prompt = FewShotPromptTemplate(
    examples=examples,
    example_prompt=example_prompt,
    prefix="Give the opposite word:",
    suffix="Input: {input}\nOutput:",
    input_variables=["input"],
)
