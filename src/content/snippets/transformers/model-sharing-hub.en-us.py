from transformers import AutoModelForCausalLM, AutoTokenizer
from huggingface_hub import login

# Login to Hub (required for push)
login()  # or: huggingface-cli login

model_name = "gpt2-finetuned-en"
model = AutoModelForCausalLM.from_pretrained("./my-model")
tokenizer = AutoTokenizer.from_pretrained("./my-model")

# Push to Hub
repo_id = f"your-username/{model_name}"
model.push_to_hub(repo_id)
tokenizer.push_to_hub(repo_id)

# The model is now available at:
# https://huggingface.co/your-username/gpt2-finetuned-en

# Others can use it directly:
# from transformers import pipeline
# gen = pipeline("text-generation", model="your-username/gpt2-finetuned-en")
