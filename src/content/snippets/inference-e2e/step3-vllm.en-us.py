from vllm import LLM, SamplingParams

# Step 3: vLLM — high-performance inference engine
# vLLM uses PagedAttention to efficiently manage KV cache memory
model_name = "gpt2"

# Load model in vLLM (GPU required)
llm = LLM(model=model_name, max_model_len=512)

# Configure generation parameters
sampling_params = SamplingParams(
    temperature=0.8,
    top_p=0.95,
    max_tokens=50,
)

# Generate text with prompts
prompts = ["The future of artificial intelligence"]
outputs = llm.generate(prompts, sampling_params)

for output in outputs:
    print(f"Prompt: {output.prompt}")
    print(f"  → {output.outputs[0].text}")
