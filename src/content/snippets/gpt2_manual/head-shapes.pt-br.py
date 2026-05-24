B, T, C = x.shape
H = config.n_head
D = C // H

assert C % H == 0

q = q.view(B, T, H, D).transpose(1, 2)
k = k.view(B, T, H, D).transpose(1, 2)
v = v.view(B, T, H, D).transpose(1, 2)

print(q.shape)

y = y.transpose(1, 2).contiguous().view(B, T, C)
print(y.shape)
