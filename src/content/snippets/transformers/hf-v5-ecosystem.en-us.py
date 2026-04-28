# HuggingFace v5 ecosystem — main modules

# 1. transformers — models and pipelines
from transformers import pipeline, AutoModel, AutoTokenizer

# 2. datasets — data loading and processing
from datasets import load_dataset, Dataset

# 3. evaluate — standardized metrics
import evaluate
perplexity = evaluate.load("perplexity")

# 4. accelerate — distributed training
from accelerate import Accelerator
accelerator = Accelerator()

# 5. peft — efficient fine-tuning (LoRA, adapters)
from peft import LoraConfig, get_peft_model

# 6. huggingface_hub — Hub interaction
from huggingface_hub import login, HfApi
api = HfApi()

# All integrated: load, train, evaluate and share
generator = pipeline("text-generation", model="gpt2")
print("HuggingFace v5: from model to Hub in one unified API")
