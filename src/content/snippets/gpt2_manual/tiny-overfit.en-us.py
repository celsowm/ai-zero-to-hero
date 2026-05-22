tokenizer = ByteTokenizer()
token_ids = tokenizer.encode(text, add_eot=True)
data = torch.tensor(token_ids, dtype=torch.long)

for step in range(args.steps):
    x, y = make_batch(data, batch_size=args.batch_size, block_size=args.block_size, device=device)
    _, loss = model(x, y)
    optimizer.zero_grad(set_to_none=True)
    loss.backward()
    torch.nn.utils.clip_grad_norm_(model.parameters(), 1.0)
    optimizer.step()
