# pyproject.toml

[project]
name = "pytorch-gpt2-from-scratch"
version = "0.1.0"
requires-python = ">=3.11"

dependencies = [
  "torch>=2.2",
  "numpy>=1.26",
  "pyyaml>=6.0",
  "tqdm>=4.66",
]

[project.optional-dependencies]
hf = [
  "datasets>=2.19",
]

[tool.pytest.ini_options]
pythonpath = ["src"]
