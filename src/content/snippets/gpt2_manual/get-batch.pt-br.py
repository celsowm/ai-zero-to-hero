import torch


def get_batch(data, batch_size, block_size):
    ix = torch.randint(len(data) - block_size, (batch_size,))

    x = torch.stack([
        data[i : i + block_size]
        for i in ix
    ])

    y = torch.stack([
        data[i + 1 : i + block_size + 1]
        for i in ix
    ])

    return x, y


x, y = get_batch(data, batch_size=4, block_size=8)

print(x.shape)
print(y.shape)
print(x.dtype)
print(y.dtype)
