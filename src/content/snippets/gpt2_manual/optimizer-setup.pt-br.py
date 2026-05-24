import torch


def configure_optimizers(model, weight_decay, learning_rate):
    decay = []
    no_decay = []

    for name, param in model.named_parameters():
        if not param.requires_grad:
            continue

        if param.dim() >= 2:
            decay.append(param)
        else:
            no_decay.append(param)

    optim_groups = [
        {"params": decay, "weight_decay": weight_decay},
        {"params": no_decay, "weight_decay": 0.0},
    ]

    optimizer = torch.optim.AdamW(
        optim_groups,
        lr=learning_rate,
        betas=(0.9, 0.95),
    )

    return optimizer
