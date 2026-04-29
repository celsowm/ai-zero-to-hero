from langchain_core.prompts import FewShotPromptTemplate, PromptTemplate

examples = [
    {"input": "happy", "output": "sad"},
    {"input": "tall", "output": "short"},
    {"input": "bright", "output": "dark"},
]

example_prompt = PromptTemplate.from_template(
    "Input: {input}\nOutput: {output}"
)

few_shot = FewShotPromptTemplate(
    examples=examples,
    example_prompt=example_prompt,
    suffix="Input: {input}\nOutput:",
    input_variables=["input"],
)

formatted = few_shot.format(input="cold")
print(f"Few-shot prompt:\n{formatted}")
