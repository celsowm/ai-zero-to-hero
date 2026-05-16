from langchain_core.prompts import FewShotPromptTemplate, PromptTemplate

examples = [
    {"input": "happy", "output": "sad"},
    {"input": "tall", "output": "short"},
    {"input": "bright", "output": "dark"},
]

# BUG: using prompt_template instead of example_prompt!
few_shot = FewShotPromptTemplate(
    examples=examples,
    prompt_template=PromptTemplate.from_template("Input: {input}\nOutput: {output}"),
    suffix="Input: {input}\nOutput:",
    input_variables=["input"],
)

formatted = few_shot.format(input="cold")
print(f"Formatted prompt:\n{formatted}")
