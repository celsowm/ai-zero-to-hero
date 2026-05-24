import torch


device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

model = GPT(config).to(device)
optimizer = configure_optimizers(
    model,
    weight_decay=0.1,
    learning_rate=3e-4,
)

for step in range(max_steps):
    x, y = get_batch(
        train_data,
        batch_size=batch_size,
        block_size=config.block_size,
    )

    x = x.to(device)
    y = y.to(device)

    logits, loss = model(x, y)

    optimizer.zero_grad(set_to_none=True)
    loss.backward()

    torch.nn.utils.clip_grad_norm_(
        model.parameters(),
        max_norm=1.0,
    )

    optimizer.step()

    if step % log_interval == 0:
        print(step, loss.item())
