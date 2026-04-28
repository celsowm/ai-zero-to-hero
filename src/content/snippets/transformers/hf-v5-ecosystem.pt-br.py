# Ecossistema HuggingFace v5 — módulos principais

# 1. transformers — modelos e pipelines
from transformers import pipeline, AutoModel, AutoTokenizer

# 2. datasets — carregamento e processamento de dados
from datasets import load_dataset, Dataset

# 3. evaluate — métricas padronizadas
import evaluate
perplexity = evaluate.load("perplexity")

# 4. accelerate — treinamento distribuído
from accelerate import Accelerator
accelerator = Accelerator()

# 5. peft — fine-tuning eficiente (LoRA, adapters)
from peft import LoraConfig, get_peft_model

# 6. huggingface_hub — interação com o Hub
from huggingface_hub import login, HfApi
api = HfApi()

# Tudo integrado: carregar, treinar, avaliar e compartilhar
generator = pipeline("text-generation", model="gpt2")
print("HuggingFace v5: do modelo ao Hub em uma API unificada")
