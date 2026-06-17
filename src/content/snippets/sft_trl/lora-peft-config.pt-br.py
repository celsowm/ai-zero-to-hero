from peft import LoraConfig

lora_config = LoraConfig(
    r=32,
    lora_alpha=64,
    lora_dropout=0.03,
    bias="none",
    task_type="CAUSAL_LM",
    target_modules=[
        "q_proj",
        "k_proj",
        "v_proj",
        "o_proj",
        "gate_proj",
        "up_proj",
        "down_proj",
    ],
)

print(lora_config)
