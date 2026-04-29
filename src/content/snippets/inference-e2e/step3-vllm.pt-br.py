from vllm import LLM, SamplingParams

# Step 3: vLLM — engine de inferência de alta performance
# vLLM usa PagedAttention para gerenciar memória KV cache de forma eficiente
model_name = "gpt2"

# Carregar modelo no vLLM (GPU obrigatório)
llm = LLM(model=model_name, max_model_len=512)

# Configurar parâmetros de geração
sampling_params = SamplingParams(
    temperature=0.8,
    top_p=0.95,
    max_tokens=50,
)

# Gerar texto com prompts
prompts = ["O futuro da inteligência artificial"]
outputs = llm.generate(prompts, sampling_params)

for output in outputs:
    print(f"Prompt: {output.prompt}")
    print(f"  → {output.outputs[0].text}")
