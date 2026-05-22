model = GPT2ForCausalLM.from_pretrained(
    args.model,
    tokenizer=args.tokenizer,
    tokenizer_path=args.tokenizer_path,
    device=args.device,
)

text = model.generate(
    args.prompt,
    max_new_tokens=args.max_new_tokens,
    temperature=args.temperature,
    top_k=args.top_k,
)
