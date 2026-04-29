import torch
from transformers import AutoModelForCausalLM, AutoTokenizer
import time

def run_moe_inference():
    model_id = "LiquidAI/LFM2-8B-A1B"
    
    print(f"--- Iniciando Inferência Real MoE: {model_id} ---")
    print("Nota: Isso vai baixar ~16GB de dados se não estiver no cache.")
    
    device = "cuda" if torch.cuda.is_available() else "cpu"
    
    # 1. Carregar Tokenizer
    tokenizer = AutoTokenizer.from_pretrained(model_id, trust_remote_code=True)
    
    # 2. Carregar Modelo com Device Map (YOLO: joga tudo na GPU, offload se necessário)
    # O modelo tem 8B, em bfloat16 ocupa ~16GB. Sua GPU tem 12GB.
    # Precisamos de offload para CPU.
    print(f"Carregando modelo (Total ~16GB, VRAM disponível 12GB)...")
    model = AutoModelForCausalLM.from_pretrained(
        model_id, 
        trust_remote_code=True, 
        torch_dtype=torch.bfloat16,
        device_map="auto",
        offload_folder="offload" # Pasta para offload se VRAM acabar
    )

    prompt = "The secret to efficient AI is"
    inputs = tokenizer(prompt, return_tensors="pt").to(device)

    print(f"\nPrompt: {prompt}")
    print("Gerando resposta...")
    
    start_time = time.time()
    
    # Gerar
    with torch.no_grad():
        output = model.generate(
            **inputs, 
            max_new_tokens=50,
            do_sample=True,
            temperature=0.7,
            pad_token_id=tokenizer.eos_token_id
        )
    
    end_time = time.time()
    
    decoded = tokenizer.decode(output[0], skip_special_tokens=True)
    print(f"\nResultado:\n{decoded}")
    print(f"\nTempo de geração: {end_time - start_time:.2f}s")

    # Debug de Memória
    if device == "cuda":
        print(f"VRAM Alocada: {torch.cuda.memory_allocated() / 1024**3:.2f} GB")

if __name__ == "__main__":
    try:
        run_moe_inference()
    except Exception as e:
        print(f"\nERRO: {e}")
        print("Certifique-se de ter 'transformers', 'accelerate' e 'einops' instalados.")
