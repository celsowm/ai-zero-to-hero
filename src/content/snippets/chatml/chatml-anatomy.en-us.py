from transformers import AutoTokenizer

# A small chat model that already speaks ChatML natively.
MODEL = "Qwen/Qwen3.5-0.8B"
tokenizer = AutoTokenizer.from_pretrained(MODEL)

# 1) The shape of a ChatML message: special tokens + role + content.
system_token = tokenizer.convert_tokens_to_ids("<|im_start|>")
end_token = tokenizer.convert_tokens_to_ids("<|im_end|>")
print("Special token ids:",
      {"<|im_start|>": system_token, "<|im_end|>": end_token})

# 2) Each role's start marker includes its name on the same line.
system_marker = tokenizer.decode([system_token]) + "system\n"
user_marker = tokenizer.decode([system_token]) + "user\n"
assistant_marker = tokenizer.decode([system_token]) + "assistant\n"

# 3) A multi-turn conversation hand-assembled to show every piece.
chatml_string = (
    system_marker + "You are a helpful assistant." + tokenizer.decode([end_token]) + "\n"
    + user_marker + "What is the capital of Brazil?" + tokenizer.decode([end_token]) + "\n"
    + assistant_marker  # the model continues from here
)

print("\n--- HAND-BUILT ChatML ---")
print(chatml_string)
print("------------------------")
